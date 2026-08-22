import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { SITE_URL, alternatesFor } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: meta.siteTitle, template: meta.titleTemplate },
  description: meta.siteDescription,
  icons: { icon: "/favicon.svg" },
  alternates: alternatesFor(DEFAULT_LOCALE, "/"),
  openGraph: {
    title: meta.ogTitle,
    description: meta.ogDescription,
    url: SITE_URL,
    siteName: "qantrr",
    locale: DEFAULT_LOCALE,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: ["/og.png"],
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale={DEFAULT_LOCALE}>{children}</RootShell>;
}
