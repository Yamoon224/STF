"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

export function FloatingToggles() {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      <LanguageToggle dropDirection="up" dropAlign="left" className="bg-white shadow-black/5 dark:bg-surface" />
      <ThemeToggle className="bg-white shadow-md shadow-black/5 dark:bg-surface" />
    </div>
  );
}
