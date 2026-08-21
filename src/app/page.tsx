import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaTelegram } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { CV_DATA } from "@/data/cv";
import TechChip from "@/components/TechChip";
import ResumeButton from "@/components/ResumeButton";
import GitHubActivity from "@/components/GitHubActivity";
import CertificationList from "@/components/CertificationList";

const sectionHeading =
  "mt-11 border-t border-faint pt-5 text-[0.8rem] font-semibold tracking-[0.09em] text-muted uppercase";

export default function HomePage() {
  const {
    name,
    tagline,
    intro,
    contact,
    skills,
    languages,
    projects,
    experience,
  } = CV_DATA;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <header>
        <div className="flex items-center gap-5 sm:gap-6">
          <img
            src="/pfp.webp"
            alt={name}
            title="Yes, that's me"
            width={480}
            height={480}
            className="h-24 w-24 shrink-0 rounded-full border border-faint object-cover sm:h-28 sm:w-28"
          />
          <div>
        <h1 className="flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-tight">
          {name}
          <MdVerified
            aria-label="Verified"
            className="h-6 w-6 shrink-0"
            style={{ color: "#1D9BF0" }}
          />
        </h1>
        <div className="mt-2 flex items-center gap-3.5">
          <a
            href={contact.github}
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-ink"
          >
            <FaGithub aria-hidden="true" className="h-5 w-5" />
          </a>
          <a
            href={contact.linkedin}
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-ink"
          >
            <FaLinkedin aria-hidden="true" className="h-5 w-5" />
          </a>
          <a
            href={contact.telegram}
            aria-label="Telegram"
            className="text-muted transition-colors hover:text-ink"
          >
            <FaTelegram aria-hidden="true" className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
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
      </header>

      <p className="mt-5">{intro}</p>

      <div className="mt-6">
        <ResumeButton />
      </div>

      <h2 className={sectionHeading}>Projects</h2>

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
                  href={`/projects/${project.id}`}
                  className="hover:underline hover:underline-offset-3"
                >
                  {project.title}
                </Link>
              </h3>
              <span className="font-mono text-xs text-muted">
                {project.year}
              </span>
              <Link
                href={`/projects/${project.id}`}
                className="text-[0.8125rem] text-muted hover:text-ink hover:underline hover:underline-offset-3"
              >
                Details
              </Link>
            </div>
            <p className="mt-2 text-[0.9375rem] text-body">
              {project.summary}
            </p>
            <p className="mt-2 text-[0.84375rem] font-medium text-accent">
              {project.metric}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
            {project.image && project.wide && (
              <Link href={`/projects/${project.id}`} className="block">
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
              <Link href={`/projects/${project.id}`} className="block">
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

      <div className="mt-2 flex justify-center border-t border-faint pt-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 rounded-full border border-muted/50 px-5 py-2 text-sm font-semibold text-body transition-colors hover:border-ink hover:bg-chip"
        >
          See all projects
          <FiArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>

      <h2 className={sectionHeading}>About</h2>

      <div className="mt-4 space-y-3 text-body">
        <p>
          I like the whole arc of a product: finding a real problem, designing
          the thing, building it, shipping it, and then keeping it running with
          real users on it. That is how I learn. Whale Abyss taught me
          payments, webhooks, and operations because paying customers showed up
          on day one. Torq and Grit taught me offline-first architecture and
          sharing one domain core between web and mobile.
        </p>
        <p>
          I work across the stack: TypeScript and React on the front, Node.js
          and Rust on the back, React Native and Expo on mobile, PostgreSQL and
          SQLite underneath. I speak {languages.join(", ")}.
        </p>
      </div>

      <h2 className={sectionHeading}>Experience</h2>

      {experience.map((entry, i) => (
        <div
          key={entry.company}
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
            <p className="mt-1.5 text-[0.90625rem] text-body">
              {entry.detail}
            </p>
          </div>
        </div>
      ))}

      <h2 className={sectionHeading}>Skills</h2>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <TechChip key={skill} name={skill} />
        ))}
      </div>

      <h2 className={sectionHeading}>GitHub Activity</h2>

      <GitHubActivity />

      <h2 id="certifications" className={`${sectionHeading} scroll-mt-20`}>
        Certifications
      </h2>

      <CertificationList />
    </div>
  );
}
