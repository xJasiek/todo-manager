import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Schriftart Inter via next/font laden (selbst-gehostet, performant)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Todo-Manager",
  description:
    "Moderner Todo-Manager mit Kategorien, Filtern, Drag-and-Drop und Local-Storage-Persistenz, gebaut mit Next.js, TypeScript und Tailwind CSS.",
  keywords: ["Todo", "Aufgaben", "Next.js", "TypeScript", "Tailwind CSS", "Local Storage"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="font-sans text-white antialiased">{children}</body>
    </html>
  );
}
