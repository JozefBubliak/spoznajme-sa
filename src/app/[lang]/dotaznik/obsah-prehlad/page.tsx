import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { obsahPrehlad } from '@/lib/dotaznik/obsah-prehlad'
import ObsahPrehladClient from './_client'

type P = { params: Promise<{ lang: string }> }

export default async function ObsahPrehladPage({ params }: P) {
  const { lang: raw } = await params
  normalizeUrlLocale(raw)

  const sekcie = obsahPrehlad()

  return <ObsahPrehladClient sekcie={sekcie} />
}
