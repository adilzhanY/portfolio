/*
 * Rotating stack of project screenshots for the Projects section, built on
 * CardSwap. Add a new project to the stack by dropping a screenshot in
 * public/projects/<id>.webp and listing the id here; entries are matched
 * against CV_DATA.projects so titles and links stay in sync with the CV.
 */
import CardSwap, { Card } from "./CardSwap";
import { CV_DATA } from "../data/cv";

const SHOWCASE_IMAGES: Record<string, string> = {
  whaleabyss: "/projects/whaleabyss.webp",
  grit: "/projects/grit.webp",
};

const shown = CV_DATA.projects.filter((p) => SHOWCASE_IMAGES[p.id]);

export default function ProjectShowcase() {
  if (shown.length < 2) return null;

  return (
    <CardSwap
      width={520}
      height={400}
      cardDistance={60}
      verticalDistance={70}
      delay={4500}
      pauseOnHover
      skewAmount={5}
      onCardClick={(i) =>
        window.open(shown[i].link, "_blank", "noopener,noreferrer")
      }
    >
      {shown.map((p) => (
        <Card key={p.id} aria-label={`${p.title} screenshot`}>
          <div className="card-label">
            {p.title}
            <span>{"↗"}</span>
          </div>
          <img
            className="card-shot"
            src={SHOWCASE_IMAGES[p.id]}
            alt={`${p.title} screenshot`}
            loading="lazy"
          />
        </Card>
      ))}
    </CardSwap>
  );
}
