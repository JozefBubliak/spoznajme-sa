import { notFound } from 'next/navigation'
import Link from 'next/link'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { sprievodcaUzol } from '@/lib/dotaznik/sprievodca'
import { Krok } from '../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

export default async function NazivoModul({ params }: P) {
  const { lang: raw, modul: modulSlug } = await params
  const lang = normalizeUrlLocale(raw)
  const modul = getModul(modulSlug)
  if (!modul) notFound()
  const p = (s: string) => `/${lang}${s}`

  const uvod = sprievodcaUzol(modul.slug, modul.popis)
  const dalsi = susednyModul(modul.slug, 'dalej')

  return (
    <Krok
      krok={`Naživo · modul ${modul.cislo} — ${modul.ikona}`}
      nadpis={modul.nazov}
      lead={modul.popis}
      spat={{ href: p('/dotaznik/nazivo'), label: 'Zoznam modulov' }}
      dalej={
        dalsi
          ? { href: p(`/dotaznik/nazivo/${dalsi.slug}`), label: `Ďalší modul: ${dalsi.nazov}` }
          : { href: p('/dotaznik/nazivo/hotovo'), label: 'Dokončiť' }
      }
    >
      {uvod.edu && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground">
          {uvod.edu}
        </div>
      )}
      {uvod.prompty.length > 0 && (
        <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Na začiatok
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground">
            {uvod.prompty.map((q) => (
              <li key={q}>• {q}</li>
            ))}
          </ul>
        </div>
      )}

      {modul.temy.map((t) => {
        const u = sprievodcaUzol(`${modul.slug}/${t.slug}`, t.popis)
        return (
          <div key={t.slug} className="rounded-2xl border border-border/70 bg-card/40 p-5">
            <div className="text-sm font-semibold text-foreground">{t.nazov}</div>
            <p className="mt-1 text-xs text-muted-foreground">{t.popis}</p>
            {u.edu && <p className="mt-3 text-sm leading-relaxed text-foreground">{u.edu}</p>}
            <ul className="mt-3 space-y-1.5 text-sm text-foreground">
              {u.prompty.map((q) => (
                <li key={q}>• {q}</li>
              ))}
            </ul>
          </div>
        )
      })}

      <Link href={p('/dotaznik/nazivo')} className="block text-xs text-muted-foreground hover:text-foreground">
        Späť na zoznam modulov
      </Link>
    </Krok>
  )
}
