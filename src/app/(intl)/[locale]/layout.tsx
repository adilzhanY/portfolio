import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RootShell from "@/components/RootShell";
import { getContent } from "@/data/cv";
import { PREFIXED_LOCALES, isLocale, type Locale } from "@/i18n/config";
import { SITE_URL, alternatesFor } from "@/i18n/metadata";

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getContent(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.siteTitle, template: meta.titleTemplate },
    description: meta.siteDescription,
    icons: { icon: "/favicon.svg" },
    alternates: alternatesFor(locale, "/"),
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: "qantrr",
      locale,
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
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode }> & Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <RootShell locale={locale as Locale}>{children}</RootShell>;
}
