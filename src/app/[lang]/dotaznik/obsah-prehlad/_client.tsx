'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { TemaSekcia, FlatPolozka, FlatMoznost } from '@/lib/dotaznik/obsah-prehlad'

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function polozkaHaystack(p: FlatPolozka, temaNadpis: string): string {
  const casti = [
    temaNadpis,
    ...p.cesta,
    p.textM,
    p.textZ,
    p.napovedaM ?? '',
    p.napovedaZ ?? '',
    ...(p.moznosti?.flatMap((m) => [m.m, m.z]) ?? []),
    ...(p.riadky?.flatMap((m) => [m.m, m.z]) ?? []),
    ...(p.stlpce?.flatMap((m) => [m.m, m.z]) ?? []),
  ]
  return normalize(casti.join(' ␟ '))
}

function TextPar({ m, z }: { m: string; z: string }) {
  if (!m && !z) return null
  if (m === z) return <>{m}</>
  return (
    <>
      <span className="text-foreground">M:</span> {m}
      <br />
      <span className="text-foreground">Ž:</span> {z}
    </>
  )
}

function MoznostiList({ label, list }: { label: string; list?: FlatMoznost[] }) {
  if (!list || list.length === 0) return null
  return (
    <div className="mt-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label} ({list.length})
      </p>
      <ul className="mt-1 space-y-0.5">
        {list.map((m) => (
          <li key={m.v} className="text-xs text-muted-foreground">
            <span className="text-muted-foreground/50">{m.v} —</span>{' '}
            {m.m === m.z ? m.m : `M: ${m.m} · Ž: ${m.z}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PolozkaCard({ p }: { p: FlatPolozka }) {
  const tonBorder =
    p.ton === 'vystraha'
      ? 'border-l-[hsl(var(--destructive))]/60'
      : p.ton === 'citat'
        ? 'border-l-[hsl(var(--warning))]/60'
        : p.druh === 'text'
          ? 'border-l-primary/40'
          : 'border-l-border'

  return (
    <div className={`rounded-xl border border-border/60 border-l-4 ${tonBorder} bg-card/50 p-4`}>
      <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground/70">
        <span className="rounded-full border border-border/60 px-2 py-0.5">
          {p.druh === 'otazka' ? `otázka · ${p.typ}` : p.druh === 'text' ? 'text' : 'tabuľka'}
        </span>
        {p.cesta.length > 0 && <span>{p.cesta.join(' › ')}</span>}
        <span className="text-muted-foreground/40">#{p.id}</span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-foreground">
        <TextPar m={p.textM} z={p.textZ} />
      </p>

      {(p.napovedaM || p.napovedaZ) && (
        <p className="mt-1 text-xs italic text-muted-foreground">
          <TextPar m={p.napovedaM ?? ''} z={p.napovedaZ ?? ''} />
        </p>
      )}

      <MoznostiList label="Možnosti" list={p.moznosti} />
      <MoznostiList label="Riadky" list={p.riadky} />
      <MoznostiList label="Stĺpce" list={p.stlpce} />

      {p.podmienka && (
        <p className="mt-2 text-[11px] text-muted-foreground/70">Podmienka: {p.podmienka}</p>
      )}
    </div>
  )
}

export default function ObsahPrehladClient({ sekcie }: { sekcie: TemaSekcia[] }) {
  const [query, setQuery] = useState('')

  const q = normalize(query.trim())

  const vysledky = useMemo(() => {
    if (!q) return sekcie
    return sekcie
      .map((s) => ({
        ...s,
        polozky: s.polozky.filter((p) => polozkaHaystack(p, s.nadpis).includes(q)),
      }))
      .filter((s) => s.polozky.length > 0 || normalize(s.nadpis).includes(q))
  }, [sekcie, q])

  const celkovyPocetPoloziek = sekcie.reduce((acc, s) => acc + s.pocetPoloziek, 0)
  const celkovyPocetVysledkov = vysledky.reduce((acc, s) => acc + s.polozky.length, 0)

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:py-14">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
        Admin · Obsah dotazníka
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Celý obsah, na jednom mieste
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {sekcie.length} tém, {celkovyPocetPoloziek} textov/otázok/blokov spolu — načítané priamo
        z kódu (<code className="text-xs">src/lib/dotaznik/obsah/*.ts</code>), takže je to vždy
        presne to, čo beží na produkcii.
      </p>

      <div className="sticky top-2 z-10 mt-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Hľadaj čokoľvek — napr. „spontánny sex“, „mapa zmyslov“, „žiarlivosť“…"
          className="w-full rounded-full border border-border bg-background/95 px-5 py-3 text-sm text-foreground shadow-lg backdrop-blur placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
          autoFocus
        />
        {q && (
          <p className="mt-2 text-xs text-muted-foreground">
            {celkovyPocetVysledkov} zhôd v {vysledky.length} témach
          </p>
        )}
      </div>

      {q && vysledky.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">Nič sa nenašlo pre „{query}“.</p>
      )}

      {!q && (
        <nav className="mt-8 flex flex-wrap gap-2">
          {sekcie.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-border/70 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
            >
              {s.nadpis} <span className="text-muted-foreground/50">({s.pocetPoloziek})</span>
            </a>
          ))}
        </nav>
      )}

      <div className="mt-8 space-y-10">
        {vysledky.map((s) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-24">
            <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-border/60 pb-2">
              <h2 className="text-lg font-semibold text-foreground">{s.nadpis}</h2>
              <span className="text-xs text-muted-foreground">
                {s.polozky.length}
                {q ? ` / ${sekcie.find((x) => x.slug === s.slug)?.pocetPoloziek ?? 0}` : ''} položiek
                · <span className="text-muted-foreground/50">{s.slug}</span>
              </span>
            </div>
            <div className="space-y-3">
              {s.polozky.map((p, i) => (
                <PolozkaCard key={`${p.id}-${i}`} p={p} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 border-t border-border/60 pt-6 text-xs text-muted-foreground">
        <Link href="../moduly" className="hover:text-foreground">
          ← Späť na mapu tém
        </Link>
      </div>
    </div>
  )
}
