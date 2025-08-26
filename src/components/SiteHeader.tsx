"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useI18n } from "@/components/IntlProvider"
import ThemeToggle from "@/components/ThemeToggle"
import { useAuth } from "@/hooks/useAuth"

export default function SiteHeader({ lang: propLang }: { lang?: string }) {
  const { t } = useI18n()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPath =
    pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
  const { user, signOut } = useAuth()
  const l = propLang || (pathname ? (pathname.split("/")[1] || "sk") : "sk")

  const items = [
    { href: `/${l}`,                label: t("nav.home","Domov") },
    { href: `/${l}/produkty`,       label: t("nav.products","Produkty") },
    { href: `/${l}/kompas`,         label: t("nav.tools","Komunikačný kompas") },
    { href: `/${l}/apps#games`,     label: t("nav.apps","Konverzačné hry") },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href={`/${l}`} className="font-semibold tracking-tight">DeepTalks</Link>
        <nav className="hidden md:flex items-center gap-6">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <button onClick={signOut} className="text-sm underline">
              {t("nav.logout", "Odhlásiť sa")}
            </button>
          ) : (
            <Link
              href={`/auth/login?next=${encodeURIComponent(currentPath)}`}
              className="text-sm underline"
            >
              {t("nav.login", "Prihlásiť sa")}
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}