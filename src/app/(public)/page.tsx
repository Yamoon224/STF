import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pillars } from "@/components/ui/Pillars";
import {
  impactStats,
  programs,
  testimonials,
  partners,
  blogPosts,
} from "@/lib/mock-data";

const colorMap = {
  blue: "border-stf-blue/20 bg-stf-blue-light",
  orange: "border-stf-orange/20 bg-stf-orange-light",
  green: "border-stf-green/20 bg-stf-green-light",
} as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stf-cream">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <Badge tone="orange">Audace · Union · Intégrité · Résultat</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-stf-navy sm:text-5xl">
              Ouvrir les portes des STIM aux filles et jeunes femmes
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              STF accompagne les bénéficiaires à travers le mentorat, des
              expériences virtuelles et des programmes concrets — pensés pour
              un usage réel sur le terrain, mobile et accessible.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/mentorat">Rejoindre le mentorat</Button>
              <Button href="/programmes" variant="outline">
                Découvrir les programmes
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-stf-blue/10 bg-white p-6 shadow-sm"
              >
                <p className="text-3xl font-bold text-stf-blue">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Nos engagements */}
      <section className="bg-gradient-to-br from-stf-navy via-stf-blue to-stf-navy py-16">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-stf-orange">
            Nos engagements
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold text-white sm:text-3xl">
            Quand la Femme, la Science, la Technologie, l&apos;Ingénierie et
            les Mathématiques font une
          </h2>
          <div className="mt-10">
            <Pillars />
          </div>
        </Container>
      </section>

      {/* Programmes phares */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Programmes phares"
              title="Des parcours adaptés à chaque niveau"
              description="Primaire, collège, lycée, université et débutantes : chaque bénéficiaire progresse à son rythme."
            />
            <Link
              href="/programmes"
              className="text-sm font-semibold text-stf-blue hover:text-stf-orange"
            >
              Voir tous les programmes →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <div
                key={program.slug}
                className={`rounded-2xl border p-6 ${colorMap[program.color as keyof typeof colorMap]}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {program.audience}
                </p>
                <h3 className="mt-2 text-lg font-bold text-stf-navy">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mentorat CTA */}
      <section className="bg-stf-navy py-20 text-white">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tone="orange">Mentorat STF</Badge>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Un binôme, un parcours, un objectif
            </h2>
            <p className="mt-4 text-slate-300">
              Inscription, validation des mentores, matching par critères
              objectifs, sessions suivies et messagerie sécurisée : tout le
              dispositif est pensé pour protéger et faire progresser chaque
              mentée.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/mentorat">Découvrir le dispositif</Button>
              <Button href="/inscription" variant="outline" className="border-white text-white hover:bg-white/10">
                S'inscrire
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Inscription", "Validation", "Matching", "Suivi & bilan"].map(
              (step, i) => (
                <div
                  key={step}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="text-sm font-bold text-stf-orange">
                    0{i + 1}
                  </span>
                  <p className="mt-2 text-sm font-semibold">{step}</p>
                </div>
              )
            )}
          </div>
        </Container>
      </section>

      {/* Mot de la présidente */}
      <section className="py-20">
        <Container className="grid gap-10 rounded-3xl bg-stf-cream p-8 sm:p-12 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full ring-4 ring-white shadow-lg lg:mx-0">
            <Image
              src="/brand/presidente-fondatrice.png"
              alt="Christelle Ogo, Présidente et Fondatrice de STF"
              fill
              sizes="224px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
              Mot de la présidente
            </p>
            <blockquote className="mt-3 text-lg font-medium text-stf-navy sm:text-xl">
              “C&apos;est avec fierté et gratitude que je vous accueille.
              Ensemble, écrivons l&apos;histoire. Inspirons les générations
              futures à croire en elles, à poursuivre leurs rêves avec audace.”
            </blockquote>
            <p className="mt-4 font-bold text-stf-navy">Christelle Ogo</p>
            <p className="text-sm text-slate-500">Présidente et Fondatrice</p>
            <Link
              href="/a-propos"
              className="mt-4 inline-block text-sm font-semibold text-stf-blue hover:text-stf-orange"
            >
              Lire le message complet →
            </Link>
          </div>
        </Container>
      </section>

      {/* Témoignages */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Témoignages"
            title="Elles racontent leur expérience"
            center
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <blockquote className="text-sm text-slate-600">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-stf-navy">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Actualités */}
      <section className="bg-slate-50 py-20">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Actualités" title="Dernières nouvelles de STF" />
            <Link
              href="/blog"
              className="text-sm font-semibold text-stf-blue hover:text-stf-orange"
            >
              Voir toutes les actualités →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href="/blog"
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <Badge tone="neutral">{post.category}</Badge>
                <h3 className="mt-3 text-base font-bold text-stf-navy">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Partenaires */}
      <section className="py-16">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
            Ils soutiennent STF
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-sm font-semibold text-slate-400"
              >
                {partner}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA finale */}
      <section className="py-16">
        <Container className="rounded-3xl bg-stf-orange px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Devenez actrice du changement</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Que vous soyez une future mentée, une professionnelle prête à
            devenir mentore, ou un partenaire engagé — STF vous accueille.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/inscription" variant="secondary">
              Rejoindre en tant que mentée
            </Button>
            <Button href="/inscription?role=mentore" className="bg-white text-stf-orange hover:bg-white/90">
              Devenir mentore
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
