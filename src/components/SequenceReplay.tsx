"use client";

import { useEffect, useRef, useState } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import type { GalleryImage } from "@/data/cv";

const STEP_MS = 1900;

/**
 * Plays a gallery whose shots are a sequence in time rather than a set of
 * separate views. Stills cannot show that something is fast; this can.
 */
export default function SequenceReplay({ shots }: { shots: GalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const hovering = useRef(false);

  useEffect(() => {
    // Someone who asked for less motion gets the first frame and the controls.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setPlaying(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      if (!hovering.current) setIndex((i) => (i + 1) % shots.length);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [playing, shots.length]);

  const active = shots[index];

  return (
    <div
      className="mt-3"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* All frames are stacked so the box never reflows between steps. */}
      <div className="relative overflow-hidden rounded-sharp border border-faint">
        {shots.map((shot, i) => (
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.w}
            height={shot.h}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            aria-hidden={i === index ? undefined : true}
            className={[
              "block w-full transition-opacity duration-500 motion-reduce:transition-none",
              i === index ? "opacity-100" : "absolute inset-0 opacity-0",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="shrink-0 cursor-pointer text-muted transition-colors hover:text-ink"
        >
          {playing ? (
            <FiPause aria-hidden="true" className="h-4 w-4" />
          ) : (
            <FiPlay aria-hidden="true" className="h-4 w-4" />
          )}
        </button>

        {/* Step buttons double as the progress indicator. */}
        <div className="flex items-center gap-1.5">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => {
                setPlaying(false);
                setIndex(i);
              }}
              aria-label={shot.caption ?? shot.alt}
              aria-current={i === index ? "true" : undefined}
              className={[
                "h-1.5 cursor-pointer rounded-sharp transition-all",
                i === index ? "w-6 bg-accent" : "w-2.5 bg-faint hover:bg-muted",
              ].join(" ")}
            />
          ))}
        </div>

        {active.caption && (
          <p className="text-[0.78125rem] text-muted" aria-live="polite">
            {active.caption}
          </p>
        )}
      </div>
    </div>
  );
}
