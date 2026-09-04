import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NowView from "@/views/NowView";
import { getContent } from "@/data/cv";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

type Params = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getContent(locale);
  return {
    title: meta.nowTitle,
    description: meta.nowDescription,
    alternates: alternatesFor(locale, "/now"),
  };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <NowView locale={locale} />;
}
