import type { Metadata } from "next";
import ExperienceView from "@/views/ExperienceView";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: meta.experienceTitle,
  description: meta.experienceDescription,
  alternates: alternatesFor(DEFAULT_LOCALE, "/experience"),
};

export default function Page() {
  return <ExperienceView locale={DEFAULT_LOCALE} />;
}
