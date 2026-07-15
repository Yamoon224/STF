export function PatternBackground({
  tone = "auto",
  className = "",
}: {
  /** "auto" adapts grid color to light/dark theme; "onDark" is for sections with a permanently dark/navy background. */
  tone?: "auto" | "onDark";
  className?: string;
}) {
  const gridColor = tone === "onDark" ? "var(--pattern-grid-strong)" : "var(--pattern-grid)";

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(85% 65% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(85% 65% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div
        className="absolute -top-24 right-0 h-72 w-72 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--pattern-glow-a), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-10 h-64 w-64 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--pattern-glow-b), transparent 70%)" }}
      />
    </div>
  );
}
