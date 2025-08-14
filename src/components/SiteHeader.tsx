"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/components/IntlProvider"

export default function SiteHeader({ lang: propLang }: { lang?: string }) {
  const { t } = useI18n()
  const pathname = usePathname()
  const l = propLang || (pathname ? (pathname.split("/")[1] || "sk") : "sk")

  const items = [
    { href: `/${l}`,                label: t("nav.home","Domov") },
    { href: `/${l}/produkty`,       label: t("nav.products","Produkty") },
    { href: `/${l}/kompas`,         label: t("nav.tools","Komunikačný kompas") },
    { href: `/${l}/blog`,           label: t("nav.blog","Blog") },
    { href: `/${l}/downloads`,      label: t("nav.downloads","Downloady") },
    { href: `/${l}/apps`,           label: t("nav.apps","Konverzačné hry") },
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
          <Link href={`/app`} className="text-sm underline">{t("hero.ctaTry","Spustiť hru")}</Link>
        </div>
      </div>
    </header>
  )
}