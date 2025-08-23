import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Inter } from "next/font/google";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "DeepTalks — hry a aplikácie",
    template: "%s | DeepTalks",
  },
  description: "Kvízy, konverzačné kartičky a párové hry. Zábava aj hodnotné rozhovory.",
  openGraph: {
    type: "website",
    title: "DeepTalks — hry a aplikácie",
    description: "Kvízy, konverzačné kartičky a párové hry.",
    url: "/",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepTalks — hry a aplikácie",
    description: "Kvízy, konverzačné kartičky a párové hry.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "sk-SK": "/sk",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
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
