import LogoLoop from "@/components/LogoLoop";
import { TECH } from "@/components/TechChip";

/**
 * The skills as an endless strip of logos under the resume button: each one
 * is its brand icon in its brand colour with the name beside it in mono,
 * the same pairing the tech chips use elsewhere on the site.
 */
export default function SkillsLoop({
  skills,
  label,
}: {
  skills: readonly string[];
  label: string;
}) {
  return (
    <LogoLoop
      ariaLabel={label}
      speed={60}
      logoHeight={22}
      gap={44}
      pauseOnHover
      fadeOut
      logos={skills.map((name) => {
        const tech = TECH[name];
        const Icon = tech?.icon;
        return {
          title: name,
          node: (
            <span className="skills-loop__item">
              {Icon && (
                <Icon
                  aria-hidden="true"
                  style={{ color: tech.color }}
                  className="skills-loop__icon"
                />
              )}
              <span className="skills-loop__name">{name}</span>
            </span>
          ),
        };
      })}
    />
  );
}
