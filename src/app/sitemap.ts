import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/structure";
import { LOCALES, localePath } from "@/i18n/config";
import { SITE_URL, alternatesFor } from "@/i18n/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    "/experience",
    ...PROJECTS.map((project) => `/projects/${project.id}`),
  ];

  return LOCALES.flatMap((locale) =>
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
  );
}
