"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { DE, GB, RU } from "country-flag-icons/react/3x2";
import { HINT_DISMISSED_KEY } from "@/i18n/hints";
import {
  LOCALES,
  LOCALE_LABELS,
  LOCALE_NAMES,
  localePath,
  splitLocale,
  type Locale,
} from "@/i18n/config";

/** Real SVG flags. Emoji flags render as bare letters on Windows. */
const FLAGS: Record<Locale, typeof GB> = { en: GB, ru: RU, de: DE };

/**
 * Keeps you on the same page when you switch language: /ru/projects/torq
 * rather than dumping you back on the home page.
 *
 * These are plain anchors on purpose. Each locale sits under its own root
 * layout, so the navigation is a document load either way.
 */
export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const { path } = splitLocale(pathname);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on an outside click or on Escape, and hand focus back to the button.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Arrow keys walk the list once it is open.
  const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = Array.from(
      wrapRef.current?.querySelectorAll<HTMLAnchorElement>("[role='menuitem']") ??
        [],
    );
    if (items.length === 0) return;
    const at = items.indexOf(document.activeElement as HTMLAnchorElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = at === -1 ? 0 : (at + step + items.length) % items.length;
    items[next].focus();
  };

  const Current = FLAGS[locale];

  return (
    <div className="relative" ref={wrapRef} onKeyDown={onPanelKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-faint px-2.5 py-1 text-[0.6875rem] font-semibold text-body transition-colors hover:border-ink/30 hover:bg-chip"
      >
        <Current
          aria-hidden="true"
          className="h-3 w-[18px] shrink-0 rounded-[2px]"
        />
        {LOCALE_LABELS[locale]}
        <FiChevronDown
          aria-hidden="true"
          className={[
            "h-3 w-3 text-muted transition-transform duration-200 motion-reduce:transition-none",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {/*
        Always mounted so the panel can animate closed as well as open.
        `inert` keeps the hidden links out of the tab order.
      */}
      <div
        role="menu"
        aria-label={label}
        inert={!open}
        className={[
          "absolute right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-xl border border-faint bg-surface p-1 shadow-lg shadow-black/5",
          "transition duration-150 ease-out motion-reduce:transition-none",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-95 opacity-0",
        ].join(" ")}
      >
        {LOCALES.map((option) => {
          const Flag = FLAGS[option];
          const active = option === locale;
          return (
            <a
              key={option}
              role="menuitem"
              href={localePath(option, path)}
              hrefLang={option}
              aria-current={active ? "true" : undefined}
              onClick={() => {
                // Picking a language by hand settles the question, so the
                // browser-language suggestion bar stops offering.
                try {
                  localStorage.setItem(HINT_DISMISSED_KEY, "1");
                } catch {
                  // Storage blocked; the bar just reappears next visit.
                }
                setOpen(false);
              }}
              className={[
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-chip font-semibold text-ink"
                  : "text-body hover:bg-chip hover:text-ink",
              ].join(" ")}
            >
              <Flag
                aria-hidden="true"
                className="h-3.5 w-[21px] shrink-0 rounded-[2px]"
              />
              <span className="flex-1">{LOCALE_NAMES[option]}</span>
              {active && (
                <FiCheck aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
