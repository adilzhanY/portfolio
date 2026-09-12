import Link from "next/link";
import { getCV, getContent } from "@/data/cv";
import { NOW, PROFILE, RESUME_FILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import ProjectCard, { toCardData } from "@/components/ProjectCard";
import ResumeButton from "@/components/ResumeButton";
import RotatingText from "@/components/RotatingText";
import GitHubActivity from "@/components/GitHubActivity";
import CertificationList from "@/components/CertificationList";
import SkillsLoop from "@/components/SkillsLoop";
import TechChip from "@/components/TechChip";
import StructuredData from "@/components/StructuredData";
import { personSchema } from "@/i18n/schema";

/* Paper wants a plain CV, so the section headings only exist when printing. */
const printHeading =
  "mt-11 border-t border-faint pt-5 text-[0.8rem] font-semibold text-muted";

export default function HomeView({ locale }: { locale: Locale }) {
  const { name, contact, skills, languages, projects, experience } = getCV(locale);
  const { about, ui } = getContent(locale);
  const href = (path: string) => localePath(locale, path);
  const home = ui.home;

  const selected = projects.slice(0, 3);
  const tinkering = NOW.projects
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <>
      <StructuredData data={personSchema(locale)} />

      <section className="hero">
        <div>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {home.eyebrow}
          </p>
          <h1>
            {home.greeting}
            <br />
            {home.making}
            <br />
            {/*
              The rotating phrase sits on its own line, so the two lines above
              it never reflow as the words change length.
            */}
            <span className="rotating-line">
              <RotatingText texts={home.rotating} />
            </span>
          </h1>
          <p className="intro">{home.heroIntro}</p>
          <div className="actions print:hidden">
            <Link className="button primary" href={href("/projects")}>
              {home.exploreProjects} <span aria-hidden="true">↗</span>
            </Link>
            <ResumeButton labels={ui.resume} file={RESUME_FILE[locale]} className="button" />
          </div>
          <p className="availability">
            <span className="status-dot green" aria-hidden="true" />
            {home.availability}
          </p>
          {/*
            On screen the contact details are links in the header and on the
            contact page. Neither survives paper, so print gets them as text.
          */}
          <p className="hidden text-sm print:mt-3 print:block">
            {contact.email}
            {" / "}
            {contact.github.replace("https://", "")}
            {" / "}
            {contact.linkedin.replace("https://", "")}
            {" / "}
            {contact.location}
          </p>
        </div>

        <aside className="profile-card print:hidden">
          <div className="photo-frame">
            <span className="hello-note">
              {home.helloNote} <span>{home.helloNoteSub}</span>
            </span>
            <img
              src={PROFILE.avatar}
              alt={name}
              title={home.avatarTitle}
              width={480}
              height={480}
              fetchPriority="high"
            />
            <span className="photo-corner" aria-hidden="true">
              :)
            </span>
          </div>
          <div className="profile-caption">
            <span>{name}</span>
            <span className="mono muted">{home.helloCaption}</span>
          </div>
          <div className="profile-note">
            <span className="eyebrow">{home.awayHeading}</span>
            <p>{home.awayText}</p>
            <div className="socials">
              <a href={contact.github} target="_blank" rel="noopener">
                {ui.social.github} ↗
              </a>
              <a href={contact.linkedin} target="_blank" rel="noopener">
                {ui.social.linkedin} ↗
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="section print:hidden">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{home.selectedEyebrow}</p>
            <h2>{home.selectedHeading}</h2>
          </div>
          <Link className="text-link" href={href("/projects")}>
            {home.openShelf} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="project-grid">
          {selected.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={toCardData(project, locale)}
              featured={i === 0}
              eager={i === 0}
              readLabel={ui.projects.readCaseStudy}
            />
          ))}
        </div>
      </section>

      <section className="about-section">
        <div>
          <p className="eyebrow">{home.aboutEyebrow}</p>
          <h2>{home.aboutHeading}</h2>
        </div>
        <div className="about-copy">
          {about.map((paragraph) => (
            <p key={paragraph}>
              {paragraph.replace("{{languages}}", languages.join(", "))}
            </p>
          ))}
          <Link className="text-link" href={href("/experience")}>
            {home.moreExperience} <span aria-hidden="true">↗</span>
          </Link>
          <div className="stack-line">
            {skills.slice(0, 4).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <aside className="tinkering-strip print:hidden">
        <span className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {home.tinkering}
        </span>
        {tinkering.map((project) => (
          <Link key={project.id} href={href(`/projects/${project.id}`)}>
            {project.title} <span className="muted">/ {project.category}</span> ↗
          </Link>
        ))}
      </aside>

      {/* Paper gets the experience and skills as plain lists. */}
      <div className="hidden print:block">
        <h2 className={printHeading}>{home.sectionExperience}</h2>
        {experience.map((entry) => (
          <div key={entry.id} className="py-3">
            <h3 className="font-semibold">
              {entry.company}{" "}
              <span className="text-sm font-normal text-muted">· {entry.role}</span>
            </h3>
            <p className="font-mono text-[0.78125rem] text-muted">{entry.date}</p>
            <p className="mt-1.5 text-[0.90625rem] text-body">{entry.detail}</p>
          </div>
        ))}
        <h2 className={printHeading}>{home.sectionSkills}</h2>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <TechChip key={skill} name={skill} />
          ))}
        </div>
      </div>

      <section className="section print:hidden">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{home.sectionSkills}</p>
          </div>
        </div>
        <SkillsLoop skills={skills} label={home.sectionSkills} />
      </section>

      <section className="section print:hidden">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{home.sectionActivity}</p>
          </div>
        </div>
        <GitHubActivity labels={ui.calendar} />
      </section>

      <section id="certifications" className="section scroll-mt-20 print:hidden">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{home.sectionCertifications}</p>
          </div>
        </div>
        <CertificationList label={ui.certifications.showCredential} />
      </section>
    </>
  );
}
