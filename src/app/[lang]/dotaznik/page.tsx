import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok, Volba } from './_ui'

type P = { params: Promise<{ lang: string }> }

export default async function DotaznikLanding({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Dotazník intímnych preferencií"
      nadpis="Zistite spolu, čo sa komu páči, čo nie a k čomu má neutrálny postoj."
      lead="Každý odpovedá sám za seba. Výsledok sa ukáže obom len tam, kde je zhoda — nikto sa nedozvie o odmietnutí ani o nenaplnenej túžbe toho druhého (princíp Double Blind)."
      dalej={{ href: p(cesta.par), label: 'Začať' }}
    >
      <Volba href={p(cesta.akoToFunguje)} nazov="Ako to funguje" popis="Zamykanie tém, zrkadlové roly, bezpečné vyhodnotenie." />
      <Volba href={p(cesta.sukromie)} nazov="Súkromie a bezpečie" popis="Čo sa ukladá, čo vidí partner, čo sa nezobrazí nikdy." />
      <Volba href={p(cesta.moduly)} nazov="Prezrieť mapu modulov" popis="11 oblastí od jemných po citlivé — bez vypĺňania." />
    </Krok>
  )
}
