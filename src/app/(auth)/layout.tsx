import { InscriptionShowcasePanel } from "@/components/layout/InscriptionShowcasePanel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <InscriptionShowcasePanel />
      <div className="flex items-center justify-center bg-white px-4 py-12 dark:bg-background sm:px-8">
        {children}
      </div>
    </div>
  );
}
