import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  /** Use on sections with a permanent dark/navy background, regardless of theme. */
  invert?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-2 text-3xl font-bold sm:text-4xl ${
          invert ? "text-white" : "text-stf-navy dark:text-white"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base ${invert ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
