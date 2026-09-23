import { FiExternalLink } from "react-icons/fi";
import { getContent } from "@/data/cv";
import { USES } from "@/data/uses";
import type { Locale } from "@/i18n/config";

export default function UsesView({ locale }: { locale: Locale }) {
  const { uses } = getContent(locale);

  return (
    <>
      <header className="page-heading">
        <h1>
          {uses.heading}
          <span className="accent">.</span>
        </h1>
        <p className="lead">{uses.intro}</p>
      </header>

      {USES.map((group) => (
        <section key={group.id}>
          <h2 className="group-title">{uses.groups[group.id]}</h2>
          <dl className="uses-list card">
            {group.items.map((item) => {
              const note = uses.notes[item.id];
              return (
                <div key={item.id} className="uses-row">
                  <dt>
                    {item.url ? (
                      <a href={item.url}>
                        {item.name}
                        <FiExternalLink aria-hidden="true" />
                      </a>
                    ) : (
                      item.name
                    )}
                  </dt>
                  <dd>{note ?? ""}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </>
  );
}
