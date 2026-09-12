import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaXing,
  FaXTwitter,
} from "react-icons/fa6";
import { FiCalendar, FiUserPlus } from "react-icons/fi";
import { getCV, getContent } from "@/data/cv";
import { PROFILE, VCARD_FILE } from "@/data/structure";
import type { Locale } from "@/i18n/config";

/*
 * Every way to reach me, in one place. The header keeps a single mailto and
 * the home page keeps two links; the rest live here so neither of those has
 * to grow a row of icons.
 */
export default function ContactView({ locale }: { locale: Locale }) {
  const { contact, languages } = getCV(locale);
  const { contact: copy, footer, ui } = getContent(locale);
  const { handles } = PROFILE;

  const cards = [
    {
      href: `mailto:${contact.email}`,
      Icon: FaEnvelope,
      label: copy.emailLabel,
      handle: contact.email,
    },
    {
      href: contact.linkedin,
      Icon: FaLinkedin,
      label: ui.social.linkedin,
      handle: handles.linkedin,
    },
    {
      href: contact.github,
      Icon: FaGithub,
      label: copy.githubLabel,
      handle: `github.com/${PROFILE.githubUsername}`,
    },
    {
      href: contact.telegram,
      Icon: FaTelegram,
      label: ui.social.telegram,
      handle: handles.telegram,
    },
    {
      href: contact.x,
      Icon: FaXTwitter,
      label: copy.xLabel,
      handle: "x.com/woopleer",
    },
    {
      href: contact.reddit,
      Icon: FaReddit,
      label: copy.redditLabel,
      handle: "u/Fast_Pizza_1046",
    },
    {
      href: contact.xing,
      Icon: FaXing,
      label: copy.xingLabel,
      handle: handles.xing,
    },
    {
      href: PROFILE.contact.booking,
      Icon: FiCalendar,
      label: footer.bookingLabel,
      handle: handles.booking,
    },
  ];

  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.heading}
          <span className="accent">.</span>
        </h1>
        <p className="intro">{copy.intro}</p>
      </header>

      <div className="contact-layout">
        <div className="contact-grid">
          {cards.map(({ href, Icon, label, handle }) => (
            <a
              key={label}
              className="contact-card"
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener"}
            >
              <Icon aria-hidden="true" />
              <span>
                <span className="label-line">{label}</span>
                <span className="handle">{handle}</span>
              </span>
            </a>
          ))}
        </div>

        <aside className="contact-panel">
          <p className="eyebrow">
            <span className="status-dot green" aria-hidden="true" />
            {footer.openTo}
          </p>
          <h2>{footer.prompt}</h2>
          <dl>
            <dt>{copy.basedIn}</dt>
            <dd>{contact.location}</dd>
            <dt>{copy.speaks}</dt>
            <dd>{languages.join(", ")}</dd>
          </dl>
          {/* A vCard: one tap and the details land in the address book. */}
          <a className="button" href={VCARD_FILE} download>
            {copy.saveContact}
            <FiUserPlus aria-hidden="true" />
          </a>
        </aside>
      </div>
    </>
  );
}
