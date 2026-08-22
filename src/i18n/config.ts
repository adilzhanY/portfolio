export const LOCALES = ["en", "ru", "de"] as const;

export type Locale = (typeof LOCALES)[number];

/** English lives at the root of the site, so it carries no path prefix. */
export const DEFAULT_LOCALE: Locale = "en";

/** The locales that do get a /xx prefix. */
export const PREFIXED_LOCALES = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE,
) as Exclude<Locale, typeof DEFAULT_LOCALE>[];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
};

/** Full names, used for the switcher's accessible labels. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  de: "Deutsch",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefix a root-relative path for the given locale. */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === DEFAULT_LOCALE ? clean || "/" : `/${locale}${clean}`;
}

/**
 * Split a pathname into its locale and the path without the prefix.
 * "/ru/projects" gives { locale: "ru", path: "/projects" }.
 */
export function splitLocale(pathname: string): {
  locale: Locale;
  path: string;
} {
  const trimmed = pathname.replace(/\/$/, "") || "/";
  const [, first, ...rest] = trimmed.split("/");
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: `/${rest.join("/")}`.replace(/\/$/, "") || "/" };
  }
  return { locale: DEFAULT_LOCALE, path: trimmed };
}
