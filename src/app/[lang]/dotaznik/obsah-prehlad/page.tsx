import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { vsetkyObsahy } from '@/lib/dotaznik/obsah'
import ObsahPrehladClient from './_client'

type P = { params: Promise<{ lang: string }> }

export default async function ObsahPrehladPage({ params }: P) {
  const { lang: raw } = await params
  normalizeUrlLocale(raw)

  return <ObsahPrehladClient temy={vsetkyObsahy()} />
}
