import "@/app/globals.css";
import { JetBrains_Mono } from "next/font/google";
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
  const { name, ui } = getContent(locale);

  return (
    <html lang={locale} className={jetbrainsMono.variable} suppressHydrationWarning>
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
      <body className="has-floating-nav flex min-h-dvh flex-col font-sans antialiased">
        {BACKDROP === "pixel" && <PixelBlastBackdrop />}
        {BACKDROP === "crt" && <CRTBackdrop />}
        <Analytics />
        <LanguageHint locale={locale} />
        <SiteNav locale={locale} name={name} ui={ui} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
