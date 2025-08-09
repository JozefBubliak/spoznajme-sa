'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function MarketingHeader() {
  const pathname = usePathname()
  const nav = [
    { href: '/', label: 'Domov' },
    { href: '/about', label: 'O projekte' },
    { href: '/pricing', label: 'Cenník' },
    { href: '/contact', label: 'Kontakt' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Spoznajme sa</Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground transition-colors'}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/app"><Button size="sm">Aplikácia</Button></Link>
        </div>
      </div>
    </header>
  )
}
