import type { Metadata } from "next";
import { CV_DATA } from "@/data/cv";
import TechChip from "@/components/TechChip";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Detailed case studies of products designed, built, launched, and operated solo: Whale Abyss, Torq, OpenHyprWhisper, Grit, and lacuna.",
};

const subHeading =
  "mt-5 text-[0.8rem] font-semibold tracking-[0.09em] text-muted uppercase";

export default function ProjectsPage() {
  const { projects } = CV_DATA;

  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-14 leading-relaxed md:px-8 md:pt-14">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 max-w-[70ch] text-body">
        Each of these is a real product, not a tutorial build. I design, build,
        launch, and where it applies, operate them myself.
      </p>

      {projects.map((project) => (
        <section
          key={project.id}
          id={project.id}
          className="mt-12 scroll-mt-6 border-t border-faint pt-8"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              {project.title}
            </h2>
            <span className="font-mono text-xs text-muted">{project.year}</span>
            <span className="flex flex-wrap gap-x-3 text-sm">
              <a
                href={project.link}
                className="text-muted hover:text-ink hover:underline hover:underline-offset-3"
              >
                GitHub ↗
              </a>
              {project.live && (
                <a
                  href={project.live}
                  className="font-medium text-accent hover:underline hover:underline-offset-3"
                >
                  Live site ↗
                </a>
              )}
            </span>
          </div>

          <p className="mt-1.5 text-[13.5px] font-medium text-accent">
            {project.metric}
          </p>

          <div
            className={
              project.gallery.length > 0
                ? "mt-2 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]"
                : "mt-2 max-w-[75ch]"
            }
          >
            <div>
              <h3 className={subHeading}>The problem</h3>
              <p className="mt-2 text-[15px] text-body">{project.problem}</p>

              <h3 className={subHeading}>What I built</h3>
              {project.solution.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-[15px] text-body">
                  {paragraph}
                </p>
              ))}

              <h3 className={subHeading}>Highlights</h3>
              <ul className="mt-2 space-y-1 text-[15px] text-body">
                {project.achievements.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[1px] shrink-0 font-medium text-accent">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className={subHeading}>Stack</h3>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <TechChip key={item} name={item} />
                ))}
              </div>
            </div>

            {project.gallery.length > 0 && (
              <aside
                className={[
                  "self-start lg:sticky lg:top-8",
                  project.galleryPhones
                    ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2"
                    : "grid gap-5 sm:grid-cols-2 lg:grid-cols-1",
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
                      <figcaption className="mt-1.5 text-[12.5px] text-muted">
                        {shot.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </aside>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
