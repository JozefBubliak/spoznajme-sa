import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { spoluKarty } from '@/lib/dotaznik/rozhovor'
import Otazky from './_otazky'

type P = { params: Promise<{ lang: string; modul: string }> }

export default async function SpoluModul({ params }: P) {
  const { lang: raw, modul } = await params
  const lang = normalizeUrlLocale(raw)
  const karta = spoluKarty().find((k) => k.modul === modul)
  if (!karta) notFound()
  return <Otazky lang={lang} karta={karta} />
}
