import "@/app/globals.css";
import Link from "next/link";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";

/**
 * With multiple root layouts this page sits outside both of them, so it has to
 * render its own document. A static host cannot pick a translated 404 by URL,
 * so this one is English in every language.
 */
export default function NotFound() {
  const { ui } = getContent(DEFAULT_LOCALE);

  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <main className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center">
          <p className="font-mono text-sm text-muted">404</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {ui.notFound.title}
          </h1>
          <p className="text-body">{ui.notFound.body}</p>
          <Link href="/" className="btn-primary mt-2">
            {ui.notFound.action}
          </Link>
        </main>
      </body>
    </html>
  );
}
