import Link from "next/link";
import { CV_DATA } from "@/data/cv";

const sectionHeading =
  "mt-11 border-t border-faint pt-5 text-[0.8rem] font-semibold tracking-[0.09em] text-muted uppercase";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M12.63 0H1.37C.61 0 0 .6 0 1.34v13.32C0 15.4.61 16 1.37 16h11.26c.76 0 1.37-.6 1.37-1.34V1.34C14 .6 13.39 0 12.63 0zM4.24 13.63H2.13V6.9h2.11v6.73zM3.18 5.98a1.22 1.22 0 1 1 0-2.44 1.22 1.22 0 0 1 0 2.44zm10.45 7.65h-2.11v-3.27c0-.78-.01-1.79-1.09-1.79-1.09 0-1.26.85-1.26 1.73v3.33H7.06V6.9h2.02v.92h.03c.28-.53.97-1.09 2-1.09 2.14 0 2.52 1.4 2.52 3.23v3.67z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M0 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3zm1.5.5v.4L8 8.6l6.5-4.7v-.4h-13zm13 2.1L8 10.2 1.5 5.6v7.9h13V5.6z" />
    </svg>
  );
}

export default function HomePage() {
  const { name, tagline, intro, contact, skills, projects, experience } =
    CV_DATA;

  return (
    <div className="mx-auto max-w-[880px] px-5 pt-10 pb-14 leading-relaxed md:px-8 md:pt-14">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
        <p className="mt-0.5 text-muted">{tagline}</p>
      </header>

      <p className="mt-5 max-w-[70ch]">{intro}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={contact.github}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href={contact.linkedin}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
        >
          <MailIcon />
          {contact.email}
        </a>
      </div>

      <h2 className={sectionHeading}>Projects</h2>

      {projects.map((project, i) => (
        <div
          key={project.id}
          className={[
            "grid gap-6 py-5",
            project.image && !project.wide
              ? "sm:grid-cols-[minmax(0,1fr)_150px]"
              : "",
            i < projects.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h3 className="text-[1.05rem] font-semibold">
                <Link
                  href={`/projects#${project.id}`}
                  className="hover:underline hover:underline-offset-3"
                >
                  {project.title}
                </Link>
              </h3>
              <span className="font-mono text-xs text-muted">
                {project.year}
              </span>
              <Link
                href={`/projects#${project.id}`}
                className="text-[13px] text-muted hover:text-ink hover:underline hover:underline-offset-3"
              >
                Details
              </Link>
            </div>
            <p className="mt-1.5 max-w-[62ch] text-[15px] text-body">
              {project.summary}
            </p>
            <p className="mt-1.5 text-[13.5px] font-medium text-accent">
              {project.metric}
            </p>
            <p className="mt-2 font-mono text-xs text-muted">
              {project.stack.join(" · ")}
            </p>
            {project.image && project.wide && (
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                className="mt-3 block w-full max-w-[380px] rounded-md border border-faint"
              />
            )}
          </div>
          {project.image && !project.wide && (
            <div className="self-start">
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                className={
                  project.phone
                    ? "block w-full max-w-[160px] rounded-md border border-faint sm:ml-auto sm:max-w-[110px]"
                    : "block w-full max-w-[200px] rounded-md border border-faint sm:max-w-[150px]"
                }
              />
            </div>
          )}
        </div>
      ))}

      <h2 className={sectionHeading}>Experience</h2>

      {experience.map((entry, i) => (
        <div
          key={entry.company}
          className={[
            "grid gap-1 py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4",
            i < experience.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div className="pt-[3px] font-mono text-[12.5px] text-muted">
            {entry.date}
          </div>
          <div>
            <h3 className="font-semibold">
              {entry.company}{" "}
              <span className="text-sm font-normal text-muted">
                · {entry.role}
              </span>
            </h3>
            <p className="mt-1.5 max-w-[56ch] text-[14.5px] text-body">
              {entry.detail}
            </p>
          </div>
        </div>
      ))}

      <h2 className={sectionHeading}>Skills</h2>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-[5px] border border-faint bg-chip px-2 py-0.5 font-mono text-[12.5px] text-body"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
