'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import type { SpoluKarta } from '@/lib/dotaznik/rozhovor'

const KLUC = 'dotaznik_spolu_v1'
type Stav = { index: number; chceme: string[] }

function nacitaj(): Stav {
  try {
    const s = JSON.parse(localStorage.getItem(KLUC) ?? '')
    if (typeof s?.index === 'number' && Array.isArray(s?.chceme)) return s
  } catch {}
  return { index: 0, chceme: [] }
}

export default function Swipe({ lang, karty }: { lang: string; karty: SpoluKarta[] }) {
  const [stav, setStav] = useState<Stav>({ index: 0, chceme: [] })
  const [smer, setSmer] = useState(0)
  const p = (s: string) => `/${lang}${s}`

  useEffect(() => setStav(nacitaj()), [])
  useEffect(() => {
    try {
      localStorage.setItem(KLUC, JSON.stringify(stav))
    } catch {}
  }, [stav])

  const karta = karty[stav.index]

  function rozhodni(chceme: boolean) {
    if (!karta) return
    setSmer(chceme ? 1 : -1)
    setStav((s) => ({
      index: s.index + 1,
      chceme: chceme ? [...s.chceme.filter((m) => m !== karta.modul), karta.modul] : s.chceme.filter((m) => m !== karta.modul),
    }))
  }
  function spat() {
    setSmer(0)
    setStav((s) => ({ ...s, index: Math.max(0, s.index - 1) }))
  }
  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > 110) rozhodni(true)
    else if (info.offset.x < -110) rozhodni(false)
  }

  if (!karta) {
    const zvolene = karty.filter((k) => stav.chceme.includes(k.modul))
    return (
      <div className="mx-auto w-full max-w-md px-5 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Spolu · výsledok</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {zvolene.length ? `Chcete preskúmať ${zvolene.length} tém` : 'Nevybrali ste žiadnu tému'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Vyberte tému a listujte otázkami. Odpovedajte si nahlas, nič sa neukladá.</p>
        <div className="mt-6 space-y-2">
          {zvolene.map((k) => (
            <Link
              key={k.modul}
              href={p(`/dotaznik/spolu/${k.modul}`)}
              className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 px-4 py-3 text-sm text-foreground transition hover:border-primary/60"
            >
              <span className="text-xl">{k.ikona}</span>
              <span className="flex-1">{k.nazov}</span>
              <span className="text-xs text-muted-foreground">{k.otazky.length} otázok →</span>
            </Link>
          ))}
        </div>
        <button
          onClick={() => setStav({ index: 0, chceme: [] })}
          className="mt-8 text-xs text-muted-foreground hover:text-foreground"
        >
          Začať swipovanie odznova
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 py-8" style={{ minHeight: '80vh' }}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {stav.index + 1} / {karty.length}
        </span>
        <span>{stav.chceme.length} chceme</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border/50">
        <div className="h-full bg-primary transition-all" style={{ width: `${(stav.index / karty.length) * 100}%` }} />
      </div>

      <div className="relative mt-8 flex-1">
        <AnimatePresence mode="popLayout" custom={smer}>
          <motion.div
            key={karta.modul}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.9}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: smer * 400, rotate: smer * 12 }}
            transition={{ duration: 0.25 }}
            className="cursor-grab touch-pan-y select-none rounded-3xl border border-border/70 bg-card p-7 shadow-xl active:cursor-grabbing"
          >
            <div className="text-5xl">{karta.ikona}</div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{karta.nazov}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{karta.popis}</p>
            <p className="mt-6 text-xs text-primary/80">Chcete sa o tom porozprávať? Potiahnite doprava áno, doľava nie.</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => rozhodni(false)}
          className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          ← Nie
        </button>
        <button
          onClick={() => rozhodni(true)}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Chceme →
        </button>
      </div>
      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
        <button onClick={spat} disabled={stav.index === 0} className="hover:text-foreground disabled:opacity-30">
          Späť
        </button>
        <button onClick={() => setStav((s) => ({ ...s, index: karty.length }))} className="hover:text-foreground">
          Ukončiť a zobraziť výber
        </button>
      </div>
    </div>
  )
}
