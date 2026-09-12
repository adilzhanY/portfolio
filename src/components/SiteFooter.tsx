import Link from "next/link";
import { getContent } from "@/data/cv";
import { PROFILE } from "@/data/structure";
import { localePath, type Locale } from "@/i18n/config";
import VisitorCount from "@/components/VisitorCount";

/**
 * The closing block: one question, one button, and the quiet row of links
 * under it. Everything else moved to the contact page.
 */
export default function SiteFooter({ locale }: { locale: Locale }) {
  const { name, footer, ui, uses, now, blog } = getContent(locale);
  const year = new Date().getFullYear();
  const href = (path: string) => localePath(locale, path);

  return (
    <footer className="site-footer wrap print:hidden">
      <div className="footer-main">
        <div>
          <p className="eyebrow">
            <span className="status-dot green" aria-hidden="true" />
            {footer.openTo}
          </p>
          <h2>{footer.prompt}</h2>
          <p>{footer.promptSub}</p>
        </div>
        <Link className="button primary" href={href("/contact")}>
          {footer.cta} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} {name}
        </span>
        <div>
          <Link href={href("/uses")}>{uses.heading}</Link>
          <Link href={href("/now")}>{now.heading}</Link>
          <Link href="/blog">{blog.heading}</Link>
          <a href={PROFILE.contact.github} target="_blank" rel="noopener">
            {ui.social.github} ↗
          </a>
          <a href={PROFILE.contact.linkedin} target="_blank" rel="noopener">
            {ui.social.linkedin} ↗
          </a>
          <VisitorCount template={ui.visitors} />
        </div>
      </div>
    </footer>
  );
}
