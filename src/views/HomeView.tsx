import Link from "next/link";
import { getCV, getContent } from "@/data/cv";
import { NOW, PROFILE, RESUME_FILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import ResumeButton from "@/components/ResumeButton";
import RotatingText from "@/components/RotatingText";
import GitHubActivity from "@/components/GitHubActivity";
import CertificationList from "@/components/CertificationList";
import SkillsLoop from "@/components/SkillsLoop";
import TechChip from "@/components/TechChip";
import StructuredData from "@/components/StructuredData";
import ProjectStage from "@/components/stage/ProjectStage";
import { stageSpans } from "@/components/stage/layout";
import { personSchema } from "@/i18n/schema";

/* Paper wants a plain CV, so the section headings only exist when printing. */
const printHeading =
  "mt-11 border-t border-faint pt-5 text-[0.8rem] font-semibold text-muted";

export default function HomeView({ locale }: { locale: Locale }) {
  const { name, contact, skills, languages, projects, experience } = getCV(locale);
  const { about, ui } = getContent(locale);
  const href = (path: string) => localePath(locale, path);
  const home = ui.home;

  const spans = stageSpans(projects.map((project) => ({ wide: project.stageWide })));
  const tinkering = NOW.projects
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);

  return (
    <>
      <StructuredData data={personSchema(locale)} />

      <section className="hero">
        <div>
          <div className="who">
            <img
              src={PROFILE.avatar}
              alt={name}
              title={home.avatarTitle}
              width={96}
              height={96}
              fetchPriority="high"
              className="print:hidden"
            />
            <div>
              <b>{name}</b>
              {home.eyebrow}
            </div>
          </div>
          <h1>
            {home.greeting} <span className="soft">{home.making}</span>{" "}
            {/* The rotating phrase sits in its own box, so the words before
                it never reflow as it changes length. */}
            <span className="rotating-line">
              <RotatingText texts={home.rotating} />
            </span>
          </h1>
          <p className="lead">{home.heroIntro}</p>
          <div className="actions print:hidden">
            <Link className="button primary" href={href("/projects")}>
              {home.exploreProjects}
              <span className="circ" aria-hidden="true">↗</span>
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

        <dl className="facts print:hidden">
          <div>
            <dt>{home.factProducts}</dt>
            <dd>{projects.length}</dd>
          </div>
          <div>
            <dt>{home.factCustomers}</dt>
            <dd>150+</dd>
          </div>
          <div>
            <dt>{home.factLanguages}</dt>
            <dd>{languages.length}</dd>
          </div>
        </dl>
      </section>

      <section className="print:hidden" aria-labelledby="work">
        <div className="section-head">
          <h2 id="work">{home.selectedHeading}</h2>
          <p>{home.workHint}</p>
        </div>
        <div className="stages">
          {projects.map((project, i) => (
            <div key={project.id} data-span={spans[i]}>
              <ProjectStage
                project={project}
                labels={ui.stage}
                href={href(`/projects/${project.id}`)}
                eager={i === 0}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="about card">
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
            <Link className="text-link print:hidden" href={href("/experience")}>
              {home.moreExperience} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <aside className="tinker card print:hidden">
          <span className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {home.tinkering}
          </span>
          {tinkering.map((project) => (
            <Link key={project.id} href={href(`/projects/${project.id}`)}>
              {project.title} <span className="muted">{project.category}</span>
            </Link>
          ))}
        </aside>
      </section>

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
        <div className="section-head">
          <h2>{home.sectionSkills}</h2>
        </div>
        <div className="card panel">
          <SkillsLoop skills={skills} label={home.sectionSkills} />
        </div>
      </section>

      <section className="section print:hidden">
        <div className="section-head">
          <h2>{home.sectionActivity}</h2>
        </div>
        <GitHubActivity labels={ui.calendar} />
      </section>

      <section id="certifications" className="section scroll-mt-24 print:hidden">
        <div className="section-head">
          <h2>{home.sectionCertifications}</h2>
        </div>
        <CertificationList label={ui.certifications.showCredential} />
      </section>
    </>
  );
}
