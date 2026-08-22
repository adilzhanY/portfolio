import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectView from "@/views/ProjectView";
import { getCV } from "@/data/cv";
import { PROJECTS } from "@/data/structure";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getCV(DEFAULT_LOCALE).projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: alternatesFor(DEFAULT_LOCALE, `/projects/${slug}`),
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  if (!PROJECTS.some((p) => p.id === slug)) notFound();
  return <ProjectView locale={DEFAULT_LOCALE} slug={slug} />;
}
