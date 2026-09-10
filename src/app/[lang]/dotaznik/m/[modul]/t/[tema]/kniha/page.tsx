import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, getTema, MODULY } from '@/lib/dotaznik/strom'
import { temaObsah } from '@/lib/dotaznik/obsah'
import Kniha from '../../../../../_kniha'

type P = { params: Promise<{ lang: string; modul: string; tema: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) => m.temy.map((t) => ({ modul: m.slug, tema: t.slug })))
}

// „Kniha + dotazník" pre témy s vlastným obsahom (registr `src/lib/dotaznik/obsah`).
export default async function TemaKniha({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const obsah = temaObsah(found.modul.slug, found.tema.slug)
  if (!obsah) notFound()

  return (
    <Kniha
      lang={lang}
      modul={found.modul.slug}
      tema={found.tema.slug}
      obsah={obsah}
      spatHref={cesta.tema(found.modul.slug, found.tema.slug)}
      dalejHref={cesta.temaHotovo(found.modul.slug, found.tema.slug)}
    />
  )
}
