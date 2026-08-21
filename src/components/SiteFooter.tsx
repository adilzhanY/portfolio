import { CV_DATA } from "@/data/cv";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-faint">
      <div className="mx-auto flex max-w-[880px] flex-wrap justify-between gap-2 px-5 py-5 text-[13px] text-muted md:px-8">
        <span>
          © {year} {CV_DATA.name}
        </span>
        <span className="flex flex-wrap gap-x-4">
          <a href={CV_DATA.contact.github} className="hover:text-ink">
            GitHub
          </a>
          <a href={CV_DATA.contact.linkedin} className="hover:text-ink">
            LinkedIn
          </a>
          <a href={`mailto:${CV_DATA.contact.email}`} className="hover:text-ink">
            {CV_DATA.contact.email}
          </a>
        </span>
      </div>
    </footer>
  );
}
