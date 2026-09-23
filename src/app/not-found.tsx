import "@/app/globals.css";
import Sudoku404 from "@/components/Sudoku404";
import { getContent } from "@/data/cv";
import { PROJECTS } from "@/data/structure";
import { DEFAULT_LOCALE } from "@/i18n/config";

/**
 * With multiple root layouts this page sits outside both of them, so it has to
 * render its own document. A static host cannot pick a translated 404 by URL,
 * so this one is English in every language.
 */
export default function NotFound() {
  const { ui } = getContent(DEFAULT_LOCALE);
  // The puzzle comes from Sendoku, so the page wears Sendoku's colour.
  const accent = PROJECTS.find((p) => p.id === "sendoku")?.accent;
  const tint = accent
    ? `body{--accent-c:${accent.light}}html.dark body{--accent-c:${accent.dark}}`
    : null;

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
        {tint && <style>{tint}</style>}
        <main className="wrap flex flex-1 flex-col justify-center py-12">
          <div className="nf card">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            404
          </p>
          <h1>{ui.notFound.title}</h1>
          <p>
            {ui.notFound.body} {ui.notFound.puzzleIntro}
          </p>
          <div className="mt-4">
            <Sudoku404
              labels={{
                hint: ui.notFound.hint,
                doIt: ui.notFound.doIt,
                erase: ui.notFound.erase,
                hintSingle: ui.notFound.hintSingle,
                hintWrong: ui.notFound.hintWrong,
                hintNone: ui.notFound.hintNone,
                solved: ui.notFound.solved,
                solvedAction: ui.notFound.solvedAction,
                action: ui.notFound.action,
                boardLabel: ui.notFound.boardLabel,
                cellLabel: ui.notFound.cellLabel,
              }}
            />
          </div>
          </div>
        </main>
      </body>
    </html>
  );
}
