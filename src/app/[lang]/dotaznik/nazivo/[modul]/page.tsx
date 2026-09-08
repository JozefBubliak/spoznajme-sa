import { notFound } from 'next/navigation'
import Link from 'next/link'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import { getModul, MODULY, susednyModul } from '@/lib/dotaznik/strom'
import { sprievodcaUzol, type SprievodcaUzol } from '@/lib/dotaznik/sprievodca'
import { Krok } from '../../_ui'

type P = { params: Promise<{ lang: string; modul: string }> }

export function generateStaticParams() {
  return MODULY.map((m) => ({ modul: m.slug }))
}

function Blok({ nadpis, text }: { nadpis: string; text: string }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-primary/70">{nadpis}</div>
      <p className="mt-1 text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  )
}

function Zoznam({ nadpis, polozky, ton }: { nadpis: string; polozky: string[]; ton?: 'safe' }) {
  return (
    <div>
      <div
        className={`text-xs font-semibold uppercase tracking-widest ${
          ton === 'safe' ? 'text-[hsl(var(--warning))]' : 'text-primary/70'
        }`}
      >
        {nadpis}
      </div>
      <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-foreground">
        {polozky.map((x) => (
          <li key={x}>• {x}</li>
        ))}
      </ul>
    </div>
  )
}

function Uzol({ u }: { u: SprievodcaUzol }) {
  return (
    <div className="space-y-4">
      {u.co && <Blok nadpis="Čo to je" text={u.co} />}
      {u.preco && <Blok nadpis="Prečo to páry skúšajú" text={u.preco} />}
      {u.bezpecne && u.bezpecne.length > 0 && <Zoznam nadpis="Bezpečne" polozky={u.bezpecne} ton="safe" />}
      {u.akoZacat && u.akoZacat.length > 0 && <Zoznam nadpis="Ako začať" polozky={u.akoZacat} />}
      <Zoznam nadpis="Na rozhovor" polozky={u.prompty} />
    </div>
  )
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
      siroky
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
      {/* Rámec modulu — vysvetlenie a bezpečie sú tu RAZ, nie v každej téme */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <Uzol u={uvod} />
      </div>

      {/* Témy = len otázky na rozhovor */}
      {modul.temy.map((t, i) => {
        const u = sprievodcaUzol(`${modul.slug}/${t.slug}`, t.popis)
        return (
          <div key={t.slug} className="rounded-2xl border border-border/70 bg-card/40 p-5">
            <div className="text-sm font-semibold text-foreground">
              {modul.cislo}.{i + 1} · {t.nazov}
              {t.zrkadlova && <span className="ml-2 text-xs text-muted-foreground">⇄ prijímam / poskytujem</span>}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t.popis}</p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground">
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
