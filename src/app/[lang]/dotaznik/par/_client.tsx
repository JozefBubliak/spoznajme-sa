'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { readPar, writePar, clearPar, parsujOdkaz, usePar } from '../_par'

type Rezim = 'live' | 'blind'

export default function ParClient({ lang }: { lang: string }) {
  const router = useRouter()
  const { par, ready } = usePar()
  const [rezim, setRezim] = useState<Rezim>('blind')
  const [prezyvka, setPrezyvka] = useState('')
  const [odkaz, setOdkaz] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const go = (kod: string) => router.push(`/${lang}/dotaznik/p/${kod}`)

  async function vytvorit() {
    setBusy(true)
    setErr(null)
    try {
      const r = await fetch('/api/dotaznik/pary', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ rezim, prezyvka }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error ?? 'chyba')
      writePar({ kod: d.kod, secret: d.secret, slot: 'a', rezim: d.rezim, prezyvka: prezyvka || 'Ja' })
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

  // Už existuje lokálny pár
  const existujuci = readPar()
  if (par && existujuci) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-12">
        <h1 className="text-2xl font-semibold text-foreground">Máš rozrobený pár</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Kód <span className="font-mono font-semibold text-foreground">{existujuci.kod}</span> · rola{' '}
          {existujuci.slot === 'a' ? 'tvorca' : 'pozvaný/á'} · režim{' '}
          {existujuci.rezim === 'live' ? 'Naživo' : 'Bez trapasu'}
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
    <div className="mx-auto w-full max-w-2xl px-5 py-12 space-y-10">
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Krok 1 — Pár</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Bez registrácie. Len prezývka a kód.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Žiadny e-mail, žiadny účet. Kód páru + tajný odkaz pošleš partnerovi hocijako. Dáta sa
          po 30 dňoch samé zmažú a kedykoľvek ich zmažeš tlačidlom.
        </p>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-foreground">Tvoja prezývka (voliteľné)</span>
        <input
          value={prezyvka}
          onChange={(e) => setPrezyvka(e.target.value)}
          maxLength={24}
          placeholder="napr. Ja"
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>

      {/* Vytvoriť */}
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-4">
        <div className="text-sm font-semibold text-foreground">Vytvoriť nový pár</div>
        <div className="space-y-2">
          {(
            [
              ['blind', 'Bez trapasu', 'Oddelene. Ukáže sa len zhoda, nesúlad nikto neuvidí.'],
              ['live', 'Naživo', 'Sprievodca rozhovorom. Nič sa neukladá.'],
            ] as const
          ).map(([val, nazov, popis]) => (
            <label
              key={val}
              className={`flex cursor-pointer gap-3 rounded-xl border p-3 transition ${
                rezim === val ? 'border-primary bg-primary/5' : 'border-border/60'
              }`}
            >
              <input
                type="radio"
                name="rezim"
                checked={rezim === val}
                onChange={() => setRezim(val)}
                className="mt-0.5"
              />
              <span>
                <span className="block text-sm font-medium text-foreground">{nazov}</span>
                <span className="block text-xs text-muted-foreground">{popis}</span>
              </span>
            </label>
          ))}
        </div>
        <button
          onClick={vytvorit}
          disabled={busy}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          Vytvoriť a získať odkaz
        </button>
      </div>

      {/* Pripojiť */}
      <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-3">
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
