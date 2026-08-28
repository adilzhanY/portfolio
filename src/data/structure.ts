import type { Locale } from "@/i18n/config";

/**
 * Everything about the CV that does not change between languages: ids, URLs,
 * image paths and their intrinsic sizes, tech stack names, product names.
 * The prose that goes with each id lives in src/content/<locale>.ts.
 */

export interface GalleryShot {
  /** Key the per-locale alt text and caption are stored under. */
  id: string;
  src: string;
  /** Intrinsic pixel size, so the browser reserves space before loading. */
  w: number;
  h: number;
}

export interface ProjectStructure {
  /** URL slug, and the key its prose is stored under. */
  id: string;
  /** A product name, never translated. */
  title: string;
  year: string;
  stack: string[];
  link: string;
  /** Live deployment, if one exists. */
  live?: string;
  /** Small screenshot for the index. Omit for a text-only row. */
  image?: string;
  imageW?: number;
  imageH?: number;
  /** Phone screenshots render narrower than desktop ones. */
  phone?: boolean;
  /** Wide, short screenshots render under the text instead of beside it. */
  wide?: boolean;
  gallery: GalleryShot[];
  /** Phone galleries render as a row of tall shots. */
  galleryPhones?: boolean;
  /**
   * When the first N gallery shots are steps of one process rather than
   * separate views, they play as an animation instead of sitting in a grid.
   */
  replayCount?: number;
}

export interface CertificationStructure {
  issuer: "IBM" | "Meta" | "Next.js";
  /** The official course name, left in English in every locale. */
  title: string;
  /** Where the certificate is hosted, shown as the small source label. */
  platform: string;
  url: string;
}

export const PROFILE = {
  name: "Adilzhan Yerzhan",
  avatar: "/pfp.webp",
  githubUsername: "adilzhanY",
  contact: {
    email: "adilzhan1112@gmail.com",
    github: "https://github.com/adilzhanY",
    linkedin: "https://linkedin.com/in/adilzhanyerzhan",
    telegram: "https://t.me/kowiqx",
    booking: "https://cal.com/adilzhan/15min",
  },
  /** Shown verbatim on the contact cards. */
  handles: {
    linkedin: "linkedin.com/in/adilzhanyerzhan",
    telegram: "t.me/kowiqx",
    booking: "cal.com/adilzhan/15min",
  },
} as const;

/** The resume PDF served for each language. */
export const RESUME_FILE: Record<Locale, string> = {
  en: "/CV_Adilzhan_Yerzhan.pdf",
  ru: "/CV_Adilzhan_Yerzhan_RU.pdf",
  de: "/CV_Adilzhan_Yerzhan_DE.pdf",
};

export const SKILLS = [
  "Rust",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Expo",
  "Flutter",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "AWS",
] as const;

/** Order of the timeline, newest first. Prose lives under these keys. */
export const EXPERIENCE_ORDER = [
  "independent",
  "intuivo",
  "climanova",
  "degree",
] as const;

export type ExperienceId = (typeof EXPERIENCE_ORDER)[number];

export const PROJECTS: ProjectStructure[] = [
  {
    id: "whale-abyss",
    title: "Whale Abyss",
    year: "2026",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "NextAuth",
      "Zustand",
      "Yandex Cloud",
    ],
    link: "https://github.com/adilzhanY/whaleabyss",
    live: "https://whaleabyss.com",
    image: "/projects/whaleabyss-preview.webp",
    imageW: 1200,
    imageH: 646,
    gallery: [
      { id: "hero", src: "/projects/gallery/whaleabyss-hero.webp", w: 1600, h: 862 },
      { id: "services", src: "/projects/gallery/whaleabyss-services.webp", w: 1600, h: 1000 },
      { id: "cart", src: "/projects/gallery/whaleabyss-cart.webp", w: 1600, h: 1000 },
      { id: "reviews", src: "/projects/gallery/whaleabyss-reviews.webp", w: 1600, h: 1000 },
    ],
  },
  {
    id: "torq",
    title: "Torq",
    year: "2026",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Vitest"],
    link: "https://github.com/adilzhanY/torq",
    image: "/projects/torq-preview.webp",
    imageW: 1200,
    imageH: 646,
    gallery: [
      { id: "home", src: "/projects/gallery/torq-home.webp", w: 738, h: 1400 },
      { id: "live", src: "/projects/gallery/torq-live.webp", w: 738, h: 1400 },
      { id: "ranks", src: "/projects/gallery/torq-ranks.webp", w: 738, h: 1400 },
      { id: "stats", src: "/projects/gallery/torq-stats.webp", w: 738, h: 1400 },
      { id: "history", src: "/projects/gallery/torq-history.webp", w: 738, h: 1400 },
    ],
    galleryPhones: true,
  },
  {
    id: "openhyprwhisper",
    title: "OpenHyprWhisper",
    year: "2026",
    stack: ["whisper.cpp", "CUDA", "Python", "Quickshell", "llama.cpp"],
    link: "https://github.com/adilzhanY/OpenHyprWhisper",
    image: "/projects/ohw-preview.webp",
    imageW: 1200,
    imageH: 630,
    // recording -> transcribing -> polishing -> done is one pass of dictation.
    // The fifth shot is the light theme, which is a variant, not a step.
    replayCount: 4,
    gallery: [
      { id: "recording", src: "/projects/gallery/ohw-recording.webp", w: 1160, h: 187 },
      { id: "transcribing", src: "/projects/gallery/ohw-transcribing.webp", w: 1160, h: 187 },
      { id: "polishing", src: "/projects/gallery/ohw-polishing.webp", w: 1160, h: 187 },
      { id: "done", src: "/projects/gallery/ohw-done.webp", w: 1160, h: 187 },
      { id: "light", src: "/projects/gallery/ohw-recording-light.webp", w: 1160, h: 187 },
    ],
  },
  {
    id: "grit",
    title: "Grit",
    year: "2026",
    stack: [
      "Next.js",
      "React 19",
      "Expo",
      "React Native",
      "Quickshell",
      "Supabase",
      "Dexie",
    ],
    link: "https://github.com/adilzhanY/grit",
    image: "/projects/grit-preview.webp",
    imageW: 1200,
    imageH: 630,
    gallery: [
      { id: "myday", src: "/projects/gallery/grit-myday.webp", w: 500, h: 870 },
      { id: "focus", src: "/projects/gallery/grit-focus.webp", w: 500, h: 870 },
      { id: "bad", src: "/projects/gallery/grit-bad.webp", w: 500, h: 870 },
      { id: "food", src: "/projects/gallery/grit-food.webp", w: 500, h: 870 },
      { id: "stats", src: "/projects/gallery/grit-stats.webp", w: 500, h: 870 },
    ],
    galleryPhones: true,
  },
];

export type ProjectId = (typeof PROJECTS)[number]["id"];

export const CERTIFICATIONS: CertificationStructure[] = [
  {
    issuer: "IBM",
    title: "Developing Front-End Apps with React",
    platform: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/certificate/2TH7IUI9QFDV",
  },
  {
    issuer: "Meta",
    title: "Programming in Python",
    platform: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/certificate/7WVVV2L7ZBBB",
  },
  {
    issuer: "IBM",
    title: "Introduction to Software Engineering",
    platform: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/YTYTG9BLNHIW",
  },
  {
    issuer: "IBM",
    title: "Introduction to Cloud Computing",
    platform: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/1C8Y36GDK6NQ",
  },
  {
    issuer: "IBM",
    title: "Getting Started with Git and GitHub",
    platform: "Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/UGJQQFUKEFLW",
  },
  {
    issuer: "Next.js",
    title: "Next.js App Router Fundamentals",
    platform: "nextjs.org",
    url: "https://nextjs.org/learn/certificate?course=dashboard-app&user=104689&certId=dashboard-app-104689-1758793315594",
  },
];
