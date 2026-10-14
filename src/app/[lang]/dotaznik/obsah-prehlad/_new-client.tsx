'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { TemaObsah } from '@/lib/dotaznik/obsah/typ'
import { gtext } from '@/lib/dotaznik/obsah/typ'
import { PREHLAD_SKUPINY } from './_sections'
import PairedPreview from './_paired'

function normalize(s: string) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() }

export default function ObsahPrehladClient({ lang, temy }: { lang: string; temy: TemaObsah[] }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(temy[0]?.slug ?? '')
  const q = normalize(query.trim())
  const ordered = useMemo(() => {
    const bySlug = new Map(temy.map(t => [t.slug, t]))
    const slugs = PREHLAD_SKUPINY.flatMap(g => g.polozky.flatMap(p => p.slugs))
    return [...slugs.map(slug => bySlug.get(slug)).filter((t): t is TemaObsah => Boolean(t)),
      ...temy.filter(t => !slugs.includes(t.slug))]
  }, [temy])
  const results = ordered.filter(t => normalize(`${gtext(t.nadpis, 'z')} ${gtext(t.nadpis, 'm')} ${t.slug}`).includes(q))
  const current = ordered.find(t => t.slug === selected) ?? ordered[0]
  const choose = (slug: string) => { setSelected(slug); window.history.replaceState(null, '', `#${encodeURIComponent(slug)}`); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="mx-auto w-full max-w-[1680px] px-3 py-6 sm:px-6 lg:px-8">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">Admin · obsah dotazníka</p>
        <h1 className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">Žena a muž. Vedľa seba.</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Každý riadok je tá istá obsahová časť v oboch podobách. Odpovede môžeš skúšať nezávisle; vetvy sa otvárajú podľa výberu. Admin notes pri téme, sekcii aj každom bloku zostávajú uložené.</p>
      </div>
      <Link href={`/${lang}/dotaznik/spolu`} className="rounded-full border border-white/20 px-4 py-2 text-xs text-foreground hover:border-amber-200">Režim Spolu ↗</Link>
    </div>
    <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:self-start lg:overflow-y-auto lg:pr-2">
        <label htmlFor="tema-search" className="sr-only">Hľadať tému</label>
        <input id="tema-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Hľadať tému…"
          className="mb-4 w-full rounded-xl border border-white/20 bg-card px-4 py-3 text-sm outline-none focus:border-amber-200" />
        <p className="mb-3 text-xs text-muted-foreground">{results.length} z {ordered.length} tém</p>
        {PREHLAD_SKUPINY.map(group => {
          const items = group.polozky.flatMap(item => item.slugs.map(slug => ({ slug, label: item.nazov }))).filter(item => results.some(t => t.slug === item.slug))
          if (!items.length) return null
          return <details key={group.id} open={!q} className="mb-2 rounded-xl border border-white/10 bg-card/30">
            <summary className="cursor-pointer px-3 py-3 text-xs font-semibold text-foreground">{group.nazov}</summary>
            <div className="space-y-1 px-2 pb-2">{items.map(item => <button key={item.slug} type="button" onClick={() => choose(item.slug)}
              className={`w-full rounded-lg px-3 py-2 text-left text-xs leading-snug transition ${current?.slug === item.slug ? 'bg-amber-200/15 text-amber-100' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}>{gtext(item.label, 'z')}</button>)}</div>
          </details>
        })}
        {results.filter(t => !PREHLAD_SKUPINY.some(g => g.polozky.some(p => p.slugs.includes(t.slug)))).map(t => <button key={t.slug} type="button" onClick={() => choose(t.slug)} className="block w-full rounded-lg px-3 py-2 text-left text-xs hover:bg-white/5">{gtext(t.nadpis, 'z')}</button>)}
        {results.length === 0 && <p className="text-sm text-muted-foreground">Žiadna téma sa nenašla.</p>}
      </aside>
      <main className="min-w-0">
        {current && <>
          <div className="mb-5 rounded-2xl border border-white/10 bg-card/30 p-5">
            <p className="text-[11px] uppercase tracking-widest text-amber-200">Vybraná téma</p>
            <h2 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">{gtext(current.nadpis, 'z')}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{current.slug}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/${lang}/dotaznik/nahlad/${current.slug}?p=z`} className="rounded-full border border-rose-300/40 px-3 py-1.5 text-xs text-rose-200 hover:bg-rose-300/10">Otvoriť sólo simuláciu ženy ↗</Link>
              <Link href={`/${lang}/dotaznik/nahlad/${current.slug}?p=m`} className="rounded-full border border-sky-300/40 px-3 py-1.5 text-xs text-sky-200 hover:bg-sky-300/10">Otvoriť sólo simuláciu muža ↗</Link>
            </div>
          </div>
          <PairedPreview key={current.slug} tema={current} />
        </>}
      </main>
    </div>
  </div>
}
