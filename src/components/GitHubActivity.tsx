"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { PROFILE } from "@/data/structure";
import type { CalendarLabels } from "@/content/types";

export default function GitHubActivity({ labels }: { labels: CalendarLabels }) {
  const [dark, setDark] = useState(false);

  // Track the .dark class on <html>, which the theme toggle flips.
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-faint p-5">
      <div className="mx-auto w-fit">
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
      </div>
    </div>
  );
}
