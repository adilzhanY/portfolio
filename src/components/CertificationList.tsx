import { FiExternalLink } from "react-icons/fi";
import { SiMeta, SiNextdotjs } from "react-icons/si";
import { CERTIFICATIONS } from "@/data/structure";
import type { CertificationStructure } from "@/data/structure";

function IssuerIcon({ issuer }: { issuer: CertificationStructure["issuer"] }) {
  if (issuer === "Meta")
    return (
      <SiMeta aria-hidden="true" className="h-6 w-6" style={{ color: "#0081FB" }} />
    );
  if (issuer === "Next.js")
    return <SiNextdotjs aria-hidden="true" className="h-6 w-6 text-ink" />;
  return (
    <span
      aria-hidden="true"
      className="text-[0.8125rem] font-semibold tracking-tight"
      style={{ color: "#0F62FE" }}
    >
      IBM
    </span>
  );
}

export default function CertificationList({ label }: { label: string }) {
  const certifications = CERTIFICATIONS;

  return (
    <div className="card px-5 sm:px-7">
      {certifications.map((cert, i) => (
        <div
          key={cert.url}
          className={[
            "flex flex-wrap items-center gap-x-5 gap-y-3 py-5",
            i < certifications.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface">
            <IssuerIcon issuer={cert.issuer} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold">{cert.title}</h3>
            <p className="text-sm text-muted">
              {cert.issuer} · {cert.platform}
            </p>
          </div>
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            {label}
            <FiExternalLink aria-hidden="true" />
          </a>
        </div>
      ))}
    </div>
  );
}
