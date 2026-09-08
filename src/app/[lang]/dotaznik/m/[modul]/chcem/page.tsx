import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getModul, MODULY } from '@/lib/dotaznik/strom'
import Screening from '../../../_screening'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

export default async function ModulChcem({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()

  return (
    <Screening
      lang={lang}
      modul={modul.slug}
      tema={null}
      nazov={modul.nazov}
      spatHref={cesta.modul(modul.slug)}
      cielAno={cesta.modulTemy(modul.slug)}
      cielEsteNie={`${cesta.modulZamknute(modul.slug)}?typ=docasny`}
      cielNie={`${cesta.modulZamknute(modul.slug)}?typ=trvaly`}
    />
  )
}
