import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Mapa } from '../_mapa'

type P = { params: Promise<{ lang: string }> }

export default async function MapaPage({ params }: P) {
  const { lang: raw } = await params
  return <Mapa lang={normalizeUrlLocale(raw)} />
}
