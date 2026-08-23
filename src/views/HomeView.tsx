import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaTelegram } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { getCV, getContent } from "@/data/cv";
import { PROFILE, RESUME_FILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import TechChip from "@/components/TechChip";
import ResumeButton from "@/components/ResumeButton";
import GitHubActivity from "@/components/GitHubActivity";
import CertificationList from "@/components/CertificationList";
import StructuredData from "@/components/StructuredData";
import { personSchema } from "@/i18n/schema";

const sectionHeading =
  "mt-11 border-t border-faint pt-5 text-[0.8rem] font-semibold tracking-[0.09em] text-muted uppercase";

export default function HomeView({ locale }: { locale: Locale }) {
  const { name, tagline, intro, contact, skills, languages, projects, experience } =
    getCV(locale);
  const { about, ui } = getContent(locale);
  const href = (path: string) => localePath(locale, path);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <StructuredData data={personSchema(locale)} />
      <header>
        {/*
          Below `sm` the avatar sits above the name, which gives the name the
          full column width. Side by side it left roughly 220px for the name,
          and a name that long pushed the verified badge onto its own line.
          Stacked, the avatar is the larger of the two sizes: on its own row it
          has to carry the space a name no longer sits in.
        */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <img
            src={PROFILE.avatar}
            alt={name}
            title={ui.home.avatarTitle}
            width={480}
            height={480}
            className="h-36 w-36 shrink-0 rounded-full border border-faint object-cover sm:h-28 sm:w-28"
          />
          <div className="min-w-0">
            {/*
              The badge is inline rather than a flex item, so it flows with the
              last word of the name instead of becoming its own row when the
              text wraps. It scales with the heading rather than a fixed size.
            */}
            <h1 className="text-2xl font-semibold tracking-tight">
              {name}
              <MdVerified
                aria-label={ui.home.verified}
                className="ml-1.5 inline h-[0.85em] w-[0.85em] align-[-0.12em]"
                style={{ color: "#1D9BF0" }}
              />
            </h1>
            <div className="mt-2 flex items-center gap-3.5">
              <a
                href={contact.github}
                aria-label={ui.social.github}
                className="text-muted transition-colors hover:text-ink"
              >
                <FaGithub aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href={contact.linkedin}
                aria-label={ui.social.linkedin}
                className="text-muted transition-colors hover:text-ink"
              >
                <FaLinkedin aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href={contact.telegram}
                aria-label={ui.social.telegram}
                className="text-muted transition-colors hover:text-ink"
              >
                <FaTelegram aria-hidden="true" className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label={ui.social.email}
                className="text-muted transition-colors hover:text-ink"
              >
                <FaEnvelope aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <h2 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">
          {tagline}
        </h2>

        {/*
          On screen the contact details are icon links in the header and cards
          in the footer. Neither survives paper, so print gets them as text.
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
      </header>

      <p className="mt-5">{intro}</p>

      <div className="mt-6 print:hidden">
        <ResumeButton labels={ui.resume} file={RESUME_FILE[locale]} />
      </div>

      <h2 className={sectionHeading}>{ui.home.sectionProjects}</h2>

      {projects.slice(0, 2).map((project, i) => (
        <div
          key={project.id}
          className={[
            "grid gap-6 py-7 md:gap-10",
            project.image && !project.wide
              ? project.phone
                ? "md:grid-cols-[minmax(0,1fr)_200px]"
                : "md:grid-cols-[minmax(0,1fr)_400px]"
              : "",
            i < 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div>
            <div className="flex flex-wrap items-baseline gap-2.5">
              <h3 className="text-lg font-semibold">
                <Link
                  href={href(`/projects/${project.id}`)}
                  className="hover:underline hover:underline-offset-3"
                >
                  {project.title}
                </Link>
              </h3>
              <span className="font-mono text-xs text-muted">
                {project.year}
              </span>
              <Link
                href={href(`/projects/${project.id}`)}
                className="text-[0.8125rem] text-muted hover:text-ink hover:underline hover:underline-offset-3"
              >
                {ui.home.details}
              </Link>
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
            {project.image && project.wide && (
              <Link href={href(`/projects/${project.id}`)} className="block">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageW}
                  height={project.imageH}
                  loading="lazy"
                  decoding="async"
                  className="mt-4 block w-full max-w-[480px] rounded-lg border border-faint transition-opacity hover:opacity-90"
                />
              </Link>
            )}
          </div>
          {project.image && !project.wide && (
            <div className="self-center">
              <Link href={href(`/projects/${project.id}`)} className="block">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width={project.imageW}
                  height={project.imageH}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={
                    project.phone
                      ? "block w-full max-w-[240px] rounded-lg border border-faint transition-opacity hover:opacity-90 md:ml-auto md:max-w-[200px]"
                      : "block w-full rounded-lg border border-faint transition-opacity hover:opacity-90"
                  }
                />
              </Link>
            </div>
          )}
        </div>
      ))}

      <div className="mt-2 flex justify-center border-t border-faint pt-6 print:hidden">
        <Link
          href={href("/projects")}
          className="inline-flex items-center gap-1.5 rounded-full border border-muted/50 px-5 py-2 text-sm font-semibold text-body transition-colors hover:border-ink hover:bg-chip"
        >
          {ui.home.seeAllProjects}
          <FiArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <h2 className={sectionHeading}>{ui.home.sectionAbout}</h2>

      <div className="mt-4 space-y-3 text-body">
        {about.map((paragraph) => (
          <p key={paragraph}>
            {paragraph.replace("{{languages}}", languages.join(", "))}
          </p>
        ))}
      </div>

      <h2 className={sectionHeading}>{ui.home.sectionExperience}</h2>

      {experience.map((entry, i) => (
        <div
          key={entry.id}
          className={[
            "grid gap-1 py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4",
            i < experience.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <div className="pt-[3px] font-mono text-[0.78125rem] text-muted">
            {entry.date}
          </div>
          <div>
            <h3 className="font-semibold">
              {entry.company}{" "}
              <span className="text-sm font-normal text-muted">
                · {entry.role}
              </span>
            </h3>
            <p className="mt-1.5 text-[0.90625rem] text-body">{entry.detail}</p>
          </div>
        </div>
      ))}

      <h2 className={sectionHeading}>{ui.home.sectionSkills}</h2>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <TechChip key={skill} name={skill} />
        ))}
      </div>

      <div className="print:hidden">
        <h2 className={sectionHeading}>{ui.home.sectionActivity}</h2>

        <GitHubActivity labels={ui.calendar} />
      </div>

      <h2 id="certifications" className={`${sectionHeading} scroll-mt-20`}>
        {ui.home.sectionCertifications}
      </h2>

      <CertificationList label={ui.certifications.showCredential} />
    </div>
  );
}
