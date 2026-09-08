import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok, Volba } from '../_ui'

type P = { params: Promise<{ lang: string }> }

// Double Blind brána — výsledok len ak sú hotoví obaja.
export default async function Vyhodnotenie({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Vyhodnotenie"
      nadpis="Bezpečné vyhodnotenie (Double Blind)"
      lead="Zobrazia sa len oblasti, kde ste obaja vyjadrili záujem. Nesúlad sa nezobrazí ani jednému z vás."
      spat={{ href: p(cesta.hotovo), label: 'Späť' }}
    >
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 text-sm text-muted-foreground">
        <div className="font-semibold text-foreground">Stav</div>
        <p className="mt-1.5">Ty: dokončené · Partner/ka: čaká sa</p>
      </div>
      <Volba href={p(cesta.mapa)} nazov="Otvoriť mapu spoločnej rozkoše" popis="Dostupné, keď skončia obaja." ton="ano" />
    </Krok>
  )
}
