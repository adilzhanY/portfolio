"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

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

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 22 });
      if (pill) gsap.set(pill, { opacity: 0, y: -14 });
      root.classList.remove("reveal-pending");

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (pill) timeline.to(pill, { opacity: 1, y: 0, duration: 0.6, clearProps: "opacity,transform" }, 0);
      timeline.to(
        targets,
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.055, clearProps: "opacity,transform" },
        pill ? 0.08 : 0,
      );
    });
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
