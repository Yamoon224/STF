import { redirect } from "next/navigation";
import { EspaceShell, type EspaceNavItem } from "@/components/espace/EspaceShell";
import { getSessionUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";

const navItems: EspaceNavItem[] = [
  { href: "/mentore", label: "Tableau de bord", icon: "🏠" },
  { href: "/mentore/mentees", label: "Mes mentées", icon: "👥" },
  { href: "/mentore/sessions", label: "Sessions", icon: "🗓️" },
  { href: "/mentore/ressources", label: "Ressources", icon: "📚" },
  { href: "/mentore/messagerie", label: "Messagerie", icon: "💬" },
];

export default async function MentoreLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/connexion?next=/mentore");
  }

  return (
    <EspaceShell
      navItems={navItems}
      roleLabel="Mentore"
      userName={user?.name ?? "Mentore"}
      userMeta={user?.mentor_profile?.expertise ?? "Mentore STF"}
      logoutAction={logoutAction}
    >
      {children}
    </EspaceShell>
  );
}
