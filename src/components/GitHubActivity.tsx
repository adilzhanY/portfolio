"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { PROFILE } from "@/data/structure";
import type { CalendarLabels } from "@/content/types";

export default function GitHubActivity({ labels }: { labels: CalendarLabels }) {
  const [dark, setDark] = useState(false);
  // The calendar works out its own date range and fetches in the browser, so
  // the static HTML cannot match it. Render it once the page is live, in a
  // box that already has its height so nothing below it jumps.
  const [mounted, setMounted] = useState(false);

  // Track the .dark class on <html>, which the theme toggle flips.
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    setMounted(true);
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="card panel min-h-[13.5rem] overflow-x-auto">
      <div className="mx-auto w-fit">
        {mounted && (
        <GitHubCalendar
          username={PROFILE.githubUsername}
          labels={{
            months: labels.months,
            weekdays: labels.weekdays,
            legend: { less: labels.less, more: labels.more },
            totalCount: labels.totalCount,
          }}
          colorScheme={dark ? "dark" : "light"}
          blockSize={11}
          blockMargin={4}
          fontSize={13}
        />
        )}
      </div>
    </div>
  );
}
