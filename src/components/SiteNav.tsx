"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CV_DATA } from "@/data/cv";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const current = pathname.replace(/\/$/, "") || "/";

  return (
    <header className="border-b border-faint bg-white">
      <nav
        className="mx-auto flex max-w-[880px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 md:px-8"
        aria-label="Main"
      >
        <Link href="/" className="font-semibold tracking-tight">
          {CV_DATA.name}
        </Link>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
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
      </nav>
    </header>
  );
}
