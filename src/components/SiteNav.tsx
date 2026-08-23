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
    <header className="sticky top-0 z-40 border-b border-faint bg-surface/90 backdrop-blur print:hidden">
      {/*
        Two deliberate shapes instead of one that wraps unpredictably.
        Narrow: brand and the controls share the first row, links sit on the
        second. Wide: everything is one row, links pushed to the right.
      */}
      <nav
        className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
        aria-label={ui.nav.aria}
      >
        <Link
          href={localePath(locale, "/")}
          className="order-1 font-bold tracking-tight"
        >
          qantrr<span className="brand-cursor text-accent">_</span>
        </Link>
        <div className="order-3 flex w-full min-w-0 items-center gap-x-5 text-sm sm:order-2 sm:ml-auto sm:w-auto">
          <div className="flex min-w-0 items-center gap-x-5">
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
        </div>
        <div className="order-2 ml-auto flex shrink-0 items-center gap-3 sm:order-3 sm:ml-0">
          <LanguageSwitcher locale={locale} label={ui.language.label} />
          <ThemeToggle label={ui.theme.toggle} />
        </div>
      </nav>
    </header>
  );
}
