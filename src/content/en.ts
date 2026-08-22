import type { Content } from "./types";

export const content: Content = {
  name: "Adilzhan Yerzhan",
  tagline: "Full-Stack Web and Mobile Developer",
  intro:
    "I design, build, launch, and run my own products end to end: an e-commerce storefront with real paying customers, and offline-first apps for training and habits. I hold a B.Sc in Software Engineering (February 2026) and am open to full-time, contract, freelance, and remote roles.",
  location: "Potsdam, Germany",
  languages: ["Kazakh", "Russian", "English", "German"],
  about: [
    "I like the whole arc of a product: finding a real problem, designing the thing, building it, shipping it, and then keeping it running with real users on it. That is how I learn. Whale Abyss taught me payments, webhooks, and operations because paying customers showed up on day one. Torq and Grit taught me offline-first architecture and sharing one domain core between web and mobile.",
    "I work across the stack: TypeScript and React on the front, Node.js and Rust on the back, React Native and Expo on mobile, PostgreSQL and SQLite underneath. I speak {{languages}}.",
  ],
  footer: {
    heading: "Let's work together.",
    blurb:
      "Open to full-time, contract, freelance, and remote work. Based in Potsdam, Germany. I read everything and answer properly.",
    emailLabel: "Email",
    linkedinLabel: "Let's connect",
    telegramLabel: "Telegram",
    credit: "Designed, built, and operated end to end.",
  },

  projects: {
    "whale-abyss": {
      summary:
        "E-commerce platform for Genshin Impact boosting, built and launched alone. Paid orders flow straight into a Telegram bot, payments clear end to end, CI/CD deploys on every push.",
      metric: "150+ paying customers in the first 10 days",
      imageAlt: "Whale Abyss, the abyss cleared",
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
      gallery: {
        hero: { alt: "Whale Abyss landing page", caption: "Landing page" },
        services: { alt: "Whale Abyss service catalog", caption: "Service catalog" },
        cart: { alt: "Whale Abyss cart and checkout", caption: "Cart and checkout" },
        reviews: { alt: "Whale Abyss reviews", caption: "Moderated reviews" },
      },
    },

    torq: {
      summary:
        "A gym app that tells you how strong you actually are. Every set is scored with the DOTS formula, normalised for bodyweight and sex, and turned into a rank across nine tiers, with percentiles from 400k+ OpenPowerlifting lifters.",
      metric: "Nine rank tiers, 243 tests, local-first with free sync",
      imageAlt: "Torq, strength ranked",
      problem:
        'Most gym apps tell you how much you lifted, almost none tell you how strong that makes you. Raw kilos are meaningless across bodyweights: the same 100 kg bench is a different achievement at 60 kg than at 110 kg. Torq scores every set with the DOTS formula, the same normalisation powerlifting uses, and turns it into a rank you climb.',
      solution: [
        'Your rank comes from your best estimated 1RM on each lift, scored with the official DOTS polynomial and mapped across nine tiers, from Rust to World Class. Every competition lift also carries a percentile measured against up to 401,000 competitive raw lifters per lift in the OpenPowerlifting database, and the app is honest about the population: it says "of competitive lifters" every time it shows the number.',
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
      gallery: {
        home: { alt: "Torq home screen with today's session", caption: "Today's session" },
        live: { alt: "Torq live set logger", caption: "Live logger" },
        ranks: { alt: "Torq nine rank tiers", caption: "Nine tiers" },
        stats: { alt: "Torq progress chart with tier bands", caption: "The climb" },
        history: { alt: "Torq session history timeline", caption: "History" },
      },
    },

    openhyprwhisper: {
      summary:
        "System-wide voice dictation for Hyprland. Press a key, speak, and whisper.cpp types your words into whatever text field is focused. Fully local and private, with per-utterance language detection for mixed EN/RU/DE/KK speech, deterministic replacements, and an optional LLM polish pass.",
      metric: "~0.2 s per sentence with the warm daemon, fully offline",
      imageAlt: "OpenHyprWhisper, press a key, speak, it types",
      problem:
        "Linux on Wayland has no system-wide voice dictation, and the cloud alternatives ship your audio to someone else's servers. OpenHyprWhisper is dictation that works in every app and never lets audio leave the machine.",
      solution: [
        "Press a keybind, speak, press again: PipeWire records, whisper.cpp transcribes on CUDA or Vulkan, and the words are typed into whatever text field is focused, in the browser, the terminal, or a chat app. A warm whisper-server daemon keeps the model in VRAM, so transcription starts instantly instead of reloading roughly 600 MB per phrase.",
        'Three correction layers clean the raw transcript: a vocabulary prompt biases recognition toward your jargon, deterministic replacements fix stubborn mishearings in about 10 ms, and an optional LLM polish pass (llama.cpp with Qwen2.5-3B bundled) has a full mode for documents and a light mode that only fixes names so chat messages still sound like you. A silence gate stops the classic hallucinated "Thank you." when you stop without speaking.',
        "The recording indicator is an animated Quickshell pill with a live waveform that can pin to a screen edge or attach to the focused window, and it follows the Material palette on end-4/dots-hyprland setups. Everything is managed through one CLI: mic picker, transcription history, a persistent enable/disable switch wired into systemd user units, and per-utterance language auto-detection for mixed English, Russian, German, and Kazakh speech.",
      ],
      achievements: [
        "About 0.2 s per sentence with the warm daemon on an RTX 5070",
        "Works in any application with a focused text input",
        "Fully local: no cloud, no telemetry, no subscription",
        "Auto language detection per utterance across EN, RU, DE, and KK",
        "Open source, published with install docs and an end-4 dots-hyprland integration",
      ],
      gallery: {
        recording: {
          alt: "Recording state with live waveform and timer",
          caption: "Recording, live waveform",
        },
        transcribing: { alt: "Transcribing state", caption: "Transcribing on the GPU" },
        polishing: { alt: "Polishing state", caption: "Optional LLM polish" },
        done: { alt: "Done state", caption: "Typed into the focused field" },
        light: { alt: "Light theme pill", caption: "Follows the system palette live" },
      },
    },

    grit: {
      summary:
        "A life tracker that stops asking you to open five different apps. Habits, food, steps, weight, and focus in one XP economy, with web, mobile, and a Hyprland desktop panel sharing one domain core, offline-first with delta sync.",
      metric: "One XP economy across web, mobile, and desktop",
      imageAlt: "Grit, one life, one XP economy",
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
      gallery: {
        myday: { alt: "Grit My Day view with daily quests", caption: "My Day and quests" },
        focus: { alt: "Grit focus timer with per-task ranks", caption: "Focus ranks" },
        bad: { alt: "Grit bad habit streak cards", caption: "Clean streaks" },
        food: { alt: "Grit daily food log with fasting timer", caption: "Daily log" },
        stats: { alt: "Grit XP ledger and stats", caption: "The ledger" },
      },
    },
  },

  experience: {
    independent: {
      company: "Independent products",
      role: "Solo developer and operator",
      date: "2024 to present",
      detail:
        "Designed, built, launched, and still operate my own products: Whale Abyss, Torq, Grit, and OpenHyprWhisper.",
      bullets: [
        "Whale Abyss: a production e-commerce platform for game boosting with real payments, 150+ paying customers in the first 10 days, live at whaleabyss.ru and operated by me since launch.",
        "Torq: an offline-first gym app that scores every set with the DOTS formula and ranks strength across nine tiers, backed by 243 tests.",
        "Grit: a gamified life tracker with one XP economy shared across a Next.js web app, an Expo mobile app, and a Quickshell desktop panel.",
        "OpenHyprWhisper: fully local voice dictation for the Hyprland desktop built on whisper.cpp, published open source.",
      ],
    },
    intuivo: {
      company: "intuivo",
      role: "Software Engineering Intern, remote",
      date: "04.2025 to 08.2025",
      detail:
        "Full-stack apps in Rust (Actix, Sled) and TypeScript (React, Next.js, Mithril). Built an AI-assisted CMS with versioning and citations, integrated Stripe, PayPal, and Klarna.",
      bullets: [
        "Engineered a suite of full-stack applications using Rust (Actix, Sled DB) and TypeScript frameworks including Mithril.js, React, and Next.js.",
        "Developed an internal AI-assisted content management system with robust versioning, export options, and citation handling.",
        "Integrated secure payment APIs from Stripe, PayPal, and Klarna into proof-of-concept applications.",
      ],
    },
    climanova: {
      company: "ClimaNova",
      role: "Team Lead, course project",
      date: "Spring 2024",
      detail:
        "Led the mobile team building a cross-platform Flutter weather app. One of the top grades in the course.",
      bullets: [
        "Led the mobile application team for ClimaNova, a cross-platform weather app built in Flutter.",
        "Coordinated a team of developers end to end, tracking progress and running regular planning calls.",
        "Drove the project to one of the top grades in the course through clear task delegation and hands-on technical leadership.",
      ],
    },
    degree: {
      company: "B.Sc Software Engineering",
      role: "University of Europe for Applied Sciences",
      date: "09.2022 to 02.2026",
      detail:
        "Potsdam, Germany. Graduated February 2026 with a GPA of 2.0 (German scale).",
      bullets: [
        "Graduated February 2026 with a GPA of 2.0 (German scale).",
        "Studied in Potsdam, Germany, building most of my portfolio projects alongside the degree.",
      ],
    },
  },

  ui: {
    nav: {
      aria: "Main",
      home: "Home",
      projects: "Projects",
      experience: "Experience",
    },
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      telegram: "Telegram",
      email: "Email",
    },
    theme: { toggle: "Toggle dark mode" },
    language: { label: "Language" },
    home: {
      avatarTitle: "Yes, that's me",
      verified: "Verified",
      sectionProjects: "Projects",
      details: "Details",
      seeAllProjects: "See all projects",
      sectionAbout: "About",
      sectionExperience: "Experience",
      sectionSkills: "Skills",
      sectionActivity: "GitHub Activity",
      sectionCertifications: "Certifications",
    },
    projects: {
      heading: "Projects",
      intro:
        "Each of these is a real product, not a tutorial build. Click one for the full case study.",
      readCaseStudy: "Read the case study",
    },
    project: {
      back: "All projects",
      github: "GitHub",
      live: "Live site",
      problem: "The problem",
      built: "What I built",
      highlights: "Highlights",
      stack: "Stack",
      inDetail: "In detail",
    },
    experience: {
      heading: "Experience",
      intro: "What I actually did in each role, newest first.",
    },
    certifications: { showCredential: "Show credential" },
    resume: {
      open: "View Resume",
      viewer: "Resume viewer",
      zoomOut: "Zoom out",
      zoomIn: "Zoom in",
      download: "Download",
      close: "Close",
      loading: "Loading resume…",
      error: "Could not load the PDF.",
      errorAction: "Download it instead.",
    },
    visitors: "Visited by {{count}} people",
    calendar: {
      months: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      less: "Less",
      more: "More",
      totalCount: "{{count}} contributions in {{year}}",
    },
    notFound: {
      title: "Page not found",
      body: "That page does not exist, or it moved.",
      action: "Back to the home page",
    },
  },

  meta: {
    siteTitle: "Adilzhan Yerzhan - Software Engineer",
    titleTemplate: "%s - Adilzhan Yerzhan",
    siteDescription:
      "Adilzhan Yerzhan, software engineer in Potsdam. Products designed, built, and launched solo.",
    ogTitle: "Adilzhan Yerzhan - Full-Stack Web and Mobile Developer",
    ogDescription:
      "Products designed, built, launched, and operated solo: e-commerce with real customers, offline-first apps, and open source.",
    projectsTitle: "Projects",
    projectsDescription:
      "Products designed, built, launched, and operated solo: Whale Abyss, Torq, OpenHyprWhisper, and Grit.",
    experienceTitle: "Experience",
    experienceDescription:
      "Career timeline: solo products in production, a software engineering internship at intuivo, team leadership, and a B.Sc in Software Engineering.",
  },
};
