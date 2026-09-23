import Link from "next/link";
import { getCV, getContent } from "@/data/cv";
import { PROFILE, RESUME_FILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import ArrowCircle from "@/components/ArrowCircle";

/*
 * The summary in a card that stays put, and one card per role beside it. The
 * degree is the last entry and is set dark, since it is education rather
 * than work.
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
        <p className="lead">{copy.pageIntro}</p>
        <div className="actions print:hidden">
          <a className="button" href={RESUME_FILE[locale]} target="_blank" rel="noopener">
            {copy.resumeVersion}
            <ArrowCircle />
          </a>
        </div>
      </header>

      <div className="exp-layout">
        <aside className="exp-aside card">
          <p className="eyebrow">{copy.glance}</p>
          <h2>{copy.glanceHeading}</h2>
          <p>{copy.glanceText}</p>
          <dl>
            <div>
              <dt>{copy.mainTools}</dt>
              <dd>{skills.slice(0, 8).join(", ")}</dd>
            </div>
            <div>
              <dt>{copy.languagesLabel}</dt>
              <dd>{languages.join(", ")}</dd>
            </div>
          </dl>
          <a className="text-link" href={`mailto:${PROFILE.contact.email}`}>
            {copy.talk} <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <div className="exp-list">
          {work.map((entry) => (
            <article key={entry.id} className="exp-entry card">
              <div className="exp-meta">
                <span>{entry.date}</span>
                <span className="chip">{entry.label}</span>
              </div>
              <h2>{entry.headline ?? entry.company}</h2>
              <p className="exp-role">{entry.role}</p>
              <p>{entry.detail}</p>
              <ul className="case-list">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {entry.id === "independent" && (
                <div className="chips">
                  {featuredProjects.map((project) => (
                    <Link key={project.id} className="chip" href={href(`/projects/${project.id}`)}>
                      {project.title} ↗
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}

          {degree && (
            <article className="exp-entry card education">
              <div className="exp-meta">
                <span>{degree.date}</span>
                <span>{degree.label}</span>
              </div>
              <h2>{degree.company}</h2>
              <p className="exp-role">{degree.role}</p>
              <p>{degree.detail}</p>
            </article>
          )}
        </div>
      </div>
    </>
  );
}
