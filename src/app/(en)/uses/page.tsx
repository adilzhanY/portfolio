import type { Metadata } from "next";
import UsesView from "@/views/UsesView";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: meta.usesTitle,
  description: meta.usesDescription,
  alternates: alternatesFor(DEFAULT_LOCALE, "/uses"),
};

export default function Page() {
  return <UsesView locale={DEFAULT_LOCALE} />;
}
