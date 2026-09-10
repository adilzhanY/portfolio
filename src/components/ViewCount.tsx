"use client";

import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";

/**
 * The eye under a post title: how many times the page was viewed, from
 * GoatCounter's public per-path counter. Renders nothing until the number
 * arrives and stays hidden if the request fails (ad blocker, or the public
 * counter switched off), so it can never break the page.
 */
export default function ViewCount({ path }: { path: string }) {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://kowix.goatcounter.com/counter/${encodeURIComponent(path)}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const value = data?.count && String(data.count).trim();
        if (value && value !== "0") setCount(value);
      })
      .catch(() => {});
  }, [path]);

  if (!count) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted"
      title="Views"
    >
      <FiEye aria-hidden="true" className="h-3.5 w-3.5" />
      {count}
    </span>
  );
}
