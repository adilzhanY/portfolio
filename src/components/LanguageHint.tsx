"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import { isLocale, localePath, splitLocale, type Locale } from "@/i18n/config";
import { HINT_DISMISSED_KEY, LANGUAGE_HINTS } from "@/i18n/hints";

/**
 * The first language in the visitor's browser list that this site actually
 * speaks. "de-AT" counts as German. Returns null when we have none of them.
 */
function preferredLocale(): Locale | null {
  const wanted =
    typeof navigator === "undefined"
      ? []
      : navigator.languages?.length
        ? navigator.languages
        : [navigator.language];

  for (const tag of wanted) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return null;
}

/**
 * Offers a translation when the visitor's browser prefers a language this page
 * is not written in. It never redirects: a URL somebody opened on purpose wins,
 * and crawlers only ever see the page they asked for.
 */
export default function LanguageHint({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(HINT_DISMISSED_KEY)) return;
    } catch {
      // Private mode with storage blocked. Showing the bar once is fine.
    }

    const preferred = preferredLocale();
    if (preferred && preferred !== locale) setTarget(preferred);
  }, [locale]);

  if (!target) return null;

  const hint = LANGUAGE_HINTS[target];
  const { path } = splitLocale(pathname);

  const dismiss = () => {
    try {
      localStorage.setItem(HINT_DISMISSED_KEY, "1");
    } catch {
      // Nothing to remember it with; the bar simply returns next visit.
    }
    setTarget(null);
  };

  return (
    <div
      role="region"
      aria-label={hint.message}
      lang={target}
      className="border-b border-faint bg-chip print:hidden"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-sm sm:px-6 lg:px-8">
        <p className="text-body">{hint.message}</p>
        <a
          href={localePath(target, path)}
          onClick={dismiss}
          className="font-medium text-accent hover:underline hover:underline-offset-3"
        >
          {hint.action}
        </a>
        <button
          type="button"
          onClick={dismiss}
          aria-label={hint.dismiss}
          className="ml-auto shrink-0 text-muted transition-colors hover:text-ink"
        >
          <FiX aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
