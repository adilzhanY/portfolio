"use client";

import { FiMoon, FiSun } from "react-icons/fi";

/**
 * Light/dark switch. The current theme lives as a class on <html> (set
 * before paint by the inline script in the layout), so this component
 * needs no state and hydrates identically on server and client; the
 * sun/moon cross-fade is pure CSS driven by that class.
 *
 * The switch itself uses the View Transitions API for a circular reveal
 * growing out of the button; browsers without it get a 350ms color
 * cross-fade instead.
 */
export default function ThemeToggle({ label }: { label: string }) {
  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    const apply = () => {
      root.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* private mode */
      }
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      apply();
      return;
    }

    if (!document.startViewTransition) {
      // Fallback: temporary CSS transitions on everything
      root.classList.add("theme-anim");
      apply();
      window.setTimeout(() => root.classList.remove("theme-anim"), 400);
      return;
    }

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.2, 0, 0, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={label}
    >
      <FiSun aria-hidden="true" className="icon-sun" />
      <FiMoon aria-hidden="true" className="icon-moon" />
    </button>
  );
}
