"use client";

import { useEffect, useState } from "react";

/**
 * "Visited by N people" badge, fed by GoatCounter's public counter API.
 * Renders nothing until the number arrives, and stays hidden entirely if
 * the API is unreachable (adblocker, or the visitor-counter setting is
 * off), so it can never break the footer.
 */
export default function VisitorCount() {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://kowix.goatcounter.com/counter/TOTAL.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const value = data?.count && String(data.count).trim();
        if (value && value !== "0") setCount(value);
      })
      .catch(() => {});
  }, []);

  if (!count) return null;

  return (
    <span className="rounded-full border border-faint px-3.5 py-1.5 text-xs text-muted">
      Visited by {count} people
    </span>
  );
}
