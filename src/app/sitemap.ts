import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/structure";
import { getPosts } from "@/data/blog";
import { LOCALES, localePath } from "@/i18n/config";
import { SITE_URL, alternatesFor } from "@/i18n/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/experience",
    "/uses",
    "/now",
    ...PROJECTS.map((project) => `/projects/${project.id}`),
  ];

  const blog: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...getPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return blog.concat(LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}${localePath(locale, path || "/")}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/projects/") ? 0.6 : 0.8,
      alternates: {
        languages: alternatesFor(locale, path || "/").languages as Record<
          string,
          string
        >,
      },
    })),
  ));
}
