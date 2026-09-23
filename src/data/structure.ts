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
  /**
   * The product's own colour, as the case study's accent. One value per
   * theme, each checked for 4.5:1 against that theme's surface, because the
   * metric line is small text.
   */
  accent?: { light: string; dark: string };
  /** Which filter the project falls under on the index. */
  group: "web" | "mobile" | "desktop";
  /**
   * How the project is shown on its stage, the big tinted card on the home
   * page, the index and the top of the case study. Each kind moves on hover.
   */
  stage: ProjectStage;
  /** Wide stages take the full row; the others pair up two to a row. */
  stageWide?: boolean;
  gallery: GalleryShot[];
  /** Phone galleries render as a row of tall shots. */
  galleryPhones?: boolean;
  /**
   * When the first N gallery shots are steps of one process rather than
   * separate views, they play as an animation instead of sitting in a grid.
   */
  replayCount?: number;
}

/**
 * `fan`: one phone in front, two more screens fan out behind it.
 * `journey`: the storefront window, a phone, a paid order and its bot message.
 * `explode`: the editor, with two of its panels lifting off it.
 * `dictation`: a chat field that the dictation pill types into.
 * `stops`: a row of places; the pointer position picks which one shows.
 */
export type ProjectStage =
  | { kind: "fan"; main: string; left: string; right: string }
  | { kind: "journey"; desktop: string; mobile: string }
  | {
      kind: "explode";
      base: string;
      panels: [string, string];
      /** The energy class the stage slides between, before and after. */
      scale: { from: EnergyStep; to: EnergyStep; unit: string };
    }
  | { kind: "dictation"; pills: Record<"recording" | "transcribing" | "polishing" | "done", string> }
  | { kind: "stops"; shots: string[] };

export interface EnergyStep {
  grade: "A+" | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
  value: string;
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
    xing: "https://www.xing.com/profile/Adilzhan_Yerzhan",
    telegram: "https://t.me/kowiqx",
    reddit: "https://www.reddit.com/user/Fast_Pizza_1046/",
    x: "https://x.com/woopleer",
    booking: "https://cal.com/adilzhan/15min",
  },
  /** Shown verbatim on the contact cards. */
  handles: {
    linkedin: "linkedin.com/in/adilzhanyerzhan",
    xing: "xing.com/profile/Adilzhan_Yerzhan",
    telegram: "t.me/kowiqx",
    booking: "cal.com/adilzhan/15min",
  },
} as const;

/** A contact card a recruiter can save in one tap. */
export const VCARD_FILE = "/adilzhan-yerzhan.vcf";

/** The Now page: the products I am working on at the moment, by id. */
export const NOW = {
  updated: "2026-09-04",
  projects: ["sendoku", "torq"],
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
    id: "bauwerk",
    group: "web",
    stage: {
      kind: "explode",
      base: "/projects/stage/bauwerk-editor.webp",
      panels: ["/projects/stage/bauwerk-energy-panel.webp", "/projects/stage/bauwerk-scenarios-panel.webp"],
      scale: { from: { grade: "G", value: "237" }, to: { grade: "B", value: "63" }, unit: "kWh/(m²a)" },
    },
    stageWide: true,
    accent: { light: "#234d8f", dark: "#7fa6e8" },
    title: "Bauwerk",
    year: "2026",
    stack: ["React", "TypeScript", "Three.js", "Zustand", "NestJS", "PostgreSQL", "IFC4"],
    link: "https://github.com/adilzhanY/bauwerk",
    live: "https://adilzhany.github.io/bauwerk/",
    gallery: [
      { id: "building", src: "/projects/gallery/bauwerk-building.webp", w: 1600, h: 1000 },
      { id: "scene", src: "/projects/gallery/bauwerk-scene.webp", w: 1600, h: 1000 },
      { id: "openings", src: "/projects/gallery/bauwerk-openings.webp", w: 1600, h: 1000 },
      { id: "energy", src: "/projects/gallery/bauwerk-energy.webp", w: 1600, h: 1000 },
      { id: "scenarios", src: "/projects/gallery/bauwerk-scenarios.webp", w: 1600, h: 1000 },
      { id: "report", src: "/projects/gallery/bauwerk-report.webp", w: 1600, h: 1000 },
    ],
  },
  {
    id: "torq",
    group: "mobile",
    stage: {
      kind: "fan",
      main: "/projects/gallery/torq-home.webp",
      left: "/projects/gallery/torq-ranks.webp",
      right: "/projects/gallery/torq-live.webp",
    },
    accent: { light: "#5a7f00", dark: "#c6f135" },
    title: "Torq",
    year: "2026",
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Vitest"],
    link: "https://github.com/adilzhanY/torq",
    gallery: [
      { id: "home", src: "/projects/gallery/torq-home.webp", w: 600, h: 1333 },
      { id: "live", src: "/projects/gallery/torq-live.webp", w: 600, h: 1333 },
      { id: "ranks", src: "/projects/gallery/torq-ranks.webp", w: 600, h: 1333 },
      { id: "stats", src: "/projects/gallery/torq-stats.webp", w: 600, h: 1333 },
      { id: "history", src: "/projects/gallery/torq-history.webp", w: 600, h: 1333 },
    ],
    galleryPhones: true,
  },
  {
    id: "grit",
    group: "desktop",
    stage: {
      kind: "fan",
      main: "/projects/gallery/grit-myday.webp",
      left: "/projects/gallery/grit-bad.webp",
      right: "/projects/gallery/grit-focus.webp",
    },
    accent: { light: "#c2410c", dark: "#fb923c" },
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
    gallery: [
      { id: "myday", src: "/projects/gallery/grit-myday.webp", w: 600, h: 1333 },
      { id: "focus", src: "/projects/gallery/grit-focus.webp", w: 600, h: 1333 },
      { id: "bad", src: "/projects/gallery/grit-bad.webp", w: 600, h: 1333 },
      { id: "food", src: "/projects/gallery/grit-food.webp", w: 600, h: 1333 },
      { id: "stats", src: "/projects/gallery/grit-stats.webp", w: 600, h: 1333 },
    ],
    galleryPhones: true,
  },
  {
    id: "whale-abyss",
    group: "web",
    stage: {
      kind: "journey",
      desktop: "/projects/gallery/whaleabyss-hero.webp",
      mobile: "/projects/stage/whaleabyss-mobile.webp",
    },
    stageWide: true,
    accent: { light: "#1f4fd1", dark: "#6b93ff" },
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
    gallery: [
      { id: "hero", src: "/projects/gallery/whaleabyss-hero.webp", w: 1600, h: 1000 },
      { id: "services", src: "/projects/gallery/whaleabyss-services.webp", w: 1600, h: 1000 },
      { id: "service", src: "/projects/gallery/whaleabyss-service.webp", w: 1600, h: 1000 },
      { id: "reviews", src: "/projects/gallery/whaleabyss-reviews.webp", w: 1600, h: 1000 },
    ],
  },
  {
    id: "sendoku",
    group: "mobile",
    stage: {
      kind: "fan",
      main: "/projects/gallery/sendoku-home.webp",
      left: "/projects/gallery/sendoku-hint.webp",
      right: "/projects/gallery/sendoku-you.webp",
    },
    accent: { light: "#0f766e", dark: "#3ee8c8" },
    title: "Sendoku",
    year: "2026",
    stack: ["Kotlin", "Jetpack Compose", "Room", "Material 3", "Gradle"],
    link: "https://github.com/adilzhanY/sendoku",
    gallery: [
      { id: "home", src: "/projects/gallery/sendoku-home.webp", w: 600, h: 1333 },
      { id: "hint", src: "/projects/gallery/sendoku-hint.webp", w: 600, h: 1333 },
      { id: "learn", src: "/projects/gallery/sendoku-learn.webp", w: 600, h: 1333 },
      { id: "killer", src: "/projects/gallery/sendoku-killer.webp", w: 600, h: 1333 },
      { id: "you", src: "/projects/gallery/sendoku-you.webp", w: 600, h: 1333 },
    ],
    galleryPhones: true,
  },
  {
    id: "openhyprwhisper",
    group: "desktop",
    stage: {
      kind: "dictation",
      pills: {
        recording: "/projects/stage/ohw-pill-recording.webp",
        transcribing: "/projects/stage/ohw-pill-transcribing.webp",
        polishing: "/projects/stage/ohw-pill-polishing.webp",
        done: "/projects/stage/ohw-pill-done.webp",
      },
    },
    accent: { light: "#4f5fe8", dark: "#b9c3ff" },
    title: "OpenHyprWhisper",
    year: "2026",
    stack: ["whisper.cpp", "CUDA", "Python", "Quickshell", "llama.cpp"],
    link: "https://github.com/adilzhanY/OpenHyprWhisper",
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
    id: "berlin-walk",
    group: "web",
    stage: {
      kind: "stops",
      shots: [
        "/projects/gallery/berlin-walk-gate.webp",
        "/projects/gallery/berlin-walk-linden.webp",
        "/projects/gallery/berlin-walk-memorial.webp",
        "/projects/gallery/berlin-walk-tower.webp",
        "/projects/gallery/berlin-walk-flight.webp",
        "/projects/gallery/berlin-walk-night.webp",
      ],
    },
    stageWide: true,
    accent: { light: "#8a6a1f", dark: "#e3c476" },
    title: "Berlin Walk",
    year: "2026",
    stack: ["WebGL2", "GLSL", "JavaScript", "Web Audio", "OpenStreetMap", "Node.js"],
    link: "https://github.com/adilzhanY/berlin-walk",
    live: "https://adilzhany.github.io/berlin-walk/",
    gallery: [
      { id: "flight", src: "/projects/gallery/berlin-walk-flight.webp", w: 1280, h: 720 },
      { id: "gate", src: "/projects/gallery/berlin-walk-gate.webp", w: 1280, h: 720 },
      { id: "linden", src: "/projects/gallery/berlin-walk-linden.webp", w: 1280, h: 720 },
      { id: "memorial", src: "/projects/gallery/berlin-walk-memorial.webp", w: 1280, h: 720 },
      { id: "tower", src: "/projects/gallery/berlin-walk-tower.webp", w: 1280, h: 720 },
      { id: "night", src: "/projects/gallery/berlin-walk-night.webp", w: 1280, h: 720 },
    ],
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
