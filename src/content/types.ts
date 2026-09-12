import type { ExperienceId } from "@/data/structure";

export interface GalleryCopy {
  alt: string;
  caption?: string;
}

export interface ProjectCopy {
  /** Short label above the title on a card, for example "3D building editor". */
  category: string;
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
  /** What went wrong and what changed because of it. */
  postmortem: string[];
  imageAlt: string;
  /** Keyed by GalleryShot.id. */
  gallery: Record<string, GalleryCopy>;
}

export interface ExperienceCopy {
  company: string;
  role: string;
  date: string;
  /** Small tag beside the date, for example "Remote" or "Course project". */
  label: string;
  /** Entry heading when the company name is not the interesting part. */
  headline?: string;
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
    blog: string;
    contact: string;
    /** The call to action in the header, beside the tools. */
    getInTouch: string;
    /** The phone menu button and the drawer it opens. */
    menu: string;
    close: string;
  };
  social: {
    github: string;
    linkedin: string;
    xing: string;
    telegram: string;
    reddit: string;
    x: string;
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
    saveContact: string;
    /** The line above the name: role and where. */
    eyebrow: string;
    /** The heading, split so the rotating phrase can sit on its own line. */
    greeting: string;
    making: string;
    /** Phrases the heading cycles through. */
    rotating: string[];
    /** The short, personal introduction under the heading. */
    heroIntro: string;
    exploreProjects: string;
    availability: string;
    /** The note taped to the photo, and its small second line. */
    helloNote: string;
    helloNoteSub: string;
    helloCaption: string;
    awayHeading: string;
    awayText: string;
    selectedEyebrow: string;
    selectedHeading: string;
    openShelf: string;
    aboutEyebrow: string;
    aboutHeading: string;
    moreExperience: string;
    tinkering: string;
  };
  projects: {
    heading: string;
    intro: string;
    readCaseStudy: string;
    eyebrow: string;
    /** The h1 on the index, which is longer than the nav label. */
    pageHeading: string;
    pageIntro: string;
    surprise: string;
    filterAll: string;
    filterWeb: string;
    filterMobile: string;
    filterDesktop: string;
    /** Supports the {{count}} placeholder. */
    count: string;
    endNote: string;
  };
  project: {
    back: string;
    github: string;
    live: string;
    problem: string;
    built: string;
    highlights: string;
    wentWrong: string;
    stack: string;
    inDetail: string;
  };
  experience: {
    heading: string;
    intro: string;
    eyebrow: string;
    pageHeading: string;
    pageIntro: string;
    resumeVersion: string;
    glance: string;
    glanceHeading: string;
    glanceText: string;
    mainTools: string;
    languagesLabel: string;
    talk: string;
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
    /** The four by four puzzle that stands in for a blank page. */
    puzzleIntro: string;
    hint: string;
    doIt: string;
    erase: string;
    /** Uses the {{digit}} placeholder. */
    hintSingle: string;
    hintWrong: string;
    hintNone: string;
    solved: string;
    solvedAction: string;
    boardLabel: string;
    /** Uses the {{row}} and {{col}} placeholders. */
    cellLabel: string;
  };
}

export interface UsesCopy {
  heading: string;
  intro: string;
  /** Keyed by UseGroup.id. */
  groups: Record<string, string>;
  /** Keyed by UseItem.id. Only the items worth a remark have one. */
  notes: Record<string, string>;
}

export interface ContactCopy {
  heading: string;
  eyebrow: string;
  intro: string;
  /** Row headings on the details card. */
  basedIn: string;
  speaks: string;
  saveContact: string;
  emailLabel: string;
  githubLabel: string;
  xLabel: string;
  redditLabel: string;
  xingLabel: string;
}

export interface NowCopy {
  heading: string;
  intro: string;
  /** "Updated {{date}}", with the date already in this locale's format. */
  updated: string;
  /** Heading over the list of products being worked on. */
  building: string;
}

export interface BlogCopy {
  heading: string;
  intro: string;
  read: string;
  back: string;
  feed: string;
  /** Shown on the list page while there is nothing published yet. */
  empty: string;
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
  usesTitle: string;
  usesDescription: string;
  contactTitle: string;
  contactDescription: string;
  nowTitle: string;
  nowDescription: string;
  blogTitle: string;
  blogDescription: string;
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
    bookingLabel: string;
    credit: string;
    /** The closing block: a status line, a question, and the answer to it. */
    openTo: string;
    prompt: string;
    promptSub: string;
    cta: string;
  };
  projects: Record<string, ProjectCopy>;
  experience: Record<ExperienceId, ExperienceCopy>;
  ui: UiCopy;
  uses: UsesCopy;
  contact: ContactCopy;
  now: NowCopy;
  blog: BlogCopy;
  meta: MetaCopy;
}
