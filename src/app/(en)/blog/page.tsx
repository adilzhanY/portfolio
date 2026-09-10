import type { Metadata } from "next";
import BlogView from "@/views/BlogView";
import { getContent } from "@/data/cv";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { SITE_URL } from "@/i18n/metadata";

const { meta } = getContent(DEFAULT_LOCALE);

/* English only, so no language alternates: one canonical URL. */
export const metadata: Metadata = {
  title: meta.blogTitle,
  description: meta.blogDescription,
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/blog/feed.xml` },
  },
};

export default function Page() {
  return <BlogView />;
}
