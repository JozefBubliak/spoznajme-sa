'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SUPPORTED_LOCALES, type Locale } from '@/i18n/config'

export function MarketingHeader() {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const maybeLang = segments[1] as Locale | undefined
  const langPrefix = SUPPORTED_LOCALES.includes(maybeLang as Locale) ? `/${maybeLang}` : ''
  const nav = [
    { href: langPrefix || '/', label: 'Domov' },
    { href: `${langPrefix}/about`, label: 'O projekte' },
    { href: `${langPrefix}/contact`, label: 'Kontakt' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full glass-effect backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-modern h-16 flex items-center justify-between">
        <Link href={langPrefix || '/'} className="font-bold text-xl gradient-connection">Spoznajme sa</Link>
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors ${pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm">Aplikácia</Button>
        </div>
      </div>
    </header>
  )
}
