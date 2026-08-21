"use client";

import { useCallback, useEffect, useState } from "react";
import { FiDownload, FiMinus, FiPlus, FiX } from "react-icons/fi";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const CV_FILE = "/CV_Adilzhan_Yerzhan.pdf";
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pageWidth, setPageWidth] = useState(820);

  useEffect(() => {
    const compute = () =>
      setPageWidth(Math.min(820, window.innerWidth - 32));
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) =>
      Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round((z + delta) * 100) / 100)),
    );
  }, []);

  const toolBtn =
    "flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none text-white/90 transition-colors hover:bg-white/15 disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div
      className="animate-resume-fade fixed inset-0 z-50 flex flex-col bg-black/75 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume viewer"
    >
      {/* toolbar */}
      <div
        className="flex items-center justify-center gap-1 px-4 py-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => zoomBy(-ZOOM_STEP)}
          disabled={zoom <= ZOOM_MIN}
          className={toolBtn}
          aria-label="Zoom out"
        >
          <FiMinus aria-hidden="true" className="h-4 w-4" />
        </button>
        <span className="w-14 text-center font-mono text-[0.8125rem] text-white/90">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomBy(ZOOM_STEP)}
          disabled={zoom >= ZOOM_MAX}
          className={toolBtn}
          aria-label="Zoom in"
        >
          <FiPlus aria-hidden="true" className="h-4 w-4" />
        </button>
        <span className="mx-2 h-5 w-px bg-white/25" aria-hidden="true" />
        <a
          href={CV_FILE}
          download
          className="flex h-9 items-center gap-2 rounded-full px-3.5 text-[0.84375rem] font-medium text-white/90 transition-colors hover:bg-white/15"
        >
          <FiDownload aria-hidden="true" className="h-4 w-4" />
          Download
        </a>
        <span className="mx-2 h-5 w-px bg-white/25" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          className={toolBtn}
          aria-label="Close"
        >
          <FiX aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      {/* document */}
      <div className="flex-1 overflow-auto px-4 pb-6">
        <div
          className="animate-resume-rise mx-auto w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          <Document
            file={CV_FILE}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            loading={
              <p className="mt-20 text-center text-sm text-white/80">
                Loading resume…
              </p>
            }
            error={
              <p className="mt-20 text-center text-sm text-white/80">
                Could not load the PDF.{" "}
                <a href={CV_FILE} download className="underline">
                  Download it instead.
                </a>
              </p>
            }
          >
            {Array.from({ length: numPages }, (_, i) => (
              <Page
                key={i}
                pageNumber={i + 1}
                width={pageWidth * zoom}
                className="mb-4 overflow-hidden rounded-md shadow-2xl"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
