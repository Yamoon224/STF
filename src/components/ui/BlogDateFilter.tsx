"use client";

import { useRouter } from "next/navigation";

export function BlogDateFilter({ years, selected }: { years: number[]; selected?: string }) {
  const router = useRouter();

  return (
    <select
      value={selected ?? ""}
      onChange={(e) => router.push(e.target.value ? `/blog?year=${e.target.value}` : "/blog")}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-stf-blue dark:border-border-default dark:bg-surface dark:text-slate-300"
    >
      <option value="">Toutes les dates</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
