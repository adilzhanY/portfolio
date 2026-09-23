"use client";

import { Children, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { stageSpans } from "@/components/stage/layout";

type Filter = "all" | "web" | "mobile" | "desktop";

export interface ShelfLabels {
  group: string;
  all: string;
  web: string;
  mobile: string;
  desktop: string;
  /** Supports the {{count}} placeholder. */
  count: string;
  surprise: string;
}

export interface ShelfItem {
  href: string;
  group: "web" | "mobile" | "desktop";
  wide: boolean;
}

/**
 * The filter row and the stages under it. The stages are rendered on the
 * server and handed in as children, one per item, so filtering only hides
 * what is already on the page and re-pairs what is left.
 */
export default function ProjectShelf({
  items,
  labels,
  children,
}: {
  items: ShelfItem[];
  labels: ShelfLabels;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const stages = Children.toArray(children);

  const counts = useMemo(
    () => ({
      all: items.length,
      web: items.filter((p) => p.group === "web").length,
      mobile: items.filter((p) => p.group === "mobile").length,
      desktop: items.filter((p) => p.group === "desktop").length,
    }),
    [items],
  );

  const shown = items.map((item) => filter === "all" || item.group === filter);
  const spans = stageSpans(items.filter((_, i) => shown[i]));
  let next = 0;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: labels.all },
    { id: "web", label: labels.web },
    { id: "mobile", label: labels.mobile },
    { id: "desktop", label: labels.desktop },
  ];

  const surprise = () => {
    const pick = items[Math.floor(Math.random() * items.length)];
    if (pick) router.push(pick.href);
  };

  return (
    <>
      <div className="shelf-bar">
        <div className="filters" role="group" aria-label={labels.group}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
              <span>{counts[item.id]}</span>
            </button>
          ))}
        </div>
        <div className="filters">
          <span className="shelf-count" role="status">
            {labels.count.replace("{{count}}", String(spans.length))}
          </span>
          <button type="button" onClick={surprise}>
            {labels.surprise} <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      <div className="stages">
        {stages.map((stage, i) => (
          <div key={items[i]?.href ?? i} data-span={shown[i] ? spans[next++] : undefined} hidden={!shown[i]}>
            {stage}
          </div>
        ))}
      </div>
    </>
  );
}
