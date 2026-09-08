import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { cesta } from '@/lib/dotaznik/strom'
import { Krok } from '../_ui'

type P = { params: Promise<{ lang: string }> }

const zoznam = [
  ['Čo partner vidí', 'Len zhodu. Pri zamknutej téme vidí ikonu zámku a či ide o trvalý alebo dočasný zámok — nie dôvod, ak ho nezdieľaš.'],
  ['Čo partner nikdy neuvidí', 'Tvoje „nie“ pri téme, ktorú on chce. Ani tvoju túžbu pri téme, ktorú on odmietol.'],
  ['Čo sa ukladá', 'Tvoje odpovede priebežne, aby si sa mohol/mohla vrátiť. Pár je prepojený jedným kódom.'],
  ['Anonymné štatistiky', 'Dáta môžu vstúpiť do súhrnnej anonymnej štatistiky projektu. V rámci páru zostávajú skryté podľa pravidiel vyššie.'],
  ['Zmazanie', 'Pár aj jeho odpovede sa dajú kedykoľvek zmazať.'],
]

export default async function Sukromie({ params }: P) {
  const { lang: raw } = await params
  const lang = normalizeUrlLocale(raw)
  const p = (s: string) => `/${lang}${s}`

  return (
    <Krok
      krok="Súkromie a bezpečie"
      nadpis="Nič, čo by mohlo jedného z vás zahanbiť, sa nedostane k druhému."
      spat={{ href: p(cesta.domov), label: 'Úvod' }}
      dalej={{ href: p(cesta.par), label: 'Pokračovať' }}
    >
      {zoznam.map(([t, d]) => (
        <div key={t} className="rounded-2xl border border-border/70 bg-card/60 p-5">
          <div className="text-sm font-semibold text-foreground">{t}</div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
        </div>
      ))}
    </Krok>
  )
}
