import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactView from "@/views/ContactView";
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
    title: meta.contactTitle,
    description: meta.contactDescription,
    alternates: alternatesFor(locale, "/contact"),
  };
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactView locale={locale} />;
}
