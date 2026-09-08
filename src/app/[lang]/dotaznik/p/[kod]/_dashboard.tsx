'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { readPar, writePar, clearPar, zdielacíOdkaz, type ParLocal } from '../../_par'

type Pair = { kod: string; rezim: 'live' | 'blind' | 'open'; prezyvka_a: string | null; prezyvka_b: string | null }
type Phase = 'loading' | 'need-name' | 'ready' | 'error'

export default function ParDashboard({ lang, kod }: { lang: string; kod: string }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('loading')
  const [pair, setPair] = useState<Pair | null>(null)
  const [local, setLocal] = useState<ParLocal | null>(null)
  const [hashSecret, setHashSecret] = useState<string | null>(null)
  const [prezyvka, setPrezyvka] = useState('')
  const [copied, setCopied] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const nacitajStav = useCallback(async (secret: string) => {
    const r = await fetch(`/api/dotaznik/pary/${kod}?k=${encodeURIComponent(secret)}`)
    const d = await r.json()
    if (!r.ok) throw new Error(d.error ?? 'chyba')
    setPair(d as Pair)
    setPhase('ready')
  }, [kod])

  useEffect(() => {
    const hs = (typeof window !== 'undefined' && window.location.hash.match(/k=([A-Za-z0-9_-]+)/)?.[1]) || null
    setHashSecret(hs)
    const lp = readPar()
    setLocal(lp && lp.kod === kod ? lp : null)

    ;(async () => {
      try {
        if (lp && lp.kod === kod) {
          await nacitajStav(lp.secret)
        } else if (hs) {
          setPhase('need-name') // pozvaný/á — treba prezývku
        } else {
          setPhase('error')
        }
      } catch (e) {
        setErr(e instanceof Error ? e.message : 'chyba')
        setPhase('error')
      }
    })()
  }, [kod, nacitajStav])

  async function pripojitSa() {
    if (!hashSecret) return
    setErr(null)
    try {
      const r = await fetch(`/api/dotaznik/pary/${kod}/join`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ secret: hashSecret, prezyvka }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.error === 'not-found' ? 'Odkaz je neplatný alebo pár už neexistuje.' : d.error)
      const lp: ParLocal = { kod, secret: hashSecret, slot: d.slot, rezim: d.rezim, prezyvka: prezyvka || 'Partner/ka' }
      writePar(lp)
      setLocal(lp)
      await nacitajStav(hashSecret)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'chyba')
    }
  }

  async function zmazat() {
    if (!local) return
    if (!confirm('Naozaj zmazať celý pár a všetky odpovede? Nedá sa vrátiť.')) return
    await fetch(`/api/dotaznik/pary/${kod}/zmazat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret: local.secret }),
    })
    clearPar()
    router.push(`/${lang}/dotaznik`)
  }

  const wrap = 'mx-auto w-full max-w-2xl px-5 py-12'

  if (phase === 'loading') return <div className={`${wrap} text-sm text-muted-foreground`}>Načítavam…</div>

  if (phase === 'error')
    return (
      <div className={wrap}>
        <h1 className="text-2xl font-semibold text-foreground">Tento pár sa nepodarilo otvoriť</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {err ?? 'Potrebuješ celý odkaz od partnera/partnerky (obsahuje `#k=…`).'}
        </p>
        <a href={`/${lang}/dotaznik/par`} className="mt-6 inline-block text-sm text-primary hover:underline">
          ← Späť na vytvorenie páru
        </a>
      </div>
    )

  if (phase === 'need-name')
    return (
      <div className={wrap}>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Pozvánka do páru</p>
        <h1 className="text-2xl font-semibold text-foreground">Zadaj si prezývku a si spárovaný/á.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Kód <span className="font-mono font-semibold text-foreground">{kod}</span>. Bez e-mailu, bez účtu.
        </p>
        <input
          value={prezyvka}
          onChange={(e) => setPrezyvka(e.target.value)}
          maxLength={24}
          placeholder="napr. Ja"
          className="mt-6 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={pripojitSa}
          className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Pripojiť sa
        </button>
        {err && <p className="mt-3 text-sm text-[hsl(var(--destructive))]">{err}</p>}
      </div>
    )

  // ready
  const link = local ? zdielacíOdkaz(lang, kod, local.secret) : ''
  const jaSom = local?.slot === 'a' ? pair?.prezyvka_a : pair?.prezyvka_b
  const partner = local?.slot === 'a' ? pair?.prezyvka_b : pair?.prezyvka_a

  return (
    <div className={`${wrap} space-y-8`}>
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">Váš pár</p>
        <h1 className="text-2xl font-semibold text-foreground">
          {pair?.rezim === 'live' ? 'Režim Naživo' : 'Režim Bez trapasu'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Kód <span className="font-mono font-semibold text-foreground">{kod}</span> · ty:{' '}
          <span className="text-foreground">{jaSom || '—'}</span> · partner/ka:{' '}
          <span className="text-foreground">{partner || 'ešte sa nepripojil/a'}</span>
        </p>
      </div>

      {!partner && (
        <div className="rounded-2xl border border-border/70 bg-card/60 p-5">
          <div className="text-sm font-semibold text-foreground">Pošli tento odkaz partnerovi/partnerke</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Obsahuje tajný kľúč. Pošli ho súkromne (správa, ktorú si viete zmazať).
          </p>
          <div className="mt-3 flex gap-2">
            <input
              readOnly
              value={link}
              className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 font-mono text-xs text-muted-foreground"
            />
            <button
              onClick={() => {
                navigator.clipboard?.writeText(link)
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              }}
              className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              {copied ? 'Skopírované' : 'Kopírovať'}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={() =>
            router.push(`/${lang}/dotaznik/${pair?.rezim === 'live' ? 'nazivo' : 'moduly'}`)
          }
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          {pair?.rezim === 'live' ? 'Spustiť sprievodcu rozhovorom →' : 'Prejsť na moduly →'}
        </button>
        <button onClick={zmazat} className="text-xs text-[hsl(var(--destructive))]/80 transition hover:text-[hsl(var(--destructive))]">
          Zmazať všetko (pár aj odpovede)
        </button>
      </div>
    </div>
  )
}
