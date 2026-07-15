import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-slate-100 bg-stf-cream dark:border-border-default dark:bg-surface-muted">
      <Container className="py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold text-stf-navy dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{description}</p>
      </Container>
    </section>
  );
}
