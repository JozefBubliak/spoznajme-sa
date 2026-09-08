import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta, MODULY } from '@/lib/dotaznik/strom'
import { Krok, Riadok } from '../_ui'

type P = { params: Promise<{ lang: string }> }

export default async function Mapa({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Výstup"
      nadpis="Mapa spoločnej rozkoše"
      lead="Oblasti, kde ste sa zhodli. Pri každej nájdeš odporúčaný ďalší krok (rozhovor, kartička, rituál). Zatiaľ len kostra rozloženia."
      spat={{ href: p(cesta.vyhodnotenie), label: 'Vyhodnotenie' }}
    >
      <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-5 text-sm text-muted-foreground">
        Sem sa vyplnia moduly a témy so zhodou. Ukážka usporiadania podľa modulov:
      </div>
      {MODULY.slice(0, 4).map((m) => (
        <Riadok
          key={m.slug}
          href={p(cesta.modulTemy(m.slug))}
          ikona={m.ikona}
          nazov={m.nazov}
          popis="— zhoda / rozdiel / námet na rozhovor"
          stav="hotovo"
        />
      ))}
    </Krok>
  )
}
