"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    goatcounter?: {
      no_onload?: boolean;
      count?: (opts: { path: string }) => void;
    };
  }
}

/**
 * GoatCounter pageview tracking, SPA-aware. count.js is loaded with
 * no_onload (see the layout), so this component is the only thing that
 * records views: once per route change, including the first load. The
 * retry loop covers the async script arriving after the first render.
 * GoatCounter ignores localhost by itself, so dev runs stay clean.
 */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    let tries = 0;
    let cancelled = false;
    const send = () => {
      if (cancelled) return;
      if (window.goatcounter?.count) {
        window.goatcounter.count({ path: pathname });
        return;
      }
      if (tries++ < 20) setTimeout(send, 250);
    };
    send();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
