"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { Menu, X } from "lucide-react"

// Hub routes that have their own navigation — site header must be hidden there
const HUB_PATTERNS = [
  /^\/[a-z]{2}\/herd-vote(\/|$)/,
  /^\/[a-z]{2}\/karticky(\/|$)/,
]

export default function SiteHeader({ lang: propLang }: { lang?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPath =
    pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
  const { user, signOut } = useAuth()
  const l = propLang || (pathname ? (pathname.split("/")[1] || "sk") : "sk")
  const [mobileOpen, setMobileOpen] = useState(false)

  // Don't render on standalone hub pages (they have their own nav)
  if (pathname && HUB_PATTERNS.some(re => re.test(pathname))) return null

  const items = [
    { href: `/${l}/o-nas`, label: "Prečo hovoriť" },
    { href: `/${l}/skupiny`, label: "Oblasti" },
    { href: `/${l}/apps`, label: "Nástroje" },
    { href: `/${l}/komunita`, label: "Komunita" },
    { href: `/${l}/produkty`, label: "Produkty" },
  ]

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/8 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${l}`} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground">DeepTalks</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Prihlásený ako {user.email}</span>
              <button
                onClick={signOut}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Odhlásiť
              </button>
            </div>
          ) : (
            <Link
              href={`/auth?next=${encodeURIComponent(currentPath)}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Prihlásiť sa
            </Link>
          )}
          <Link
            href={`/${l}/kompas`}
            className="px-4 py-2 rounded-full border border-primary/30 text-sm font-medium text-primary hover:bg-primary/10 transition-all"
          >
            Začni rozhovor
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(v => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/8 bg-background/95 backdrop-blur-sm px-6 py-4 space-y-1">
          {items.map(it => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {it.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/8 flex flex-col gap-2">
            {user ? (
              <button onClick={signOut} className="text-sm text-left text-muted-foreground">
                Odhlásiť sa
              </button>
            ) : (
              <Link
                href={`/auth?next=${encodeURIComponent(currentPath)}`}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted-foreground"
              >
                Prihlásiť sa
              </Link>
            )}
            <Link
              href={`/${l}/kompas`}
              onClick={() => setMobileOpen(false)}
              className="inline-flex px-4 py-2 rounded-full border border-primary/30 text-sm font-medium text-primary w-fit"
            >
              Začni rozhovor
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
