import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "@/views/ProjectView";
import { getCV } from "@/data/cv";
import { PROJECTS } from "@/data/structure";
import { PREFIXED_LOCALES, isLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

type Params = { params: Promise<{ locale: string; slug: string }> };

/** Static export needs the full locale-by-project combination up front. */
export function generateStaticParams() {
  return PREFIXED_LOCALES.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.id })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getCV(locale).projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: alternatesFor(locale, `/projects/${slug}`),
  };
}

export default async function Page({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !PROJECTS.some((p) => p.id === slug)) notFound();
  return <ProjectView locale={locale} slug={slug} />;
}
