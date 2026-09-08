import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { MODULY } from '@/lib/dotaznik/strom'
import { Krok, Riadok } from '../_ui'

type P = { params: Promise<{ lang: string }> }

export default async function NazivoIntro({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Režim Naživo"
      nadpis="Sprievodca rozhovorom — nič sa neklikne, len sa rozprávate."
      lead={
        'Prejdite témy spolu. Pri každej dostanete krátky kontext a otázky na diskusiu. ' +
        'Škála „páči / nepáči / neutrál“ je tu len ako pomôcka — povedzte to nahlas, neukladá sa nič.'
      }
      spat={{ href: p('/dotaznik/par'), label: 'Pár' }}
      dalej={{ href: p(`/dotaznik/nazivo/${MODULY[0].slug}`), label: 'Začať prvým modulom' }}
    >
      {MODULY.map((m) => (
        <Riadok
          key={m.slug}
          href={p(`/dotaznik/nazivo/${m.slug}`)}
          ikona={m.ikona}
          nazov={`${m.cislo}. ${m.nazov}`}
          popis={`${m.temy.length} tém`}
        />
      ))}
    </Krok>
  )
}
