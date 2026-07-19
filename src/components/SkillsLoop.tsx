/*
 * Skills strip after the projects section: an infinite LogoLoop of the
 * CV skills, each rendered as monochrome white SVG logo + name.
 */
import LogoLoop from "./LogoLoop";
import {
  SiRust,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiFlutter,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiSupabase,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const SKILLS: { icon: React.ReactNode; name: string }[] = [
  { icon: <SiRust />, name: "Rust" },
  { icon: <SiTypescript />, name: "TypeScript" },
  { icon: <SiReact />, name: "React" },
  { icon: <SiReact />, name: "React Native" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <SiExpo />, name: "Expo" },
  { icon: <SiFlutter />, name: "Flutter" },
  { icon: <SiNodedotjs />, name: "Node.js" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <SiSupabase />, name: "Supabase" },
  { icon: <FaAws />, name: "AWS" },
];

export default function SkillsLoop() {
  return (
    <LogoLoop
      ariaLabel="Skills"
      speed={70}
      logoHeight={30}
      gap={64}
      hoverSpeed={18}
      fadeOut
      fadeOutColor="#000000"
      logos={SKILLS.map((s) => ({
        node: (
          <span className="flex items-center gap-3 text-light/85">
            <span className="text-[1.9rem] leading-none">{s.icon}</span>
            <span className="font-mono text-sm uppercase tracking-[0.18em] text-light/60">
              {s.name}
            </span>
          </span>
        ),
        title: s.name,
        ariaLabel: s.name,
      }))}
    />
  );
}
