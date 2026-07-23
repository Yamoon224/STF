"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms — use multiples of ~70ms across siblings for an orchestrated reveal. */
  delay?: number;
  /** Distance (px) the element rises as it appears. */
  y?: number;
  /** Anchor id, e.g. so search results can deep-link to this element with #id. */
  id?: string;
};

/**
 * Fades and rises an element into place once it enters the viewport.
 * Fires immediately for content already on screen at mount (hero sections),
 * and is a no-op (always visible, no motion) under prefers-reduced-motion.
 */
export function Reveal({ children, className = "", delay = 0, y = 24, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (visible) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const style = { "--reveal-delay": `${delay}ms`, "--reveal-y": `${y}px` } as CSSProperties;

  return (
    <div id={id} ref={ref} data-reveal className={`reveal ${visible ? "reveal-visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
