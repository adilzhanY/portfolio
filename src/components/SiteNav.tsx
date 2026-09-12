"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import type { UiCopy } from "@/content/types";
import { PROFILE } from "@/data/structure";
import { localePath, splitLocale, type Locale } from "@/i18n/config";

/**
 * The header: wordmark, the pages, and the tools on the right. It sits in the
 * normal flow rather than floating, so the rule under it lines up with the
 * content column on every page.
 */
export default function SiteNav({
  locale,
  ui,
}: {
  locale: Locale;
  ui: UiCopy;
}) {
  const pathname = usePathname();
  // Compare against the path without its locale prefix, so /ru/projects still
  // marks the Projects tab as current.
  const current = splitLocale(pathname).path;

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

  return (
    <header className="site-header wrap print:hidden">
      <Link href={localePath(locale, "/")} className="wordmark">
        <span className="pixel-mark" aria-hidden="true" />
        qantrr
        <span className="brand-cursor text-accent">_</span>
      </Link>

      <nav className="site-nav" aria-label={ui.nav.aria}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={"root" in link ? link.href : localePath(locale, link.href)}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-tools">
        <a className="contact-link" href={`mailto:${PROFILE.contact.email}`}>
          {ui.nav.getInTouch} <span aria-hidden="true">↗</span>
        </a>
        <LanguageSwitcher locale={locale} label={ui.language.label} />
        <ThemeToggle label={ui.theme.toggle} />
      </div>
    </header>
  );
}
