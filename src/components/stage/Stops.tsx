"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/*
 * A row of places. With a mouse the pointer's position across the picture
 * picks the place and a click opens the case study; on a touch screen a tap
 * moves on to the next one.
 */
export default function Stops({
  shots,
  href,
  labels,
}: {
  shots: { src: string; caption: string }[];
  href?: string;
  labels: { hint: string; stopOf: string; tapOn: string };
}) {
  const router = useRouter();
  const [at, setAt] = useState(0);
  const [touch, setTouch] = useState(false);
  const total = shots.length;

  useEffect(() => setTouch(!window.matchMedia("(hover: hover)").matches), []);

  const pick = (event: React.PointerEvent<HTMLDivElement>) => {
    if (touch) return;
    const box = event.currentTarget.getBoundingClientRect();
    const i = Math.floor(((event.clientX - box.left) / box.width) * total);
    setAt(Math.min(total - 1, Math.max(0, i)));
  };

  const click = () => {
    if (touch) setAt((i) => (i + 1) % total);
    else if (href) router.push(href);
  };

  const count = labels.stopOf.replace("{{n}}", String(at + 1)).replace("{{total}}", String(total));

  return (
    <div className="stops" onPointerMove={pick} onClick={click}>
      {shots.map((shot, i) => (
        <img
          key={shot.src}
          className={i === at ? "on" : undefined}
          src={shot.src}
          alt={i === at ? shot.caption : ""}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      <div className="stops-hud">
        <div className="stops-row">
          <span className="stops-place" aria-live="polite">
            {shots[at]?.caption}
          </span>
          <span className="stops-n">
            {count}
            <br />
            {touch ? labels.tapOn : labels.hint}
          </span>
        </div>
        <div className="stops-ticks" aria-hidden="true">
          {shots.map((shot, i) => (
            <i key={shot.src} className={i <= at ? "on" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}
