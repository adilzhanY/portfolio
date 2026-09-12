import { FiExternalLink } from "react-icons/fi";
import { getContent } from "@/data/cv";
import { USES } from "@/data/uses";
import type { Locale } from "@/i18n/config";

const groupHeading =
  "mt-10 border-t border-faint pt-5 text-[0.8rem] font-semibold text-muted";

export default function UsesView({ locale }: { locale: Locale }) {
  const { uses } = getContent(locale);

  return (
    <div className="pt-10 pb-16 leading-relaxed">
      <h1 className="text-2xl font-semibold tracking-tight">{uses.heading}</h1>
      <p className="mt-2 max-w-[65ch] text-body">{uses.intro}</p>

      {USES.map((group) => (
        <section key={group.id}>
          <h2 className={groupHeading}>{uses.groups[group.id]}</h2>

          <dl className="mt-3">
            {group.items.map((item) => {
              const note = uses.notes[item.id];
              return (
                <div
                  key={item.id}
                  className="grid gap-x-6 gap-y-0.5 border-b border-faint py-3 last:border-b-0 sm:grid-cols-[220px_minmax(0,1fr)]"
                >
                  <dt className="font-medium text-ink">
                    {item.url ? (
                      <a
                        href={item.url}
                        className="inline-flex items-center gap-1 hover:text-accent hover:underline hover:underline-offset-3"
                      >
                        {item.name}
                        <FiExternalLink
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 text-muted"
                        />
                      </a>
                    ) : (
                      item.name
                    )}
                  </dt>
                  <dd className="text-[0.9375rem] text-body">{note ?? ""}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
