import type { Content } from "@/content/types";
import { content as en } from "@/content/en";
import { content as ru } from "@/content/ru";
import { content as de } from "@/content/de";
import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import {
  CERTIFICATIONS,
  EXPERIENCE_ORDER,
  PROFILE,
  PROJECTS,
  SKILLS,
} from "@/data/structure";

export interface Experience {
  company: string;
  role: string;
  date: string;
  /** One-line version, shown on the Home page. */
  detail: string;
  /** Full story, shown on the /experience timeline. */
  bullets: string[];
  /** Stable key, independent of the translated company name. */
  id: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel size, so the browser reserves space before loading. */
  w: number;
  h: number;
}

export interface Project {
  /** URL slug, and the anchor on /projects. */
  id: string;
  title: string;
  year: string;
  summary: string;
  metric: string;
  stack: string[];
  link: string;
  live?: string;
  image?: string;
  imageAlt?: string;
  imageW?: number;
  imageH?: number;
  phone?: boolean;
  wide?: boolean;
  problem: string;
  solution: string[];
  achievements: string[];
  gallery: GalleryImage[];
  galleryPhones?: boolean;
}

export interface Certification {
  issuer: "IBM" | "Meta" | "Next.js";
  title: string;
  platform: string;
  url: string;
}

export interface CV {
  name: string;
  tagline: string;
  intro: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    telegram: string;
    location: string;
  };
  skills: string[];
  languages: string[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
}

const CONTENT: Record<Locale, Content> = { en, ru, de };

export function getContent(locale: Locale): Content {
  return CONTENT[locale] ?? CONTENT[DEFAULT_LOCALE];
}

/**
 * Merge the language-independent structure with the prose for one locale.
 * The result is the shape every view already reads, so the rendering code
 * does not care which language it was handed.
 */
export function getCV(locale: Locale): CV {
  const copy = getContent(locale);

  const projects: Project[] = PROJECTS.map((project) => {
    const text = copy.projects[project.id];
    return {
      id: project.id,
      title: project.title,
      year: project.year,
      summary: text.summary,
      metric: text.metric,
      stack: [...project.stack],
      link: project.link,
      live: project.live,
      image: project.image,
      imageAlt: text.imageAlt,
      imageW: project.imageW,
      imageH: project.imageH,
      phone: project.phone,
      wide: project.wide,
      problem: text.problem,
      solution: text.solution,
      achievements: text.achievements,
      gallery: project.gallery.map((shot) => ({
        src: shot.src,
        alt: text.gallery[shot.id]?.alt ?? "",
        caption: text.gallery[shot.id]?.caption,
        w: shot.w,
        h: shot.h,
      })),
      galleryPhones: project.galleryPhones,
    };
  });

  const experience: Experience[] = EXPERIENCE_ORDER.map((id) => ({
    id,
    ...copy.experience[id],
  }));

  return {
    name: copy.name,
    tagline: copy.tagline,
    intro: copy.intro,
    contact: { ...PROFILE.contact, location: copy.location },
    skills: [...SKILLS],
    languages: copy.languages,
    projects,
    experience,
    certifications: CERTIFICATIONS.map((cert) => ({ ...cert })),
  };
}
