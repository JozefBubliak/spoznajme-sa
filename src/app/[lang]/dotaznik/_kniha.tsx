'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Blok, OtazkaBlok, Podmienka, Pohlavie, TemaObsah } from '@/lib/dotaznik/obsah/typ'
import { gtext } from '@/lib/dotaznik/obsah/typ'
import { usePar } from './_par'
import { useMojeOdpovede, ulozOdpoved } from './_odp'
import { Krok, Volba } from './_ui'

const META = '_meta'

type Hodnoty = Record<string, unknown>

function splna(pod: Podmienka | undefined, ans: Hodnoty, pohlavie?: Pohlavie): boolean {
  if (!pod) return true
  if (pod.pohlavie != null && pod.pohlavie !== pohlavie) return false
  if (pod.ot == null) return true
  const h = ans[pod.ot] as { v?: unknown } | undefined
  const v = h?.v
  if (pod.je != null && v !== pod.je) return false
  if (pod.jeNiektora != null && !(typeof v === 'string' && pod.jeNiektora.includes(v))) return false
  if (pod.nie != null && v === pod.nie) return false
  if (pod.obsahuje != null && !(Array.isArray(v) && v.includes(pod.obsahuje))) return false
  if (pod.obsahujeNiektoru != null) {
    const arr = Array.isArray(v) ? (v as string[]) : []
    if (!pod.obsahujeNiektoru.some((x) => arr.includes(x))) return false
  }
  return true
}

// ── malé UI ────────────────────────────────────────────────────────────────
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

function Chips({
  moznosti,
  vybrane,
  onPick,
  viac,
}: {
  moznosti: { v: string; label: string }[]
  vybrane: Set<string>
  onPick: (v: string) => void
  viac?: boolean
}) {
  return (
    <div className={viac ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'}>
      {moznosti.map((m) => {
        const on = vybrane.has(m.v)
        return (
          <button
            key={m.v}
            type="button"
            onClick={() => onPick(m.v)}
            className={`rounded-xl border px-3.5 py-2 text-left text-xs font-medium transition ${
              on
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border/70 text-muted-foreground hover:text-foreground'
            } ${viac ? '' : 'w-full'}`}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}

function OtazkaPole({
  blok,
  p,
  hodnota,
  onSave,
}: {
  blok: OtazkaBlok
  p: Pohlavie
  hodnota: { v?: unknown; ine?: string } | undefined
  onSave: (h: unknown) => void
}) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  const moznosti = (blok.moznosti ?? []).map((m) => ({ v: m.v, label: G(m.label) }))

  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
      <div className="text-sm font-medium text-foreground">{G(blok.text)}</div>
      {blok.napoveda && <p className="mt-1 text-xs text-muted-foreground">{G(blok.napoveda)}</p>}

      <div className="mt-3">
        {(blok.typ === 'jeden' || blok.typ === 'skala') && (
          <Chips
            moznosti={moznosti}
            vybrane={new Set(typeof hodnota?.v === 'string' ? [hodnota.v] : [])}
            onPick={(v) => onSave({ v })}
          />
        )}

        {blok.typ === 'viac' && (
          <div className="space-y-2">
            <Chips
              viac
              moznosti={moznosti}
              vybrane={new Set(Array.isArray(hodnota?.v) ? (hodnota.v as string[]) : [])}
              onPick={(v) => {
                const cur = new Set(Array.isArray(hodnota?.v) ? (hodnota!.v as string[]) : [])
                if (cur.has(v)) cur.delete(v)
                else cur.add(v)
                onSave({ v: [...cur], ine: hodnota?.ine })
              }}
            />
            {blok.inePovolene && (
              <input
                defaultValue={hodnota?.ine ?? ''}
                onBlur={(e) =>
                  onSave({ v: Array.isArray(hodnota?.v) ? hodnota!.v : [], ine: e.target.value })
                }
                placeholder="Iné…"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
              />
            )}
          </div>
        )}

        {blok.typ === 'text' && (
          <textarea
            defaultValue={typeof hodnota?.v === 'string' ? hodnota.v : ''}
            onBlur={(e) => onSave({ v: e.target.value })}
            rows={2}
            placeholder="Napíš voľne… (voliteľné)"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        )}

        {blok.typ === 'mrezka' && (
          <div className="space-y-3">
            {(blok.riadky ?? []).map((r) => {
              const cur = (hodnota?.v as Record<string, string> | undefined)?.[r.v]
              return (
                <div key={r.v}>
                  <div className="mb-1.5 text-xs font-medium text-muted-foreground">{G(r.label)}</div>
                  <Chips
                    viac
                    moznosti={(blok.stlpce ?? []).map((c) => ({ v: c.v, label: G(c.label) }))}
                    vybrane={new Set(cur ? [cur] : [])}
                    onPick={(cv) =>
                      onSave({ v: { ...((hodnota?.v as object) ?? {}), [r.v]: cv } })
                    }
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── walker ─────────────────────────────────────────────────────────────────
function Bloky({
  bloky,
  okruh,
  p,
  ans,
  save,
}: {
  bloky: Blok[]
  okruh: string
  p: Pohlavie
  ans: Hodnoty
  save: (okruh: string, blok: OtazkaBlok, h: unknown) => void
}) {
  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, p)
  return (
    <>
      {bloky.map((b) => {
        if (b.druh === 'text') {
          if (!splna(b.podmienka, ans, p)) return null
          const telo = G(b.telo)
          if (!telo && !b.nadpis) return null
          return <Prose key={b.id} nadpis={b.nadpis ? G(b.nadpis) : undefined} telo={telo} ton={b.ton} />
        }
        if (b.druh === 'tabulka') {
          if (!splna(b.podmienka, ans, p)) return null
          return (
            <div key={b.id} className="overflow-x-auto rounded-2xl border border-border/70">
              {b.nadpis && (
                <div className="border-b border-border/70 bg-card/40 px-4 py-2 text-sm font-semibold text-foreground">
                  {G(b.nadpis)}
                </div>
              )}
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground">
                    {b.hlavicka.map((h, i) => (
                      <th key={i} className="border-b border-border/60 px-3 py-2 text-left font-medium">
                        {G(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.riadky.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((c, ci) => (
                        <td key={ci} className="border-b border-border/40 px-3 py-2 align-top">
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
        if (b.druh === 'skupina') {
          if (!splna(b.podmienka, ans, p)) return null
          return (
            <div key={b.id} className="space-y-4 rounded-2xl border border-border/60 bg-card/20 p-4">
              {b.nadpis && (
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  {G(b.nadpis)}
                </div>
              )}
              {b.uvod && <p className="text-sm leading-relaxed text-muted-foreground">{G(b.uvod)}</p>}
              <Bloky bloky={b.bloky} okruh={b.id} p={p} ans={ans} save={save} />
            </div>
          )
        }
        // otazka
        if (!splna(b.podmienka, ans, p)) return null
        return (
          <OtazkaPole
            key={b.id}
            blok={b}
            p={p}
            hodnota={ans[b.id] as { v?: unknown; ine?: string } | undefined}
            onSave={(h) => save(okruh, b, h)}
          />
        )
      })}
    </>
  )
}

export default function Kniha({
  lang,
  modul,
  tema,
  obsah,
  spatHref,
  dalejHref,
}: {
  lang: string
  modul: string
  tema: string
  obsah: TemaObsah
  spatHref: string
  dalejHref: string
}) {
  const { par, ready } = usePar()
  const { mapa, nacitane } = useMojeOdpovede(par, modul)
  const [override, setOverride] = useState<Hodnoty>({})
  const [ukladam, setUkladam] = useState(false)
  const timers = useRef<Record<string, number>>({})
  const p = (s: string) => `/${lang}${s}`

  useEffect(
    () => () => Object.values(timers.current).forEach((t) => window.clearTimeout(t)),
    [],
  )

  // ploché hodnoty podľa `polozka` (id blokov sú v rámci témy unikátne)
  const ans = useMemo<Hodnoty>(() => {
    const f: Hodnoty = {}
    for (const row of Object.values(mapa)) f[row.polozka] = row.hodnota
    return { ...f, ...override }
  }, [mapa, override])

  const pohlavie = (ans.pohlavie as { v?: Pohlavie } | undefined)?.v

  function saveRaw(okruh: string, polozka: string, typ: string, hodnota: unknown, rola?: string) {
    setOverride((o) => ({ ...o, [polozka]: hodnota }))
    if (!par) return
    window.clearTimeout(timers.current[polozka])
    setUkladam(true)
    timers.current[polozka] = window.setTimeout(async () => {
      await ulozOdpoved(par, { modul, okruh, polozka, typ, rola, hodnota })
      setUkladam(false)
    }, 500)
  }

  if (!ready || (par && !nacitane)) return <Krok nadpis="Načítavam…" />

  if (!par)
    return (
      <Krok
        krok="Chýba pár"
        nadpis="Najprv si vytvor alebo otvor pár."
        spat={{ href: p('/dotaznik/par'), label: 'Vytvoriť pár' }}
      >
        <Volba href={p('/dotaznik/par')} nazov="Prejsť na párovanie" ton="ano" />
      </Krok>
    )

  const G = (t: Parameters<typeof gtext>[0]) => gtext(t, pohlavie ?? 'z')

  // 1) výber pohlavia (dotazník sa prispôsobuje — muž/žena verzia)
  if (!pohlavie)
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-14">
        <Link href={p(spatHref)} className="mb-8 inline-flex text-xs font-medium text-muted-foreground hover:text-foreground">
          ← Späť
        </Link>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
          {G(obsah.nadpis)}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Aké je tvoje pohlavie?</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Dotazník sa prispôsobí tvojej perspektíve. Odpovede oboch partnerov si potom sadnú proti sebe.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => saveRaw(META, 'pohlavie', 'jeden', { v: 'm' })}
            className="rounded-2xl border border-border/70 bg-card/60 p-5 text-left text-base font-semibold text-foreground transition hover:border-primary/50"
          >
            Muž
          </button>
          <button
            onClick={() => saveRaw(META, 'pohlavie', 'jeden', { v: 'z' })}
            className="rounded-2xl border border-border/70 bg-card/60 p-5 text-left text-base font-semibold text-foreground transition hover:border-primary/50"
          >
            Žena
          </button>
        </div>
      </div>
    )

  // 2) kniha + dotazník
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:py-14">
      <Link href={p(spatHref)} className="mb-8 inline-flex text-xs font-medium text-muted-foreground hover:text-foreground">
        ← Späť na tému
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{G(obsah.nadpis)}</h1>

      <div className="mt-8 space-y-4">
        <Bloky bloky={obsah.uvod} okruh="uvod" p={pohlavie} ans={ans} save={(o, b, h) => saveRaw(o, b.id, b.typ, h, b.rola)} />
      </div>

      <div className="mt-8 space-y-4">
        <Bloky bloky={obsah.telo} okruh="telo" p={pohlavie} ans={ans} save={(o, b, h) => saveRaw(o, b.id, b.typ, h, b.rola)} />
      </div>

      {obsah.zaver && (
        <div className="mt-8 space-y-4">
          <Bloky bloky={obsah.zaver} okruh="zaver" p={pohlavie} ans={ans} save={(o, b, h) => saveRaw(o, b.id, b.typ, h, b.rola)} />
        </div>
      )}

      <p className="mt-6 text-[11px] text-muted-foreground">
        {ukladam ? 'Ukladám…' : 'Uložené priebežne. Partner nevidí tvoje odpovede — len zhodu.'}
      </p>

      <div className="mt-6 flex items-center gap-4">
        <Link
          href={p(dalejHref)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Hotovo →
        </Link>
        <button
          onClick={() => saveRaw(META, 'pohlavie', 'jeden', { v: pohlavie === 'm' ? 'z' : 'm' })}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Prepnúť na {pohlavie === 'm' ? 'ženskú' : 'mužskú'} verziu
        </button>
      </div>
    </div>
  )
}
