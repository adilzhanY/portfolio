import { getCV } from "@/data/cv";
import { CERTIFICATIONS, PROFILE, SKILLS } from "@/data/structure";
import type { Project } from "@/data/cv";
import { localePath, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/i18n/metadata";

/** BCP 47 tags for the languages spoken, in the order the CV lists them. */
const SPOKEN = ["kk", "ru", "en", "de"];

export function personSchema(locale: Locale) {
  const cv = getCV(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    url: `${SITE_URL}${localePath(locale, "/")}`,
    image: `${SITE_URL}${PROFILE.avatar}`,
    jobTitle: cv.tagline,
    description: cv.intro,
    email: `mailto:${cv.contact.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Potsdam",
      addressCountry: "DE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Europe for Applied Sciences",
    },
    knowsLanguage: SPOKEN,
    knowsAbout: [...SKILLS],
    hasCredential: CERTIFICATIONS.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.title,
      credentialCategory: "certificate",
      recognizedBy: { "@type": "Organization", name: cert.issuer },
      url: cert.url,
    })),
    sameAs: [PROFILE.contact.github, PROFILE.contact.linkedin, PROFILE.contact.reddit, PROFILE.contact.x],
  };
}

export function projectSchema(locale: Locale, project: Project) {
  const cv = getCV(locale);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}${localePath(locale, `/projects/${project.id}`)}`,
    codeRepository: project.link,
    programmingLanguage: project.stack,
    dateCreated: project.year,
    inLanguage: locale,
    ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
    author: {
      "@type": "Person",
      name: cv.name,
      url: `${SITE_URL}${localePath(locale, "/")}`,
    },
  };
}
