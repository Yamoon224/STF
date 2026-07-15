export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold text-stf-navy dark:text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
