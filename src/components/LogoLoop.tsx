"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/*
 * LogoLoop, the infinite marquee from reactbits.dev, ported to TypeScript and
 * trimmed to the horizontal case this site uses. One sequence of items is
 * measured, copied enough times to cover the viewport plus headroom, and a
 * requestAnimationFrame loop moves the track by a velocity that eases toward
 * its target, so hovering slows or stops it smoothly instead of snapping.
 * Reduced motion freezes the track in CSS.
 */

const SMOOTH_TAU = 0.25;
const MIN_COPIES = 2;
const COPY_HEADROOM = 2;

export interface LogoItem {
  node: React.ReactNode;
  title: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  /** Pixels per second. Negative reverses the direction. */
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  /** Stop on hover. Ignored when hoverSpeed is given. */
  pauseOnHover?: boolean;
  /** Speed while hovered, for a slow-down instead of a stop. */
  hoverSpeed?: number;
  /** Fade both edges into the page background. */
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel: string;
  className?: string;
}

function useAnimationLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
) {
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    let raf = 0;
    let last: number | null = null;

    const animate = (timestamp: number) => {
      if (last === null) last = timestamp;
      const dt = Math.max(0, timestamp - last) / 1000;
      last = timestamp;

      const target =
        isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easing = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;

      if (seqWidth > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [trackRef, targetVelocity, seqWidth, isHovered, hoverSpeed]);
}

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  logoHeight = 28,
  gap = 32,
  pauseOnHover = true,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel,
  className,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed =
    hoverSpeed !== undefined ? hoverSpeed : pauseOnHover ? 0 : undefined;

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === "left" ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect().width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const needed = Math.ceil(containerWidth / sequenceWidth) + COPY_HEADROOM;
      setCopyCount(Math.max(MIN_COPIES, needed));
    }
  }, []);

  // Re-measure when the container or the first sequence changes size, which
  // covers window resizes, font loading, and a different set of logos.
  useEffect(() => {
    const targets: Element[] = [];
    if (containerRef.current) targets.push(containerRef.current);
    if (seqRef.current) targets.push(seqRef.current);
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();
      return () => window.removeEventListener("resize", updateDimensions);
    }
    const observer = new ResizeObserver(updateDimensions);
    targets.forEach((el) => observer.observe(el));
    updateDimensions();
    return () => observer.disconnect();
  }, [updateDimensions, logos, gap, logoHeight]);

  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    isHovered,
    effectiveHoverSpeed,
  );

  const style = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
  } as React.CSSProperties;

  const rootClassName = [
    "logoloop",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hoverable = effectiveHoverSpeed !== undefined;

  const renderItem = (item: LogoItem, key: string) => {
    const content = <span className="logoloop__node">{item.node}</span>;
    return (
      <li className="logoloop__item" key={key} title={item.title}>
        {item.href ? (
          <a
            className="logoloop__link"
            href={item.href}
            aria-label={item.title}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    );
  };

  return (
    <div
      ref={containerRef}
      className={rootClassName}
      style={style}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={hoverable ? () => setIsHovered(true) : undefined}
        onMouseLeave={hoverable ? () => setIsHovered(false) : undefined}
      >
        {/* Only the first copy is read out; the rest exist for the loop. */}
        {Array.from({ length: copyCount }, (_, copy) => (
          <ul
            className="logoloop__list"
            key={copy}
            aria-hidden={copy > 0 || undefined}
            ref={copy === 0 ? seqRef : undefined}
          >
            {logos.map((item, i) => renderItem(item, `${copy}-${i}`))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default LogoLoop;
