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
    email: "mailto:youremail@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  skills: [
    "Rust",
    "TypeScript",
    "React",
    "Next.js",
    "Actix Web",
    "Tailwind CSS",
    "AWS",
    "PostgreSQL",
    "Supabase",
    "Vapi AI",
  ],
  experience: [
    {
      id: 1,
      company: "intuivo",
      role: "Software Engineering Intern",
      date: "04 2025 - 08 2025",
      location: "Remote",
      bullets: [
        "Engineered a suite of full-stack applications using Rust (Actix, Sled DB) and TypeScript frameworks (Mithril.js, React, Next.js).",
        "Developed an internal AI-assisted content management system with robust versioning and citation handling.",
        "Integrated secure payment APIs (Stripe, PayPal, Klarna) into PoC applications.",
        "Pioneered an AI-powered SQL manager to automatically generate and execute MySQL and PostgreSQL queries.",
      ],
    },
  ],
  projects: [
    {
      id: "vitron",
      title: "Vitron",
      tech: "React Native, Expo, TS, NeonDB, AWS, Nest.js, Rust",
      desc: "All-in-one fitness app for tracking meals, weight, and habits. Features AI-powered image flow via AWS Lambda (Rust) & OpenAI for meal photo analysis.",
    },
    {
      id: "resume",
      title: "AI Resume Analyzer",
      tech: "React, TS, Vite, Tailwind, PDF.js, Zustand",
      desc: "Tool with AI-driven ATS scoring and content summarization. Integrated PDF.js for document processing and built a responsive feedback interface.",
    },
    {
      id: "converso",
      title: "Converso",
      tech: "Next.js, TS, React 19, Vapi AI, Supabase",
      desc: "Real-time AI teaching platform with voice interaction. Features modular architecture, secure auth, and robust error tracking via Sentry.",
    },
    {
      id: "taskapi",
      title: "Task Mgmt API",
      tech: "Rust, Actix Web, Serde, JSON",
      desc: "High-performance REST API with thread-safe shared state (Mutex), custom persistent JSON storage, CORS middleware, and auth validation.",
    },
  ],
  education: {
    uni: "University of Europe for Applied Sciences",
    degree: "B.Sc in Software Engineering",
    date: "09 2022 - 02 2026",
    gpa: "83.47/100",
  },
};
