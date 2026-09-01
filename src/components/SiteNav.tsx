"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiBriefcase, FiGrid, FiHome, FiX } from "react-icons/fi";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LiquidGlassFilter from "@/components/LiquidGlassFilter";
import { PROFILE } from "@/data/structure";
import { localePath, splitLocale, type Locale } from "@/i18n/config";
import type { UiCopy } from "@/content/types";

/*
 * The navigation floats over the page as a glass pill. On wide screens the
 * links sit in the pill. On phones a menu button beside the photo opens a
 * drawer from the left with the same links, one per row, large enough for a
 * thumb.
 *
 * Glass rules followed here: the material sits only on the floating layer,
 * never on content; glass is not stacked on glass, so the controls inside use
 * a flat tint; corners are concentric, so every inner pill is fully rounded
 * like its parent; the tint guarantees text contrast rather than hoping the
 * page behind is quiet; and reduced transparency or motion turn it into a
 * plain solid surface.
 */

const ICONS = {
  "/": FiHome,
  "/projects": FiGrid,
  "/experience": FiBriefcase,
} as const;

export default function SiteNav({
  locale,
  name,
  ui,
}: {
  locale: Locale;
  name: string;
  ui: UiCopy;
}) {
  const pathname = usePathname();
  // Compare against the path without its locale prefix, so /ru/projects still
  // marks the Projects tab as current.
  const current = splitLocale(pathname).path;
  const isHome = current === "/";

  const links = [
    { href: "/", label: ui.nav.home },
    { href: "/projects", label: ui.nav.projects },
    { href: "/experience", label: ui.nav.experience },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? current === "/" : current.startsWith(href);

  // The home page opens with a large photo. Once that scrolls out of view a
  // small copy takes its place beside the wordmark, and every other page
  // shows the small copy from the start, so the person stays on the page.
  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const hero = document.getElementById("hero-avatar");
    if (!hero) {
      setHeroVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);
  const showAvatar = !isHome || !heroVisible;

  // The pill tightens a little once the page has scrolled under it.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Refraction through an SVG filter is only honoured by some engines. Ask
  // before using it, so the others keep a clean blur instead of a blank pill.
  useEffect(() => {
    const ok =
      typeof CSS !== "undefined" &&
      (CSS.supports("backdrop-filter", "url(#liquid-glass)") ||
        CSS.supports("-webkit-backdrop-filter", "url(#liquid-glass)"));
    document.documentElement.classList.toggle("glass-refract", ok);
  }, []);

  // The active-link marker glides between links instead of jumping.
  const listRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<{ x: number; w: number } | null>(null);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const active = list.querySelector<HTMLElement>("[aria-current='page']");
      if (!active) {
        setMarker(null);
        return;
      }
      setMarker({ x: active.offsetLeft, w: active.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [current]);

  // ---- the phone drawer ----
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  const close = () => setOpen(false);

  // A route change closes it; so does growing past the phone breakpoint.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 640px)");
    const onChange = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  // While open: the page behind does not scroll, Escape closes, focus lands on
  // the first link and returns to the button afterwards.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    drawer.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      menuButton.current?.focus();
    };
  }, [open]);

  return (
    <>
      <LiquidGlassFilter />

      <header
        className="pointer-events-none fixed inset-x-0 top-[var(--nav-top)] z-40 px-3 sm:px-6 print:hidden"
        data-scrolled={scrolled || undefined}
      >
        <nav
          className="glass glass-nav pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 sm:gap-4"
          aria-label={ui.nav.aria}
        >
          <button
            ref={menuButton}
            type="button"
            className={open ? "glass-burger is-open sm:hidden" : "glass-burger sm:hidden"}
            aria-label={ui.nav.menu}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <Link
            href={localePath(locale, "/")}
            className="glass-brand flex items-center font-bold tracking-tight"
          >
            <img
              src={PROFILE.avatar}
              alt=""
              width={480}
              height={480}
              aria-hidden="true"
              className={showAvatar ? "nav-avatar is-shown" : "nav-avatar"}
            />
            qantrr<span className="brand-cursor text-accent">_</span>
          </Link>

          {/* Desktop links, with the gliding marker behind the current one. */}
          <div
            ref={listRef}
            className="glass-links relative ml-auto hidden items-center sm:flex"
          >
            {marker && (
              <span
                aria-hidden="true"
                className="glass-marker"
                style={{
                  transform: `translateX(${marker.x}px)`,
                  width: marker.w,
                }}
              />
            )}
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={localePath(locale, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={active ? "glass-link is-active" : "glass-link"}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0">
            <LanguageSwitcher locale={locale} label={ui.language.label} />
            <ThemeToggle label={ui.theme.toggle} />
          </div>
        </nav>
      </header>

      {/* Phone drawer. Always mounted so it can animate closed as well as open. */}
      <div
        aria-hidden="true"
        className={open ? "glass-scrim is-open sm:hidden" : "glass-scrim sm:hidden"}
        onClick={close}
      />
      <aside
        id="site-menu"
        ref={drawer}
        role="dialog"
        aria-modal="true"
        aria-label={ui.nav.menu}
        inert={!open}
        className={open ? "glass glass-drawer is-open sm:hidden" : "glass glass-drawer sm:hidden"}
      >
        <div className="glass-drawer__head">
          <img
            src={PROFILE.avatar}
            alt=""
            width={480}
            height={480}
            className="glass-drawer__avatar"
          />
          <span className="glass-drawer__name">{name}</span>
          <button
            type="button"
            className="glass-drawer__close"
            aria-label={ui.nav.close}
            onClick={close}
          >
            <FiX aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label={ui.nav.aria} className="glass-drawer__links">
          {links.map((link, i) => {
            const Icon = ICONS[link.href];
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={localePath(locale, link.href)}
                aria-current={active ? "page" : undefined}
                className={active ? "glass-drawer__link is-active" : "glass-drawer__link"}
                style={{ "--i": i } as React.CSSProperties}
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
