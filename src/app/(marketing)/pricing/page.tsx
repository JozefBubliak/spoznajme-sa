'use client'

import { useI18n } from '@/i18n'



export default function PricingPage() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{t('pricing.title')}</h1>
      <p className="text-muted-foreground mb-8">{t('pricing.subtitle')}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {[0,1].map((i) => (
          <div key={i} className="rounded-xl border p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">{t(`pricing.plans.${i}.name`)}</h2>
            <div className="text-2xl font-bold mb-4">{t(`pricing.plans.${i}.price`)}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[0,1,2].map((f) => (
                <li key={f}>â€˘ {t(`pricing.plans.${i}.features.${f}`)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
