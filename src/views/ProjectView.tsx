import Link from "next/link";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import { getCV, getContent } from "@/data/cv";
import { localePath, type Locale } from "@/i18n/config";
import TechChip from "@/components/TechChip";
import StructuredData from "@/components/StructuredData";
import SequenceReplay from "@/components/SequenceReplay";
import { projectSchema } from "@/i18n/schema";

const subHeading =
  "mt-8 text-[0.8rem] font-semibold text-muted";

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
  // <body> rather than on this wrapper lets the nav underline, the selection
  // colour, and the footer pick it up too. The rules are scoped to screen so
  // the print stylesheet keeps its black accent.
  const tint = project.accent
    ? `@media screen{body:has([data-project="${project.id}"]){--accent-c:${project.accent.light}}html.dark body:has([data-project="${project.id}"]){--accent-c:${project.accent.dark}}}`
    : null;

  return (
    <div
      data-project={project.id}
      className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8"
    >
      {tint && <style>{tint}</style>}
      {project.accent && (
        <div aria-hidden="true" className="project-wash print:hidden" />
      )}
      <StructuredData data={projectSchema(locale, project)} />
      <div>
        <Link
          href={localePath(locale, "/projects")}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink hover:underline hover:underline-offset-3"
        >
          <FiArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          {ui.project.back}
        </Link>

        {/*
          The header is the product's own title card: name and year on one
          line, the one number worth remembering as the lede, and the two
          places to go as buttons. The live site, when there is one, is the
          primary action and wears the product's colour.
        */}
        <header className="mt-7 sm:mt-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <span className="font-mono text-sm text-muted sm:text-base">
              {project.year}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-lg font-medium leading-snug text-accent sm:text-xl md:text-2xl">
            {project.metric}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap print:hidden">
            {project.live && (
              <a href={project.live} className="btn-accent">
                {ui.project.live}
                <FiExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            )}
            <a href={project.link} className="btn-secondary">
              <FiGithub aria-hidden="true" className="h-4 w-4" />
              {ui.project.github}
            </a>
          </div>
        </header>
      </div>

      {project.image && (
        <img
          src={project.image}
          alt={project.imageAlt}
          width={project.imageW}
          height={project.imageH}
          loading="eager"
          decoding="async"
          className="mt-8 block w-full rounded-xl border border-faint sm:mt-10"
        />
      )}

      <div>
        <h2 className={subHeading}>{ui.project.problem}</h2>
        <p className="mt-2 text-[0.9375rem] text-body">{project.problem}</p>

        <h2 className={subHeading}>{ui.project.built}</h2>
        {project.solution.map((paragraph) => (
          <p key={paragraph} className="mt-2 text-[0.9375rem] text-body">
            {paragraph}
          </p>
        ))}

        <h2 className={subHeading}>{ui.project.highlights}</h2>
        <ul className="mt-2 space-y-1 text-[0.9375rem] text-body">
          {project.achievements.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className="mt-[1px] shrink-0 font-medium text-accent">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className={subHeading}>{ui.project.wentWrong}</h2>
        {project.postmortem.map((paragraph) => (
          <p key={paragraph} className="mt-2 text-[0.9375rem] text-body">
            {paragraph}
          </p>
        ))}

        <h2 className={subHeading}>{ui.project.stack}</h2>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <TechChip key={item} name={item} />
          ))}
        </div>
      </div>

      {project.gallery.length > 0 && (
        <>
          <h2 className={subHeading}>{ui.project.inDetail}</h2>

          {sequence.length > 0 && <SequenceReplay shots={sequence} />}

          <div
            className={[
              rest.length > 0 ? "mt-3 grid gap-5" : "hidden",
              project.galleryPhones
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "sm:grid-cols-2",
            ].join(" ")}
          >
            {rest.map((shot) => (
              <figure key={shot.src} className="min-w-0">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.w}
                  height={shot.h}
                  loading="lazy"
                  decoding="async"
                  className="block w-full rounded-lg border border-faint"
                />
                {shot.caption && (
                  <figcaption className="mt-1.5 text-[0.78125rem] text-muted">
                    {shot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
