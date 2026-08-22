import type { ExperienceId } from "@/data/structure";

export interface GalleryCopy {
  alt: string;
  caption?: string;
}

export interface ProjectCopy {
  /** One or two plain sentences shown on the index. */
  summary: string;
  /** The single fact worth remembering. */
  metric: string;
  /** The problem this project exists to solve. */
  problem: string;
  /** What was built, paragraph by paragraph. */
  solution: string[];
  /** Concrete results and facts, shown as a list. */
  achievements: string[];
  imageAlt: string;
  /** Keyed by GalleryShot.id. */
  gallery: Record<string, GalleryCopy>;
}

export interface ExperienceCopy {
  company: string;
  role: string;
  date: string;
  /** One-line version, shown on the Home page. */
  detail: string;
  /** Full story, shown on the /experience timeline. */
  bullets: string[];
}

export interface CalendarLabels {
  months: string[];
  weekdays: string[];
  less: string;
  more: string;
  /** Supports the {{count}} and {{year}} placeholders. */
  totalCount: string;
}

export interface UiCopy {
  nav: {
    aria: string;
    home: string;
    projects: string;
    experience: string;
  };
  social: {
    github: string;
    linkedin: string;
    telegram: string;
    email: string;
  };
  theme: {
    toggle: string;
  };
  language: {
    /** Accessible name for the language switcher itself. */
    label: string;
  };
  home: {
    avatarTitle: string;
    verified: string;
    sectionProjects: string;
    details: string;
    seeAllProjects: string;
    sectionAbout: string;
    sectionExperience: string;
    sectionSkills: string;
    sectionActivity: string;
    sectionCertifications: string;
  };
  projects: {
    heading: string;
    intro: string;
    readCaseStudy: string;
  };
  project: {
    back: string;
    github: string;
    live: string;
    problem: string;
    built: string;
    highlights: string;
    stack: string;
    inDetail: string;
  };
  experience: {
    heading: string;
    intro: string;
  };
  certifications: {
    showCredential: string;
  };
  resume: {
    open: string;
    viewer: string;
    zoomOut: string;
    zoomIn: string;
    download: string;
    close: string;
    loading: string;
    error: string;
    errorAction: string;
  };
  /** Uses the {{count}} placeholder. */
  visitors: string;
  calendar: CalendarLabels;
  notFound: {
    title: string;
    body: string;
    action: string;
  };
}

export interface MetaCopy {
  /** Site-wide default title and the "%s" template for child pages. */
  siteTitle: string;
  titleTemplate: string;
  siteDescription: string;
  ogTitle: string;
  ogDescription: string;
  projectsTitle: string;
  projectsDescription: string;
  experienceTitle: string;
  experienceDescription: string;
}

export interface Content {
  /** The name as it is written in this language. */
  name: string;
  tagline: string;
  intro: string;
  location: string;
  /** The languages you speak, already in this locale's own words. */
  languages: string[];
  /** The About section on the Home page. */
  about: string[];
  /** The footer's headline and blurb. */
  footer: {
    heading: string;
    blurb: string;
    emailLabel: string;
    linkedinLabel: string;
    telegramLabel: string;
    credit: string;
  };
  projects: Record<string, ProjectCopy>;
  experience: Record<ExperienceId, ExperienceCopy>;
  ui: UiCopy;
  meta: MetaCopy;
}
