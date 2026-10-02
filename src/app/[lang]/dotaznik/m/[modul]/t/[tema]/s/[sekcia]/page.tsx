import { notFound } from 'next/navigation'
import Link from 'next/link'
import { normalizeUrlLocale } from '@/lib/i18n-routing'
import {
  cesta,
  getTema,
  sekcieTemy,
  susednaSekcia,
  MODULY,
  type SekciaId,
} from '@/lib/dotaznik/strom'
import { otazkySekcie, type Otazka } from '@/lib/dotaznik/otazky'
import { Krok } from '../../../../../../_ui'
import SekciaOtazky from '../../../../../../_odpovede'

// L4 `polozky` z `strom.ts` → otázky, keď sekcia nemá vlastnú banku v `otazky.ts`.
function otazkyZPoloziek(sekciaId: string, polozky: string[] | undefined): Otazka[] {
  if (!polozky?.length) return []
  if (sekciaId === 'preferencie' || sekciaId === 'techniky' || sekciaId === 'scenare') {
    return polozky.map((text, i) => ({ id: `pl_${i}`, typ: 'postoj', text }))
  }
  if (sekciaId === 'hranice') {
    return polozky.map((text, i) => ({ id: `hr_${i}`, typ: 'semafor', text }))
  }
  return []
}

type P = { params: Promise<{ lang: string; modul: string; tema: string; sekcia: string }> }

export function generateStaticParams() {
  return MODULY.flatMap((m) =>
    m.temy.flatMap((t) =>
      sekcieTemy(t).map((s) => ({ modul: m.slug, tema: t.slug, sekcia: s.id })),
    ),
  )
}

export default async function TemaSekcia({ params }: P) {
  const { lang: raw, modul: modulSlug, tema: temaSlug, sekcia: sekciaId } = await params
  const lang = normalizeUrlLocale(raw)
  const found = getTema(modulSlug, temaSlug)
  if (!found) notFound()
  const { modul, tema } = found

  const zoznam = sekcieTemy(tema)
  const sekcia = zoznam.find((s) => s.id === (sekciaId as SekciaId))
  if (!sekcia) notFound()

  const p = (s: string) => `/${lang}${s}`
  const poradie = zoznam.findIndex((s) => s.id === sekcia.id) + 1
  const dalsia = susednaSekcia(tema, sekcia.id, 'dalej')
  const predch = susednaSekcia(tema, sekcia.id, 'spat')

  const spatHref = predch
    ? cesta.temaSekcia(modul.slug, tema.slug, predch.id)
    : tema.zrkadlova
      ? cesta.temaRola(modul.slug, tema.slug)
      : cesta.tema(modul.slug, tema.slug)

  const dalejHref = dalsia
    ? cesta.temaSekcia(modul.slug, tema.slug, dalsia.id)
    : cesta.temaHotovo(modul.slug, tema.slug)

  // Vlastná banka z `otazky.ts`, inak vygenerované z L4 `polozky`, inak kostra.
  const bankove = otazkySekcie(modul.slug, tema.slug, sekcia.id)
  const zPoloziek = bankove.length ? [] : otazkyZPoloziek(sekcia.id, tema.polozky)
  const otazky = bankove.length ? bankove : zPoloziek

  if (otazky.length > 0) {
    return (
      <SekciaOtazky
        lang={lang}
        modul={modul.slug}
        tema={tema.slug}
        sekcia={sekcia.id}
        nazovSekcie={`${tema.nazov} · ${sekcia.nazov}`}
        dalejHref={dalejHref}
        spatHref={spatHref}
        otazky={otazky}
      />
    )
  }

  return (
    <Krok
      krok={`${tema.nazov} · sekcia ${poradie}/${zoznam.length}`}
      nadpis={sekcia.nazov}
      lead={sekcia.ucel}
      spat={{ href: p(spatHref), label: predch ? predch.nazov : 'Späť' }}
      dalej={{ href: p(dalejHref), label: dalsia ? `Ďalej: ${dalsia.nazov}` : 'Dokončiť tému' }}
    >
      <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-5 text-sm text-muted-foreground">
        Miesto pre otázky sekcie „{sekcia.nazov}“. Zatiaľ len kostra — obsah sa doplní neskôr.
      </div>

      {/* rýchly skok medzi sekciami témy */}
      <nav className="flex flex-wrap gap-2 pt-2">
        {zoznam.map((s, i) => (
          <Link
            key={s.id}
            href={p(cesta.temaSekcia(modul.slug, tema.slug, s.id))}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              s.id === sekcia.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border/70 text-muted-foreground hover:text-foreground'
            }`}
          >
            {i + 1}. {s.nazov}
          </Link>
        ))}
      </nav>
    </Krok>
  )
}
