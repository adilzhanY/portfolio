"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const ActiveContext = createContext(false);

/** True while the stage around the caller is being looked at. */
export function useStageActive() {
  return useContext(ActiveContext);
}

/*
 * The box a stage lives in. With a mouse the stage wakes on hover or keyboard
 * focus; a touch screen has neither, so there it wakes while most of it is on
 * screen. Everything that moves reads the `is-active` class or, for the
 * pieces with a script of their own, the context.
 */
export default function StageFrame({
  as: Tag = "article",
  className,
  style,
  children,
}: {
  as?: "article" | "div";
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(hover: hover)").matches) {
      const on = () => setActive(true);
      const off = () => setActive(false);
      const blur = (event: FocusEvent) => {
        if (!el.contains(event.relatedTarget as Node | null)) off();
      };
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
      el.addEventListener("focusin", on);
      el.addEventListener("focusout", blur);
      return () => {
        el.removeEventListener("mouseenter", on);
        el.removeEventListener("mouseleave", off);
        el.removeEventListener("focusin", on);
        el.removeEventListener("focusout", blur);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.55 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={active ? `${className} is-active` : className}
      style={style}
    >
      <ActiveContext.Provider value={active}>{children}</ActiveContext.Provider>
    </Tag>
  );
}
