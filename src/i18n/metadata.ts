import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, localePath, type Locale } from "./config";

export const SITE_URL = "https://qantrr.com";

/**
 * Canonical plus hreflang links for one page, so the three language versions
 * point at each other instead of competing in search results.
 */
export function alternatesFor(
  locale: Locale,
  path: string,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const other of LOCALES) {
    languages[other] = `${SITE_URL}${localePath(other, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`;

  return {
    canonical: `${SITE_URL}${localePath(locale, path)}`,
    languages,
  };
}
