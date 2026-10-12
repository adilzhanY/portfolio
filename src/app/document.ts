import localFont from "next/font/local";

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
    { path: "./fonts/OpenRunde-Regular-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenRunde-Medium-latin.woff2", weight: "500", style: "normal" },
    { path: "./fonts/OpenRunde-Semibold-latin.woff2", weight: "600", style: "normal" },
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
    { path: "./fonts/OpenRunde-Regular-cyrillic.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenRunde-Medium-cyrillic.woff2", weight: "500", style: "normal" },
    { path: "./fonts/OpenRunde-Semibold-cyrillic.woff2", weight: "600", style: "normal" },
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

/** Both faces, for the className of every <html> this site renders. */
export const fontVariables = `${rundeLatin.variable} ${rundeCyrillic.variable}`;

/** Runs before paint so the saved theme never flashes. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;
