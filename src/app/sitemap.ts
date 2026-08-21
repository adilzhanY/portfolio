import type { MetadataRoute } from "next";
import { CV_DATA } from "@/data/cv";

export const dynamic = "force-static";

const BASE = "https://qantrr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/experience"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projects = CV_DATA.projects.map((project) => ({
    url: `${BASE}/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
