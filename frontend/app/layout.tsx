import type { Metadata } from "next";
import {
  Sora, Figtree, JetBrains_Mono,
  Playfair_Display, Lato,
  Montserrat, Open_Sans,
  Poppins, Nunito, Inter,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

// ── Forge UI fonts ──────────────────────────────
const sora = Sora({ variable: "--font-heading", subsets: ["latin"], weight: ["600", "700"] });
const figtree = Figtree({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

// ── Site builder font options ───────────────────
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["600", "700"] });
const lato = Lato({ variable: "--font-lato", subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["600", "700", "800"] });
const openSans = Open_Sans({ variable: "--font-opensans", subsets: ["latin"], weight: ["400", "600"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["600", "700"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Forge — Build Your Business Website in Minutes",
  description: "Pick a template, fill in your content, and launch a professional website for your business. No coding required.",
};

const allFontVars = [
  sora.variable, figtree.variable, jetbrainsMono.variable,
  playfair.variable, lato.variable, montserrat.variable,
  openSans.variable, poppins.variable, nunito.variable, inter.variable,
].join(" ");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${allFontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
