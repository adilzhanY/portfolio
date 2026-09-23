import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { getCV, getContent } from "@/data/cv";
import { localePath, type Locale } from "@/i18n/config";
import TechChip from "@/components/TechChip";
import StructuredData from "@/components/StructuredData";
import SequenceReplay from "@/components/SequenceReplay";
import ProjectStage from "@/components/stage/ProjectStage";
import { projectSchema } from "@/i18n/schema";

export default function ProjectView({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const project = getCV(locale).projects.find((p) => p.id === slug);
  if (!project) return null;
  const { ui } = getContent(locale);

  // Some galleries open with a run of shots that are steps of one process.
  // Those play as an animation; anything after them stays a normal grid.
  const sequence = project.gallery.slice(0, project.replayCount ?? 0);
  const rest = project.gallery.slice(project.replayCount ?? 0);

  // The case study borrows the product's own colour. Setting the accent on
  // <body> rather than on this wrapper lets the nav, the selection colour,
  // and the footer pick it up too. The rules are scoped to screen so the
  // print stylesheet keeps its black accent.
  const tint = project.accent
    ? `@media screen{body:has([data-project="${project.id}"]){--accent-c:${project.accent.light}}html.dark body:has([data-project="${project.id}"]){--accent-c:${project.accent.dark}}}`
    : null;

  return (
    <div data-project={project.id}>
      {tint && <style>{tint}</style>}
      {project.accent && <div aria-hidden="true" className="project-wash print:hidden" />}
      <StructuredData data={projectSchema(locale, project)} />

      <header className="case-top">
        <Link href={localePath(locale, "/projects")} className="back-link print:hidden">
          <FiArrowLeft aria-hidden="true" />
          {ui.project.back}
        </Link>

        <div className="case-title">
          <h1>{project.title}</h1>
          <span>
            {project.category} · {project.year}
          </span>
        </div>
        <p className="case-metric">{project.metric}</p>
        <ul className="chips">
          {project.chips.map((chip) => (
            <li key={chip} className="chip">
              {chip}
            </li>
          ))}
        </ul>
        <div className="actions print:hidden">
          {project.live && (
            <a href={project.live} className="button primary">
              {ui.project.live}
              <FiExternalLink aria-hidden="true" />
            </a>
          )}
          <a href={project.link} className="button">
            {ui.project.github}
            <FiGithub aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="print:hidden">
        <ProjectStage project={project} labels={ui.stage} variant="hero" eager />
      </div>

      <div className="case-body">
        <section className="case-block card">
          <h2>{ui.project.problem}</h2>
          <div className="prose">
            <p>{project.problem}</p>
          </div>
        </section>

        <section className="case-block card">
          <h2>{ui.project.built}</h2>
          <div className="prose">
            {project.solution.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="case-block card">
          <h2>{ui.project.highlights}</h2>
          <ul className="case-list">
            {project.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="case-block card">
          <h2>{ui.project.wentWrong}</h2>
          <div className="prose">
            {project.postmortem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="case-block card">
          <h2>{ui.project.stack}</h2>
          <div className="stack">
            {project.stack.map((item) => (
              <TechChip key={item} name={item} />
            ))}
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className="case-block card print:hidden">
            <h2>{ui.project.inDetail}</h2>
            <div>
              {sequence.length > 0 && <SequenceReplay shots={sequence} />}
              {rest.length > 0 && (
                <div
                  className={project.galleryPhones ? "gallery phones" : "gallery"}
                  style={sequence.length > 0 ? { marginTop: "1.1rem" } : undefined}
                >
                  {rest.map((shot) => (
                    <figure key={shot.src}>
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.w}
                        height={shot.h}
                        loading="lazy"
                        decoding="async"
                      />
                      {shot.caption && <figcaption>{shot.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
