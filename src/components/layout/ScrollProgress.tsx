"use client";

import { useEffect, useRef } from "react";

/**
 * Thin bar under the sticky header that fills as the page is scrolled —
 * continuous feedback (not a one-off reveal) tied directly to scroll position.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      barRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="h-[3px] w-full bg-black/5 dark:bg-white/10" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-stf-orange to-stf-blue motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
