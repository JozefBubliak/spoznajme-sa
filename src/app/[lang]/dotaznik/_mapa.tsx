'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePar } from './_par'
import {
  POSTOJ_MOZNOSTI,
  SEMAFOR_MOZNOSTI,
  FREKVENCIA_MOZNOSTI,
  SKUSENOST_MOZNOSTI,
} from '@/lib/dotaznik/otazky'
import { Krok, Volba } from './_ui'

type Zhoda = {
  polozka: string
  text: string
  typ: string
  rola: string | null
  zona: 'chut' | 'zvedavost' | 'podmienky' | 'kontext'
  a: Record<string, unknown>
  b: Record<string, unknown>
}
type Vysledok = {
  pripravene: boolean
  pocet: { a: number; b: number }
  moduly: { modul: string; nazov: string; ikona: string; sekcie: { okruh: string; zhody: Zhoda[] }[] }[]
}

function label(typ: string, h: Record<string, unknown>): string {
  const v = h?.v
  if (typ === 'postoj' || typ === 'rola') return POSTOJ_MOZNOSTI.find((m) => m.v === v)?.label ?? String(v ?? '—')
  if (typ === 'semafor') return SEMAFOR_MOZNOSTI.find((m) => m.v === v)?.label ?? String(v ?? '—')
  if (typ === 'frekvencia') return FREKVENCIA_MOZNOSTI.find((m) => m.v === v)?.label ?? String(v ?? '—')
  if (typ === 'skusenost') return SKUSENOST_MOZNOSTI.find((m) => m.v === v)?.label ?? String(v ?? '—')
  if (typ === 'intenzita') return `Úroveň ${v ?? '—'}`
  if (typ === 'multi') {
    const arr = (h?.v as string[]) ?? []
    return [...arr, h?.ine ? `+ ${h.ine}` : ''].filter(Boolean).join(', ') || '—'
  }
  if (typ === 'text') return (h?.v as string) || '—'
  return String(v ?? '—')
}

const ZONA_META: Record<string, { znak: string; nazov: string }> = {
  chut: { znak: '💚', nazov: 'Spoločná chuť' },
  zvedavost: { znak: '🌱', nazov: 'Spoločná zvedavosť' },
  podmienky: { znak: '🟡', nazov: 'Za podmienok' },
  kontext: { znak: 'ℹ️', nazov: 'Detail' },
}

function useVysledok() {
  const { par, ready } = usePar()
  const [d, setD] = useState<Vysledok | null>(null)
  const [stav, setStav] = useState<'load' | 'ok' | 'nopar' | 'err'>('load')

  useEffect(() => {
    if (!ready) return
    if (!par) {
      setStav('nopar')
      return
    }
    ;(async () => {
      try {
        const r = await fetch(
          `/api/dotaznik/pary/${par.kod}/vyhodnotenie?k=${encodeURIComponent(par.secret)}`,
        )
        if (!r.ok) throw new Error()
        setD(await r.json())
        setStav('ok')
      } catch {
        setStav('err')
      }
    })()
  }, [par, ready])

  return { par, d, stav }
}

export function Vyhodnotenie({ lang }: { lang: string }) {
  const router = useRouter()
  const { d, stav } = useVysledok()
  const p = (s: string) => `/${lang}${s}`

  if (stav === 'load') return <Krok nadpis="Načítavam…" />
  if (stav === 'nopar')
    return (
      <Krok nadpis="Chýba pár" spat={{ href: p('/dotaznik/par'), label: 'Vytvoriť pár' }}>
        <Volba href={p('/dotaznik/par')} nazov="Prejsť na párovanie" ton="ano" />
      </Krok>
    )
  if (stav === 'err' || !d) return <Krok nadpis="Nepodarilo sa načítať vyhodnotenie." />

  return (
    <Krok
      krok="Vyhodnotenie"
      nadpis="Bezpečné vyhodnotenie (Double Blind)"
      lead="Zobrazia sa len oblasti, kde ste obaja vyjadrili záujem. Nesúlad sa nezobrazí ani jednému z vás."
      spat={{ href: p('/dotaznik/moduly'), label: 'Moduly' }}
    >
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 text-sm">
        <div className="font-semibold text-foreground">Stav</div>
        <p className="mt-1 text-muted-foreground">
          Ty: {d.pocet.a > 0 || d.pocet.b > 0 ? 'odpovede zaznamenané' : 'zatiaľ nič'} · Partner/ka:{' '}
          {d.pripravene ? 'hotovo' : 'čaká sa'}
        </p>
      </div>
      {d.pripravene ? (
        <button
          onClick={() => router.push(p('/dotaznik/mapa'))}
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Otvoriť mapu spoločnej rozkoše →
        </button>
      ) : (
        <p className="text-sm text-muted-foreground">Keď odpovie aj partner/ka, tu sa odomkne mapa.</p>
      )}
    </Krok>
  )
}

export function Mapa({ lang }: { lang: string }) {
  const { d, stav } = useVysledok()
  const p = (s: string) => `/${lang}${s}`

  if (stav === 'load') return <Krok nadpis="Načítavam…" />
  if (stav === 'nopar')
    return (
      <Krok nadpis="Chýba pár" spat={{ href: p('/dotaznik/par'), label: 'Vytvoriť pár' }}>
        <Volba href={p('/dotaznik/par')} nazov="Prejsť na párovanie" ton="ano" />
      </Krok>
    )
  if (stav === 'err' || !d) return <Krok nadpis="Nepodarilo sa načítať mapu." />

  const prazdna = d.moduly.length === 0

  return (
    <Krok
      krok="Výstup"
      nadpis="Mapa spoločnej rozkoše"
      lead="Len oblasti, kde ste sa zhodli. Čo jeden odmietol, tu nie je — a druhý sa to nedozvie."
      spat={{ href: p('/dotaznik/vyhodnotenie'), label: 'Vyhodnotenie' }}
    >
      {prazdna && (
        <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-5 text-sm text-muted-foreground">
          Zatiaľ žiadne zhody. Vyplňte spolu aspoň jeden modul a vráťte sa sem.
        </div>
      )}

      {d.moduly.map((m) => (
        <div key={m.modul} className="rounded-2xl border border-border/70 bg-card/50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>{m.ikona}</span>
            {m.nazov}
          </div>
          <div className="mt-3 space-y-3">
            {m.sekcie.flatMap((s) =>
              s.zhody.map((z) => {
                const meta = ZONA_META[z.zona]
                return (
                  <div key={`${s.okruh}-${z.polozka}-${z.rola ?? ''}`} className="rounded-xl border border-border/60 bg-background/50 p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-sm">{meta.znak}</span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm text-foreground">
                          {z.text}
                          {z.rola && <span className="text-muted-foreground"> · {z.rola === 'prijimam' ? 'prijímam' : 'poskytujem'}</span>}
                        </div>
                        <div className="mt-1 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                          <span>Ty: <span className="text-foreground">{label(z.typ, z.a)}</span></span>
                          <span>Partner/ka: <span className="text-foreground">{label(z.typ, z.b)}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }),
            )}
          </div>
        </div>
      ))}
    </Krok>
  )
}
