import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "@/components/ui/SocialIcons";

const columns = [
  {
    title: "Organisation",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/impact", label: "Impact" },
      { href: "/partenaires", label: "Partenaires" },
      { href: "/blog", label: "Actualités" },
    ],
  },
  {
    title: "Programmes",
    links: [
      { href: "/programmes", label: "Tous les programmes" },
      { href: "/mentorat", label: "Mentorat" },
      { href: "/experiences-virtuelles", label: "Expériences virtuelles" },
    ],
  },
  {
    title: "Accès",
    links: [
      { href: "/connexion", label: "Connexion" },
      { href: "/inscription", label: "Devenir mentée" },
      { href: "/inscription?role=mentore", label: "Devenir mentore" },
    ],
  },
  {
    title: "Politiques",
    links: [
      { href: "/politiques", label: "Protection des filles" },
      { href: "/politiques", label: "Confidentialité" },
      { href: "/politiques", label: "Code de conduite" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-stf-navy text-slate-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <span className="relative flex h-11 w-11 overflow-hidden rounded-full ring-1 ring-white/20">
            <Image src="/brand/logo.jpg" alt="STF" fill sizes="44px" className="object-cover" />
          </span>
          <p className="mt-4 text-sm text-slate-300">
            Sciences &amp; Technologies au Féminin — Audace, Union,
            Intégrité, Résultat.
          </p>
          <a
            href="https://sciencesaufeminin.org"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-stf-orange hover:text-white"
          >
            sciencesaufeminin.org
          </a>
          <SocialIcons className="mt-5" />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-stf-orange">
              {col.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Sciences &amp; Technologies au Féminin (STF).</p>
          <p>Site conçu pour un usage mobile prioritaire et faible consommation de données.</p>
        </Container>
      </div>
    </footer>
  );
}
