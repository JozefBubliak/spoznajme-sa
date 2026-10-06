import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { spoluKarty } from '@/lib/dotaznik/rozhovor'
import Swipe from './_swipe'

type P = { params: Promise<{ lang: string }> }

// Režim „Spolu": pár sedí spolu, swipuje témy (chceme / nie) a potom listuje
// otázkami na rozhovor. Nič sa neukladá na server; výber len v tomto prehliadači.
export default async function SpoluPage({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  return <Swipe lang={lang} karty={spoluKarty()} />
}
