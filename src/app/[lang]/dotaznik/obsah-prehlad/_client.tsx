'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Blok, OtazkaBlok, Podmienka, Pohlavie, TabulkaBlok, TemaObsah, TextBlok } from '@/lib/dotaznik/obsah/typ'
import { gtext } from '@/lib/dotaznik/obsah/typ'
import type { Domena, Modul } from '@/lib/dotaznik/strom'

// ─────────────────────────────────────────────────────────────────────────────
// Admin prehľad: rovnaké vizuálne komponenty ako skutočný dotazník (_kniha.tsx),
// len bez interaktivity/ukladania — takto to naozaj vidí respondent, len
// všetky témy naraz, s prepínačom pohlavia a fulltextovým hľadaním.
// ─────────────────────────────────────────────────────────────────────────────

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function podmienkaText(p?: Podmienka): string | undefined {
  if (!p) return undefined
  const casti: string[] = []
  if (p.pohlavie) casti.push(`len pohlavie: ${p.pohlavie}`)
  if (p.ot && p.je) casti.push(`${p.ot} = ${p.je}`)
  if (p.ot && p.nie) casti.push(`${p.ot} ≠ ${p.nie}`)
  if (p.ot && p.jeNiektora) casti.push(`${p.ot} ∈ [${p.jeNiektora.join(', ')}]`)
  if (p.ot && p.obsahuje) casti.push(`${p.ot} obsahuje „${p.obsahuje}"`)
  if (p.ot && p.obsahujeNiektoru) casti.push(`${p.ot} obsahuje niektorú z [${p.obsahujeNiektoru.join(', ')}]`)
  return casti.length ? casti.join(', ') : undefined
}

function blokHaystack(b: Blok): string {
  if (b.druh === 'text') {
    return [gtext(b.telo, 'm'), gtext(b.telo, 'z'), b.nadpis ? gtext(b.nadpis, 'm') : '', b.nadpis ? gtext(b.nadpis, 'z') : ''].join(' ␟ ')
  }
  if (b.druh === 'tabulka') {
    return [
      b.nadpis ? gtext(b.nadpis, 'm') + ' ' + gtext(b.nadpis, 'z') : '',
      b.hlavicka.map((h) => gtext(h, 'm') + ' ' + gtext(h, 'z')).join(' '),
      b.riadky.flat().map((c) => gtext(c, 'm') + ' ' + gtext(c, 'z')).join(' '),
    ].join(' ␟ ')
  }
  if (b.druh === 'otazka') {
    return [
      gtext(b.text, 'm'),
      gtext(b.text, 'z'),
      b.napoveda ? gtext(b.napoveda, 'm') : '',
      b.napoveda ? gtext(b.napoveda, 'z') : '',
      ...(b.moznosti ?? []).flatMap((m) => [gtext(m.label, 'm'), gtext(m.label, 'z')]),
      ...(b.riadky ?? []).flatMap((m) => [gtext(m.label, 'm'), gtext(m.label, 'z')]),
      ...(b.stlpce ?? []).flatMap((m) => [gtext(m.label, 'm'), gtext(m.label, 'z')]),
    ].join(' ␟ ')
  }
  // skupina — len vlastný nadpis/uvod, deti sa filtrujú samostatne
  return [
    b.nadpis ? gtext(b.nadpis, 'm') + ' ' + gtext(b.nadpis, 'z') : '',
    b.uvod ? gtext(b.uvod, 'm') + ' ' + gtext(b.uvod, 'z') : '',
  ].join(' ␟ ')
}

function filterBloky(bloky: Blok[], q: string): Blok[] {
  if (!q) return bloky
  const out: Blok[] = []
  for (const b of bloky) {
    if (b.druh === 'skupina') {
      const deti = filterBloky(b.bloky, q)
      const selfMatch = normalize(blokHaystack(b)).includes(q)
      if (deti.length > 0) out.push({ ...b, bloky: deti })
      else if (selfMatch) out.push(b)
      continue
    }
    if (normalize(blokHaystack(b)).includes(q)) out.push(b)
  }
  return out
}

function countLeaves(bloky: Blok[]): number {
  let n = 0
  for (const b of bloky) {
    if (b.druh === 'skupina') n += countLeaves(b.bloky)
    else n += 1
  }
  return n
}

// Obsahová cesta od naladenia a základného rámca po najcitlivejšie oblasti.
// Technické písmená domén nemeníme; v admin prehľade ich iba skladáme tak,
// aby poradie dávalo zmysel človeku, ktorý dotazník číta od začiatku.
const PORADIE_DOMEN = ['A', 'I', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

// ── vizuálne komponenty (1:1 podľa _kniha.tsx, bez interaktivity) ──────────

function Prose({ nadpis, telo, ton }: { nadpis?: string; telo: string; ton?: string }) {
  const box =
    ton === 'vystraha'
      ? 'border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]'
      : ton === 'info'
        ? 'border-primary/25 bg-primary/5 text-foreground/80'
        : ton === 'citat'
          ? 'border-l-2 border-primary/40 bg-transparent pl-4 text-foreground/80 italic'
          : 'border-transparent bg-transparent text-foreground/80'
  const wrap = ton === 'citat' ? '' : 'rounded-2xl border p-4'
  return (
    <div className={`${wrap} ${box}`}>
      {nadpis && <div className="mb-1.5 text-sm font-semibold text-foreground">{nadpis}</div>}
      {telo
        .split('\n\n')
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="mt-1.5 text-sm leading-relaxed first:mt-0">
            {p}
          </p>
        ))}
    </div>
  )
}

function ChipsStatic({ moznosti, viac }: { moznosti: { v: string; label: string }[]; viac?: boolean }) {
  return (
    <div className={viac ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}>
      {moznosti.map((m) => (
        <div
          key={m.v}
          className={`rounded-xl border border-border bg-card/40 px-3.5 py-2 text-left text-sm font-medium text-foreground ${viac ? '' : 'w-full'}`}
        >
          {m.label}
        </div>
      ))}
    </div>
  )
}

function OtazkaPoleStatic({ blok, p }: { blok: OtazkaBlok; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const moznosti = (blok.moznosti ?? []).map((m) => ({ v: m.v, label: G(m.label) }))
  const meta = [`typ: ${blok.typ}`, blok.rola && `rola: ${blok.rola}`, podmienkaText(blok.podmienka)].filter(Boolean).join(' · ')

  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
      <div className="text-sm font-medium text-foreground">{G(blok.text)}</div>
      {blok.napoveda && <p className="mt-1 text-xs text-muted-foreground">{G(blok.napoveda)}</p>}
      {blok.typ === 'viac' && <p className="mt-1 text-[11px] text-primary/80">Môžeš označiť viac možností.</p>}

      <div className="mt-3">
        {(blok.typ === 'jeden' || blok.typ === 'skala') && (
          <div className="space-y-2">
            <ChipsStatic moznosti={moznosti} />
            {blok.inePovolene && (
              <input
                disabled
                placeholder="Iné alebo doplnenie… (voliteľné)"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground outline-none"
              />
            )}
          </div>
        )}

        {blok.typ === 'viac' && (
          <div className="space-y-2">
            <ChipsStatic viac moznosti={moznosti} />
            {blok.inePovolene && (
              <input
                disabled
                placeholder="Iné…"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground outline-none"
              />
            )}
          </div>
        )}

        {blok.typ === 'text' && (
          <textarea
            disabled
            rows={2}
            placeholder="Napíš voľne… (voliteľné)"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground outline-none"
          />
        )}

        {blok.typ === 'mrezka' && (
          <div className="space-y-3">
            {(blok.riadky ?? []).map((r) => (
              <div key={r.v}>
                <div className="mb-1.5 text-xs font-medium text-muted-foreground">{G(r.label)}</div>
                <ChipsStatic viac moznosti={(blok.stlpce ?? []).map((c) => ({ v: c.v, label: G(c.label) }))} />
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-3 text-[10px] text-muted-foreground/40">
        #{blok.id}
        {meta ? ` · ${meta}` : ''}
      </p>
    </div>
  )
}

function TabulkaStatic({ blok, p }: { blok: TabulkaBlok; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70">
      {blok.nadpis && (
        <div className="border-b border-border/70 bg-card/40 px-4 py-2 text-sm font-semibold text-foreground">{G(blok.nadpis)}</div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr className="text-muted-foreground">
            {blok.hlavicka.map((h, i) => (
              <th key={i} className="border-b border-border/60 px-3 py-2 text-left font-medium">
                {G(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {blok.riadky.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} className="border-b border-border/40 px-3 py-2 align-top text-foreground/80">
                  {G(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TextStatic({ blok, p }: { blok: TextBlok; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const telo = G(blok.telo)
  if (!telo && !blok.nadpis) return null
  return <Prose nadpis={blok.nadpis ? G(blok.nadpis) : undefined} telo={telo} ton={blok.ton} />
}

function Bloky({ bloky, p }: { bloky: Blok[]; p: Pohlavie }) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  return (
    <>
      {bloky.map((b) => {
        if (b.druh === 'text') return <TextStatic key={b.id} blok={b} p={p} />
        if (b.druh === 'tabulka') return <TabulkaStatic key={b.id} blok={b} p={p} />
        if (b.druh === 'skupina') {
          const pod = podmienkaText(b.podmienka)
          return (
            <div key={b.id} className="space-y-4 rounded-2xl border border-border/60 bg-card/20 p-4">
              {b.nadpis && (
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  <span>{G(b.nadpis)}</span>
                  {pod && <span className="text-[10px] normal-case tracking-normal text-muted-foreground/50">{pod}</span>}
                </div>
              )}
              {b.uvod && <p className="text-sm leading-relaxed text-muted-foreground">{G(b.uvod)}</p>}
              <Bloky bloky={b.bloky} p={p} />
            </div>
          )
        }
        return <OtazkaPoleStatic key={b.id} blok={b} p={p} />
      })}
    </>
  )
}

// ── stránka ─────────────────────────────────────────────────────────────────

export default function ObsahPrehladClient({
  lang,
  temy,
  domeny,
  moduly,
}: {
  lang: string
  temy: TemaObsah[]
  domeny: Domena[]
  moduly: Modul[]
}) {
  const [query, setQuery] = useState('')
  const [pohlavie, setPohlavie] = useState<Pohlavie>('z')
  const [modulSlug, setModulSlug] = useState<string>()
  const [temaSlug, setTemaSlug] = useState<string>()

  const q = normalize(query.trim())

  const detaily = useMemo(() => {
    return new Map(temy.map((tema) => [tema.slug, tema]))
  }, [temy])

  const sekcie = useMemo(() => new Map(temy.map((tema) => {
      const nazovMatch = normalize(gtext(tema.nadpis, 'm') + ' ' + gtext(tema.nadpis, 'z')).includes(q)
      const zobrazitVsetko = !q || nazovMatch
      const uvod = zobrazitVsetko ? tema.uvod : filterBloky(tema.uvod, q)
      const telo = zobrazitVsetko ? tema.telo : filterBloky(tema.telo, q)
      const zaver = zobrazitVsetko ? tema.zaver ?? [] : filterBloky(tema.zaver ?? [], q)
      const pocet = countLeaves(tema.uvod) + countLeaves(tema.telo) + countLeaves(tema.zaver ?? [])
      const pocetZobrazene = countLeaves(uvod) + countLeaves(telo) + countLeaves(zaver)
      const viditelna = !q || nazovMatch || pocetZobrazene > 0
      return [tema.slug, { tema, uvod, telo, zaver, pocet, pocetZobrazene, viditelna }] as const
    })), [temy, q])

  useEffect(() => {
    const otvorHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1))
      if (!hash.includes('/')) {
        if (moduly.some((m) => m.slug === hash)) {
          setModulSlug(hash)
          setTemaSlug(undefined)
        }
        return
      }
      const [modul, tema] = hash.split('/')
      if (moduly.some((m) => m.slug === modul && m.temy.some((t) => t.slug === tema))) {
        setModulSlug(modul)
        setTemaSlug(tema)
      }
    }
    otvorHash()
    window.addEventListener('hashchange', otvorHash)
    return () => window.removeEventListener('hashchange', otvorHash)
  }, [moduly])

  const vybranyModul = moduly.find((m) => m.slug === modulSlug)
  const vybranaTema = vybranyModul?.temy.find((t) => t.slug === temaSlug)
  const detailSlug = vybranyModul && vybranaTema ? `${vybranyModul.slug}/${vybranaTema.slug}` : undefined
  const detail = detailSlug ? sekcie.get(detailSlug) : undefined
  const celkovyPocet = [...sekcie.values()].reduce((acc, s) => acc + s.pocet, 0)

  const otvorModul = (slug: string) => {
    setModulSlug(slug)
    setTemaSlug(undefined)
    setQuery('')
    window.history.replaceState(null, '', `#${slug}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const otvorTemu = (modul: string, tema: string) => {
    setModulSlug(modul)
    setTemaSlug(tema)
    setQuery('')
    window.history.replaceState(null, '', `#${modul}/${tema}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const domov = () => {
    setModulSlug(undefined)
    setTemaSlug(undefined)
    setQuery('')
    window.history.replaceState(null, '', window.location.pathname)
  }

  const modulyPrehlad = moduly.filter((modul) => {
    if (!q) return true
    const temaMatch = modul.temy.some((tema) => {
      const detailTema = sekcie.get(`${modul.slug}/${tema.slug}`)
      return normalize(`${tema.nazov} ${tema.popis} ${(tema.polozky ?? []).join(' ')}`).includes(q) || Boolean(detailTema?.viditelna)
    })
    return normalize(`${modul.kod} ${modul.nazov} ${modul.popis}`).includes(q) || temaMatch
  })

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-14">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Admin · Obsah dotazníka</p>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Kompletný prehľad tém a podtém</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {domeny.length} oblastí → {moduly.length} hlavných tém → podtémy. Najprv vyber hlavnú tému, potom podtému;
        až následne sa zobrazí jej obsah. Detailne spracovaných je {temy.length} podtém s {celkovyPocet} otázkami a textami.
      </p>

      <div className="sticky top-2 z-10 mt-6 space-y-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hľadaj čokoľvek — napr. „spontánny sex“, „mapa zmyslov“, „žiarlivosť“…"
          className="w-full rounded-full border border-border bg-background/95 px-5 py-3 text-sm text-foreground shadow-lg backdrop-blur placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          autoFocus
        />
        <div className="flex items-center justify-between gap-3 rounded-full border border-border/70 bg-background/95 px-2 py-1.5 shadow backdrop-blur">
          <div className="flex gap-1">
            {(['z', 'm'] as const).map((pg) => (
              <button
                key={pg}
                onClick={() => setPohlavie(pg)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  pohlavie === pg ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {pg === 'z' ? 'Ženská verzia' : 'Mužská verzia'}
              </button>
            ))}
          </div>
          <p className="pr-2 text-xs text-muted-foreground">{pohlavie === 'z' ? 'Texty pre ženu' : 'Texty pre muža'}</p>
        </div>
      </div>

      {!vybranyModul && (
        <div className="mt-10 space-y-10">
          {[...domeny].sort((a, b) => PORADIE_DOMEN.indexOf(a.id) - PORADIE_DOMEN.indexOf(b.id)).map((domena) => {
            const dm = modulyPrehlad.filter((m) => m.domena === domena.id)
            if (dm.length === 0) return null
            return (
              <section key={domena.id}>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-foreground">{domena.id}. {domena.nazov}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{domena.popis}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {dm.map((modul) => (
                    <button key={modul.slug} type="button" onClick={() => otvorModul(modul.slug)} className="rounded-2xl border border-border/70 bg-card/40 p-4 text-left transition hover:border-primary/50 hover:bg-card/70">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-semibold text-foreground">{modul.kod} — {modul.nazov}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">{modul.temy.length} podtém</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{modul.popis}</p>
                    </button>
                  ))}
                </div>
              </section>
            )
          })}
          {modulyPrehlad.length === 0 && <p className="text-sm text-muted-foreground">Nič sa nenašlo pre „{query}“.</p>}
        </div>
      )}

      {vybranyModul && !vybranaTema && (
        <section className="mt-10">
          <button type="button" onClick={domov} className="text-sm text-primary hover:underline">← Všetky hlavné témy</button>
          <h2 className="mt-5 text-2xl font-semibold text-foreground">{vybranyModul.kod} — {vybranyModul.nazov}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{vybranyModul.popis}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {vybranyModul.temy.map((tema) => {
              const spracovana = detaily.get(`${vybranyModul.slug}/${tema.slug}`)
              const pocet = sekcie.get(`${vybranyModul.slug}/${tema.slug}`)?.pocet
              return (
                <button key={tema.slug} type="button" onClick={() => otvorTemu(vybranyModul.slug, tema.slug)} className="rounded-2xl border border-border/70 bg-card/40 p-4 text-left transition hover:border-primary/50 hover:bg-card/70">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-foreground">{tema.nazov}</span>
                    {spracovana && <span className="shrink-0 rounded-full bg-primary/15 px-2 py-1 text-[10px] font-semibold text-primary">detail · {pocet}</span>}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{tema.popis}</p>
                  {tema.polozky && <p className="mt-2 text-[11px] text-muted-foreground/70">{tema.polozky.length} položiek</p>}
                </button>
              )
            })}
          </div>
        </section>
      )}

      {vybranyModul && vybranaTema && (
        <section className="mt-10">
          <button type="button" onClick={() => otvorModul(vybranyModul.slug)} className="text-sm text-primary hover:underline">← Podtémy: {vybranyModul.nazov}</button>
          <div className="mt-5 border-b border-border/60 pb-4">
            <p className="text-xs text-muted-foreground">{vybranyModul.kod} · {vybranyModul.nazov}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{detail ? gtext(detail.tema.nadpis, pohlavie) : vybranaTema.nazov}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{vybranaTema.popis}</p>
          </div>

          {detail ? (
            <>
              <div className="my-5 flex flex-wrap gap-2">
                {(['z', 'm'] as const).map((pg) => (
                  <Link key={pg} href={`/${lang}/dotaznik/nahlad/${detail.tema.slug}?p=${pg}`} className="rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/25">
                    ▶ Vyplniť ako {pg === 'z' ? 'žena' : 'muž'}
                  </Link>
                ))}
                <span className="px-2 py-1.5 text-xs text-muted-foreground">{detail.pocetZobrazene}{q ? ` / ${detail.pocet}` : ''} otázok/textov</span>
              </div>
              <div className="space-y-4">
                <Bloky bloky={detail.uvod} p={pohlavie} />
                <Bloky bloky={detail.telo} p={pohlavie} />
                {detail.zaver.length > 0 && <Bloky bloky={detail.zaver} p={pohlavie} />}
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-border/70 bg-card/30 p-5">
              <h3 className="font-semibold text-foreground">Obsah podtémy</h3>
              {vybranaTema.polozky?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {vybranaTema.polozky.map((polozka) => <span key={polozka} className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs text-foreground">{polozka}</span>)}
                </div>
              ) : <p className="mt-3 text-sm text-muted-foreground">Podtéma zatiaľ nemá samostatný detailný obsah.</p>}
              <Link href={`/${lang}/dotaznik/m/${vybranyModul.slug}/t/${vybranaTema.slug}`} className="mt-5 inline-flex rounded-full bg-primary/15 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/25">Otvoriť v dotazníku →</Link>
            </div>
          )}
        </section>
      )}

      <div className="mt-16 border-t border-border/60 pt-6 text-xs text-muted-foreground">
        <Link href="../moduly" className="hover:text-foreground">
          ← Späť na mapu tém
        </Link>
      </div>
    </div>
  )
}
