"use client";

import { useRef, useState } from "react";

/** The address as selectable text, and a button that copies it. */
export default function CopyEmail({
  email,
  labels,
}: {
  email: string;
  labels: { copy: string; copied: string };
}) {
  const [done, setDone] = useState(false);
  const text = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // No clipboard: select the address so the visitor can copy it by hand.
      const range = document.createRange();
      if (text.current) range.selectNodeContents(text.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  return (
    <span className="copy-mail">
      <a ref={text} href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" onClick={copy}>
        {done ? labels.copied : labels.copy}
      </button>
    </span>
  );
}
