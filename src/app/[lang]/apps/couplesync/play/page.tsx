import { notFound } from 'next/navigation'
import { type Locale, SUPPORTED_LOCALES } from '@/i18n/config'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import Client from '../Client'

type P = { params: Promise<{ lang: string }> }

export const metadata = {
  title: 'CoupleSync – Dotazník | DeepTalks',
  description: 'Vyplňte dotazník sexuálnych preferencií pre páry. Každý odpovedá sám, zobrazia sa len zhody.',
}

export default async function Page({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  if (!SUPPORTED_LOCALES.includes(lang as Locale)) notFound()

  return <Client lang={lang} />
}
