import { getCV, getContent } from "@/data/cv";
import type { Locale } from "@/i18n/config";

export default function ExperienceView({ locale }: { locale: Locale }) {
  const { experience } = getCV(locale);
  const { ui } = getContent(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8 pb-12 leading-relaxed sm:px-6 md:pt-10 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        {ui.experience.heading}
      </h1>
      <p className="mt-2 text-body">{ui.experience.intro}</p>

      <div className="relative mt-10">
        {/* the spine */}
        <div
          aria-hidden="true"
          className="absolute top-1 bottom-1 left-4 w-px bg-faint md:left-1/2 md:-translate-x-1/2"
        />

        {experience.map((entry, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={entry.id}
              className="relative pb-10 last:pb-0 md:grid md:grid-cols-2 md:gap-x-14"
            >
              {/* the dot */}
              <span
                aria-hidden="true"
                className="absolute top-6 left-4 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-[3px] border-surface bg-accent shadow-[0_0_0_1px_var(--color-faint)] md:left-1/2"
              />

              <div
                className={[
                  "ml-10 rounded-xl border border-faint bg-surface p-5 md:ml-0",
                  left ? "md:col-start-1" : "md:col-start-2",
                ].join(" ")}
              >
                <p className="font-mono text-[0.78125rem] text-muted">
                  {entry.date}
                </p>
                <h2 className="mt-1 font-semibold">{entry.company}</h2>
                <p className="text-sm text-muted">{entry.role}</p>
                <ul className="mt-3 space-y-1.5 text-[0.90625rem] text-body">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5">
                      <span className="mt-[1px] shrink-0 font-medium text-accent">
                        ·
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
