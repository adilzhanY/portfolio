import Link from "next/link";
import { getCV, getContent } from "@/data/cv";
import { PROFILE, RESUME_FILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";

/*
 * One readable column of roles, with the summary beside it. The degree is the
 * last entry and gets its own card, since it is education rather than work.
 */
export default function ExperienceView({ locale }: { locale: Locale }) {
  const { experience, projects, skills, languages } = getCV(locale);
  const { ui } = getContent(locale);
  const copy = ui.experience;
  const href = (path: string) => localePath(locale, path);

  const work = experience.filter((entry) => entry.id !== "degree");
  const degree = experience.find((entry) => entry.id === "degree");

  // The independent entry is the one with products to point at.
  const featuredProjects = projects.filter((project) =>
    ["whale-abyss", "torq", "grit"].includes(project.id),
  );

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.pageHeading}
          <span className="accent">.</span>
        </h1>
        <p className="intro">{copy.pageIntro}</p>
        <a
          className="button print:hidden"
          href={RESUME_FILE[locale]}
          target="_blank"
          rel="noopener"
        >
          {copy.resumeVersion} <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="experience-layout">
        <aside className="experience-aside">
          <p className="eyebrow">{copy.glance}</p>
          <h2>{copy.glanceHeading}</h2>
          <p>{copy.glanceText}</p>
          <div className="aside-group">
            <span className="eyebrow">{copy.mainTools}</span>
            <p>{skills.slice(0, 8).join(", ")}</p>
          </div>
          <div className="aside-group">
            <span className="eyebrow">{copy.languagesLabel}</span>
            <p>{languages.join(", ")}</p>
          </div>
          <a className="text-link" href={`mailto:${PROFILE.contact.email}`}>
            {copy.talk} <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <div>
          {work.map((entry) => (
            <article key={entry.id} className="experience-entry">
              <div className="entry-meta">
                <span>{entry.date}</span>
                <span className="label">{entry.label}</span>
              </div>
              <h2>{entry.headline ?? entry.company}</h2>
              <p className="role">{entry.role}</p>
              <p>{entry.detail}</p>
              <ul className="work-list">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {entry.id === "independent" && (
                <div className="entry-projects">
                  {featuredProjects.map((project) => (
                    <Link key={project.id} href={href(`/projects/${project.id}`)}>
                      {project.title} ↗
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}

          {degree && (
            <article className="experience-entry education">
              <p className="eyebrow">
                {degree.label} / {degree.date}
              </p>
              <h2>{degree.company}</h2>
              <p className="role">{degree.role}</p>
              <p>{degree.detail}</p>
            </article>
          )}
        </div>
      </div>
    </>
  );
}
