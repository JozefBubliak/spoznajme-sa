'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { readPar, writePar, clearPar, parsujOdkaz, usePar } from '../_par'

export default function ParClient({ lang }: { lang: string }) {
  const router = useRouter()
  const { par, ready } = usePar()
  const [prezyvka, setPrezyvka] = useState('')
  const [odkaz, setOdkaz] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const p = (s: string) => `/${lang}${s}`
  const go = (kod: string) => router.push(`/${lang}/dotaznik/p/${kod}`)

  async function vytvorit() {
    setBusy(true)
    setErr(null)
    try {
      const r = await fetch('/api/dotaznik/pary', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ rezim: 'blind', prezyvka }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error ?? 'chyba')
      writePar({ kod: d.kod, secret: d.secret, slot: 'a', rezim: 'blind', prezyvka: prezyvka || 'Ja' })
      go(d.kod)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'chyba')
      setBusy(false)
    }
  }

  async function pripojit() {
    setBusy(true)
    setErr(null)
    try {
      const { kod, secret } = parsujOdkaz(odkaz)
      if (!kod || !secret) throw new Error('Chýba odkaz so secret (`#k=…`). Vlož celý odkaz od partnera.')
      const r = await fetch(`/api/dotaznik/pary/${kod}/join`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret, prezyvka }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error === 'not-found' ? 'Pár sa nenašiel alebo je odkaz zlý.' : d.error)
      writePar({ kod, secret, slot: d.slot, rezim: d.rezim, prezyvka: prezyvka || 'Partner/ka' })
      go(kod)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'chyba')
      setBusy(false)
    }
  }

  if (!ready) return <div className="mx-auto max-w-2xl px-5 py-14 text-sm text-muted-foreground">Načítavam…</div>

  const existujuci = readPar()
  if (par && existujuci) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-12">
        <h1 className="text-2xl font-semibold text-foreground">Máš rozrobený pár</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Kód <span className="font-mono font-semibold text-foreground">{existujuci.kod}</span> · rola{' '}
          {existujuci.slot === 'a' ? 'tvorca' : 'pozvaný/á'}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => go(existujuci.kod)}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Pokračovať →
          </button>
          <button
            onClick={() => {
              clearPar()
              location.reload()
            }}
            className="text-xs text-muted-foreground transition hover:text-foreground"
          >
            Začať odznova (odpojiť toto zariadenie)
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 space-y-8">
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Ako to chcete robiť?</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Spolu pri jednom, alebo každý sám?
        </h1>
      </div>

      {/* NAŽIVO — jedno zariadenie, žiadne párovanie */}
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-3">
        <div className="text-sm font-semibold text-foreground">Naživo — spolu pri jednom zariadení</div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sadnite si vedľa seba. Sprievodca vás prevedie témami, dá kontext a otázky na rozhovor.
          Nič sa neklikne ani neukladá — a netreba žiadny kód.
        </p>
        <button
          onClick={() => router.push(p('/dotaznik/nazivo'))}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Spustiť sprievodcu →
        </button>
      </div>

      {/* BEZ TRAPASU — dve zariadenia, párovanie kódom */}
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-3">
        <div className="text-sm font-semibold text-foreground">Bez trapasu — každý sám, potom mapa zhôd</div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Každý odpovedá na svojom zariadení, oddelene. Ukáže sa len to, kde ste sa zhodli —
          nesúlad nikto neuvidí. Bez e-mailu, bez účtu.
        </p>
        <input
          value={prezyvka}
          onChange={(e) => setPrezyvka(e.target.value)}
          maxLength={24}
          placeholder="Tvoja prezývka (voliteľné)"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={vytvorit}
          disabled={busy}
          className="rounded-full border border-primary bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/20 disabled:opacity-50"
        >
          Vytvoriť pár a získať odkaz
        </button>
      </div>

      {/* PRIPOJIŤ SA */}
      <div className="rounded-2xl border border-border/70 bg-card/40 p-5 space-y-3">
        <div className="text-sm font-semibold text-foreground">Mám odkaz od partnera/partnerky</div>
        <input
          value={odkaz}
          onChange={(e) => setOdkaz(e.target.value)}
          placeholder="Vlož celý odkaz (…/dotaznik/p/XXXX-XXXX#k=…)"
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={pripojit}
          disabled={busy}
          className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-card disabled:opacity-50"
        >
          Pripojiť sa
        </button>
      </div>

      {err && <p className="text-sm text-[hsl(var(--destructive))]">{err}</p>}
    </div>
  )
}
