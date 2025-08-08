'use client'

import { useI18n } from '@/i18n'

export const metadata = {
  title: 'Contact – DeepTalks',
  description: 'Contact DeepTalks team',
  alternates: { canonical: 'https://deeptalks.eu/contact' }
}

export default function ContactPage() {
  const { t } = useI18n()
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-6">
      <h1 className="text-3xl font-bold">{t('contact.title')}</h1>
      <p className="text-muted-foreground">{t('contact.social')}</p>
      <a href="mailto:hello@deeptalks.eu" className="underline">{t('contact.email')}</a>
    </div>
  )
}
