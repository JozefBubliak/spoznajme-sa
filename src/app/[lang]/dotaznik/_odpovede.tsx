'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  otazkySekcie,
  POSTOJ_MOZNOSTI,
  SEMAFOR_MOZNOSTI,
  FREKVENCIA_MOZNOSTI,
  SKUSENOST_MOZNOSTI,
  type Otazka,
} from '@/lib/dotaznik/otazky'
import { usePar } from './_par'
import { useStavy, partnerZamok } from './_stav'
import { useMojeOdpovede, ulozOdpoved, odpKluc, type OdpRiadok } from './_odp'
import { Krok, Volba } from './_ui'

// ── malé UI kúsky ──────────────────────────────────────────────────────────
function Chips({
  moznosti,
  hodnota,
  onPick,
}: {
  moznosti: { v: string; label: string; farba?: string }[]
  hodnota: string | undefined
  onPick: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {moznosti.map((m) => {
        const on = hodnota === m.v
        return (
          <button
            key={m.v}
            onClick={() => onPick(m.v)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
              on
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border/70 text-muted-foreground hover:text-foreground'
            }`}
            style={on && m.farba ? { borderColor: m.farba, color: m.farba, background: `${m.farba}1a` } : undefined}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}

function Postoj({ v, onChange }: { v?: string; onChange: (v: string) => void }) {
  return <Chips moznosti={POSTOJ_MOZNOSTI} hodnota={v} onPick={onChange} />
}

// ── jedna otázka ───────────────────────────────────────────────────────────
function Pole({
  otazka,
  existujuce,
  onSave,
}: {
  otazka: Otazka
  existujuce: { plain?: OdpRiadok; prijimam?: OdpRiadok; poskytujem?: OdpRiadok }
  onSave: (rola: string, hodnota: unknown) => void
}) {
  const h = (existujuce.plain?.hodnota ?? {}) as Record<string, unknown>

  return (
    <div className="rounded-2xl border border-border/70 bg-card/50 p-5">
      <div className="text-sm font-medium text-foreground">{otazka.text}</div>
      {otazka.napoveda && <p className="mt-1 text-xs text-muted-foreground">{otazka.napoveda}</p>}

      <div className="mt-3">
        {otazka.typ === 'postoj' && (
          <Postoj v={h.v as string} onChange={(v) => onSave('', { v })} />
        )}

        {otazka.typ === 'skusenost' && (
          <Chips moznosti={SKUSENOST_MOZNOSTI} hodnota={h.v as string} onPick={(v) => onSave('', { v })} />
        )}

        {otazka.typ === 'frekvencia' && (
          <Chips moznosti={FREKVENCIA_MOZNOSTI} hodnota={h.v as string} onPick={(v) => onSave('', { v })} />
        )}

        {otazka.typ === 'semafor' && (
          <div className="space-y-2">
            <Chips moznosti={SEMAFOR_MOZNOSTI} hodnota={h.v as string} onPick={(v) => onSave('', { ...h, v })} />
            {h.v === 'zlta' && (
              <input
                defaultValue={(h.podmienka as string) ?? ''}
                onBlur={(e) => onSave('', { ...h, v: 'zlta', podmienka: e.target.value })}
                placeholder="Za akých podmienok? (voliteľné)"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
              />
            )}
          </div>
        )}

        {otazka.typ === 'intenzita' && (
          <div>
            <div className="flex gap-2">
              {Array.from({ length: otazka.stupne ?? 5 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => onSave('', { v: n })}
                  className={`h-9 w-9 rounded-full border text-xs font-semibold transition ${
                    h.v === n
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/70 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {(otazka.min || otazka.max) && (
              <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                <span>{otazka.min}</span>
                <span>{otazka.max}</span>
              </div>
            )}
          </div>
        )}

        {otazka.typ === 'multi' && (
          <MultiPole
            moznosti={otazka.moznosti ?? []}
            hodnota={h as { v?: string[]; ine?: string }}
            onChange={(nv) => onSave('', nv)}
          />
        )}

        {otazka.typ === 'text' && (
          <textarea
            defaultValue={(h.v as string) ?? ''}
            onBlur={(e) => onSave('', { v: e.target.value })}
            rows={2}
            placeholder="Napíš voľne… (voliteľné)"
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
        )}

        {otazka.typ === 'rola' && (
          <div className="space-y-3">
            <div>
              <div className="mb-1.5 text-xs font-medium text-muted-foreground">Keď prijímam</div>
              <Postoj
                v={(existujuce.prijimam?.hodnota as Record<string, string>)?.v}
                onChange={(v) => onSave('prijimam', { v })}
              />
            </div>
            <div>
              <div className="mb-1.5 text-xs font-medium text-muted-foreground">Keď poskytujem</div>
              <Postoj
                v={(existujuce.poskytujem?.hodnota as Record<string, string>)?.v}
                onChange={(v) => onSave('poskytujem', { v })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MultiPole({
  moznosti,
  hodnota,
  onChange,
}: {
  moznosti: string[]
  hodnota: { v?: string[]; ine?: string }
  onChange: (nv: { v: string[]; ine?: string }) => void
}) {
  const vybrane = new Set(hodnota.v ?? [])
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {moznosti.map((m) => {
          const on = vybrane.has(m)
          return (
            <button
              key={m}
              onClick={() => {
                const next = new Set(vybrane)
                if (on) next.delete(m)
                else next.add(m)
                onChange({ v: [...next], ine: hodnota.ine })
              }}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                on ? 'border-primary bg-primary/10 text-primary' : 'border-border/70 text-muted-foreground hover:text-foreground'
              }`}
            >
              {m}
            </button>
          )
        })}
      </div>
      <input
        defaultValue={hodnota.ine ?? ''}
        onBlur={(e) => onChange({ v: [...vybrane], ine: e.target.value })}
        placeholder="Iné…"
        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
      />
    </div>
  )
}

// ── celá sekcia s otázkami ─────────────────────────────────────────────────
export default function SekciaOtazky({
  lang,
  modul,
  tema,
  sekcia,
  nazovSekcie,
  dalejHref,
  spatHref,
  otazky: otazkyProp,
}: {
  lang: string
  modul: string
  tema: string
  sekcia: string
  nazovSekcie: string
  dalejHref: string
  spatHref: string
  /** Prebije banku z `otazky.ts` (napr. otázky vygenerované z L4 `polozky`). */
  otazky?: Otazka[]
}) {
  const router = useRouter()
  const { par, ready } = usePar()
  const { stavy } = useStavy(par)
  const { mapa, nacitane } = useMojeOdpovede(par, modul)
  const [ukladam, setUkladam] = useState(false)
  const timers = useRef<Record<string, number>>({})

  const otazky = useMemo(
    () => otazkyProp ?? otazkySekcie(modul, tema, sekcia),
    [otazkyProp, modul, tema, sekcia],
  )
  const okruh = sekcia // dočasne: okruh = sekcia (kým nepribudne L3)

  const p = (s: string) => `/${lang}${s}`

  useEffect(() => () => {
    Object.values(timers.current).forEach((t) => window.clearTimeout(t))
  }, [])

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

  if (partnerZamok(stavy, par, modul, tema))
    return (
      <Krok
        krok="Zamknuté partnerom"
        nadpis="Túto tému partner/ka zamkol/la."
        lead="Odpovede tu už nemôžeš vypĺňať."
        spat={{ href: p('/dotaznik/moduly'), label: 'Moduly' }}
      />
    )

  function save(polozka: string, typ: string, rola: string, hodnota: unknown) {
    if (!par) return
    const key = `${polozka}|${rola}`
    window.clearTimeout(timers.current[key])
    setUkladam(true)
    timers.current[key] = window.setTimeout(async () => {
      await ulozOdpoved(par, { modul, okruh, polozka, typ, rola: rola || undefined, hodnota })
      setUkladam(false)
    }, 500)
  }

  return (
    <Krok
      krok={`${nazovSekcie} · ${otazky.length} ${otazky.length === 1 ? 'otázka' : 'otázky'}`}
      nadpis={nazovSekcie}
      spat={{ href: p(spatHref), label: 'Späť' }}
      dalej={{ href: p(dalejHref), label: 'Ďalej' }}
    >
      {otazky.map((o) => {
        const existujuce = {
          plain: mapa[odpKluc(modul, okruh, o.id, '')],
          prijimam: mapa[odpKluc(modul, okruh, o.id, 'prijimam')],
          poskytujem: mapa[odpKluc(modul, okruh, o.id, 'poskytujem')],
        }
        return (
          <Pole
            key={o.id}
            otazka={o}
            existujuce={existujuce}
            onSave={(rola, hodnota) => save(o.id, o.typ, rola, hodnota)}
          />
        )
      })}

      <p className="text-[11px] text-muted-foreground">
        {ukladam ? 'Ukladám…' : 'Uložené priebežne. Partner nevidí tvoje odpovede — len zhodu.'}
      </p>

      <Link href={p('/dotaznik/moduly')} className="block text-xs text-muted-foreground hover:text-foreground">
        Uložiť a vrátiť sa k modulom
      </Link>
    </Krok>
  )
}
