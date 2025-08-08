'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/i18n'

export const metadata = {
  title: 'DeepTalks – Questions that connect deeply',
  description: 'DeepTalks helps partners, friends and families connect through meaningful, guided questions.',
  alternates: { canonical: 'https://deeptalks.eu/' }
}

export default function MarketingHomePage() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-20 text-center space-y-6">
        <span className="inline-block text-xs tracking-wide uppercase text-muted-foreground">{t('hero.badge')}</span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        <div className="pt-2">
          <Link href="/app">
            <Button size="lg">{t('hero.cta')}</Button>
          </Link>
        </div>
      </section>

      {/* Preview */}
      <section className="grid md:grid-cols-2 gap-8 items-center py-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">{t('preview.title')}</h2>
          <p className="text-muted-foreground">{t('preview.desc')}</p>
        </div>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
          <Image
            src="/images/placeholder.jpg"
            alt={t('preview.alt')}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <h2 className="text-2xl font-semibold mb-8">{t('how.title')}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[0,1,2,3].map((i) => (
            <article key={i} className="rounded-xl border p-5 bg-card">
              <h3 className="font-medium mb-1">{t(`how.steps.${i}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`how.steps.${i}.desc`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="py-16">
        <h2 className="text-2xl font-semibold mb-8">{t('audience.title')}</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[0,1,2,3].map((i) => (
            <article key={i} className="rounded-xl border p-5 bg-card">
              <h3 className="font-medium mb-1">{t(`audience.items.${i}.title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`audience.items.${i}.desc`)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
