import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";
import { FiChevronRight } from "react-icons/fi";
import { CV_DATA } from "@/data/cv";
import VisitorCount from "@/components/VisitorCount";

function ContactCard({
  href,
  label,
  value,
  icon,
}: {
  href: string;
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-faint bg-chip/60 px-5 py-4 transition-colors hover:border-ink/30 hover:bg-chip"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-faint bg-surface text-body">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.6875rem] font-semibold tracking-[0.09em] text-muted uppercase">
          {label}
        </span>
        <span className="block truncate font-medium">{value}</span>
      </span>
      <FiChevronRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}

export default function SiteFooter() {
  const { name, contact } = CV_DATA;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-14 border-t border-faint">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Let&apos;s work together.
            </h2>
            <p className="mt-4 leading-relaxed text-body">
              Open to full-time, contract, freelance, and remote work. Based in
              Potsdam, Germany. I read everything and answer properly.
            </p>
          </div>
          <div className="space-y-3">
            <ContactCard
              href={`mailto:${contact.email}`}
              label="Email"
              value={contact.email}
              icon={<FaEnvelope aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
            <ContactCard
              href={contact.linkedin}
              label="Let's connect"
              value="linkedin.com/in/adilzhanyerzhan"
              icon={<FaLinkedin aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
            <ContactCard
              href={contact.telegram}
              label="Telegram"
              value="t.me/kowiqx"
              icon={<FaTelegram aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t border-faint pt-6">
          <div>
            <p className="text-sm text-muted italic">
              Designed, built, and operated end to end.
            </p>
            <p className="mt-1.5 text-sm text-muted">
              <span className="font-medium text-ink">{name}</span>
              <span className="mx-2">/</span>
              Potsdam, Germany
              <span className="mx-2">/</span>© {year}
            </p>
          </div>
          <div className="flex items-center gap-3.5">
            <VisitorCount />
            <a
              href={contact.github}
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-ink"
            >
              <FaGithub aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={contact.linkedin}
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-ink"
            >
              <FaLinkedin aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={contact.telegram}
              aria-label="Telegram"
              className="text-muted transition-colors hover:text-ink"
            >
              <FaTelegram aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-ink"
            >
              <FaEnvelope aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
