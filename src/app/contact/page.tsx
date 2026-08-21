import type { Metadata } from "next";
import { CV_DATA } from "@/data/cv";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Adilzhan Yerzhan: email, GitHub, LinkedIn. Based in Potsdam, Germany, open to internships and freelance work.",
};

const rowClass =
  "grid gap-1 border-t border-faint py-4 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-4";
const labelClass = "font-mono text-[12.5px] text-muted sm:pt-[3px]";

export default function ContactPage() {
  const { contact } = CV_DATA;

  return (
    <div className="mx-auto max-w-[880px] px-5 pt-10 pb-14 leading-relaxed md:px-8 md:pt-14">
      <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>

      <p className="mt-4 max-w-[60ch]">
        The fastest way to reach me is email. I read everything and answer
        properly.
      </p>

      <a
        href={`mailto:${contact.email}`}
        className="mt-6 inline-block text-xl font-medium break-all text-accent hover:underline hover:underline-offset-4 md:text-2xl"
      >
        {contact.email}
      </a>

      <div className="mt-10 max-w-[480px]">
        <div className={rowClass}>
          <span className={labelClass}>GitHub</span>
          <a
            href={contact.github}
            className="text-[15px] hover:underline hover:underline-offset-3"
          >
            github.com/adilzhanY
          </a>
        </div>
        <div className={rowClass}>
          <span className={labelClass}>LinkedIn</span>
          <a
            href={contact.linkedin}
            className="text-[15px] hover:underline hover:underline-offset-3"
          >
            linkedin.com/in/adilzhanyerzhan
          </a>
        </div>
        <div className={rowClass}>
          <span className={labelClass}>Based in</span>
          <span className="text-[15px]">{contact.location}</span>
        </div>
        <div className={`${rowClass} border-b`}>
          <span className={labelClass}>Open to</span>
          <span className="text-[15px]">Internships and freelance work</span>
        </div>
      </div>
    </div>
  );
}
