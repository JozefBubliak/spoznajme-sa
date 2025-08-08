'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from './LanguageSwitcher'

export function MarketingHeader() {
  const pathname = usePathname()
  const { t } = useI18n()

  const nav = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/pricing', label: t('nav.pricing') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/app', label: t('nav.app') },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {t('meta.brand')}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.slice(0,4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground transition-colors'
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/app">
            <Button size="sm">{t('nav.app')}</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
