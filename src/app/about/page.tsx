import type { Metadata } from "next";
import { CV_DATA } from "@/data/cv";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineering student in Potsdam, Germany. Experience, education, skills, and languages.",
};

const sectionHeading =
  "mt-11 border-t border-faint pt-5 text-[0.8rem] font-semibold tracking-[0.09em] text-muted uppercase";

export default function AboutPage() {
  const { skills, languages, experience } = CV_DATA;

  return (
    <div className="mx-auto max-w-[880px] px-5 pt-10 pb-14 leading-relaxed md:px-8 md:pt-14">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>

      <div className="mt-4 max-w-[70ch] space-y-3">
        <p>
          I&apos;m Adilzhan, a software engineering student in Potsdam,
          Germany. I like the whole arc of a product: finding a real problem,
          designing the thing, building it, shipping it, and then keeping it
          running with real users on it.
        </p>
        <p>
          That is how I learn. Whale Abyss taught me payments, webhooks, and
          operations because paying customers showed up on day one. Torq and
          Grit taught me offline-first architecture and sharing one domain core
          between web and mobile. OpenHyprWhisper and lacuna come from my own
          daily life on Linux and my own language learning.
        </p>
        <p>
          I work across the stack: TypeScript and React on the front, Node.js
          and Rust on the back, React Native and Expo on mobile, PostgreSQL and
          SQLite underneath. I&apos;m open to internships and freelance work.
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

      <h2 className={sectionHeading}>Languages</h2>

      <p className="mt-3 text-[15px] text-body">{languages.join(", ")}</p>
    </div>
  );
}
