import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { Krok, Volba } from '../../_ui'

type P = { params: Promise<{ lang: string }> }

export default async function NazivoHotovo({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Naživo · hotovo"
      nadpis="Prešli ste to spolu."
      lead="Nič sa neuložilo — a to je v poriadku. Dôležité je, že ste sa o tom rozprávali."
      spat={{ href: p('/dotaznik/nazivo'), label: 'Zoznam modulov' }}
    >
      <Volba href={p('/dotaznik/nazivo')} nazov="Prejsť niektorú tému znova" />
      <Volba href={p('/dotaznik/par')} nazov="Prepnúť do režimu Bez trapasu" popis="Ak chcete odpovede a mapu zhôd." ton="ano" />
    </Krok>
  )
}
