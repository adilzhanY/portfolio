import Link from "next/link";
import type { UiCopy } from "@/content/types";
import type { Project } from "@/data/cv";
import type { EnergyStep } from "@/data/structure";
import StageFrame from "./StageFrame";
import Dictation from "./Dictation";
import Stops from "./Stops";

const GRADES: EnergyStep["grade"][] = ["A+", "A", "B", "C", "D", "E", "F", "G", "H"];
const GRADE_COLOUR: Record<EnergyStep["grade"], string> = {
  "A+": "#1f9d45",
  A: "#4cb050",
  B: "#8cc63f",
  C: "#b8c92c",
  D: "#e0b814",
  E: "#f3a33a",
  F: "#f07a2c",
  G: "#e0352b",
  H: "#b3122a",
};
const gradeAt = (grade: EnergyStep["grade"]) =>
  `${((GRADES.indexOf(grade) + 0.5) / GRADES.length) * 100}%`;

type Labels = UiCopy["stage"];

function Visual({
  project,
  labels,
  href,
  eager,
}: {
  project: Project;
  labels: Labels;
  href?: string;
  eager: boolean;
}) {
  const stage = project.stage;
  const loading = eager ? "eager" : "lazy";

  switch (stage.kind) {
    case "fan":
      return (
        <>
          <div className="fan">
            <div className="ghost l">
              <img src={stage.left} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="ghost r">
              <img src={stage.right} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="phone">
              <img src={stage.main} alt={project.imageAlt} loading={loading} decoding="async" />
            </div>
          </div>
          <span className="stage-hint">{labels.hintFan}</span>
        </>
      );

    case "journey":
      return (
        <>
          <div className="journey">
            <div className="win">
              <div className="win-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{project.live ? new URL(project.live).host : project.title}</span>
              </div>
              <img src={stage.desktop} alt={project.imageAlt} loading={loading} decoding="async" />
            </div>
            <div className="phone">
              <img src={stage.mobile} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="hook" aria-hidden="true">
              {labels.webhook}
            </div>
            <div className="tg" aria-hidden="true">
              <span className="tg-av">WA</span>
              <b>{labels.botName}</b>
              <span>{labels.botOrder}</span>
              <span className="tg-t">{labels.botPosted}</span>
              <span className="tg-kb">
                <span>{labels.botTake}</span>
                <span>{labels.botDetails}</span>
              </span>
            </div>
          </div>
          <span className="stage-hint">{labels.hintJourney}</span>
        </>
      );

    case "explode": {
      const { from, to, unit } = stage.scale;
      const bar = {
        "--from": gradeAt(from.grade),
        "--to": gradeAt(to.grade),
        "--from-c": GRADE_COLOUR[from.grade],
        "--to-c": GRADE_COLOUR[to.grade],
      } as React.CSSProperties;
      return (
        <>
          <div className="explode">
            <div className="explode-base">
              <img src={stage.base} alt={project.imageAlt} loading={loading} decoding="async" />
            </div>
            <div className="explode-panel p1">
              <img src={stage.panels[0]} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="explode-panel p2">
              <img src={stage.panels[1]} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="scale" aria-hidden="true">
              <div className="scale-top">
                <span>{labels.energyClass}</span>
                <b>
                  <span className="swap2">
                    <span className="from">{from.value}</span>
                    <span className="to">{to.value}</span>
                  </span>{" "}
                  {unit}
                </b>
              </div>
              <div className="scale-bar" style={bar}>
                <span className="scale-mk">
                  <span className="swap2">
                    <span className="from">{from.grade}</span>
                    <span className="to">{to.grade}</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <span className="stage-hint">{labels.hintExplode}</span>
        </>
      );
    }

    case "dictation":
      return (
        <>
          <Dictation pills={stage.pills} labels={labels} />
          <span className="stage-hint">{labels.hintDictation}</span>
        </>
      );

    case "stops":
      return (
        <Stops
          href={href}
          shots={stage.shots.map((src) => ({
            src,
            caption: project.gallery.find((shot) => shot.src === src)?.caption ?? project.title,
          }))}
          labels={{ hint: labels.hintStops, stopOf: labels.stopOf, tapOn: labels.tapOn }}
        />
      );
  }
}

/*
 * One project on its stage. The `card` variant is the tile on the home page
 * and the index, with the name, the facts and a link over the whole tile. The
 * `hero` variant is the stage alone, at the top of the case study.
 */
export default function ProjectStage({
  project,
  labels,
  href,
  variant = "card",
  eager = false,
}: {
  project: Project;
  labels: Labels;
  href?: string;
  variant?: "card" | "hero";
  eager?: boolean;
}) {
  const kind = project.stage.kind;
  const style = project.accent
    ? ({ "--acc-l": project.accent.light, "--acc-d": project.accent.dark } as React.CSSProperties)
    : undefined;
  const className = [
    "stage",
    variant === "hero" ? "stage-hero" : "",
    kind === "dictation" ? "stage-dark" : "",
    kind === "stops" ? "stage-photo" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <StageFrame as={variant === "hero" ? "div" : "article"} className={className} style={style}>
      <div className="stage-visual">
        <Visual project={project} labels={labels} href={href} eager={eager} />
      </div>
      {variant === "card" && href && (
        <div className="stage-meta">
          <div>
            <p className="stage-cat">
              {project.category} · {project.year}
            </p>
            <h3>
              <Link className="stage-link" href={href}>
                {project.title}
              </Link>
            </h3>
            <p className="stage-summary">{project.summary}</p>
            <ul className="chips">
              {project.chips.map((chip) => (
                <li key={chip} className="chip">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <span className="stage-go" aria-hidden="true">
            →
          </span>
        </div>
      )}
    </StageFrame>
  );
}
