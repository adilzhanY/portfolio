"use client";

import { useEffect, useState } from "react";

type Phase = "off" | "recording" | "transcribing" | "typing" | "done";

const RECORDING_MS = 1300;
const TRANSCRIBING_MS = 550;
const TYPING_MS = 900;
const DONE_MS = 900;

/**
 * The tagline, dictated the way OpenHyprWhisper dictates: a recording pill
 * with a live waveform, a transcribing spinner, then the words type into
 * place. It plays once per session and never for reduced motion.
 *
 * The text is always in the HTML. The inline script in RootShell decides
 * before paint whether this visit gets the animation (html.dictate), and the
 * CSS hides the text only while that class is present, so nothing flashes
 * and crawlers see the sentence either way.
 */
export default function DictatedTagline({
  text,
  labels,
}: {
  text: string;
  labels: { recording: string; transcribing: string; done: string };
}) {
  const [phase, setPhase] = useState<Phase>("off");

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("dictate")) return;

    const finish = () => {
      root.classList.remove("dictate");
      try {
        sessionStorage.setItem("dictated", "1");
      } catch {
        /* private mode */
      }
    };

    setPhase("recording");
    const timers = [
      window.setTimeout(() => setPhase("transcribing"), RECORDING_MS),
      window.setTimeout(
        () => setPhase("typing"),
        RECORDING_MS + TRANSCRIBING_MS,
      ),
      window.setTimeout(
        () => setPhase("done"),
        RECORDING_MS + TRANSCRIBING_MS + TYPING_MS,
      ),
      window.setTimeout(() => {
        setPhase("off");
        finish();
      }, RECORDING_MS + TRANSCRIBING_MS + TYPING_MS + DONE_MS),
    ];

    // Leaving mid-animation leaves html.dictate in place, so the next visit to
    // the home page in this session simply plays it again from the start.
    return () => timers.forEach(clearTimeout);
  }, []);

  const showPill = phase !== "off";
  const typing = phase === "typing" || phase === "done";

  return (
    <h2
      className="relative mt-8 text-3xl font-semibold tracking-tight md:text-4xl"
      data-phase={phase}
    >
      {showPill && (
        <span className="dictation-pill" aria-hidden="true">
          {phase === "recording" && (
            <>
              <span className="dictation-dot" />
              {labels.recording}
              <span className="dictation-bars">
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} />
                ))}
              </span>
            </>
          )}
          {phase === "transcribing" && (
            <>
              <span className="dictation-spin" />
              {labels.transcribing}
            </>
          )}
          {(phase === "typing" || phase === "done") && (
            <>
              <span className="dictation-check">&#10003;</span>
              {labels.done}
            </>
          )}
        </span>
      )}
      <span
        className={typing ? "dictation-text is-typing" : "dictation-text"}
        style={{ "--dictation-steps": text.length } as React.CSSProperties}
      >
        {text}
      </span>
    </h2>
  );
}
