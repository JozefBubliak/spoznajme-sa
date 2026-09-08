import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok } from '../_ui'

type P = { params: Promise<{ lang: string }> }

const body = [
  ['Každý sám', 'Ty aj partner/ka vypĺňate oddelene. Svoje odpovede navzájom nevidíte, kým obaja neskončíte danú tému.'],
  ['Screening na začiatku témy', 'Každá téma sa otvára otázkou „Chcem to skúmať?“ — Áno / Ešte nie / Nie. Ak jeden zvolí Nie alebo Ešte nie, téma sa zamkne aj druhému (aby ju zbytočne nevypĺňal).'],
  ['Zrkadlové roly', 'Pri praktikách s dvoma rolami sa pýtame zrkadlovo: „Chcem prijímať?“ a „Chcem poskytovať?“ — zvlášť.'],
  ['Bezpečné vyhodnotenie (Double Blind)', 'Téma sa vo výsledku ukáže len vtedy, ak obaja vyjadrili záujem. Pri nesúlade sa nezobrazí — nikto nie je zahanbený ani zranený.'],
  ['Priebežné ukladanie', 'Môžeš kedykoľvek prestať a vrátiť sa. Nič sa nestratí.'],
  ['Výstup', 'Na konci vznikne „Mapa spoločnej rozkoše“ — zoznam oblastí, kde ste sa zhodli, a tipy, kam ísť ďalej.'],
]

export default async function AkoToFunguje({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Ako to funguje"
      nadpis="Šesť princípov, na ktorých dotazník stojí."
      spat={{ href: p(cesta.domov), label: 'Úvod' }}
      dalej={{ href: p(cesta.par), label: 'Rozumiem, začať' }}
    >
      {body.map(([t, d]) => (
        <div key={t} className="rounded-2xl border border-border/70 bg-card/60 p-5">
          <div className="text-sm font-semibold text-foreground">{t}</div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
        </div>
      ))}
    </Krok>
  )
}
