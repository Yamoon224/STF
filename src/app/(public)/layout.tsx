import { TopBar } from "@/components/layout/TopBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-40">
        <TopBar />
        <SiteHeader />
      </div>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
