import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import OwlMascot from "@/components/OwlMascot";
import GlobalShortcuts from "@/components/GlobalShortcuts";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Kerl Jan Sumontao — Game Developer / AI Explorer",
  description: "Kerl Jan Sumontao — Game Developer & AI Explorer. BSIT student at Bukidnon State University building games, simulations, and AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col">
        {children}
        <OwlMascot />
        <GlobalShortcuts />
      </body>
    </html>
  );
}
