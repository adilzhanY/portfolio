"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const current = pathname.replace(/\/$/, "") || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-faint bg-surface/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main"
      >
        <Link href="/" className="font-bold tracking-tight">
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
                href={link.href}
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
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
