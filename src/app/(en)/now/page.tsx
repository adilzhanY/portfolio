import type { Metadata } from "next";
import NowView from "@/views/NowView";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: meta.nowTitle,
  description: meta.nowDescription,
  alternates: alternatesFor(DEFAULT_LOCALE, "/now"),
};

export default function Page() {
  return <NowView locale={DEFAULT_LOCALE} />;
}
