"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Auto-scrolling horizontal row (ping-pongs left/right) with prev/next
 * buttons pinned to the far edges. Auto-scroll pauses on hover and briefly
 * after a manual button click so it doesn't fight the user.
 */
export function HorizontalScroller({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<1 | -1>(1);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number;

    const step = () => {
      if (!pausedRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 1) {
          el.scrollLeft += 0.6 * directionRef.current;
          if (el.scrollLeft >= max) directionRef.current = -1;
          else if (el.scrollLeft <= 0) directionRef.current = 1;
        }
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pauseThenResume = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 3000);
  };

  const scrollByPage = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    directionRef.current = direction;
    pauseThenResume();
    el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Précédent"
        onClick={() => scrollByPage(-1)}
        className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-stf-navy shadow-md transition-colors hover:border-stf-orange hover:text-stf-orange dark:border-border-default dark:bg-surface dark:text-white"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
      </button>

      <div
        ref={scrollRef}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          window.clearTimeout(resumeTimeoutRef.current);
          pausedRef.current = false;
        }}
        className={`flex overflow-x-auto scroll-smooth ${className}`}
      >
        {children}
      </div>

      <button
        type="button"
        aria-label="Suivant"
        onClick={() => scrollByPage(1)}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-stf-navy shadow-md transition-colors hover:border-stf-orange hover:text-stf-orange dark:border-border-default dark:bg-surface dark:text-white"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
      </button>
    </div>
  );
}
