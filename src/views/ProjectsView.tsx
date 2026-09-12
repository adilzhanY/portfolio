import { getCV, getContent } from "@/data/cv";
import { PROFILE } from "@/data/structure";
import type { Locale } from "@/i18n/config";
import { toCardData } from "@/components/ProjectCard";
import ProjectShelf from "@/components/ProjectShelf";

/** The shelf: every project, with a filter across the top. */
export default function ProjectsView({ locale }: { locale: Locale }) {
  const { projects } = getCV(locale);
  const { ui } = getContent(locale);
  const copy = ui.projects;

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.pageHeading}
          <span className="accent">.</span>
        </h1>
        <p className="intro">{copy.pageIntro}</p>
      </header>

      <ProjectShelf
        projects={projects.map((project) => toCardData(project, locale))}
        labels={{
          group: copy.heading,
          all: copy.filterAll,
          web: copy.filterWeb,
          mobile: copy.filterMobile,
          desktop: copy.filterDesktop,
          count: copy.count,
          surprise: copy.surprise,
        }}
      />

      <p className="project-end">
        {copy.endNote}{" "}
        <a href={PROFILE.contact.github} target="_blank" rel="noopener">
          {ui.social.github} ↗
        </a>
      </p>
    </>
  );
}
