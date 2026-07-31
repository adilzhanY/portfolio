export interface Experience {
  id: number;
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
}

export interface Project {
  id: string;
  /** URL segment: /work/<slug> */
  slug: string;
  title: string;
  /** The colour this project owns. It floods the UI whenever the project is open. */
  accent: string;
  /** Darker end of the wash gradient on the project page. */
  accentDeep: string;
  year: string;
  /** One line, shown on the index while hovering. */
  summary: string;
  /** The single fact worth remembering. */
  metric: string;
  role: string;
  stack: string[];
  tech: string;
  desc: string;
  /** Case-study paragraphs on the project page. */
  body: string[];
  link: string;
  /** Optional screenshot in /public/work/. Falls back to a colour panel. */
  image?: string;
}

export interface Education {
  uni: string;
  degree: string;
  date: string;
  gpa: string;
}

export interface CV {
  name: string;
  nickname: string;
  role: string;
  location: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: Education;
}

export const CV_DATA: CV = {
  name: "Adilzhan Yerzhan",
  nickname: "qantrr",
  role: "Software Engineering Student & Full-Stack Developer",
  location: "Potsdam, Germany",
  contact: {
    email: "mailto:adilzhan1112@gmail.com",
    github: "https://github.com/adilzhanY",
    linkedin: "https://linkedin.com/in/adilzhanyerzhan",
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
  experience: [
    {
      id: 1,
      company: "intuivo",
      role: "Software Engineering Intern",
      date: "04 2025 - 08 2025",
      location: "Remote",
      bullets: [
        "Engineered a suite of full-stack applications using Rust (Actix, Sled DB) and TypeScript frameworks including Mithril.js, React, and Next.js.",
        "Developed an internal AI-assisted content management system with robust versioning, export options, and citation handling.",
        "Integrated secure payment APIs from Stripe, PayPal, and Klarna into proof-of-concept applications.",
      ],
    },
    {
      id: 2,
      company: "ClimaNova",
      role: "Team Lead (Frontend Programming Course Project)",
      date: "Spring 2024",
      location: "Potsdam, Germany",
      bullets: [
        "Led the mobile application team for ClimaNova, a cross-platform weather app built in Flutter.",
        "Coordinated a team of developers end to end, tracking progress and running regular planning calls.",
        "Drove the project to one of the top grades in the course through clear task delegation and hands-on technical leadership.",
      ],
    },
  ],
  projects: [
    {
      id: "whaleabyss",
      slug: "whale-abyss",
      title: "Whale Abyss",
      accent: "#0e5c6b",
      accentDeep: "#06333c",
      year: "2025",
      summary:
        "An e-commerce platform for Genshin Impact boosting, built and launched alone.",
      metric: "150+ paying customers in the first 10 days",
      role: "Solo — design, build, launch, operations",
      stack: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Drizzle",
        "NextAuth",
        "Yandex Cloud",
      ],
      tech: "Next.js, TypeScript, Tailwind, PostgreSQL, Drizzle, Zustand, NextAuth, Yandex Cloud",
      desc: "Full-scale e-commerce platform for Genshin Impact boosting, built and launched solo: real-time order automation via Telegram Bot, full payment processing, and a CI/CD auto-deploy pipeline. 150+ paying customers within the first 10 days.",
      body: [
        "Boosting services are sold in Discord servers and spreadsheets. Orders get lost, payments are manual, and nobody knows what state anything is in. Whale Abyss replaces that with a real storefront.",
        "Orders flow straight into a Telegram bot the moment they are paid, so the people doing the work see them without opening a dashboard. Payments clear end to end, and a CI/CD pipeline deploys on every push.",
        "It reached 150+ paying customers within ten days of launch. I designed it, built it, shipped it and still run it.",
      ],
      link: "https://github.com/adilzhanY/whaleabyss",
      image: "/projects/whaleabyss.webp",
    },
    {
      id: "grit",
      slug: "grit",
      title: "Grit",
      accent: "#7b5bf0",
      accentDeep: "#3f2a96",
      year: "2025",
      summary:
        "A life tracker that stops asking you to open five different apps.",
      metric: "One XP economy across web and mobile",
      role: "Solo — architecture, web and mobile",
      stack: [
        "Next.js",
        "React 19",
        "Expo",
        "React Native",
        "Supabase",
        "Dexie",
      ],
      tech: "Next.js, React 19, TypeScript, Expo, React Native, Supabase, Dexie",
      desc: "Gamified all-in-one life tracker for habits, food, steps, weight, and focus, unified by one XP economy. Monorepo sharing a platform-agnostic core across web and mobile, with local-first offline storage and delta cloud sync.",
      body: [
        "Habits in one app, food in another, steps in a third. Each one gives you a separate streak to feel guilty about. Grit puts habits, food, steps, weight and focus into a single XP economy, so an ordinary day still adds up to something.",
        "It is a monorepo with a platform-agnostic core shared by the web app and the mobile app, so a rule written once behaves the same everywhere.",
        "Storage is local-first: everything works offline and syncs deltas when a connection comes back. The app never waits on the network to let you log something.",
      ],
      link: "https://github.com/adilzhanY/grit",
      image: "/projects/grit.webp",
    },
    {
      id: "torq",
      slug: "torq",
      title: "Torq",
      accent: "#e8913a",
      accentDeep: "#8f4f10",
      year: "2024",
      summary:
        "A workout tracker for the gym basement, where there is no signal.",
      metric: "1,500 exercises, fully offline",
      role: "Solo — Android",
      stack: ["React Native", "Expo", "TypeScript", "NativeWind", "Supabase"],
      tech: "React Native, Expo, TypeScript, NativeWind, Supabase",
      desc: "Offline-first workout tracker for Android with live set logging, rest timers, a searchable 1,500-exercise catalog with animated demos, and personal records tracking.",
      body: [
        "Most gyms have no reception, and most workout apps quietly stop working there. Torq assumes the network is gone and treats a connection as a bonus.",
        "Sets are logged live between reps, rest timers run in the background, and a catalogue of 1,500 exercises with animated demos is searchable without loading anything.",
        "Personal records update as you lift, so progress is visible on the same screen where the work happens.",
      ],
      link: "https://github.com/adilzhanY/torq",
    },
  ],
  education: {
    uni: "University of Europe for Applied Sciences",
    degree: "B.Sc in Software Engineering",
    date: "09 2022 - 02 2026",
    gpa: "2.0 (German scale)",
  },
};
