import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AuthStatus from "@/components/auth/AuthStatus"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument-serif", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Spoznajme sa",
  description: "Zábavné a hlboké otázky pre každého.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
        <Providers>
          <header className="w-full border-b border-white/8 bg-background/90 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <div className="font-semibold tracking-wide text-foreground/90">DeepTalks</div>
              <AuthStatus />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
