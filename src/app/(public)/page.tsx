"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pillars } from "@/components/ui/Pillars";
import { HeroIllustration } from "@/components/ui/HeroIllustration";
import { PatternBackground } from "@/components/ui/PatternBackground";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import {
  impactStats,
  programs,
  testimonials,
  partners,
  blogPosts,
} from "@/lib/mock-data";

const colorMap = {
  blue: "border-stf-blue/20 bg-stf-blue-light dark:border-stf-blue/20 dark:bg-stf-blue/10",
  orange: "border-stf-orange/20 bg-stf-orange-light dark:border-stf-orange/20 dark:bg-stf-orange/10",
  green: "border-stf-green/20 bg-stf-green-light dark:border-stf-green/20 dark:bg-stf-green/10",
} as const;

export default function HomePage() {
  const { t } = useLanguage();
  const steps = [t("home.stepInscription"), t("home.stepValidation"), t("home.stepMatching"), t("home.stepSuivi")];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stf-cream dark:bg-surface-muted">
        <PatternBackground />
        <HeroIllustration className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[520px] text-stf-navy opacity-70 sm:-right-16 sm:-top-10 lg:-right-8" />
        <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <Badge tone="orange">{t("home.heroBadge")}</Badge>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-stf-navy dark:text-white sm:text-5xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              {t("home.heroDescription")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/mentorat">{t("home.ctaMentorat")}</Button>
              <Button href="/programmes" variant="outline">
                {t("home.ctaProgrammes")}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-stf-blue/10 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
              >
                <p className="text-3xl font-bold text-stf-blue">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Nos engagements */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stf-navy via-stf-blue to-stf-navy py-16">
        <PatternBackground tone="onDark" />
        <Container className="relative">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-stf-orange">
            {t("home.engagementsEyebrow")}
          </p>
          <h2 className="mt-2 text-center text-2xl font-bold text-white sm:text-3xl">
            {t("home.engagementsTitle")}
          </h2>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10">
            <Image
              src="/brand/banner.png"
              alt="Bannière STF : Sciences & Technologies au Féminin — Éducation de qualité, réduction des inégalités, un emploi décent pour tous"
              width={960}
              height={336}
              sizes="(min-width: 1024px) 896px, 100vw"
              className="h-auto w-full"
            />
          </div>
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
              eyebrow={t("home.programmesEyebrow")}
              title={t("home.programmesTitle")}
              description={t("home.programmesDescription")}
            />
            <Link
              href="/programmes"
              className="text-sm font-semibold text-stf-blue hover:text-stf-orange"
            >
              {t("home.voirTousProgrammes")}
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <div
                key={program.slug}
                className={`rounded-2xl border p-6 ${colorMap[program.color as keyof typeof colorMap]}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {program.audience}
                </p>
                <h3 className="mt-2 text-lg font-bold text-stf-navy dark:text-white">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mentorat CTA */}
      <section className="relative overflow-hidden bg-stf-navy py-20 text-white">
        <PatternBackground tone="onDark" />
        <Container className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tone="orange">{t("home.mentoratBadge")}</Badge>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              {t("home.mentoratTitle")}
            </h2>
            <p className="mt-4 text-slate-300">
              {t("home.mentoratDescription")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/mentorat">{t("home.decouvrirDispositif")}</Button>
              <Button href="/inscription" variant="outline" className="border-white text-white hover:bg-white/10">
                {t("home.sinscrire")}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(
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
        <Container className="grid gap-10 rounded-3xl bg-stf-cream p-8 dark:bg-surface-muted sm:p-12 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-surface lg:mx-0">
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
              {t("home.presidenteEyebrow")}
            </p>
            <blockquote className="mt-3 text-lg font-medium text-stf-navy dark:text-white sm:text-xl">
              {t("home.presidenteQuote")}
            </blockquote>
            <p className="mt-4 font-bold text-stf-navy dark:text-white">{t("home.presidenteName")}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("home.presidenteRole")}</p>
            <Link
              href="/a-propos"
              className="mt-4 inline-block text-sm font-semibold text-stf-blue hover:text-stf-orange"
            >
              {t("home.presidenteLire")}
            </Link>
          </div>
        </Container>
      </section>

      {/* Témoignages */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow={t("home.temoignagesEyebrow")}
            title={t("home.temoignagesTitle")}
            center
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-border-default dark:bg-surface"
              >
                <blockquote className="text-sm text-slate-600 dark:text-slate-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-stf-navy dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* Actualités */}
      <section className="bg-slate-50 py-20 dark:bg-surface-muted">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow={t("home.actualitesEyebrow")} title={t("home.actualitesTitle")} />
            <Link
              href="/blog"
              className="text-sm font-semibold text-stf-blue hover:text-stf-orange"
            >
              {t("home.voirToutesActualites")}
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href="/blog"
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-border-default dark:bg-surface"
              >
                <Badge tone="neutral">{post.category}</Badge>
                <h3 className="mt-3 text-base font-bold text-stf-navy dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Partenaires */}
      <section className="py-16">
        <Container>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t("home.partenairesTitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-sm font-semibold text-slate-400 dark:text-slate-500"
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
          <h2 className="text-3xl font-bold">{t("home.ctaFinaleTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            {t("home.ctaFinaleDescription")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/inscription" variant="secondary">
              {t("home.ctaFinaleMentee")}
            </Button>
            <Button href="/inscription?role=mentore" variant="white">
              {t("home.ctaFinaleMentore")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
