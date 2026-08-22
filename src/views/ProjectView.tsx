import Link from "next/link";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { getCV, getContent } from "@/data/cv";
import { localePath, type Locale } from "@/i18n/config";
import TechChip from "@/components/TechChip";

const subHeading =
  "mt-8 text-[0.8rem] font-semibold tracking-[0.09em] text-muted uppercase";

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

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <div>
        <Link
          href={localePath(locale, "/projects")}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink hover:underline hover:underline-offset-3"
        >
          <FiArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          {ui.project.back}
        </Link>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <span className="font-mono text-xs text-muted">{project.year}</span>
          <span className="flex flex-wrap gap-x-3 text-sm">
            <a
              href={project.link}
              className="inline-flex items-center gap-1 text-muted hover:text-ink hover:underline hover:underline-offset-3"
            >
              {ui.project.github}
              <FiExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            {project.live && (
              <a
                href={project.live}
                className="inline-flex items-center gap-1 font-medium text-accent hover:underline hover:underline-offset-3"
              >
                {ui.project.live}
                <FiExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            )}
          </span>
        </div>

        <p className="mt-1.5 text-[0.84375rem] font-medium text-accent">
          {project.metric}
        </p>
      </div>

      {project.image && (
        <img
          src={project.image}
          alt={project.imageAlt}
          width={project.imageW}
          height={project.imageH}
          loading="eager"
          decoding="async"
          className="mt-6 block w-full rounded-lg border border-faint"
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
          <div
            className={[
              "mt-3 grid gap-5",
              project.galleryPhones
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                : "sm:grid-cols-2",
            ].join(" ")}
          >
            {project.gallery.map((shot) => (
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
