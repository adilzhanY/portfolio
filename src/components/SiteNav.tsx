"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localePath, splitLocale, type Locale } from "@/i18n/config";
import type { UiCopy } from "@/content/types";

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
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-faint bg-surface/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8"
        aria-label={ui.nav.aria}
      >
        <Link href={localePath(locale, "/")} className="font-bold tracking-tight">
          qantrr<span className="brand-cursor text-accent">_</span>
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? current === "/"
                  : current.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={localePath(locale, link.href)}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "font-medium text-ink underline decoration-accent decoration-2 underline-offset-[6px] transition-colors"
                      : "text-muted transition-colors hover:text-ink"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} label={ui.language.label} />
            <ThemeToggle label={ui.theme.toggle} />
          </div>
        </div>
      </nav>
    </header>
  );
}
