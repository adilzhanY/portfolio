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
      className="text-[0.8125rem] font-extrabold tracking-tight"
      style={{ color: "#0F62FE" }}
    >
      IBM
    </span>
  );
}

export default function CertificationList({ label }: { label: string }) {
  const certifications = CERTIFICATIONS;

  return (
    <div className="mt-2">
      {certifications.map((cert, i) => (
        <div
          key={cert.url}
          className={[
            "flex flex-wrap items-center gap-x-5 gap-y-3 py-4",
            i < certifications.length - 1 ? "border-b border-faint" : "",
          ].join(" ")}
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-faint bg-chip">
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
            className="inline-flex items-center gap-1.5 rounded-full border border-muted/50 px-4 py-1.5 text-sm font-semibold text-body transition-colors hover:border-ink hover:bg-chip"
          >
            {label}
            <FiExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      ))}
    </div>
  );
}
