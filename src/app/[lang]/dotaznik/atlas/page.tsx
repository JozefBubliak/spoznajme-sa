import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, ATLAS_SEKCIE } from '@/lib/dotaznik/strom'
import { Krok, Riadok, Fazy } from '../_ui'

type P = { params: Promise<{ lang: string }> }

// Preferenčný atlas — spoločné naladenie pred modulmi (nie je viazané na tému).
export default async function AtlasKrok({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <>
      <Fazy aktivna={3} />
      <Krok
        krok="Krok 3 — Preferenčný atlas"
        nadpis="Najprv spoločný základ, potom jednotlivé oblasti."
        lead="Krátke naladenie, ktoré platí naprieč všetkými témami: súhlas, komunikácia, čas, telo, libido, zdravie."
        spat={{ href: p(cesta.rola), label: 'Rola' }}
        dalej={{ href: p(cesta.moduly), label: 'Prejsť na moduly' }}
      >
        {ATLAS_SEKCIE.map((s) => (
          <Riadok key={s.slug} href={p(cesta.moduly)} nazov={s.nazov} popis={s.popis} ikona="•" />
        ))}
      </Krok>
    </>
  )
}
