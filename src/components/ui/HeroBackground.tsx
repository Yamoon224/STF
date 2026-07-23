"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/hero/IMG_0853.webp",
  "/hero/IMG_0925.webp",
  "/hero/IMG_0954.webp",
  "/hero/IMG_0997.webp",
  "/hero/IMG_1017.webp",
  "/hero/IMG_1128.webp",
  "/hero/IMG_1162.webp",
  "/hero/IMG_1486.webp",
  "/hero/IMG_1713.webp",
  "/hero/IMG_2261.webp",
  "/hero/IMG_2308.webp",
  "/hero/IMG_2423.webp",
];

const INTERVAL_MS = 6000;
const FADE_MS = 1500;

/**
 * Auto-advancing photo carousel used as the Hero's background: crossfades
 * between slides while each one very slowly zooms in (Ken Burns effect).
 * The zoom relies on the transition-only class being present exclusively
 * while a slide is active, so it resets instantly (no transition) the
 * moment it goes inactive and replays cleanly on its next turn.
 */
export function HeroBackground({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 isolate overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((src, i) => {
        const isActive = i === index;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{ opacity: isActive ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${
                isActive ? "scale-110 transition-transform ease-out" : "scale-100"
              }`}
              style={isActive ? { transitionDuration: `${INTERVAL_MS + FADE_MS}ms` } : undefined}
            />
          </div>
        );
      })}

      {/* Scrim so headline/CTA copy stays readable regardless of how bright a photo is */}
      <div className="absolute inset-0 bg-stf-navy/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-stf-navy/95 via-stf-navy/80 to-stf-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-stf-navy/75 via-transparent to-stf-navy/35" />

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-6">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-5 bg-stf-orange" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
