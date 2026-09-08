import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Vyhodnotenie } from '../_mapa'

type P = { params: Promise<{ lang: string }> }

export default async function VyhodnoteniePage({ params }: P) {
  const { lang: raw } = await params
  return <Vyhodnotenie lang={normalizeUrlLocale(raw)} />
}
