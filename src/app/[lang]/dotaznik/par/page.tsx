import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok, Volba, Fazy } from '../_ui'

type P = { params: Promise<{ lang: string }> }

// Vetva: založiť nový pár vs pripojiť sa kódom. Obe vedú na voľbu roly.
export default async function ParKrok({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <>
      <Fazy aktivna={1} />
      <Krok
        krok="Krok 1 — Pár"
        nadpis="Prepojte svoje odpovede jedným kódom páru."
        lead="Jeden z vás vytvorí kód, druhý ho zadá. Odpovede sa spárujú, ale zostanú oddelené, kým sa neukáže zhoda."
        spat={{ href: p(cesta.domov), label: 'Úvod' }}
      >
        <Volba href={p(cesta.rola)} nazov="Vytvoriť nový pár" popis="Dostaneš kód, ktorý pošleš partnerovi/partnerke." ton="ano" />
        <Volba href={p(cesta.rola)} nazov="Pripojiť sa kódom" popis="Už máš kód od partnera/partnerky." />
      </Krok>
    </>
  )
}
