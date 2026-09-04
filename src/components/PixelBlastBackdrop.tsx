"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * The Pixel Blast background from reactbits.dev, ported from three.js and
 * postprocessing to plain WebGL 2: one full-screen triangle, one fragment
 * shader, no dependency. A field of dithered pixels drifts slowly, and a
 * click or tap sends a ring through it. The pixels are drawn in the current
 * accent, which on a case study is the product's own colour, on a transparent
 * canvas, so the page surface stays exactly what it is. The canvas is dimmed
 * in CSS so the type on top keeps its contrast. It renders at 30 fps at most,
 * only while the tab is visible. Reduced motion gets one still frame; reduced
 * transparency and print get nothing.
 *
 * Left out of the port on purpose: the liquid distortion and film noise,
 * both of which need a second render pass and fight legibility.
 */

const SETTINGS = {
  shape: 0, // 0 square, 1 circle, 2 triangle, 3 diamond
  pixelSize: 3,
  patternScale: 2,
  patternDensity: 1,
  pixelSizeJitter: 0,
  ripples: true,
  rippleIntensity: 1,
  rippleThickness: 0.1,
  rippleSpeed: 0.3,
  edgeFade: 0.12, // small, so the field reaches the sides; the CSS mask shapes it
  speed: 0.5,
  fps: 30,
  dpr: 1.5,
};

const MAX_CLICKS = 10;

const VERTEX = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uPixelJitter;
uniform int   uEnableRipples;
uniform float uRippleSpeed;
uniform float uRippleThickness;
uniform float uRippleIntensity;
uniform float uEdgeFade;
uniform int   uShapeType;

const int SHAPE_SQUARE   = 0;
const int SHAPE_CIRCLE   = 1;
const int SHAPE_TRIANGLE = 2;
const int SHAPE_DIAMOND  = 3;

const int MAX_CLICKS = ${MAX_CLICKS};
uniform vec2  uClickPos  [MAX_CLICKS];
uniform float uClickTimes[MAX_CLICKS];

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

#define FBM_OCTAVES     5
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

float maskCircle(vec2 p, float cov){
  float r = sqrt(cov) * .25;
  float d = length(p - 0.5) - r;
  float aa = 0.5 * fwidth(d);
  return cov * (1.0 - smoothstep(-aa, aa, d * 2.0));
}

float maskTriangle(vec2 p, vec2 id, float cov){
  bool flip = mod(id.x + id.y, 2.0) > 0.5;
  if (flip) p.x = 1.0 - p.x;
  float r = sqrt(cov);
  float d  = p.y - r*(1.0 - p.x);
  float aa = fwidth(d);
  return cov * clamp(0.5 - d/aa, 0.0, 1.0);
}

float maskDiamond(vec2 p, float cov){
  float r = sqrt(cov) * 0.564;
  return step(abs(p.x - 0.49) + abs(p.y - 0.49), r);
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  vec2 pixelId = floor(fragCoord / pixelSize);
  vec2 pixelUV = fract(fragCoord / pixelSize);

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  if (uEnableRipples == 1) {
    for (int i = 0; i < MAX_CLICKS; ++i){
      vec2 pos = uClickPos[i];
      if (pos.x < 0.0) continue;
      vec2 cuv = (((pos - uResolution * .5 - cellPixelSize * .5) / (uResolution))) * vec2(aspectRatio, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      float waveR = uRippleSpeed * t;
      float ring  = exp(-pow((r - waveR) / uRippleThickness, 2.0));
      float atten = exp(-1.0 * t) * exp(-10.0 * r);
      feed = max(feed, ring * atten * uRippleIntensity);
    }
  }

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float bw = step(0.5, feed + bayer);

  float h = fract(sin(dot(floor(fragCoord / uPixelSize), vec2(127.1, 311.7))) * 43758.5453);
  float jitterScale = 1.0 + (h - 0.5) * uPixelJitter;
  float coverage = bw * jitterScale;
  float M;
  if      (uShapeType == SHAPE_CIRCLE)   M = maskCircle (pixelUV, coverage);
  else if (uShapeType == SHAPE_TRIANGLE) M = maskTriangle(pixelUV, pixelId, coverage);
  else if (uShapeType == SHAPE_DIAMOND)  M = maskDiamond(pixelUV, coverage);
  else                                   M = coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);
    M *= fade;
  }

  // The colour arrives linear; the canvas wants sRGB.
  vec3 srgb = mix(
    uColor * 12.92,
    1.055 * pow(uColor, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, uColor)
  );
  fragColor = vec4(srgb, M);
}
`;

/** #rgb or #rrggbb to linear RGB. */
function hexToLinear(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 || Number.isNaN(parseInt(h, 16))) return [0.5, 0.5, 0.5];
  const channel = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return [channel(0), channel(2), channel(4)];
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
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

export default function PixelBlastBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readColor = useRef<() => void>(() => {});
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-transparency: reduce)").matches) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
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

    // The shader writes straight alpha; blend it over the page as such.
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

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
    gl.uniform1i(u("uShapeType"), SETTINGS.shape);
    gl.uniform1f(u("uScale"), SETTINGS.patternScale);
    gl.uniform1f(u("uDensity"), SETTINGS.patternDensity);
    gl.uniform1f(u("uPixelJitter"), SETTINGS.pixelSizeJitter);
    gl.uniform1i(u("uEnableRipples"), SETTINGS.ripples ? 1 : 0);
    gl.uniform1f(u("uRippleSpeed"), SETTINGS.rippleSpeed);
    gl.uniform1f(u("uRippleThickness"), SETTINGS.rippleThickness);
    gl.uniform1f(u("uRippleIntensity"), SETTINGS.rippleIntensity);
    gl.uniform1f(u("uEdgeFade"), SETTINGS.edgeFade);
    const uResolution = u("uResolution");
    const uTime = u("uTime");
    const uColor = u("uColor");
    const uPixelSize = u("uPixelSize");
    const uClickPos = u("uClickPos");
    const uClickTimes = u("uClickTimes");

    const clickPos = new Float32Array(MAX_CLICKS * 2).fill(-1);
    const clickTimes = new Float32Array(MAX_CLICKS);
    let clickIx = 0;
    gl.uniform2fv(uClickPos, clickPos);
    gl.uniform1fv(uClickTimes, clickTimes);

    // The pixels are whatever --accent-c resolves to on <body>, which is the
    // product colour on a case study.
    readColor.current = () => {
      const accent = getComputedStyle(document.body).getPropertyValue("--accent-c");
      gl.uniform3fv(uColor, hexToLinear(accent));
    };
    readColor.current();
    const themeObserver = new MutationObserver(() => readColor.current());
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, SETTINGS.dpr);
      const width = Math.max(1, Math.round(window.innerWidth * dpr));
      const height = Math.max(1, Math.round(window.innerHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uPixelSize, SETTINGS.pixelSize * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A random start so two visits never show the same frame.
    let time = Math.random() * 1000;
    let last = performance.now();
    let lastFrame = 0;
    const interval = 1000 / SETTINGS.fps;
    let raf = 0;

    const draw = () => {
      gl.uniform1f(uTime, time);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // A click anywhere on the page starts a ring at that spot.
    const onPointerDown = (event: PointerEvent) => {
      if (still || !SETTINGS.ripples) return;
      clickPos[clickIx * 2] = event.clientX * dpr;
      clickPos[clickIx * 2 + 1] = (window.innerHeight - event.clientY) * dpr;
      clickTimes[clickIx] = time;
      clickIx = (clickIx + 1) % MAX_CLICKS;
      gl.uniform2fv(uClickPos, clickPos);
      gl.uniform1fv(uClickTimes, clickTimes);
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

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
      draw();
    };

    if (still) {
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
      window.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("webglcontextlost", onLost);
      themeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      readColor.current = () => {};
    };
  }, []);

  // A case study sets its own accent on <body>; pick it up after navigation.
  useEffect(() => {
    readColor.current();
  }, [pathname]);

  return <canvas ref={canvasRef} aria-hidden="true" className="page-backdrop" />;
}
