import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AuthStatus from "@/components/auth/AuthStatus"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spoznajme sa",
  description: "Zábavné a hlboké otázky pre každého.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <header className="w-full border-b">
            <div className="container mx-auto p-4 flex items-center justify-between">
              <div className="font-semibold">DeepTalks</div>
              <AuthStatus />
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
