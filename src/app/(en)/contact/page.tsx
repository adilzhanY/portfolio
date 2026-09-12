import type { Metadata } from "next";
import ContactView from "@/views/ContactView";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: meta.contactTitle,
  description: meta.contactDescription,
  alternates: alternatesFor(DEFAULT_LOCALE, "/contact"),
};

export default function Page() {
  return <ContactView locale={DEFAULT_LOCALE} />;
}
