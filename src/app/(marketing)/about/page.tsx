'use client'

import { useI18n } from '@/i18n'

export default function AboutPage() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-4">
      <h1 className="text-3xl font-bold">{t('about.title')}</h1>
      <p className="text-muted-foreground">{t('about.body')}</p>
    </div>
  )
}
