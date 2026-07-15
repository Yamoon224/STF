import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STF — Sciences & Technologies au Féminin",
  description:
    "Sciences & Technologies au Féminin (STF) accompagne les filles et jeunes femmes dans les STIM à travers le mentorat, des expériences virtuelles et des programmes d'impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-stf-navy">
        {children}
      </body>
    </html>
  );
}
