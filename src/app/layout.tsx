import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://qantrr.com"),
  title: {
    default: "Adilzhan Yerzhan - Software Engineer",
    template: "%s - Adilzhan Yerzhan",
  },
  description:
    "Adilzhan Yerzhan, software engineer in Potsdam. Products designed, built, and launched solo.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Adilzhan Yerzhan - Full-Stack Web and Mobile Developer",
    description:
      "Products designed, built, launched, and operated solo: e-commerce with real customers, offline-first apps, and open source.",
    url: "https://qantrr.com",
    siteName: "qantrr",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adilzhan Yerzhan - Full-Stack Web and Mobile Developer",
    description:
      "Products designed, built, launched, and operated solo: e-commerce with real customers, offline-first apps, and open source.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <Analytics />
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
