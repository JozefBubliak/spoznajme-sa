import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok, Volba, Fazy } from '../_ui'

type P = { params: Promise<{ lang: string }> }

// Vetva: pohlavie / rola — prispôsobí jazyk a zrkadlové otázky.
export default async function RolaKrok({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <>
      <Fazy aktivna={2} />
      <Krok
        krok="Krok 2 — Rola"
        nadpis="Vyber svoju rolu — podľa nej sa prispôsobí jazyk otázok."
        lead="Ovplyvňuje len formuláciu (zrkadlové otázky typu „prijímam / poskytujem“). Neurčuje, čo môžeš alebo nemôžeš chcieť."
        spat={{ href: p(cesta.par), label: 'Pár' }}
      >
        <Volba href={p(cesta.atlas)} nazov="Som žena" />
        <Volba href={p(cesta.atlas)} nazov="Som muž" />
        <Volba href={p(cesta.atlas)} nazov="Inak / nechcem uvádzať" popis="Otázky zostanú v neutrálnej formulácii." />
      </Krok>
    </>
  )
}
