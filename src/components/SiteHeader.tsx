"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useI18n } from "@/components/IntlProvider"
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
    { href: `/${l}/kompas`,     label: t("nav.ecosystem", "ECOSYSTEM") },
    { href: `/${l}/apps`,       label: t("nav.experiences", "EXPERIENCES") },
    { href: `/${l}/produkty`,   label: t("nav.philosophy", "PHILOSOPHY") },
  ]

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${l}`} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">DeepTalks</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-10">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-xs font-semibold tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.logout", "Sign Out")}
            </button>
          ) : (
            <Link
              href={`/auth/login?next=${encodeURIComponent(currentPath)}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.login", "Sign In")}
            </Link>
          )}
          <Link
            href={`/${l}/kompas`}
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all"
          >
            Start Talking
          </Link>
        </div>
      </div>
    </header>
  )
}
