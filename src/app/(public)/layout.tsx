import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { FloatingToggles } from "@/components/layout/FloatingToggles";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { apiFetch } from "@/lib/api";
import type { SiteSettings } from "@/lib/types";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await apiFetch<SiteSettings>("/site-settings", { anonymous: true });

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-40">
        <TopBar siteSettings={siteSettings} />
        <SiteHeader />
        <ScrollProgress />
      </div>
      <main className="flex-1">{children}</main>
      <SiteFooter siteSettings={siteSettings} />
      <FloatingToggles />
      <ChatWidget />
    </div>
  );
}
