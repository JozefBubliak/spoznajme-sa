import { notFound } from 'next/navigation'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getTema } from '@/lib/dotaznik/strom'
import { temaObsah } from '@/lib/dotaznik/obsah'
import type { Pohlavie } from '@/lib/dotaznik/obsah/typ'
import Kniha from '../../../_kniha'

type P = {
  params: Promise<{ lang: string; modul: string; tema: string }>
  searchParams: Promise<{ p?: string }>
}

// Admin náhľad témy presne tak, ako ju vidí respondent (muž/žena), vrátane
// vetvenia — bez páru a bez ukladania. Admin gate rieši dotaznik/layout.tsx.
export default async function NahladTemy({ params, searchParams }: P) {
  const { lang: raw, modul, tema } = await params
  const { p } = await searchParams
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modul, tema)
  if (!found) notFound()
  const obsah = temaObsah(found.modul.slug, found.tema.slug)
  if (!obsah) notFound()
  const pohlavie: Pohlavie | undefined = p === 'm' || p === 'z' ? p : undefined

  return (
    <Kniha
      key={pohlavie ?? 'x'}
      lang={lang}
      modul={found.modul.slug}
      tema={found.tema.slug}
      obsah={obsah}
      spatHref={`/dotaznik/obsah-prehlad#${obsah.slug}`}
      dalejHref={`/dotaznik/obsah-prehlad#${obsah.slug}`}
      nahlad
      pohlavieStart={pohlavie}
    />
  )
}
