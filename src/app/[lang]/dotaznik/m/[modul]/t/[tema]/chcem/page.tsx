import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema, sekcieTemy, MODULY } from '@/lib/dotaznik/strom'
import Screening from '../../../../../_screening'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) => m.temy.map((t) => ({ modul: m.slug, tema: t.slug })))
}

export default async function TemaChcem({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const { modul, tema } = found

  const prvaSekcia = sekcieTemy(tema)[0]
  const cielAno = tema.zrkadlova
    ? cesta.temaRola(modul.slug, tema.slug)
    : cesta.temaSekcia(modul.slug, tema.slug, prvaSekcia.id)

  return (
    <Screening
      lang={lang}
      modul={modul.slug}
      tema={tema.slug}
      nazov={tema.nazov}
      spatHref={cesta.tema(modul.slug, tema.slug)}
      cielAno={cielAno}
      cielEsteNie={`${cesta.temaHotovo(modul.slug, tema.slug)}?stav=docasny`}
      cielNie={`${cesta.temaHotovo(modul.slug, tema.slug)}?stav=trvaly`}
    />
  )
}
