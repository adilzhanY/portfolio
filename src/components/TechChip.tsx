import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiDrizzle,
  SiExpo,
  SiFlutter,
  SiNextdotjs,
  SiNodedotjs,
  SiNvidia,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
  SiYandexcloud,
} from "react-icons/si";

/* Brand colors, darkened where the original is too light for a light chip. */
const TECH: Record<string, { icon: IconType; color: string }> = {
  Rust: { icon: SiRust, color: "#CE422B" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  React: { icon: SiReact, color: "#087EA4" },
  "React Native": { icon: SiReact, color: "#087EA4" },
  "React 19": { icon: SiReact, color: "#087EA4" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  Expo: { icon: SiExpo, color: "#000000" },
  Flutter: { icon: SiFlutter, color: "#02569B" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#0891B2" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Supabase: { icon: SiSupabase, color: "#24B47E" },
  AWS: { icon: FaAws, color: "#E68A00" },
  Drizzle: { icon: SiDrizzle, color: "#5C7C0A" },
  "Yandex Cloud": { icon: SiYandexcloud, color: "#5282FF" },
  Vitest: { icon: SiVitest, color: "#6E9F18" },
  CUDA: { icon: SiNvidia, color: "#76B900" },
  Python: { icon: SiPython, color: "#3776AB" },
  SQLite: { icon: SiSqlite, color: "#003B57" },
};

export default function TechChip({ name }: { name: string }) {
  const tech = TECH[name];
  const Icon = tech?.icon;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-faint bg-chip py-1 pr-3 pl-2.5 font-mono text-[12.5px] text-body">
      {Icon && (
        <Icon
          aria-hidden="true"
          style={{ color: tech.color }}
          className="h-[13px] w-[13px] shrink-0"
        />
      )}
      {name}
    </span>
  );
}
