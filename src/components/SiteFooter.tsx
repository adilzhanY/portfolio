import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";
import Link from "next/link";
import { FiCalendar, FiChevronRight } from "react-icons/fi";
import { getContent } from "@/data/cv";
import { PROFILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
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

export default function SiteFooter({ locale }: { locale: Locale }) {
  const { contact, handles } = PROFILE;
  const { name, footer, location, ui, uses } = getContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-14 border-t border-faint print:hidden">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {footer.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-body">{footer.blurb}</p>
          </div>
          <div className="space-y-3">
            {/*
              First card on purpose: picking a slot is one click, where an
              email is a blank page somebody has to compose.
            */}
            <ContactCard
              href={contact.booking}
              label={footer.bookingLabel}
              value={handles.booking}
              icon={<FiCalendar aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
            <ContactCard
              href={`mailto:${contact.email}`}
              label={footer.emailLabel}
              value={contact.email}
              icon={<FaEnvelope aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
            <ContactCard
              href={contact.linkedin}
              label={footer.linkedinLabel}
              value={handles.linkedin}
              icon={<FaLinkedin aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
            <ContactCard
              href={contact.telegram}
              label={footer.telegramLabel}
              value={handles.telegram}
              icon={<FaTelegram aria-hidden="true" className="h-[18px] w-[18px]" />}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t border-faint pt-6">
          <div>
            <p className="text-sm text-muted italic">
              {footer.credit}
            </p>
            <p className="mt-1.5 text-sm text-muted">
              <span className="font-medium text-ink">{name}</span>
              <span className="mx-2">/</span>
              {location}
              <span className="mx-2">/</span>© {year}
              <span className="mx-2">/</span>
              <Link
                href={localePath(locale, "/uses")}
                className="hover:text-ink hover:underline hover:underline-offset-3"
              >
                {uses.heading}
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3.5">
            <VisitorCount template={ui.visitors} />
            <a
              href={contact.github}
              aria-label={ui.social.github}
              className="text-muted transition-colors hover:text-ink"
            >
              <FaGithub aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={contact.linkedin}
              aria-label={ui.social.linkedin}
              className="text-muted transition-colors hover:text-ink"
            >
              <FaLinkedin aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={contact.telegram}
              aria-label={ui.social.telegram}
              className="text-muted transition-colors hover:text-ink"
            >
              <FaTelegram aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              aria-label={ui.social.email}
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
