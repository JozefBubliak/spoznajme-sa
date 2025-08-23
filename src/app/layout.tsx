import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Inter } from "next/font/google";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Spoznajme sa",
  description: "Zábavné a hlboké otázky pre každého.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body className={fontSans.variable}>
        <ThemeProvider>
          <SiteHeader />
          <main className="min-h-[calc(100vh-7rem)]">{children}</main>
          <SiteFooter />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
