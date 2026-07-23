import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { Reveal } from "@/components/ui/Reveal";

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
    <section className="relative overflow-hidden">
      <HeroBackground />
      <Container className="relative py-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">{eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{description}</p>
        </Reveal>
      </Container>
    </section>
  );
}
