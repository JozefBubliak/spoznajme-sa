// src/components/MarketingHomePage.tsx
'use client'

import Link from 'next/link'
import { useI18n } from '@/i18n'

export default function MarketingHomePage() {
  const { t } = useI18n()
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 space-y-8">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">{t('hero.badge')}</p>
        <h1 className="text-4xl font-bold">{t('hero.title')}</h1>
        <p className="text-muted-foreground max-w-2xl">{t('hero.subtitle')}</p>
      </header>

      <Link href="/app" className="inline-block rounded-md px-4 py-2 bg-primary text-primary-foreground">
        {t('hero.cta')}
      </Link>
    </section>
  )
}
