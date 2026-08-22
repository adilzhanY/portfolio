import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getCV, getContent } from "@/data/cv";
import { localePath, type Locale } from "@/i18n/config";
import TechChip from "@/components/TechChip";

export default function ProjectsView({ locale }: { locale: Locale }) {
  const { projects } = getCV(locale);
  const { ui } = getContent(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {ui.projects.heading}
      </h1>
      <p className="mt-2 text-body">{ui.projects.intro}</p>

      {projects.map((project, i) => (
        <Link
          key={project.id}
          href={localePath(locale, `/projects/${project.id}`)}
          className={[
            "group grid items-center gap-6 py-7 md:grid-cols-[minmax(0,1fr)_420px] md:gap-10",
            i < projects.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h2 className="text-lg font-semibold group-hover:underline group-hover:underline-offset-3">
                {project.title}
              </h2>
              <span className="font-mono text-xs text-muted">
                {project.year}
              </span>
            </div>
            <p className="mt-2 text-[0.9375rem] text-body">{project.summary}</p>
            <p className="mt-2 text-[0.84375rem] font-medium text-accent">
              {project.metric}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[0.84375rem] font-medium text-muted group-hover:text-ink">
              {ui.projects.readCaseStudy}
              <FiArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </p>
          </div>
          {project.image && (
            <img
              src={project.image}
              alt={project.imageAlt}
              width={project.imageW}
              height={project.imageH}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="block w-full rounded-lg border border-faint transition-opacity group-hover:opacity-90"
            />
          )}
        </Link>
      ))}
    </div>
  );
}
