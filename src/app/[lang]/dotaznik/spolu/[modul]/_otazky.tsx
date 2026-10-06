'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import type { SpoluKarta } from '@/lib/dotaznik/rozhovor'

export default function Otazky({ lang, karta }: { lang: string; karta: SpoluKarta }) {
  const [i, setI] = useState(0)
  const [smer, setSmer] = useState(1)
  const n = karta.otazky.length
  const p = (s: string) => `/${lang}${s}`

  function chod(d: number) {
    const j = i + d
    if (j < 0 || j > n) return
    setSmer(d)
    setI(j)
  }
  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -90) chod(1)
    else if (info.offset.x > 90) chod(-1)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 py-8" style={{ minHeight: '80vh' }}>
      <Link href={p('/dotaznik/spolu')} className="text-xs text-muted-foreground hover:text-foreground">
        ← Vybrané témy
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-3xl">{karta.ikona}</span>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{karta.nazov}</h1>
      </div>
      <div className="mt-4 flex gap-1">
        {karta.otazky.map((_, k) => (
          <div key={k} className={`h-1 flex-1 rounded-full ${k <= i && i < n ? 'bg-primary' : k < i ? 'bg-primary' : 'bg-border/50'}`} />
        ))}
      </div>

      <div className="relative mt-8 flex flex-1 items-center">
        <AnimatePresence mode="popLayout" custom={smer}>
          <motion.div
            key={i}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, x: smer * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: smer * -60 }}
            transition={{ duration: 0.2 }}
            className="w-full cursor-grab touch-pan-y select-none rounded-3xl border border-border/70 bg-card p-8 shadow-xl active:cursor-grabbing"
          >
            {i < n ? (
              <>
                <p className="text-xs text-muted-foreground">
                  Otázka {i + 1} z {n}
                </p>
                <p className="mt-4 text-xl leading-relaxed text-foreground">{karta.otazky[i]}</p>
                <p className="mt-6 text-xs text-primary/80">Odpovedzte si nahlas — najprv jeden, potom druhý.</p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold text-foreground">Hotovo</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Na čom ste sa zhodli? Je niečo, čo chcete skúsiť — alebo sa k tomu ešte vrátiť?
                </p>
                <Link
                  href={p('/dotaznik/spolu')}
                  className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Ďalšia téma
                </Link>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <button
          onClick={() => chod(-1)}
          disabled={i === 0}
          className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-muted-foreground transition hover:text-foreground disabled:opacity-30"
        >
          ← Späť
        </button>
        <button
          onClick={() => chod(1)}
          disabled={i >= n}
          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-30"
        >
          Ďalšia →
        </button>
      </div>
    </div>
  )
}
