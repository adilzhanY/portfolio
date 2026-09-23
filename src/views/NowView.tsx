import { getCV, getContent } from "@/data/cv";
import { NOW } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import ProjectStage from "@/components/stage/ProjectStage";

/*
 * The Now page: what is on the bench this month. The products come from the
 * same data as the case studies, so nothing here can drift from them. The
 * date is written once in NOW.updated and formatted for the locale.
 */
export default function NowView({ locale }: { locale: Locale }) {
  const { projects, contact } = getCV(locale);
  const { now, footer, ui } = getContent(locale);
  const current = NOW.projects
    .map((id) => projects.find((project) => project.id === id))
    .filter((project) => project !== undefined);
  const date = new Date(NOW.updated).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">
          <span className="status-dot green" aria-hidden="true" />
          {now.updated.replace("{{date}}", date)}
        </p>
        <h1>
          {now.heading}
          <span className="accent">.</span>
        </h1>
        <p className="lead">{now.intro}</p>
      </header>

      <div className="section-head">
        <h2>{now.building}</h2>
      </div>
      <div className="stages">
        {current.map((project, i) => (
          <div key={project.id} data-span={current.length === 1 ? "full" : "half"}>
            <ProjectStage
              project={project}
              labels={ui.stage}
              href={localePath(locale, `/projects/${project.id}`)}
              eager={i === 0}
            />
          </div>
        ))}
      </div>

      <section className="section">
        <div className="card panel">
          <h2 className="group-title" style={{ marginTop: 0 }}>
            {footer.heading}
          </h2>
          <p className="lead">{footer.blurb}</p>
          <div className="actions">
            <a className="button primary" href={`mailto:${contact.email}`}>
              {contact.email}
              <span className="circ" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
