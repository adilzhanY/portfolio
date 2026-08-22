import type { Metadata } from "next";
import ProjectsView from "@/views/ProjectsView";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: meta.projectsTitle,
  description: meta.projectsDescription,
  alternates: alternatesFor(DEFAULT_LOCALE, "/projects"),
};

export default function Page() {
  return <ProjectsView locale={DEFAULT_LOCALE} />;
}
