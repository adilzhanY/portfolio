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
    bookingLabel: "Book a 15 minute call",
    credit: "Designed, built, and operated end to end.",
  },

  projects: {
    "berlin-walk": {
      summary:
        "A walkable, flyable 3D reconstruction of central Berlin that runs in the browser from a single link. Raw WebGL2, real OpenStreetMap data, no engine and no library. I wrote one prompt and Claude Fable 5.1 built all of it in four hours while I watched the numbers.",
      metric: "7,895 lines, 4 h 08 min, $27.49 of tokens, zero human code",
      postmortem: [
        "The ground z-fought: roads flickered through pavements at every distance. The vertex format stored positions at 1/32 m to save bytes, and the six ground layers, which sit between 0 and 6 cm apart, collapsed onto two heights. The agent found it by reading the binary bundle it had designed, not by staring at the picture, and moved 531 of the 532 tiles to a 1/128 m grid. The one tile that holds the 368 m TV Tower stays coarse because it needs the range.",
        "The TV Tower was invisible from the Brandenburg Gate, which is the one shot the prompt asked for. Nothing was wrong with the geometry: the tile was loaded, inside the frustum, and drawn. Zooming into the pixels showed sunlit concrete at 2 km had exactly the brightness of the horizon sky behind it. The fix was lighting, a dimmer sun, a brighter sky and darker concrete, and then the tower reads at the end of Unter den Linden the way it does in photographs.",
        "What I take from it: when the agent could not verify, it built a way to verify. Headless Chromium never took a screenshot of a page with a render loop, so it wrote a DevTools protocol client and took thirty of them. The debugging was worth more than the code.",
      ],
      imageAlt: "Berlin Walk, the Brandenburg Gate from Pariser Platz",
      problem:
        "Could a coding agent build a real 3D city from scratch, with no engine to lean on, from one prompt and no questions? I wanted a measured answer, not a demo: the bounding box, the constraints and the deliverables were fixed in advance, and every token, dollar and minute was counted.",
      solution: [
        "The data pipeline fetches the Overpass extract for 2.7 by 1.9 km of Mitte, parses the XML with its own tokenizer, and extracts buildings with heights and roof shapes, roads with widths and surfaces, the Spree, parks, tree rows, rails and stations. Every polygon is triangulated by its own ear clipping with holes, extruded, and cut into 532 tiles of 100 m with a 16 byte vertex format, a collision layer and the trees. The Gate, the Reichstag, the Cathedral, the TV Tower and the 2711 stelae of the memorial are generated from their mapped outlines.",
        "The runtime is raw WebGL2: a tile streamer with frustum culling, two cascaded shadow maps, a sun computed from the real date and latitude, a procedural sky, and one material shader that draws facades with window grids and lit windows at night, lane markings, cobblestones, grass and water with sky reflections, all from a per building seed and no textures. HDR, bloom, tone mapping and FXAA sit on top, with three quality tiers picked from the measured frame time.",
        "The game layer has a capsule character controller swept against the building walls at 60 Hz, a flying mode, an intro drone shot, discovery cards for eleven landmarks, a minimap drawn from the same road data, photo mode, shareable links, and an ambience synthesised on the Web Audio API: traffic, water, birds, U-Bahn rumble and footsteps that change with the surface.",
      ],
      achievements: [
        "Live at adilzhany.github.io/berlin-walk, 10.5 MB total, 4.5 MB gzipped, static files only",
        "308,100 triangles from real OpenStreetMap data, 5,323 buildings, 10,757 trees, 47,018 collision edges",
        "2.3 ms of GPU time per frame at 1080p on an RTX 5070, 60 fps vsync capped",
        "One prompt, 137 API calls, 34.6 million tokens, $27.49, 4 hours and 8 minutes to the public URL",
        "The agent verified itself: 30 headless screenshots, scripted collision tests, unit tests for the pipeline",
      ],
      gallery: {
        flight: { alt: "Flying over Unter den Linden toward the TV Tower", caption: "Flying mode over Unter den Linden" },
        gate: { alt: "The Brandenburg Gate seen from Pariser Platz", caption: "Spawn point, Pariser Platz" },
        linden: { alt: "Unter den Linden with its lindens", caption: "Unter den Linden" },
        memorial: { alt: "Between the stelae of the Holocaust Memorial", caption: "Inside the memorial, 2711 stelae" },
        tower: { alt: "The Fernsehturm from Karl-Liebknecht-Strasse", caption: "The TV Tower" },
        night: { alt: "Pariser Platz at night with lit windows", caption: "Night, windows lit per window" },
      },
    },

    "whale-abyss": {
      summary:
        "E-commerce platform for Genshin Impact boosting, built and launched alone. Paid orders flow straight into a Telegram bot, payments clear end to end, CI/CD deploys on every push.",
      metric: "150+ paying customers in the first 10 days",
      postmortem: [
        "On 12 July a customer paid 2000 RUB for a service that requires quest declarations, and the order reached the booster with nothing declared. I shipped a fix that retried the fetch three times and warned in Telegram. On 25 July it happened again, same amount, order 96162b2e. The fix had not held, because it aimed at the wrong code path.",
        "So I stopped guessing and went to the data. Of 27 gated order lines, exactly two were broken, and there were no bad carts at all. The real cause was that the parent item stored undefined, so the customer's choice existed only as separate cart lines, and deleting one of those lines threw the choice away silently, with no error and no log. The fix was an explicit value plus a server check that re-reads the links at checkout and returns 409, which the cart page catches and re-opens the dialog, so nothing is lost. Then I replayed 50 real paid orders against it. It blocked exactly the two bad ones and passed the other 48.",
        "Two things stayed with me. A check in the client is good usability, not a guarantee, and if it involves money the rule belongs on the server. And a fix is not a fix until the data says so.",
      ],
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
        "Live in production at whaleabyss.com, still operated by me",
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
      postmortem: [
        "Push notifications took the whole app down and I did not notice for weeks. expo-notifications re-exports a helper that calls addPushTokenListener at module scope, and that call throws in Expo Go on Android because SDK 53 removed remote push. A throw during require kills the entire bundle, so the app showed a red runtime-not-ready box and never rendered a single frame. My pushSupported() guards were useless, because the crash happened at import time, before any of my code ran. I found it on an emulator on 9 August, and it had been broken since push landed. The fix is a dynamic import behind the guard. The lesson is that a guard only protects code that gets to run.",
        "The second one was about honesty rather than code. I had claimed a population of 2.2 million lifters, and that number was wrong in four places, including the paywall copy. When I rebuilt the dataset the real figures were 1.46 million per-lifter bests, and between 133,697 and 401,158 for an individual lift. I corrected every surface. Torq now always says \"of competitive lifters\" and names the sample size instead of \"top N% of people\", because everyone in that database entered a sanctioned meet and is a much stronger crowd than the gym floor.",
      ],
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

    sendoku: {
      summary:
        "An Android sudoku app that can tell you why a puzzle is hard. Every puzzle is solved by a technique solver before you see it, so the level is the hardest human rule it actually needs, and the same solver writes the hints and the 45 lesson course.",
      metric: "4,200 rated puzzles, 860 tests, 3.1 MB, no internet permission",
      postmortem: [
        "The worst bug in this app ended games it had already decided were lost. A wrong digit can break no rule at all, so nothing on the board showed it, but the mistake counter in the header had gone up, which means the app knew and said nothing. Twenty moves later a cell could take no digit whatsoever, every attempt at it cost another mistake, and three attempts finished an Easy puzzle that had been unwinnable since the hidden slip. Two rules came out of it. If a mistake is charged for, it is marked at once, so while a mistake limit runs the marking is not a preference. And a cell is only charged for while its own answer can still be written in it, because past that point the player is paying twice for one error. There is a test file named after the rules.",
        "The hint engine had the same shape of problem. A hint would rule a digit out of a cell, the player had written no pencil marks there, so nothing visible changed, and the next hint would announce that the cell had only one candidate left. From where the player sat it had two, and the app was telling them to guess. Now every cell a hint touches keeps its true marks, and a hint that leans on an earlier hint says so on the card. Whatever a hint proves has to end up somewhere the player can read it.",
      ],
      imageAlt: "Sendoku, harder than it looks",
      problem:
        'Every sudoku app calls its hardest level Extreme, and almost none of them can say why a puzzle is hard, because the label comes from clue count rather than from logic. Sendoku rates each puzzle by the hardest human technique needed to finish it, which is why the ladder can keep climbing past where the commercial apps stop.',
      solution: [
        "The engine is pure Kotlin with no Android imports: a bitmask solver, a uniqueness counter, a generator, and 28 human techniques plus 4 for Killer, from naked singles up to ALS-XZ and Death Blossom. That one solver is three features at once. It rates the puzzle, it writes the hint, and it guarantees that nothing in the app ever has to be guessed.",
        "A hint never just gives the digit. It names the technique, lights the cells the argument rests on, writes the argument out, and only then offers to make the move, across four levels of help so the player chooses how far in to go. Every rule has a lesson behind it, one tap away, and the course is 45 lessons over 13 stages worked on a real board, starting at 4x4 grids and ending with chains written the way they are on paper. Finish a lesson and the app hands you a puzzle that needs exactly that rule, picked out of the batch by the same solver that rated it.",
        "Hard puzzles are too rare to generate on a phone, so 4,000 classic and 200 Killer puzzles ship pre-rated in a gzipped batch of 227 KB, and the generator makes the easy ones on the device when a level runs out. The daily puzzle is seeded from the date, so everybody gets the same grid with no backend, and any puzzle carries a short code you can send to a friend. Killer sudoku is rated on the same scale, because the rater walks the cage rules and the ordinary ones together.",
        "There is no internet permission in the manifest, which is a claim you can check in the APK rather than take on trust, and the GPL-3.0 licence is what makes the source checkable at all. Storage is Room on the phone, with no account and no cloud. Four themes each carry their own typeface, subset down to the characters the app can draw so eight font files fit in 260 KB, and the app speaks 12 languages including Arabic right to left.",
      ],
      achievements: [
        "860 tests: 681 on the JVM and 179 on a device, over the solver and generator where a silent bug ships broken puzzles",
        "32 human techniques implemented, 8 difficulty levels, and 45 lessons that teach them",
        "3.1 MB installed, R8 shrunk, minSdk 26, one Activity and no fragments",
        "No internet permission at all, so the privacy claim is verifiable rather than asserted",
        "12 languages, right to left included, and every label stays whole at 200% font scale",
      ],
      gallery: {
        home: { alt: "Sendoku home screen with a game in progress", caption: "Home" },
        hint: { alt: "A Sendoku hint explaining an X-Wing", caption: "A hint that teaches" },
        learn: { alt: "The Sendoku course map, 45 lessons", caption: "45 lessons" },
        killer: { alt: "Killer sudoku with cages", caption: "Killer, same scale" },
        you: { alt: "The Sendoku record page", caption: "Your record" },
      },
    },

    openhyprwhisper: {
      summary:
        "System-wide voice dictation for Hyprland. Press a key, speak, and whisper.cpp types your words into whatever text field is focused. Fully local and private, with per-utterance language detection for mixed EN/RU/DE/KK speech, deterministic replacements, and an optional LLM polish pass.",
      metric: "~0.2 s per sentence with the warm daemon, fully offline",
      postmortem: [
        "The first version reloaded the model for every phrase, which meant reading roughly 600 MB off disk before a single word appeared. It worked, but it was too slow to actually use, and I kept falling back to the keyboard. Moving to a warm whisper-server daemon that keeps the model in VRAM is what turned a demo into something I use every day, at about 0.2 s per sentence.",
        "The stranger problem was that stopping without speaking produced text anyway. Whisper is trained on speech, so given near-silence it confidently returns the most common thing in its training data, usually \"Thank you.\" Catching that in the language model was the wrong layer. The fix is a silence gate on the audio peak, before transcription runs at all, so silence produces nothing rather than something plausible.",
      ],
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
      postmortem: [
        "Sync looked finished, and then deleted rows started coming back. The write hooks that stamp local rows were also firing when the sync layer applied changes pulled from the server, so a pulled row re-stamped its own updatedAt and looked freshly edited, and a pulled delete created a brand new tombstone. Two devices could pass the same delete back and forth indefinitely, each one honestly reporting that it had just happened.",
        "The fix is small: a suppress flag the sync layer sets around remote applies, so the hooks stay quiet while the server's version is written in. What it taught me is that the hard part of offline-first is not merging, it is knowing which writes are news and which are echoes.",
      ],
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
        "Whale Abyss: a production e-commerce platform for game boosting with real payments, 150+ paying customers in the first 10 days, live at whaleabyss.com and operated by me since launch.",
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
      menu: "Menu",
      close: "Close menu",
    },
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      xing: "XING",
      telegram: "Telegram",
      reddit: "Reddit",
      x: "X",
      email: "Email",
    },
    theme: { toggle: "Toggle dark mode" },
    dictation: { recording: "Recording", transcribing: "Transcribing", done: "Done" },
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
      saveContact: "Save contact",
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
      wentWrong: "What went wrong",
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
      puzzleIntro:
        "Have a four by four instead. Every row, column, and box holds 1 to 4 exactly once.",
      hint: "Hint",
      doIt: "Do it",
      erase: "Erase",
      hintSingle:
        "Only a {{digit}} fits here. The other digits are already in its row, column, or box.",
      hintWrong: "One of the digits is wrong. It is marked.",
      hintNone: "Nothing left to place.",
      solved: "Solved. That was the easy one.",
      solvedAction: "Now go home",
      boardLabel: "Four by four sudoku",
      cellLabel: "Row {{row}}, column {{col}}",
    },
  },

  uses: {
    heading: "Uses",
    intro:
      "The machine and the tools I actually work on every day. Two of the things listed here are my own, which is roughly how they came to exist: I wanted them on this desktop.",
    groups: {
      machine: "Machine",
      desktop: "Desktop",
      editor: "Editor",
      terminal: "Terminal",
      everyday: "Everyday",
    },
    notes: {
      gpu: "Runs whisper.cpp and local models for OpenHyprWhisper.",
      os: "Rolling release, currently on kernel 7.1.",
      wm: "Tiling Wayland compositor. Both of my desktop tools target it.",
      dots: "The base setup I build my own panels on top of.",
      panel: "My own life tracker, written in Quickshell and QML.",
      dictation: "My own voice dictation, fully local, no cloud.",
      nvim: "My own config rather than a distribution: LSP for TypeScript, React and Tailwind, fzf-lua, auto-session.",
      vscode: "For pairing, and when a project expects it.",
      fish: "The shell I actually type in.",
      atuin: "Shell history that is searchable and synced.",
      gh: "Most of my GitHub work happens here instead of in a browser.",
      espanso: "Text expansion for the phrases I retype.",
      font: "Everywhere: terminal and editor.",
    },
  },

  now: {
    heading: "Now",
    intro: "What I am working on at the moment, and where to find me. This page changes as the work does.",
    updated: "Updated {{date}}",
    building: "Building",
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
    usesTitle: "Uses",
    usesDescription:
      "The machine, desktop, editor and tools I work on every day: Arch Linux, Hyprland, Neovim, and two desktop tools I wrote myself.",
    nowTitle: "Now",
    nowDescription:
      "What Adilzhan Yerzhan is working on right now: Sendoku and Torq, and open to work.",
  },
};
