import "@/app/globals.css";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Analytics from "@/components/Analytics";
import CRTBackdrop from "@/components/CRTBackdrop";
import PixelBlastBackdrop from "@/components/PixelBlastBackdrop";
import LanguageHint from "@/components/LanguageHint";
import { getContent } from "@/data/cv";
import type { Locale } from "@/i18n/config";

/*
 * The only web font on the site, and it dresses one word: the wordmark in the
 * nav. Bold only, latin only, self-hosted by next/font at build time, exposed
 * as a variable so nothing else picks it up by accident.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-wordmark",
});

/*
 * Open Runde, a rounded cut of Inter written as a replacement for SF Pro
 * Rounded and released under the SIL Open Font License, so it can actually
 * ship. Subset from the copies in the Grit app: the full face is 150 KB a
 * weight, these are 27 KB for Latin and 22 KB for Cyrillic.
 *
 * Three weights: 400, 500 and 600. Open Runde's Semibold is already heavy
 * enough for the two places that used to ask for Bold, and dropping it
 * saves a 27 KB preload on every page.
 *
 * Declared twice, split by unicode-range, so an English or German visitor
 * never downloads the Cyrillic cut. A Cyrillic character finds no glyph in
 * the Latin face and falls through to the second family by itself.
 */
const rundeLatin = localFont({
  src: [
    { path: "../app/fonts/OpenRunde-Regular-latin.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/OpenRunde-Medium-latin.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/OpenRunde-Semibold-latin.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-runde-latin",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2190-2199, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

const rundeCyrillic = localFont({
  src: [
    { path: "../app/fonts/OpenRunde-Regular-cyrillic.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/OpenRunde-Medium-cyrillic.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/OpenRunde-Semibold-cyrillic.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-runde-cyrillic",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0301, U+0400-052F, U+1C80-1C88, U+20B4, U+2116, U+2DE0-2DFF, U+A640-A69F",
    },
  ],
  // Only the Russian pages need it, and they reach it through the stack.
  preload: false,
  // The Latin face already supplies the metric-matched fallback.
  adjustFontFallback: false,
});

/**
 * The animated background behind every page. Two are ported from reactbits;
 * swap the value to compare them, or set "none" for the plain surface.
 */
const BACKDROP: "pixel" | "crt" | "none" = "pixel";

/**
 * The document shell. Each root layout renders this with its own locale, which
 * is the only way to get a correct <html lang> per language in a static export.
 */
export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const { ui } = getContent(locale);

  return (
    <html
      lang={locale}
      className={`${rundeLatin.variable} ${rundeCyrillic.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint so the saved theme never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
        {/* GoatCounter: no_onload so the SPA-aware Analytics component owns counting */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.goatcounter={no_onload:true}`,
          }}
        />
        <script
          async
          src="https://gc.zgo.at/count.js"
          data-goatcounter="https://kowix.goatcounter.com/count"
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {BACKDROP === "pixel" && <PixelBlastBackdrop />}
        {BACKDROP === "crt" && <CRTBackdrop />}
        <Analytics />
        <LanguageHint locale={locale} />
        <SiteNav locale={locale} ui={ui} />
        <main id="main" className="wrap flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
