import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { vsetkyObsahy } from '@/lib/dotaznik/obsah'
import { DOMENY, MODULY } from '@/lib/dotaznik/strom'
import ObsahPrehladClient from './_client'

type P = { params: Promise<{ lang: string }> }

export default async function ObsahPrehladPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)

  return <ObsahPrehladClient lang={lang} temy={vsetkyObsahy()} domeny={DOMENY} moduly={MODULY} />
}
