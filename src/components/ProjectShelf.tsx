"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectCard, { type ProjectCardData } from "@/components/ProjectCard";

type Filter = "all" | "web" | "mobile" | "desktop";

export interface ShelfLabels {
  group: string;
  all: string;
  web: string;
  mobile: string;
  desktop: string;
  /** Supports the {{count}} placeholder. */
  count: string;
  surprise: string;
}

/**
 * The filter row and the grid under it. Everything is rendered at build time,
 * so the full shelf is there before the script runs and filtering only ever
 * hides what is already on the page.
 */
export default function ProjectShelf({
  projects,
  labels,
}: {
  projects: ProjectCardData[];
  labels: ShelfLabels;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(
    () => ({
      all: projects.length,
      web: projects.filter((p) => p.group === "web").length,
      mobile: projects.filter((p) => p.group === "mobile").length,
      desktop: projects.filter((p) => p.group === "desktop").length,
    }),
    [projects],
  );

  const visible = projects.filter((p) => filter === "all" || p.group === filter);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: labels.all },
    { id: "web", label: labels.web },
    { id: "mobile", label: labels.mobile },
    { id: "desktop", label: labels.desktop },
  ];

  const surprise = () => {
    const pick = projects[Math.floor(Math.random() * projects.length)];
    if (pick) router.push(pick.href);
  };

  return (
    <>
      <button type="button" className="button surprise-button" onClick={surprise}>
        <span aria-hidden="true">⚄</span> {labels.surprise}{" "}
        <span aria-hidden="true">↗</span>
      </button>

      <div className="project-toolbar">
        <div className="filters" role="group" aria-label={labels.group}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label} <span>{counts[item.id]}</span>
            </button>
          ))}
        </div>
        <span className="project-count" role="status">
          {labels.count.replace("{{count}}", String(visible.length))}
        </span>
      </div>

      <div className="project-grid">
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} eager={i < 2} />
        ))}
      </div>
    </>
  );
}
