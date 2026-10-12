import "@/app/globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Analytics from "@/components/Analytics";
import LanguageHint from "@/components/LanguageHint";
import PageReveal from "@/components/PageReveal";
import { fontVariables, THEME_SCRIPT } from "@/app/document";
import { getContent } from "@/data/cv";
import type { Locale } from "@/i18n/config";

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
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint so the saved theme never flashes. */}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_SCRIPT,
          }}
        />
        {/* Hides the content until PageReveal animates it in. Gives up after
            three seconds so a failed script never leaves a blank page. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;var d=document.documentElement;d.classList.add("reveal-pending");setTimeout(function(){d.classList.remove("reveal-pending")},3000)}catch(e){}})()`,
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
        <Analytics />
        <PageReveal />
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
