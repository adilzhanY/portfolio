"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/*
 * OpenHyprWhisper's recording pill, rebuilt for the web from
 * quickshell/overlay.qml and BorderGlow.qml in the OpenHyprWhisper repo,
 * dressed in the monochrome dark end-4 palette it runs under on the desktop.
 *
 * The pieces match the QML one for one: a breathing dot with an expanding
 * ring while recording, a 16 bar waveform and a timer, a spinner while
 * transcribing or polishing, a check when done, the width easing between
 * states on the Material 3 expressive curve, and two lights half a perimeter
 * apart circling the border. The QML draws the lights with a shader; here
 * they are an SVG stroke dashed by arc length, which is what the shader
 * measures too, so a lit patch stays the same size on the straight edges and
 * round the end caps.
 */

export type PillState = "recording" | "transcribing" | "polishing" | "done";

const BAR_COUNT = 16;
const BAR_MAX = 28;
const LABEL: Record<PillState, string> = {
  recording: "Recording…",
  transcribing: "Transcribing…",
  polishing: "Polishing…",
  done: "Done",
};

// Ordinary speech sits low on a linear meter; a power below 1 stretches the
// quiet end the way a dB scale does, exactly as overlay.qml shapes it.
const shape = (v: number) => Math.pow(v, 0.55);

/** A fake microphone: syllables of noise inside words, gaps between them. */
function useLevels(running: boolean) {
  const [levels, setLevels] = useState<number[]>(() => Array(BAR_COUNT).fill(0));

  useEffect(() => {
    if (!running) {
      setLevels(Array(BAR_COUNT).fill(0));
      return;
    }
    let t = 0;
    let word = 0;
    const id = setInterval(() => {
      t += 1;
      if (t % 14 === 0) word = Math.random() < 0.8 ? 0.35 + Math.random() * 0.55 : 0;
      const syllable = 0.55 + 0.45 * Math.sin(t * 0.9 + Math.random());
      const v = Math.min(1, word * syllable * (0.7 + Math.random() * 0.3));
      setLevels((prev) => {
        const next = prev.slice(1);
        // One-pole smoothing, the same 0.3 / 0.7 split as the QML meter.
        next.push(prev[BAR_COUNT - 1] * 0.3 + v * 0.7);
        return next;
      });
    }, 33);
    return () => clearInterval(id);
  }, [running]);

  return levels;
}

function useElapsed(running: boolean) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!running) return;
    const start = Date.now();
    setElapsed(0);
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(id);
  }, [running]);
  return elapsed;
}

export default function OhwPill({ state }: { state: PillState }) {
  const recording = state === "recording";
  const levels = useLevels(recording);
  const elapsed = useElapsed(recording);
  const content = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 42 });

  // The pill is its content plus 20px a side, and eases to each new width.
  useLayoutEffect(() => {
    const el = content.current;
    if (!el) return;
    const measure = () => setSize({ w: Math.ceil(el.offsetWidth) + 40, h: 42 });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const overhang = 30;
  const minutes = Math.floor(elapsed / 60);
  const seconds = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="ohw" role="status" aria-label={LABEL[state]}>
      <div className="ohw-pill" style={{ width: size.w || undefined }}>
        {size.w > 0 && (
          <svg
            className="ohw-glow"
            aria-hidden="true"
            width={size.w + overhang * 2}
            height={size.h + overhang * 2}
            style={{ left: -overhang, top: -overhang }}
          >
            <defs>
              <filter id="ohw-halo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
              <filter id="ohw-soft" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>
            {[
              { cls: "ohw-arc halo", filter: "url(#ohw-halo)", width: 9 },
              { cls: "ohw-arc rim", filter: "url(#ohw-soft)", width: 2 },
            ].map((arc) => (
              <rect
                key={arc.cls}
                className={arc.cls}
                x={overhang}
                y={overhang}
                width={size.w}
                height={size.h}
                rx={size.h / 2}
                pathLength={1}
                strokeWidth={arc.width}
                filter={arc.filter}
              />
            ))}
          </svg>
        )}
        <div className="ohw-face" />
        <div className="ohw-row" ref={content}>
          <span className="ohw-mark" aria-hidden="true">
            {recording && (
              <>
                <i className="ohw-ring" />
                <i className="ohw-dot" />
              </>
            )}
            {(state === "transcribing" || state === "polishing") && (
              <svg className="ohw-spin" viewBox="0 0 14 14">
                <path d="M 12.5 7 A 5.5 5.5 0 1 1 5.3 1.77" />
              </svg>
            )}
            {state === "done" && (
              <svg className="ohw-check" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.6" />
                <path d="M5.2 8.3l1.9 1.8 3.7-4" />
              </svg>
            )}
          </span>
          <span className="ohw-label">{LABEL[state]}</span>
          {recording && (
            <>
              <span className="ohw-wave" aria-hidden="true">
                {levels.map((level, i) => {
                  const amp = shape(level);
                  return (
                    <i
                      key={i}
                      style={{
                        height: 3 + amp * (BAR_MAX - 3),
                        opacity: 0.35 + amp * 0.65,
                      }}
                    />
                  );
                })}
              </span>
              <span className="ohw-time">
                {minutes}:{seconds}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
