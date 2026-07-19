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
  title: string;
  tech: string;
  desc: string;
  link: string;
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
      title: "Whale Abyss",
      tech: "Next.js, TypeScript, Tailwind, PostgreSQL, Drizzle, Zustand, NextAuth, Yandex Cloud",
      desc: "Full-scale e-commerce platform for Genshin Impact boosting, built and launched solo: real-time order automation via Telegram Bot, full payment processing, and a CI/CD auto-deploy pipeline. 150+ paying customers within the first 10 days.",
      link: "https://github.com/adilzhanY/whaleabyss",
    },
    {
      id: "grit",
      title: "Grit",
      tech: "Next.js, React 19, TypeScript, Expo, React Native, Supabase, Dexie",
      desc: "Gamified all-in-one life tracker for habits, food, steps, weight, and focus, unified by one XP economy. Monorepo sharing a platform-agnostic core across web and mobile, with local-first offline storage and delta cloud sync.",
      link: "https://github.com/adilzhanY/grit",
    },
    {
      id: "torq",
      title: "Torq",
      tech: "React Native, Expo, TypeScript, NativeWind, Supabase",
      desc: "Offline-first workout tracker for Android with live set logging, rest timers, a searchable 1,500-exercise catalog with animated demos, and personal records tracking.",
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
