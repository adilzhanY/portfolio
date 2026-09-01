"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * The CRT Warp background from reactbits.dev, ported from three.js to plain
 * WebGL: one full-screen triangle, one fragment shader, no dependency. It
 * sits fixed behind the whole page and takes its two colours from the site:
 * the phosphor is the current accent, which on a case study is the product's
 * own colour, and the tube is the page surface. The canvas is dimmed in CSS
 * so the type on top keeps its contrast, and it renders at 30 fps at most,
 * at device pixel ratio 1, only while the tab is visible. Reduced motion gets
 * a single still frame; reduced transparency and print get nothing.
 */

const SETTINGS = {
  speed: 0.15,
  curvature: 0.25,
  scanlineStrength: 0.25,
  scanlineFrequency: 200,
  waveAmplitude: 0.27,
  waveFrequency: 2.5,
  bloom: 1.5,
  bloomRadius: 1,
  noise: 0.06,
  vignette: 0.35,
  brightness: 1.1,
  pixelation: 1,
  rgbShift: 0.015,
  mouseStrength: 0.3,
  fps: 30,
  dpr: 1,
};

const VERTEX = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uCurvature;
uniform float uScanlineStrength;
uniform float uScanlineFrequency;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uBloom;
uniform float uBloomRadius;
uniform float uNoise;
uniform float uVignette;
uniform float uBrightness;
uniform float uPixelation;
uniform float uRgbShift;
uniform vec2 uPointer;
uniform float uMouseStrength;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 crtCurve(vec2 uv, float radius) {
  vec2 p = (uv - 0.5) * 2.0;
  float safeRadius = max(radius, 1.415);
  float cornerScale = safeRadius / sqrt(max(safeRadius * safeRadius - 2.0, 0.001));
  p = safeRadius * p / sqrt(max(safeRadius * safeRadius - dot(p, p), 0.001));
  p /= cornerScale;
  return p * 0.5 + 0.5;
}

float referencePlasma(vec2 uv, float t) {
  float frequencyScale = max(uWaveFrequency / 2.2, 0.001);
  uv = (uv - 0.5) * frequencyScale + 0.5;

  float scanline = 0.5 - 0.5 * cos(uv.y * 3.14159265 * uScanlineFrequency);
  scanline = mix(1.0, scanline, uScanlineStrength);

  uv *= vec2(80.0, 24.0);
  uv = ceil(uv);
  uv /= vec2(80.0, 24.0);

  float amplitude = uWaveAmplitude / 0.28;
  float field = 0.0;
  field += 0.7 * sin(0.5 * uv.x + t / 5.0);
  field += 3.0 * sin(1.6 * uv.y + t / 5.0);
  field += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 5.0)) + t / 2.0);

  float cx = uv.x + 0.5 * sin(t / 2.0);
  float cy = uv.y + 0.5 * cos(t / 4.0);
  field += 0.4 * sin(sqrt(100.0 * cx * cx + 100.0 * cy * cy + 1.0) + t);
  field += 0.9 * sin(sqrt(75.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field -= 1.4 * sin(sqrt(256.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field += 0.3 * sin(0.5 * uv.y + uv.x + sin(t));

  return scanline * floor(3.0 * (0.5 + 0.499 * sin(field * amplitude))) / 3.0;
}

void main() {
  vec2 uv = vUv;
  if (uPixelation > 1.001) {
    vec2 cells = max(uResolution / uPixelation, vec2(1.0));
    uv = (floor(uv * cells) + 0.5) / cells;
  }

  float curveRadius = 1.1 + 0.42 / max(uCurvature, 0.001);
  curveRadius *= exp(-uPointer.y * uMouseStrength * 0.4);
  vec2 curvedUv = crtCurve(uv, curveRadius);
  curvedUv.x -= uPointer.x * uMouseStrength * 0.035;

  float signal = referencePlasma(curvedUv, uTime);
  float radius = 0.01 * uBloomRadius;
  float glow = signal * 0.2;
  glow += referencePlasma(curvedUv + vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(radius, 0.0), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv - vec2(0.0, radius), uTime) * 0.12;
  glow += referencePlasma(curvedUv + vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv - vec2(radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(radius, -radius), uTime) * 0.08;
  glow += referencePlasma(curvedUv + vec2(-radius, radius), uTime) * 0.08;

  float redSignal = referencePlasma(curvedUv + vec2(uRgbShift, 0.0), uTime);
  float blueSignal = referencePlasma(curvedUv - vec2(uRgbShift, 0.0), uTime);
  vec3 channelSignal = vec3(redSignal, signal, blueSignal);
  vec3 waveColor = uColor * (0.3 + signal * 0.7 + glow * uBloom * 0.65);
  waveColor += (channelSignal - signal) * 0.42;

  float edge = clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 2.0, 0.0, 1.0);
  float edgeFade = mix(1.0, smoothstep(0.0, 1.0, edge), uVignette);
  float waveMask = clamp(signal * 0.82 + glow * 0.52, 0.0, 1.0) * edgeFade;

  float grain = hash21(gl_FragCoord.xy + vec2(fract(uTime) * 173.0));
  waveColor = max(waveColor * uBrightness, vec3(0.0));
  vec3 color = mix(uBackgroundColor, waveColor, waveMask);
  color += (grain - 0.5) * uNoise;
  gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
}
`;

/** #rgb or #rrggbb to linear RGB, the space the shader works in. */
function hexToLinear(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const channel = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  if (h.length !== 6 || Number.isNaN(parseInt(h, 16))) return [0.5, 0.5, 0.5];
  return [channel(0), channel(2), channel(4)];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function CRTBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readColors = useRef<() => void>(() => {});
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // One triangle that covers the clip space, so there is no seam.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform1f(u("uCurvature"), SETTINGS.curvature);
    gl.uniform1f(u("uScanlineStrength"), SETTINGS.scanlineStrength);
    gl.uniform1f(u("uScanlineFrequency"), SETTINGS.scanlineFrequency);
    gl.uniform1f(u("uWaveAmplitude"), SETTINGS.waveAmplitude);
    gl.uniform1f(u("uWaveFrequency"), SETTINGS.waveFrequency);
    gl.uniform1f(u("uBloom"), SETTINGS.bloom);
    gl.uniform1f(u("uBloomRadius"), SETTINGS.bloomRadius);
    gl.uniform1f(u("uNoise"), SETTINGS.noise);
    gl.uniform1f(u("uVignette"), SETTINGS.vignette);
    gl.uniform1f(u("uBrightness"), SETTINGS.brightness);
    gl.uniform1f(u("uPixelation"), SETTINGS.pixelation);
    gl.uniform1f(u("uRgbShift"), SETTINGS.rgbShift);
    gl.uniform1f(u("uMouseStrength"), SETTINGS.mouseStrength);
    const uResolution = u("uResolution");
    const uTime = u("uTime");
    const uColor = u("uColor");
    const uBackground = u("uBackgroundColor");
    const uPointer = u("uPointer");

    // The phosphor is whatever --accent-c resolves to on <body>, which is the
    // product colour on a case study, and the tube is the page surface.
    readColors.current = () => {
      const styles = getComputedStyle(document.body);
      gl.uniform3fv(uColor, hexToLinear(styles.getPropertyValue("--accent-c")));
      gl.uniform3fv(
        uBackground,
        hexToLinear(styles.getPropertyValue("--surface")),
      );
    };
    readColors.current();
    const themeObserver = new MutationObserver(() => readColors.current());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, SETTINGS.dpr);
      const width = Math.max(1, Math.round(window.innerWidth * dpr));
      const height = Math.max(1, Math.round(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerTarget = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    if (!still) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    let raf = 0;
    let time = 0;
    let last = performance.now();
    let lastFrame = 0;
    const interval = 1000 / SETTINGS.fps;

    const draw = () => {
      gl.uniform1f(uTime, time);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        last = now;
        return;
      }
      if (now - lastFrame < interval) return;
      lastFrame = now - ((now - lastFrame) % interval);
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      time += delta * SETTINGS.speed;
      pointer.x += (pointerTarget.x - pointer.x) * 0.08;
      pointer.y += (pointerTarget.y - pointer.y) * 0.08;
      draw();
    };

    if (still) {
      // Someone who asked for less motion gets the picture, not the movement.
      time = 4;
      draw();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      themeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      readColors.current = () => {};
    };
  }, []);

  // A case study sets its own accent on <body>; pick it up after navigation.
  useEffect(() => {
    readColors.current();
  }, [pathname]);

  return <canvas ref={canvasRef} aria-hidden="true" className="page-backdrop" />;
}
