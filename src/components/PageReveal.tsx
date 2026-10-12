"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * The page settles into place when it opens: the blocks on the first screen
 * rise a little and fade in, one after another, on a short stagger. Only what
 * is on screen moves; everything further down is simply there when you
 * scroll to it. The first load also drops the nav pill in.
 *
 * An inline script in the document head hides the content until this runs,
 * so nothing flashes in its final place first. It clears itself after a few
 * seconds if the script never arrives, and it never runs for visitors who
 * ask for reduced motion.
 */

/** The blocks worth moving on their own, in reading order. */
function pieces(main: HTMLElement) {
  const out: Element[] = [];
  const add = (el: Element) => {
    if (el.matches("script, style, .project-wash")) return;
    if (el.matches(".hero")) {
      el.querySelectorAll(":scope > div > *, :scope > .facts > div").forEach((child) => out.push(child));
      return;
    }
    if (el.matches(".page-heading, .case-top, .stages")) {
      out.push(...Array.from(el.children));
      return;
    }
    if (el.matches("[data-project], .case-body") || el.querySelector(":scope > .stages")) {
      Array.from(el.children).forEach(add);
      return;
    }
    out.push(el);
  };
  Array.from(main.children).forEach(add);

  const fold = window.innerHeight;
  return out.filter((el) => {
    const box = el.getBoundingClientRect();
    return box.height > 0 && box.top < fold;
  });
}

export default function PageReveal() {
  const pathname = usePathname();
  const first = useRef(true);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const main = document.getElementById("main");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!main || reduce) {
      root.classList.remove("reveal-pending");
      return;
    }

    const targets = pieces(main);
    const pill = first.current ? document.querySelector(".site-header .nav-pill") : null;
    first.current = false;

    // power3.out, the ease the reveal has always used
    const easing = "cubic-bezier(0.215, 0.61, 0.355, 1)";
    // fill "backwards" holds the start frame through each delay and leaves no inline style once done
    const animations = targets.map((el, i) =>
      el.animate(
        [{ opacity: 0, translate: "0 22px" }, { opacity: 1, translate: "0 0" }],
        { duration: 700, delay: (pill ? 80 : 0) + i * 55, easing, fill: "backwards" },
      ),
    );
    if (pill) {
      animations.push(
        pill.animate(
          [{ opacity: 0, translate: "0 -14px" }, { opacity: 1, translate: "0 0" }],
          { duration: 600, easing, fill: "backwards" },
        ),
      );
    }
    root.classList.remove("reveal-pending");
    return () => animations.forEach((a) => a.cancel());
  }, [pathname]);

  return null;
}
