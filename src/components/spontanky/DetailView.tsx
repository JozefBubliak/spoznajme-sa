'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChatPanel } from './ChatPanel'
import { PrinesPanel } from './PrinesPanel'
import type { SpontankaDetail, RsvpStatus } from '@/lib/spontanky/types'
import { supabaseClient } from '@/integrations/supabase/client'

const STAV_LABELS: Record<string, string> = {
  aktivna: '✓ Aktívna',
  pozastavena: '⏸ Pozastavená',
  zrusena: '✕ Zrušená',
  ukoncena: '✓ Ukončená',
}
const STAV_COLORS: Record<string, string> = {
  aktivna: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  pozastavena: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  zrusena: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  ukoncena: 'bg-muted text-muted-foreground',
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('sk-SK', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ─── Participant identity (localStorage) ────────────────────────────────────
function useParticipant() {
  const [pid, setPid] = useState<string>('')
  const [pname, setPname] = useState<string>('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const storedPid = localStorage.getItem('sp_pid') ?? ''
    const storedName = localStorage.getItem('sp_pname') ?? ''
    setPid(storedPid)
    setPname(storedName)
    setReady(true)
  }, [])

  const saveIdentity = (name: string) => {
    const newPid = pid || crypto.randomUUID()
    localStorage.setItem('sp_pid', newPid)
    localStorage.setItem('sp_pname', name)
    setPid(newPid)
    setPname(name)
  }

  return { pid, pname, ready, saveIdentity }
}

// ─── Name Modal ──────────────────────────────────────────────────────────────
function NameModal({ onSave, onClose }: { onSave: (name: string) => void; onClose: () => void }) {
  const [name, setName] = useState('')
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-background rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="font-semibold text-lg mb-1">Ako ti máme hovoriť?</h3>
        <p className="text-sm text-muted-foreground mb-4">Tvoje meno uvidia ostatní účastníci.</p>
        <input
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onSave(name.trim()) }}
          placeholder="Mária K."
          className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
        />
        <div className="flex gap-2">
          <Button onClick={() => { if (name.trim()) onSave(name.trim()) }} disabled={!name.trim()} className="flex-1">
            Pokračovať
          </Button>
          <Button variant="outline" onClick={onClose}>Zrušiť</Button>
        </div>
      </div>
    </div>
  )
}

// ─── RSVP Buttons ────────────────────────────────────────────────────────────
function RsvpSection({
  spontankaId,
  stav,
  pid,
  pname,
  initialUcastnici,
  onNeedName,
}: {
  spontankaId: string
  stav: string
  pid: string
  pname: string
  initialUcastnici: SpontankaDetail['ucastnici']
  onNeedName: () => void
}) {
  const [status, setStatus] = useState<RsvpStatus | null>(() => {
    if (typeof window === 'undefined') return null
    const myPid = localStorage.getItem('sp_pid') ?? ''
    return (initialUcastnici.find(u => u.participant_id === myPid)?.status as RsvpStatus) ?? null
  })
  const [counts, setCounts] = useState({
    pridem: initialUcastnici.filter(u => u.status === 'pridem').length,
    mozno: initialUcastnici.filter(u => u.status === 'mozno').length,
  })
  const [loading, setLoading] = useState(false)

  const canRsvp = stav === 'aktivna' || stav === 'pozastavena'

  const rsvp = async (newStatus: RsvpStatus) => {
    if (!pid || !pname) { onNeedName(); return }
    if (loading || !canRsvp) return
    setLoading(true)

    const prev = status
    // Optimistic
    setStatus(newStatus)
    setCounts(c => {
      const next = { ...c }
      if (prev === 'pridem') next.pridem--
      if (prev === 'mozno') next.mozno--
      if (newStatus === 'pridem') next.pridem++
      if (newStatus === 'mozno') next.mozno++
      return next
    })

    const res = await fetch(`/api/spontanky/${spontankaId}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participant_id: pid, meno: pname, status: newStatus }),
    })
    if (!res.ok) {
      // Revert
      setStatus(prev)
      setCounts(c => {
        const next = { ...c }
        if (newStatus === 'pridem') next.pridem--
        if (newStatus === 'mozno') next.mozno--
        if (prev === 'pridem') next.pridem++
        if (prev === 'mozno') next.mozno++
        return next
      })
    }
    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {([
          { val: 'pridem' as const, label: 'Prídem', color: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' },
          { val: 'mozno' as const,  label: 'Možno',  color: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400' },
          { val: 'nepridem' as const, label: 'Neprídem', color: 'bg-muted border-border text-muted-foreground' },
        ]).map(opt => (
          <button
            key={opt.val}
            onClick={() => rsvp(opt.val)}
            disabled={!canRsvp || loading}
            className={cn(
              'py-2.5 rounded-xl border text-sm font-medium transition-all',
              status === opt.val ? opt.color : 'bg-background hover:bg-muted',
              (!canRsvp || loading) && 'opacity-40 cursor-not-allowed',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-green-600 dark:text-green-400">●</span> {counts.pridem} príde
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-500">●</span> {counts.mozno} možno
        </span>
        {pname && status && status !== 'nepridem' && (
          <span className="ml-auto text-primary">Ty: {pname}</span>
        )}
      </div>
    </div>
  )
}

// ─── QR Share ────────────────────────────────────────────────────────────────
function QrShare({ url, lang }: { url: string; lang: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: 'Spontánka', url })
    } else {
      copy()
    }
  }

  return (
    <div className="rounded-xl border p-4 space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Zdieľanie</p>
      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
        <span className="text-xs text-muted-foreground flex-1 truncate">{url}</span>
        <button
          onClick={copy}
          className="text-xs text-primary font-medium hover:underline shrink-0"
        >
          {copied ? 'Skopírované ✓' : 'Kopírovať'}
        </button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={share}>
          Zdieľať
        </Button>
        <Link href={`https://wa.me/?text=${encodeURIComponent(url)}`} target="_blank">
          <Button variant="outline" size="sm">WhatsApp</Button>
        </Link>
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────
type Tab = 'info' | 'prinesiem' | 'chat'

export function DetailView({
  initial,
  lang,
  baseUrl,
}: {
  initial: SpontankaDetail
  lang: string
  baseUrl: string
}) {
  const [tab, setTab] = useState<Tab>('info')
  const [showNameModal, setShowNameModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)
  const [isOrganizer, setIsOrganizer] = useState(false)
  const { pid, pname, ready, saveIdentity } = useParticipant()

  const sp = initial

  useEffect(() => {
    // Check if logged-in user is creator
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id && session.user.id === sp.creator_id) {
        setIsOrganizer(true)
      }
    })
  }, [sp])

  const requireName = (action: () => void) => {
    if (!pname) {
      setPendingAction(() => action)
      setShowNameModal(true)
    } else {
      action()
    }
  }

  const handleSaveName = (name: string) => {
    saveIdentity(name)
    setShowNameModal(false)
    pendingAction?.()
    setPendingAction(null)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'info', label: 'Info' },
    { id: 'prinesiem', label: `Prinášam (${initial.prinesiem.length})` },
    { id: 'chat', label: `Chat (${initial.chat.filter(m => !m.pinned).length})` },
  ]

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', STAV_COLORS[sp.stav])}>
            {STAV_LABELS[sp.stav]}
          </span>
          <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-muted border">Spontánka</span>
          {isOrganizer && (
            <Link href={`/${lang}/komunita/spontanky/${sp.id}/spravovat`}>
              <span className="text-xs text-primary px-2.5 py-1 rounded-full border border-primary/30 hover:bg-primary/5 cursor-pointer transition-colors">
                ⚙ Spravovať
              </span>
            </Link>
          )}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">{sp.nazov}</h1>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <div className="text-xs text-muted-foreground mb-0.5">Dátum a čas</div>
            <div className="text-sm font-medium">{formatDatum(sp.datum)} · {sp.cas}</div>
          </div>
          <div className="rounded-lg bg-muted/50 px-3 py-2">
            <div className="text-xs text-muted-foreground mb-0.5">Miesto</div>
            <div className="text-sm font-medium truncate">{sp.miesto_hlavne_nazov}</div>
          </div>
          {sp.miesto_zraz_nazov && (
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <div className="text-xs text-muted-foreground mb-0.5">Cyklo zraz · {sp.miesto_zraz_cas}</div>
              <div className="text-sm font-medium truncate">{sp.miesto_zraz_nazov}</div>
            </div>
          )}
          {sp.ocakavany_pocet && (
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <div className="text-xs text-muted-foreground mb-0.5">Počet</div>
              <div className="text-sm font-medium">{sp.ocakavany_pocet}</div>
            </div>
          )}
        </div>

        {sp.stav === 'zrusena' && sp.dovod_zrusenia && (
          <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-800 dark:text-red-300 mb-4">
            Dôvod zrušenia: {sp.dovod_zrusenia}
          </div>
        )}
      </div>

      {/* RSVP */}
      {ready && (
        <div className="mb-6">
          <RsvpSection
            spontankaId={sp.id}
            stav={sp.stav}
            pid={pid}
            pname={pname}
            initialUcastnici={initial.ucastnici}
            onNeedName={() => requireName(() => {})}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-5">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
              tab === t.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'info' && (
        <div className="space-y-5">
          {sp.popis && (
            <div className="rounded-xl border px-4 py-3">
              <p className="text-sm leading-relaxed text-foreground">{sp.popis}</p>
            </div>
          )}

          {(sp.pre_koho || sp.typ_aktivity?.length > 0) && (
            <div className="flex flex-wrap gap-2">
              {sp.pre_koho && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-muted border">👥 {sp.pre_koho}</span>
              )}
              {sp.typ_aktivity?.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted border">{t}</span>
              ))}
            </div>
          )}

          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            Organizátor: {sp.creator_meno}
          </div>

          <QrShare url={baseUrl} lang={lang} />

          <div className="rounded-xl border border-dashed p-4 text-xs text-muted-foreground leading-relaxed">
            Toto je neformálne stretnutie jednotlivcov. Každý účastník koná za seba a zodpovedá za seba a svoje deti.
          </div>
        </div>
      )}

      {tab === 'prinesiem' && (
        <PrinesPanel
          spontankaId={sp.id}
          initialItems={initial.prinesiem}
          pid={pid}
          pname={pname}
          onNeedName={() => requireName(() => {})}
          disabled={sp.stav === 'zrusena'}
        />
      )}

      {tab === 'chat' && (
        <ChatPanel
          spontankaId={sp.id}
          initialMessages={initial.chat}
          pid={pid}
          pname={pname}
          onNeedName={() => requireName(() => {})}
        />
      )}

      {showNameModal && (
        <NameModal
          onSave={handleSaveName}
          onClose={() => setShowNameModal(false)}
        />
      )}
    </div>
  )
}
