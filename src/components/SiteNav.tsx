"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import type { UiCopy } from "@/content/types";
import { localePath, splitLocale, type Locale } from "@/i18n/config";

/**
 * The header: one pill that floats over the page, with the wordmark, the
 * pages, and the tools. Below tablet width the pages fold into a drawer that
 * opens under the pill.
 */
export default function SiteNav({
  locale,
  ui,
}: {
  locale: Locale;
  ui: UiCopy;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Compare against the path without its locale prefix, so /ru/projects still
  // marks the Projects tab as current.
  const current = splitLocale(pathname).path;

  // A new page closes the drawer.
  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: "/", label: ui.nav.home },
    { href: "/projects", label: ui.nav.projects },
    { href: "/experience", label: ui.nav.experience },
    // The blog is written in English only, so it lives at the root for every locale.
    { href: "/blog", label: ui.nav.blog, root: true },
    { href: "/contact", label: ui.nav.contact },
  ] as const;

  const isActive = (href: string) =>
    href === "/" ? current === "/" : current.startsWith(href);
  const target = (link: (typeof links)[number]) =>
    "root" in link ? link.href : localePath(locale, link.href);

  return (
    <header className="site-header print:hidden">
      <div className="nav-pill">
        <Link href={localePath(locale, "/")} className="wordmark">
          qantrr<i>.</i>
        </Link>

        <nav className="nav-links" aria-label={ui.nav.aria}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={target(link)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-tools">
          <LanguageSwitcher locale={locale} label={ui.language.label} />
          <ThemeToggle label={ui.theme.toggle} />
          <Link className="nav-cta" href={localePath(locale, "/contact")}>
            {ui.nav.getInTouch}
          </Link>
          <button
            type="button"
            className="nav-menu"
            aria-expanded={open}
            aria-controls="nav-drawer"
            aria-label={open ? ui.nav.close : ui.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>

        {open && (
          <nav id="nav-drawer" className="nav-drawer" aria-label={ui.nav.aria}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={target(link)}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link className="nav-cta" href={localePath(locale, "/contact")}>
              {ui.nav.getInTouch}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
