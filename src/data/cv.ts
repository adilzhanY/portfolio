export interface Experience {
  company: string;
  role: string;
  date: string;
  detail: string;
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
  /** Anchor on /projects (#id) */
  id: string;
  title: string;
  year: string;
  /** One or two plain sentences shown on the index. */
  summary: string;
  /** The single fact worth remembering. */
  metric: string;
  stack: string[];
  link: string;
  /** Live deployment, if one exists. */
  live?: string;
  /** Small screenshot for the index. Omit for a text-only row. */
  image?: string;
  imageAlt?: string;
  imageW?: number;
  imageH?: number;
  /** Phone screenshots render narrower than desktop ones. */
  phone?: boolean;
  /** Wide, short screenshots render under the text instead of beside it. */
  wide?: boolean;
  /** The problem this project exists to solve. */
  problem: string;
  /** What was built, paragraph by paragraph. */
  solution: string[];
  /** Concrete results and facts, shown as a list. */
  achievements: string[];
  /** Larger screenshots for the projects page. */
  gallery: GalleryImage[];
  /** Phone galleries render as a row of tall shots. */
  galleryPhones?: boolean;
}

export interface CV {
  name: string;
  tagline: string;
  intro: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
  };
  skills: string[];
  languages: string[];
  projects: Project[];
  experience: Experience[];
}

export const CV_DATA: CV = {
  name: "Adilzhan Yerzhan",
  tagline: "Software engineer, Potsdam, Germany",
  intro:
    "I design, build, launch, and run my own products end to end: an e-commerce storefront with real paying customers, and offline-first apps for training and habits. I hold a B.Sc in Software Engineering (February 2026) and am open to full-time, contract, freelance, and remote roles.",
  contact: {
    email: "adilzhan1112@gmail.com",
    github: "https://github.com/adilzhanY",
    linkedin: "https://linkedin.com/in/adilzhanyerzhan",
    location: "Potsdam, Germany",
  },
  skills: [
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
  ],
  languages: ["Kazakh", "Russian", "English", "German"],
  projects: [
    {
      id: "whale-abyss",
      title: "Whale Abyss",
      year: "2026",
      summary:
        "E-commerce platform for Genshin Impact boosting, built and launched alone. Paid orders flow straight into a Telegram bot, payments clear end to end, CI/CD deploys on every push.",
      metric: "150+ paying customers in the first 10 days",
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
      live: "https://whaleabyss.ru",
      image: "/projects/whaleabyss-preview.webp",
      imageAlt: "Whale Abyss, the abyss cleared",
      imageW: 1200,
      imageH: 646,
      problem:
        "Game boosting services are sold through Discord servers and spreadsheets. Orders get lost, payments are handled by hand, and neither the customer nor the booster knows what state an order is in. Whale Abyss replaces that with a real storefront.",
      solution: [
        "The customer side is a full store: a service catalog with search and filtering, a persistent cart that syncs between localStorage and the database, promo codes, time-limited promotional events, and a moderated review system. Checkout runs through the Freekassa payment gateway, and every incoming webhook is verified by signature on the server before an order is marked paid.",
        "The moment an order is paid, a Telegram bot posts it to the operations channel with inline keyboards, so the boosters doing the work see it without opening a dashboard. Transactional email covers order confirmations, OTP signup verification, and password resets, with Yandex SmartCaptcha gating OTP delivery against bots.",
        "Behind it sits a complete admin panel: order lifecycle management with refunds through the Freekassa API, user and booster management with automatic commission payouts on completion, service and promo code CRUD, event scheduling, and review moderation. The whole platform deploys to Yandex Cloud with a CI/CD pipeline on every push.",
      ],
      achievements: [
        "150+ paying customers within the first 10 days of launch",
        "Live in production at whaleabyss.ru, still operated by me",
        "36,000+ lines of TypeScript: 80+ components, 35+ API endpoints, 13 database tables",
        "Real money end to end: payment gateway, signed webhooks, refunds, commission payouts",
        "Designed, built, launched, and operated solo",
      ],
      gallery: [
        {
          src: "/projects/gallery/whaleabyss-hero.webp",
          alt: "Whale Abyss landing page",
          caption: "Landing page",
          w: 1600,
          h: 862,
        },
        {
          src: "/projects/gallery/whaleabyss-services.webp",
          alt: "Whale Abyss service catalog",
          caption: "Service catalog",
          w: 1600,
          h: 1000,
        },
        {
          src: "/projects/gallery/whaleabyss-cart.webp",
          alt: "Whale Abyss cart and checkout",
          caption: "Cart and checkout",
          w: 1600,
          h: 1000,
        },
        {
          src: "/projects/gallery/whaleabyss-reviews.webp",
          alt: "Whale Abyss reviews",
          caption: "Moderated reviews",
          w: 1600,
          h: 1000,
        },
      ],
    },
    {
      id: "torq",
      title: "Torq",
      year: "2026",
      summary:
        "A gym app that tells you how strong you actually are. Every set is scored with the DOTS formula, normalised for bodyweight and sex, and turned into a rank across nine tiers, with percentiles from 400k+ OpenPowerlifting lifters.",
      metric: "Nine rank tiers, 243 tests, local-first with free sync",
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Supabase",
        "Vitest",
      ],
      link: "https://github.com/adilzhanY/torq",
      image: "/projects/torq-preview.webp",
      imageAlt: "Torq, strength ranked",
      imageW: 1200,
      imageH: 646,
      problem:
        "Most gym apps tell you how much you lifted, almost none tell you how strong that makes you. Raw kilos are meaningless across bodyweights: the same 100 kg bench is a different achievement at 60 kg than at 110 kg. Torq scores every set with the DOTS formula, the same normalisation powerlifting uses, and turns it into a rank you climb.",
      solution: [
        "Your rank comes from your best estimated 1RM on each lift, scored with the official DOTS polynomial and mapped across nine tiers, from Rust to World Class. Every competition lift also carries a percentile measured against up to 401,000 competitive raw lifters per lift in the OpenPowerlifting database, and the app is honest about the population: it says \"of competitive lifters\" every time it shows the number.",
        "The logger is built for the gym floor: weight and reps with your last session beside every row, next-load suggestions via double progression, a rest timer that counts you in out loud, warm-up ramps remembered per exercise, and a searchable catalog of 1,500 exercises with step by step instructions. History is drawn as a timeline that names the rest days, and progress charts draw the tier bands behind your points so the next rank is visible.",
        "Storage is local-first: one JSON snapshot in AsyncStorage, fully usable with no account. Cloud sync is Supabase auth plus last-write-wins delta sync behind row-level security, free forever. Social features are strictly opt-in: friends compare head to head on points rather than kilos, global leaderboards are a separate switch, and implausible lifts are gated from anything other people can see.",
      ],
      achievements: [
        "243 Vitest tests over the pure ranking and progression logic the product's claims live in",
        "Percentiles computed against 134k to 401k OpenPowerlifting lifters per lift",
        "1,500 exercise catalog, searchable fully offline",
        "Fully usable with no account; guest mode is a first-class path, cloud sync is free",
        "Expo SDK 57, React Native 0.86, React 19, strict TypeScript",
      ],
      gallery: [
        {
          src: "/projects/gallery/torq-home.webp",
          alt: "Torq home screen with today's session",
          caption: "Today's session",
          w: 738,
          h: 1400,
        },
        {
          src: "/projects/gallery/torq-live.webp",
          alt: "Torq live set logger",
          caption: "Live logger",
          w: 738,
          h: 1400,
        },
        {
          src: "/projects/gallery/torq-ranks.webp",
          alt: "Torq nine rank tiers",
          caption: "Nine tiers",
          w: 738,
          h: 1400,
        },
        {
          src: "/projects/gallery/torq-stats.webp",
          alt: "Torq progress chart with tier bands",
          caption: "The climb",
          w: 738,
          h: 1400,
        },
        {
          src: "/projects/gallery/torq-history.webp",
          alt: "Torq session history timeline",
          caption: "History",
          w: 738,
          h: 1400,
        },
      ],
      galleryPhones: true,
    },
    {
      id: "openhyprwhisper",
      title: "OpenHyprWhisper",
      year: "2026",
      summary:
        "System-wide voice dictation for Hyprland. Press a key, speak, and whisper.cpp types your words into whatever text field is focused. Fully local and private, with per-utterance language detection for mixed EN/RU/DE/KK speech, deterministic replacements, and an optional LLM polish pass.",
      metric: "~0.2 s per sentence with the warm daemon, fully offline",
      stack: ["whisper.cpp", "CUDA", "Python", "Quickshell", "llama.cpp"],
      link: "https://github.com/adilzhanY/OpenHyprWhisper",
      image: "/projects/ohw-preview.webp",
      imageAlt: "OpenHyprWhisper, press a key, speak, it types",
      imageW: 1200,
      imageH: 630,
      problem:
        "Linux on Wayland has no system-wide voice dictation, and the cloud alternatives ship your audio to someone else's servers. OpenHyprWhisper is dictation that works in every app and never lets audio leave the machine.",
      solution: [
        "Press a keybind, speak, press again: PipeWire records, whisper.cpp transcribes on CUDA or Vulkan, and the words are typed into whatever text field is focused, in the browser, the terminal, or a chat app. A warm whisper-server daemon keeps the model in VRAM, so transcription starts instantly instead of reloading roughly 600 MB per phrase.",
        "Three correction layers clean the raw transcript: a vocabulary prompt biases recognition toward your jargon, deterministic replacements fix stubborn mishearings in about 10 ms, and an optional LLM polish pass (llama.cpp with Qwen2.5-3B bundled) has a full mode for documents and a light mode that only fixes names so chat messages still sound like you. A silence gate stops the classic hallucinated \"Thank you.\" when you stop without speaking.",
        "The recording indicator is an animated Quickshell pill with a live waveform that can pin to a screen edge or attach to the focused window, and it follows the Material palette on end-4/dots-hyprland setups. Everything is managed through one CLI: mic picker, transcription history, a persistent enable/disable switch wired into systemd user units, and per-utterance language auto-detection for mixed English, Russian, German, and Kazakh speech.",
      ],
      achievements: [
        "About 0.2 s per sentence with the warm daemon on an RTX 5070",
        "Works in any application with a focused text input",
        "Fully local: no cloud, no telemetry, no subscription",
        "Auto language detection per utterance across EN, RU, DE, and KK",
        "Open source, published with install docs and an end-4 dots-hyprland integration",
      ],
      gallery: [
        {
          src: "/projects/gallery/ohw-recording.webp",
          alt: "Recording state with live waveform and timer",
          caption: "Recording, live waveform",
          w: 1160,
          h: 187,
        },
        {
          src: "/projects/gallery/ohw-transcribing.webp",
          alt: "Transcribing state",
          caption: "Transcribing on the GPU",
          w: 1160,
          h: 187,
        },
        {
          src: "/projects/gallery/ohw-polishing.webp",
          alt: "Polishing state",
          caption: "Optional LLM polish",
          w: 1160,
          h: 187,
        },
        {
          src: "/projects/gallery/ohw-done.webp",
          alt: "Done state",
          caption: "Typed into the focused field",
          w: 1160,
          h: 187,
        },
        {
          src: "/projects/gallery/ohw-recording-light.webp",
          alt: "Light theme pill",
          caption: "Follows the system palette live",
          w: 1160,
          h: 187,
        },
      ],
    },
    {
      id: "grit",
      title: "Grit",
      year: "2026",
      summary:
        "A life tracker that stops asking you to open five different apps. Habits, food, steps, weight, and focus in one XP economy, with web, mobile, and a Hyprland desktop panel sharing one domain core, offline-first with delta sync.",
      metric: "One XP economy across web, mobile, and desktop",
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
      imageAlt: "Grit, one life, one XP economy",
      imageW: 1200,
      imageH: 630,
      problem:
        "Habits live in one app, food in another, steps in a third, and each one hands you a separate streak to feel guilty about. Grit puts habits, food, steps, weight, and focus into a single XP economy, so an ordinary day still adds up to something.",
      solution: [
        "The model is one economy: daily non-negotiables pay +10 XP, things you are quitting cost XP and reset a clean streak whose milestones pay bonuses, big personal wins pay +100, life milestones +1000. A daily log tracks food as calories eaten minus burnt, steps, and weight, and a focus timer feeds the same system. Levels are a pure function of total XP and can drop if you slip.",
        "Every XP change is an append-only ledger entry, so XP, level, and streaks are always derivable from history, and the same ledger doubles as the substrate for conflict-free cloud sync. Sync is a delta push/pull against Supabase, last-write-wins per row with tombstones for deletes, behind row-level security.",
        "It is an npm workspaces monorepo: a pure TypeScript domain core with no DOM and no React Native holds the rules once, and every client obeys it. The web app is Next.js 16 with React 19, an installable PWA storing data local-first in IndexedDB via Dexie. The mobile app is Expo React Native sharing the exact same core, so both platforms level up identically.",
        "The third client is a Quickshell (QML) panel for Hyprland: one keypress slides the whole tracker in from the screen edge, with daily quests, per-task focus ranks, streak cards for bad habits, a food log with a fasting timer, and an XP shop. It is keyboard-first with a vim layer, scriptable over IPC, and stores its data in one local JSON snapshot.",
      ],
      achievements: [
        "One shared domain package drives web, mobile, and a native desktop panel with identical rules",
        "Local-first on both platforms: fully usable offline, deltas sync when a connection returns",
        "Append-only XP ledger makes state derivable and sync conflicts rare",
        "Installable PWA on web, native notifications and audio on mobile",
      ],
      gallery: [
        {
          src: "/projects/gallery/grit-myday.webp",
          alt: "Grit My Day view with daily quests",
          caption: "My Day and quests",
          w: 500,
          h: 870,
        },
        {
          src: "/projects/gallery/grit-focus.webp",
          alt: "Grit focus timer with per-task ranks",
          caption: "Focus ranks",
          w: 500,
          h: 870,
        },
        {
          src: "/projects/gallery/grit-bad.webp",
          alt: "Grit bad habit streak cards",
          caption: "Clean streaks",
          w: 500,
          h: 870,
        },
        {
          src: "/projects/gallery/grit-food.webp",
          alt: "Grit daily food log with fasting timer",
          caption: "Daily log",
          w: 500,
          h: 870,
        },
        {
          src: "/projects/gallery/grit-stats.webp",
          alt: "Grit XP ledger and stats",
          caption: "The ledger",
          w: 500,
          h: 870,
        },
      ],
      galleryPhones: true,
    },
    {
      id: "lacuna",
      title: "lacuna",
      year: "2026",
      summary:
        "Grammar practice by filling in the gaps. A sheet is one grammar topic and twenty sentences with blanks. You fill them in, lacuna grades them, and the topic comes back on an FSRS schedule, the same algorithm Anki uses. Runs locally against one SQLite file.",
      metric: "43 German topics, 900 blanks, scheduled by FSRS",
      stack: ["Rust", "axum", "sqlx", "Next.js", "SQLite", "FSRS"],
      link: "https://github.com/adilzhanY/lacuna",
      problem:
        "Spaced repetition works, but Anki is built for vocabulary cards, not grammar drills. Exercise books have the drills but never bring a topic back right before you forget it. lacuna applies the FSRS scheduler that Anki uses to whole grammar topics instead of single cards.",
      solution: [
        "A sheet is one grammar topic and twenty sentences with blanks in them. You fill them in, lacuna grades the answers, and the topic is rescheduled with FSRS, so weak topics come back soon and mastered ones drift far into the future. A dashboard shows what is due and how the topics are developing.",
        "The backend is Rust with axum, sqlx, and the fsrs crate, running everything against one SQLite file. The frontend is Next.js, and the TypeScript types are generated from the Rust structs by the test suite, so the two sides cannot drift apart. The German pack ships 43 topics with hand-written sheets, and a cargo test validates every shipped sheet.",
      ],
      achievements: [
        "Full loop works end to end: answer, grade, reschedule, dashboard",
        "43 German grammar topics, 860 sentences, 900 blanks shipped",
        "TypeScript types generated from Rust structs, checked in CI by the test suite",
        "Everything runs locally against a single SQLite file",
      ],
      gallery: [],
    },
  ],
  experience: [
    {
      company: "intuivo",
      role: "Software Engineering Intern, remote",
      date: "04.2025 to 08.2025",
      detail:
        "Full-stack apps in Rust (Actix, Sled) and TypeScript (React, Next.js, Mithril). Built an AI-assisted CMS with versioning and citations, integrated Stripe, PayPal, and Klarna.",
    },
    {
      company: "ClimaNova",
      role: "Team Lead, course project",
      date: "Spring 2024",
      detail:
        "Led the mobile team building a cross-platform Flutter weather app. One of the top grades in the course.",
    },
    {
      company: "B.Sc Software Engineering",
      role: "University of Europe for Applied Sciences",
      date: "09.2022 to 02.2026",
      detail:
        "Potsdam, Germany. Graduated February 2026 with a GPA of 2.0 (German scale).",
    },
  ],
};
