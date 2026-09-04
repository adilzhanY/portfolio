import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getCV, getContent } from "@/data/cv";
import { NOW } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import TechChip from "@/components/TechChip";

const sectionHeading =
  "mt-10 border-t border-faint pt-5 text-[0.8rem] font-semibold text-muted";

/*
 * The Now page: what is on the bench this month. The products come from the
 * same data as the case studies, so nothing here can drift from them. The
 * date is written once in NOW.updated and formatted for the locale.
 */
export default function NowView({ locale }: { locale: Locale }) {
  const { projects, contact } = getCV(locale);
  const { now, footer } = getContent(locale);
  const href = (path: string) => localePath(locale, path);
  const current = NOW.projects
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);
  const date = new Date(NOW.updated).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">{now.heading}</h1>
      <p className="mt-2 max-w-[65ch] text-body">{now.intro}</p>
      <p className="mt-1 font-mono text-xs text-muted">
        {now.updated.replace("{{date}}", date)}
      </p>

      <h2 className={sectionHeading}>{now.building}</h2>
      {current.map((project, i) => (
        <div
          key={project.id}
          className={[
            "grid gap-6 py-7 md:grid-cols-[minmax(0,1fr)_400px] md:gap-10",
            i < current.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div>
            <h3 className="text-lg font-semibold">
              <Link
                href={href(`/projects/${project.id}`)}
                className="hover:underline hover:underline-offset-3"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-2 text-[0.9375rem] text-body">{project.summary}</p>
            <p className="mt-2 text-[0.84375rem] font-medium text-accent">
              {project.metric}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
          </div>
          {project.image && (
            <Link href={href(`/projects/${project.id}`)} className="block">
              <img
                src={project.image}
                alt={project.imageAlt}
                width={project.imageW}
                height={project.imageH}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block w-full rounded-lg border border-faint"
              />
            </Link>
          )}
        </div>
      ))}

      <h2 className={sectionHeading}>{footer.heading}</h2>
      <p className="mt-3 max-w-[65ch] text-body">{footer.blurb}</p>
      <a
        href={`mailto:${contact.email}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink hover:underline hover:underline-offset-3"
      >
        {contact.email}
        <FiArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
