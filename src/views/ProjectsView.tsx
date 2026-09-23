import { getCV, getContent } from "@/data/cv";
import { PROFILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import ProjectShelf from "@/components/ProjectShelf";
import ProjectStage from "@/components/stage/ProjectStage";

/** Every project on its stage, with a filter across the top. */
export default function ProjectsView({ locale }: { locale: Locale }) {
  const { projects } = getCV(locale);
  const { ui } = getContent(locale);
  const copy = ui.projects;
  const href = (id: string) => localePath(locale, `/projects/${id}`);

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.pageHeading}
          <span className="accent">.</span>
        </h1>
        <p className="lead">{copy.pageIntro}</p>
      </header>

      <ProjectShelf
        items={projects.map((project) => ({
          href: href(project.id),
          group: project.group,
          wide: project.stageWide,
        }))}
        labels={{
          group: copy.heading,
          all: copy.filterAll,
          web: copy.filterWeb,
          mobile: copy.filterMobile,
          desktop: copy.filterDesktop,
          count: copy.count,
          surprise: copy.surprise,
        }}
      >
        {projects.map((project, i) => (
          <ProjectStage
            key={project.id}
            project={project}
            labels={ui.stage}
            href={href(project.id)}
            eager={i === 0}
          />
        ))}
      </ProjectShelf>

      <p className="project-end">
        {copy.endNote}{" "}
        <a href={PROFILE.contact.github} target="_blank" rel="noopener">
          {ui.social.github} ↗
        </a>
      </p>
    </>
  );
}
