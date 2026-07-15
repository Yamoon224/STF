"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

type Role = "mentee" | "mentore";

function InscriptionForm() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "mentore" ? "mentore" : "mentee";
  const [role, setRole] = useState<Role>(initialRole);

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-stf-navy">Créer un compte</h1>
      <p className="mt-2 text-sm text-slate-500">
        Choisissez votre profil pour adapter le formulaire d&apos;inscription.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setRole("mentee")}
          className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
            role === "mentee" ? "bg-stf-orange text-white" : "text-slate-500"
          }`}
        >
          Je suis mentée
        </button>
        <button
          type="button"
          onClick={() => setRole("mentore")}
          className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
            role === "mentore" ? "bg-stf-blue text-white" : "text-slate-500"
          }`}
        >
          Je suis mentore
        </button>
      </div>

      <form className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-stf-navy">Prénom</label>
            <input
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-stf-navy">Nom</label>
            <input
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-stf-navy">Email</label>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
          />
        </div>

        {role === "mentee" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-stf-navy">Niveau</label>
              <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue">
                <option>Primaire</option>
                <option>Collège</option>
                <option>Lycée</option>
                <option>Université</option>
                <option>Débutante</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy">Centre d&apos;intérêt</label>
              <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue">
                <option>Sciences</option>
                <option>Technologies</option>
                <option>Ingénierie</option>
                <option>Mathématiques</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-stf-navy">Domaine d&apos;expertise</label>
              <input
                type="text"
                placeholder="Ex. Génie logiciel"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-stf-navy">Capacité maximale</label>
              <input
                type="number"
                min={1}
                defaultValue={2}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
              />
            </div>
          </div>
        )}

        <label className="flex items-start gap-3 text-xs text-slate-500">
          <input type="checkbox" required className="mt-0.5 rounded border-slate-300" />
          J&apos;accepte le code de conduite et la politique de protection des bénéficiaires de STF.
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90"
        >
          {role === "mentee" ? "Créer mon compte mentée" : "Envoyer ma candidature mentore"}
        </button>

        {role === "mentore" ? (
          <p className="text-center text-xs text-slate-400">
            Votre compte sera examiné et validé par l&apos;équipe STF avant tout échange avec une mentée.
          </p>
        ) : null}
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Déjà inscrite ?{" "}
        <Link href="/connexion" className="font-semibold text-stf-blue">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense>
      <InscriptionForm />
    </Suspense>
  );
}
