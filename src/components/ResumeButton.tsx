"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import type { UiCopy } from "@/content/types";

// The PDF renderer is heavy, so it loads only when the modal opens.
const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });

export default function ResumeButton({
  labels,
  file,
  className = "button primary",
}: {
  labels: UiCopy["resume"];
  file: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        {labels.open}
        <FiChevronRight aria-hidden="true" className="h-4 w-4" />
      </button>
      {open && <ResumeModal onClose={() => setOpen(false)} labels={labels} file={file} />}
    </>
  );
}
