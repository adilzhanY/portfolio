import Link from "next/link";
import type { Project } from "@/data/cv";
import { localePath, type Locale } from "@/i18n/config";

/*
 * One project on the shelf. The image sits on a board tinted in the product's
 * own colour, and every descriptive word stays outside it, where it keeps its
 * size on a phone. `featured` turns the card sideways for the first slot.
 *
 * The card takes a trimmed copy of a project rather than the whole thing, so
 * the filter on /projects can be a client component without shipping the case
 * studies to the browser with it.
 */

export interface ProjectCardData {
  id: string;
  href: string;
  title: string;
  year: string;
  category: string;
  group: "web" | "mobile" | "desktop";
  visual: "desktop" | "phones" | "scene" | "overlay";
  card: string[];
  summary: string;
  metric: string;
  stack: string[];
  imageAlt: string;
}

export function toCardData(project: Project, locale: Locale): ProjectCardData {
  return {
    id: project.id,
    href: localePath(locale, `/projects/${project.id}`),
    title: project.title,
    year: project.year,
    category: project.category,
    group: project.group,
    visual: project.visual,
    card: project.card,
    summary: project.summary,
    metric: project.metric,
    stack: project.stack,
    imageAlt: project.imageAlt ?? project.title,
  };
}

const SHOT_CLASS = {
  desktop: "desktop-shot",
  phones: "phone-shot",
  scene: "scene-shot",
  overlay: "wide-shot",
} as const;

export default function ProjectCard({
  project,
  featured = false,
  eager = false,
  readLabel,
}: {
  project: ProjectCardData;
  featured?: boolean;
  eager?: boolean;
  readLabel?: string;
}) {
  return (
    <Link
      href={project.href}
      className={featured ? "project-card featured" : "project-card"}
    >
      <div className={`project-visual ${project.id} ${project.visual}`}>
        {project.card.map((src, i) => (
          <img
            key={src}
            className={SHOT_CLASS[project.visual]}
            src={src}
            alt={i === 0 ? project.imageAlt : ""}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
      <div className="project-copy">
        <div className="project-category">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="project-name">
          {project.title}
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </h3>
        <p className="project-description">{project.summary}</p>
        <p className="project-metric">{project.metric}</p>
        <div className="stack-line">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {featured && readLabel && (
          <span className="project-read">
            {readLabel} <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
    </Link>
  );
}
