import { getCV } from "@/data/cv";
import { CERTIFICATIONS, EXPERIENCE_ORDER, PROFILE } from "@/data/structure";
import { DEFAULT_LOCALE, LOCALES, localePath } from "@/i18n/config";
import { SITE_URL } from "@/i18n/metadata";

export const dynamic = "force-static";

/**
 * /llms.txt, the plain-text summary AI crawlers read. Generated from the same
 * data the pages render, so it cannot drift out of date.
 */
export function GET() {
  const cv = getCV(DEFAULT_LOCALE);

  const lines: string[] = [
    `# ${cv.name}`,
    "",
    `> ${cv.tagline}. ${cv.intro}`,
    "",
    `Site: ${SITE_URL}`,
    `Location: ${cv.contact.location}`,
    `Languages spoken: ${cv.languages.join(", ")}`,
    `Available in: ${LOCALES.map((l) => `${SITE_URL}${localePath(l, "/")} (${l})`).join(", ")}`,
    "",
    "## Projects",
    "",
  ];

  for (const project of cv.projects) {
    lines.push(
      `### ${project.title} (${project.year})`,
      "",
      `- Page: ${SITE_URL}${localePath(DEFAULT_LOCALE, `/projects/${project.id}`)}`,
      `- Source: ${project.link}`,
      ...(project.live ? [`- Live: ${project.live}`] : []),
      `- Stack: ${project.stack.join(", ")}`,
      `- Summary: ${project.summary}`,
      `- Key fact: ${project.metric}`,
      "",
    );
  }

  lines.push("## Experience", "");
  for (const [i, entry] of cv.experience.entries()) {
    lines.push(
      `### ${entry.company} (${EXPERIENCE_ORDER[i]})`,
      "",
      `- Role: ${entry.role}`,
      `- Dates: ${entry.date}`,
      `- Summary: ${entry.detail}`,
      "",
    );
  }

  lines.push(
    "## Certifications",
    "",
    ...CERTIFICATIONS.map(
      (cert) => `- ${cert.title}, ${cert.issuer} via ${cert.platform}: ${cert.url}`,
    ),
    "",
    "## Contact",
    "",
    `- Book a 15 minute call: ${PROFILE.contact.booking}`,
    `- Email: ${cv.contact.email}`,
    `- GitHub: ${cv.contact.github}`,
    `- LinkedIn: ${cv.contact.linkedin}`,
    `- Telegram: ${cv.contact.telegram}`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
