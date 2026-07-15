import Link from "next/link";

export default function ConnexionPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-stf-navy">Connexion</h1>
      <p className="mt-2 text-sm text-slate-500">
        Accédez à votre espace mentée, mentore ou collaboratrice STF.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-semibold text-stf-navy">Email</label>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
            placeholder="vous@exemple.com"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-stf-navy">Mot de passe</label>
          <input
            type="password"
            required
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-stf-blue"
            placeholder="••••••••"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-500">
            <input type="checkbox" className="rounded border-slate-300" />
            Se souvenir de moi
          </label>
          <Link href="#" className="font-semibold text-stf-blue">
            Mot de passe oublié ?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-stf-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stf-orange/90"
        >
          Se connecter
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-semibold text-stf-blue">
          Créer un compte
        </Link>
      </p>
    </div>
  );
}
