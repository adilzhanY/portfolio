import type { Locale } from "@/i18n/config";

/**
 * The suggestion bar has to be written in the language it is offering, so these
 * few strings are the only copy that ships to the client for every locale at
 * once. The full dictionaries stay per page.
 */
export interface LanguageHint {
  message: string;
  action: string;
  dismiss: string;
}

export const LANGUAGE_HINTS: Record<Locale, LanguageHint> = {
  en: {
    message: "This page is also available in English.",
    action: "Read in English",
    dismiss: "Dismiss",
  },
  ru: {
    message: "Эта страница также доступна на русском.",
    action: "Читать по-русски",
    dismiss: "Закрыть",
  },
  de: {
    message: "Diese Seite gibt es auch auf Deutsch.",
    action: "Auf Deutsch lesen",
    dismiss: "Schließen",
  },
};

/** Remembers that the visitor closed the bar, or picked a language by hand. */
export const HINT_DISMISSED_KEY = "lang-hint-dismissed";
