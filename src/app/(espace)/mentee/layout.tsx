import { redirect } from "next/navigation";
import { EspaceShell, type EspaceNavItem } from "@/components/espace/EspaceShell";
import { getSessionUser } from "@/lib/session";
import { logoutAction } from "@/lib/actions/auth";

const navItems: EspaceNavItem[] = [
  { href: "/mentee", label: "Tableau de bord", icon: "🏠" },
  { href: "/mentee/mentorat", label: "Mon mentorat", icon: "🤝" },
  { href: "/mentee/modules", label: "Modules", icon: "🎓" },
  { href: "/mentee/renforcement", label: "Cours de renforcement", icon: "🔬" },
  { href: "/mentee/projets", label: "Projets", icon: "📁" },
  { href: "/mentee/badges", label: "Badges", icon: "🏅" },
  { href: "/mentee/messagerie", label: "Messagerie", icon: "💬" },
];

export default async function MenteeLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/connexion?next=/mentee");
  }

  return (
    <EspaceShell
      navItems={navItems}
      roleLabel="Mentée"
      userName={user?.name ?? "Mentée"}
      userMeta={user?.mentee_profile?.level ?? "Mentée STF"}
      logoutAction={logoutAction}
    >
      {children}
    </EspaceShell>
  );
}
