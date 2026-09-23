"use client";

import { useEffect, useState } from "react";
import OhwPill, { type PillState } from "./OhwPill";
import { useStageActive } from "./StageFrame";

type Step = PillState;

/*
 * One pass of OpenHyprWhisper: the real pill records, transcribes and polishes,
 * then the sentence types itself into the field. At rest the field already
 * holds the finished sentence, so the stage reads before anything moves.
 */
export default function Dictation({
  labels,
}: {
  labels: { chatName: string; chatSeen: string; chatIn: string; chatOut: string; keys: string };
}) {
  const active = useStageActive();
  const [step, setStep] = useState<Step>("done");
  const [typed, setTyped] = useState(labels.chatOut.length);

  useEffect(() => {
    if (!active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep("done");
      setTyped(labels.chatOut.length);
      return;
    }
    let cancelled = false;
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    (async () => {
      setTyped(0);
      setStep("recording");
      await wait(3200);
      if (cancelled) return;
      setStep("transcribing");
      await wait(900);
      if (cancelled) return;
      setStep("polishing");
      await wait(800);
      if (cancelled) return;
      setStep("done");
      for (let i = 1; i <= labels.chatOut.length; i++) {
        if (cancelled) return;
        setTyped(i);
        await wait(22);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [active, labels.chatOut]);

  return (
    <div className="dict">
      <div className="chat" aria-hidden="true">
        <div className="chat-h">
          <i />
          <div>
            {labels.chatName}
            <span>{labels.chatSeen}</span>
          </div>
        </div>
        <div className="bubble">{labels.chatIn}</div>
        <div className="field">
          {labels.chatOut.slice(0, typed)}
          <span className="caret" />
        </div>
      </div>
      <OhwPill state={step} />
      <div className="keys" aria-hidden="true">
        <kbd>Super</kbd>+<kbd>D</kbd> {labels.keys}
      </div>
    </div>
  );
}
