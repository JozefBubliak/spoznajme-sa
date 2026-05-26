'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/lib/supabaseClient'

// ── rel-schema RPC helper ─────────────────────────────────────────────────────
// Uses the project singleton (storageKey 'cards-auth') so auth.uid() is always
// populated. Avoids supabase.schema('rel') which creates a second GoTrueClient.

async function relRpc<T = unknown>(
  fn: string,
  args: Record<string, unknown> = {},
): Promise<{ data: T | null; error: { message: string } | null }> {
  const { data: { session } } = await supabase.auth.getSession()

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_PUBLISHABLE_KEY,
      'Authorization': session?.access_token ? `Bearer ${session.access_token}` : '',
      'Content-Profile': 'rel',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(args),
  })

  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try { msg = (await res.json()).message ?? msg } catch { /* ignore */ }
    return { data: null, error: { message: msg } }
  }

  const text = await res.text()
  const data: T = text ? JSON.parse(text) : null
  return { data, error: null }
}

// ── Shell layout ─────────────────────────────────────────────────────────────
// Defined outside NudgeApp so React keeps a stable component reference
// across renders and never unmounts/remounts it.

function Shell({ children, lang }: { children: React.ReactNode; lang: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href={`/${lang}/apps/nudge`}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← Späť na popis
        </Link>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

// ── Types ────────────────────────────────────────────────────────────────────

type LoveLanguage = 'words' | 'time' | 'touch' | 'gifts' | 'acts'

interface CoupleState {
  couple_id: string
  invite_code: string
  partner_joined: boolean
  has_settings: boolean
  per_week: number
  love_language: LoveLanguage | null
  novelty_ratio: number
}

interface RecentNudge {
  nudge_id: string
  prompt: string
  sent_at: string
  marked_done: boolean
}

interface LiveNudge {
  nudge_id: string
  prompt: string
}

type AppView =
  | { kind: 'loading' }
  | { kind: 'no-couple' }
  | { kind: 'pending'; invite_code: string }
  | { kind: 'setup'; couple_id: string; invite_code: string }
  | { kind: 'active'; state: CoupleState }
  | { kind: 'error'; message: string }

// ── Love language meta ────────────────────────────────────────────────────────

const LL_META: Record<LoveLanguage, { label: string; icon: string }> = {
  words:  { label: 'Slová uznania',    icon: '💬' },
  time:   { label: 'Spoločný čas',     icon: '⏱️' },
  touch:  { label: 'Fyzický dotyk',    icon: '🤝' },
  gifts:  { label: 'Darčeky',          icon: '🎁' },
  acts:   { label: 'Skutky služby',    icon: '🛠️' },
}

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  lang: string
  userId: string
}

// ── Component ────────────────────────────────────────────────────────────────

export function NudgeApp({ lang, userId }: Props) {
  const [view, setView] = useState<AppView>({ kind: 'loading' })
  const [recentNudges, setRecentNudges] = useState<RecentNudge[]>([])
  const [liveNudge, setLiveNudge] = useState<LiveNudge | null>(null)
  const [nudgeLoading, setNudgeLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // ── Setup wizard state ────────────────────────────────────────────────────
  const [setupLang, setSetupLang] = useState<LoveLanguage>('time')
  const [setupPerWeek, setSetupPerWeek] = useState(3)
  const [setupNovelty, setSetupNovelty] = useState(0.3)
  const [setupSaving, setSetupSaving] = useState(false)

  // ── Join-couple state ─────────────────────────────────────────────────────
  const [joinMode, setJoinMode] = useState<'create' | 'join' | null>(null)
  const [joinCode, setJoinCode] = useState('')
  const [joinError, setJoinError] = useState('')
  const [joinLoading, setJoinLoading] = useState(false)

  // ── Load state ───────────────────────────────────────────────────────────

  const loadState = useCallback(async () => {
    const { data, error } = await relRpc<CoupleState[]>('get_my_couple')

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      setView({ kind: 'no-couple' })
      return
    }

    const state: CoupleState = Array.isArray(data) ? data[0] : (data as CoupleState)

    if (!state.partner_joined) {
      setView({ kind: 'pending', invite_code: state.invite_code })
      return
    }

    if (!state.has_settings) {
      setView({ kind: 'setup', couple_id: state.couple_id, invite_code: state.invite_code })
      return
    }

    setView({ kind: 'active', state })

    // Load recent nudges
    const { data: nudges } = await relRpc<RecentNudge[]>('get_recent_nudges', { p_limit: 8 })
    setRecentNudges((nudges ?? []) as RecentNudge[])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadState()
  }, [loadState])

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleCreate() {
    setJoinLoading(true)
    setJoinError('')
    const { data, error } = await relRpc<{ couple_id: string; invite_code: string }[]>('create_couple')
    if (error) {
      setJoinError(error.message)
      setJoinLoading(false)
      return
    }
    const row = Array.isArray(data) ? data[0] : data
    setJoinLoading(false)
    if (row) setView({ kind: 'pending', invite_code: row.invite_code })
  }

  async function handleJoin() {
    if (joinCode.trim().length < 6) {
      setJoinError('Zadaj platný kód (min. 6 znakov)')
      return
    }
    setJoinLoading(true)
    setJoinError('')
    const { error } = await relRpc('join_couple', { p_code: joinCode.trim() })
    if (error) {
      setJoinError(error.message === 'invalid invite code' ? 'Kód nebol nájdený.' : error.message)
      setJoinLoading(false)
      return
    }
    setJoinLoading(false)
    loadState()
  }

  async function handleSaveSetup() {
    setSetupSaving(true)
    const { error } = await relRpc('save_nudge_prefs', {
      p_per_week:      setupPerWeek,
      p_love_language: setupLang,
      p_novelty_ratio: setupNovelty,
    })
    setSetupSaving(false)
    if (error) {
      alert('Chyba pri ukladaní: ' + error.message)
      return
    }
    loadState()
  }

  async function handleRequestNudge() {
    setNudgeLoading(true)
    setLiveNudge(null)
    const { data, error } = await relRpc<{ nudge_id: string; prompt: string }[]>('request_nudge')
    setNudgeLoading(false)
    if (error) {
      alert('Nepodarilo sa načítať tip: ' + error.message)
      return
    }
    const row = Array.isArray(data) ? data[0] : data
    if (row) setLiveNudge({ nudge_id: row.nudge_id, prompt: row.prompt })
    loadState()
  }

  async function handleMarkDone(nudgeId: string) {
    await relRpc('mark_nudge_done', { p_nudge_id: nudgeId })
    setLiveNudge(null)
    setRecentNudges((prev) =>
      prev.map((n) => (n.nudge_id === nudgeId ? { ...n, marked_done: true } : n)),
    )
  }

  function joinUrl(code: string) {
    const origin = typeof window !== 'undefined'
      ? window.location.origin
      : 'https://deeptalks.eu'
    return `${origin}/${lang}/apps/nudge/join/${code}`
  }

  function copyLink(code: string) {
    navigator.clipboard.writeText(joinUrl(code)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function handleNativeShare(code: string) {
    const url = joinUrl(code)
    if (navigator.share) {
      await navigator.share({
        title: 'DeepTalks – pripoj sa ku mne',
        text: 'Pridaj sa ku mne na DeepTalks Nudge Engine 💌',
        url,
      })
    }
  }

  // ── Loading ───────────────────────────────────────────────────────────────

  if (view.kind === 'loading') {
    return (
      <Shell lang={lang}>
        <div className="flex items-center justify-center py-24 text-muted-foreground text-sm">
          Načítavam…
        </div>
      </Shell>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────

  if (view.kind === 'error') {
    return (
      <Shell lang={lang}>
        <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-7 text-sm text-destructive">
          {view.message}
        </div>
      </Shell>
    )
  }

  // ── No couple ─────────────────────────────────────────────────────────────

  if (view.kind === 'no-couple') {
    return (
      <Shell lang={lang}>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Nudge Engine
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Najprv sa spárujte s partnerom.
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Jeden z vás vytvorí kód, druhý ho zadá. Stačí raz.
            </p>
          </div>

          {joinMode === null && (
            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setJoinMode('create')}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 text-left transition hover:border-primary/40"
              >
                <p className="text-2xl">✨</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">Vytvoriť pár</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ty ako prvý/á — dostaneš kód a pošleš ho partnerovi.
                </p>
              </button>
              <button
                onClick={() => setJoinMode('join')}
                className="rounded-3xl border border-border/60 bg-card/80 p-6 text-left transition hover:border-primary/40"
              >
                <p className="text-2xl">🔗</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">Pridať sa ku páru</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Partner ti dal kód — zadaj ho sem a ste prepojení.
                </p>
              </button>
            </div>
          )}

          {joinMode === 'create' && (
            <div className="rounded-3xl border border-border/60 bg-card/80 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Vytvorenie páru</h3>
              <p className="text-sm text-muted-foreground">
                Klikni nižšie. Systém vygeneruje unikátny 8-znakový kód, ktorý pošleš partnerovi.
              </p>
              {joinError && (
                <p className="text-sm text-destructive">{joinError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleCreate}
                  disabled={joinLoading}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                >
                  {joinLoading ? 'Vytváram…' : 'Vytvoriť pár a dostať kód'}
                </button>
                <button
                  onClick={() => { setJoinMode(null); setJoinError('') }}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  Späť
                </button>
              </div>
            </div>
          )}

          {joinMode === 'join' && (
            <div className="rounded-3xl border border-border/60 bg-card/80 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Zadaj kód od partnera</h3>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                placeholder="Napr. AB12CD34"
                maxLength={8}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-lg font-mono tracking-widest text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              {joinError && (
                <p className="text-sm text-destructive">{joinError}</p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleJoin}
                  disabled={joinLoading}
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                >
                  {joinLoading ? 'Hľadám…' : 'Pripojiť sa'}
                </button>
                <button
                  onClick={() => { setJoinMode(null); setJoinError(''); setJoinCode('') }}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  Späť
                </button>
              </div>
            </div>
          )}
        </div>
      </Shell>
    )
  }

  // ── Pending (waiting for partner) ─────────────────────────────────────────

  if (view.kind === 'pending') {
    return (
      <Shell lang={lang}>
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Čakám na partnera
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Pár je vytvorený. Teraz stačí, aby sa pripojil partner.
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Pošli mu/jej tento kód. Keď ho zadá na tejto stránke, ste prepojení.
            </p>
          </div>

          {/* Share panel */}
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7 space-y-5">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                Tvoj pozývací link
              </p>
              <p className="mt-3 break-all rounded-xl border border-primary/20 bg-background/60 px-4 py-2.5 font-mono text-sm text-foreground">
                {typeof window !== 'undefined'
                  ? joinUrl(view.invite_code)
                  : `deeptalks.eu/${lang}/apps/nudge/join/…`}
              </p>
            </div>

            {/* Native share – zobrazí sa len keď API existuje (mobily) */}
            {typeof navigator !== 'undefined' && !!navigator.share && (
              <button
                onClick={() => handleNativeShare(view.invite_code)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <span>↑</span> Zdieľať link
              </button>
            )}

            {/* Sieťové tlačidlá */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Pridaj sa ku mne na DeepTalks 💌\n${joinUrl(view.invite_code)}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 py-3.5 text-xs font-medium text-foreground transition hover:border-green-500/40 hover:bg-green-500/5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-green-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(joinUrl(view.invite_code))}&text=${encodeURIComponent('Pridaj sa ku mne na DeepTalks 💌')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 py-3.5 text-xs font-medium text-foreground transition hover:border-sky-500/40 hover:bg-sky-500/5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-sky-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram
              </a>

              {/* Viber */}
              <a
                href={`viber://forward?text=${encodeURIComponent(`Pridaj sa ku mne na DeepTalks 💌\n${joinUrl(view.invite_code)}`)}`}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 py-3.5 text-xs font-medium text-foreground transition hover:border-violet-500/40 hover:bg-violet-500/5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-violet-500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4 0C6.39.04 1.64 3.17.44 8.25c-.57 2.42-.51 4.95.18 7.34.68 2.38 2.03 4.4 3.9 5.92l.01 2.49s-.04.7.44.84c.57.17.93-.37 1.46-.97l1.13-1.38c1.57.38 3.19.48 4.79.29 5.79-.68 10.01-5.6 9.64-11.58C21.64 4.85 17.12.18 11.4 0zm.14 2.17c4.74.14 8.74 3.85 9.08 8.67.3 4.59-2.95 8.69-7.43 9.51-1.51.28-3.06.18-4.52-.27l-.61-.19-.43.52-1.02 1.25v-1.97l-.32-.22a9.33 9.33 0 0 1-3.72-5.38 11.2 11.2 0 0 1-.16-6.47C3.41 4.02 7.25 2.01 11.54 2.17zM8.1 6.34c-.19-.01-.38.04-.55.15-.43.29-.78.62-1.01 1.13-.2.43-.19.88-.03 1.32.36 1.01.93 1.95 1.62 2.75.82 1.03 1.81 1.94 2.92 2.68.68.47 1.42.82 2.2 1.07.55.18 1.1.22 1.62-.07.41-.22.73-.57 1.01-.95.17-.22.15-.53-.04-.73l-1.6-1.62c-.2-.2-.52-.24-.76-.09l-.85.57a.38.38 0 0 1-.46-.04c-.39-.33-.76-.69-1.09-1.08a8.18 8.18 0 0 1-.86-1.37.38.38 0 0 1 .07-.46l.53-.6c.18-.21.2-.51.04-.73L8.7 6.56a.54.54 0 0 0-.6-.22zm3.76.7c-.31 0-.57.25-.57.57v.01c0 .31.25.57.57.57h.01c1.35.06 2.44 1.15 2.5 2.5v.01c0 .31.25.57.57.57s.57-.25.57-.57v-.01a3.65 3.65 0 0 0-3.65-3.65zm-.06 1.81c-.31 0-.57.25-.57.57s.25.57.57.57a.88.88 0 0 1 .88.88c0 .31.25.57.57.57s.57-.25.57-.57a2.02 2.02 0 0 0-2.02-2.02z"/>
                </svg>
                Viber
              </a>

              {/* Kopírovať link */}
              <button
                onClick={() => copyLink(view.invite_code)}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-border/60 bg-card/80 py-3.5 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {copied ? '✓ Skopírované' : 'Kopírovať link'}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
            <p className="text-sm font-semibold text-foreground">Čo teraz?</p>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. Zdieľaj link vyššie — partnerovi stačí kliknúť.</li>
              <li>2. Partner sa prihlási a je automaticky prepojený s tebou.</li>
              <li>3. Potom každý nastaví jazyk lásky a frekvenciu tipov.</li>
            </ol>
          </div>

          <button
            onClick={loadState}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
          >
            Skontrolovať, či sa partner pripojil
          </button>
        </div>
      </Shell>
    )
  }

  // ── Setup wizard ──────────────────────────────────────────────────────────

  if (view.kind === 'setup') {
    return (
      <Shell lang={lang}>
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Nastavenie
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Skvelé — ste prepojení! Teraz nastavte, ako chcete dostávať tipy.
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Každý z vás si nastaví vlastné preferencie. Tipy sa prispôsobia jazyku lásky
              tvojho <em>partnera</em>, nie tvojmu.
            </p>
          </div>

          {/* Love language pick */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Aký je jazyk lásky tvojho partnera?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Tipy budú cielené na to, čo partner ocení, nie na to, čo dávaš ty prirodzene.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(Object.keys(LL_META) as LoveLanguage[]).map((key) => {
                const meta = LL_META[key]
                return (
                  <button
                    key={key}
                    onClick={() => setSetupLang(key)}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      setupLang === key
                        ? 'border-primary/40 bg-primary/10 text-foreground'
                        : 'border-border/60 bg-card/80 text-muted-foreground hover:border-primary/20'
                    }`}
                  >
                    <span className="text-xl">{meta.icon}</span>
                    <span className="text-sm font-medium">{meta.label}</span>
                    {setupLang === key && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Per-week slider */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Koľko tipov týždenne chceš dostávať?
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Odporúčame začať s 3 a podľa potreby zvýšiť.
              </p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">1 týždenne</span>
                <span className="text-2xl font-bold text-primary">{setupPerWeek}×</span>
                <span className="text-xs text-muted-foreground">7 týždenne</span>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                value={setupPerWeek}
                onChange={(e) => setSetupPerWeek(Number(e.target.value))}
                className="mt-4 w-full accent-primary"
              />
            </div>
          </div>

          {/* Novelty toggle */}
          <div className="rounded-3xl border border-border/60 bg-card/80 p-6 space-y-3">
            <p className="text-sm font-semibold text-foreground">Koľko noviniek chceš?</p>
            <p className="text-xs text-muted-foreground">
              Novosť = tipy, ktoré ste ešte neskúšali. Rutina = osvedčené gestá, ktoré viete,
              že fungujú.
            </p>
            <div className="flex gap-3">
              {[
                { val: 0.1, label: 'Hlavne rutina' },
                { val: 0.3, label: 'Mix (odporúčané)' },
                { val: 0.5, label: 'Viac noviniek' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setSetupNovelty(opt.val)}
                  className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition ${
                    setupNovelty === opt.val
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'border-border/60 bg-background text-muted-foreground hover:border-primary/20'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveSetup}
            disabled={setupSaving}
            className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            {setupSaving ? 'Ukladám…' : 'Uložiť a začať dostávať tipy →'}
          </button>
        </div>
      </Shell>
    )
  }

  // ── Active ────────────────────────────────────────────────────────────────

  const { state } = view
  const ll = state.love_language ? LL_META[state.love_language] : null

  return (
    <Shell lang={lang}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Nudge Engine
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Dnešný tip pre teba
            </h1>
          </div>
          {ll && (
            <div className="rounded-2xl border border-border/60 bg-card/80 px-4 py-2 text-center">
              <p className="text-lg">{ll.icon}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {ll.label}
              </p>
            </div>
          )}
        </div>

        {/* Live nudge or get-nudge CTA */}
        {liveNudge ? (
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Tvoj tip na dnes
            </p>
            <p className="text-xl leading-relaxed text-foreground">„{liveNudge.prompt}"</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleMarkDone(liveNudge.nudge_id)}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                ✓ Splnené
              </button>
              <button
                onClick={handleRequestNudge}
                disabled={nudgeLoading}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground disabled:opacity-50"
              >
                Iný tip
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-border/60 bg-card/80 p-7 space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Systém odosiela tipy automaticky {state.per_week}× týždenne. Ak chceš tip
              hneď, klikni nižšie.
            </p>
            <button
              onClick={handleRequestNudge}
              disabled={nudgeLoading}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {nudgeLoading ? 'Hľadám tip…' : 'Dostať tip teraz'}
            </button>
          </div>
        )}

        {/* Recent nudges */}
        {recentNudges.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              História tipov
            </p>
            <div className="space-y-3">
              {recentNudges.map((nudge) => (
                <div
                  key={nudge.nudge_id}
                  className={`rounded-2xl border p-5 transition ${
                    nudge.marked_done
                      ? 'border-border/40 bg-card/50 opacity-70'
                      : 'border-border/60 bg-card/80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed text-foreground">
                        „{nudge.prompt}"
                      </p>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {new Date(nudge.sent_at).toLocaleDateString('sk-SK', {
                          day: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    </div>
                    {nudge.marked_done ? (
                      <span className="rounded-full border border-border/40 bg-background/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                        Splnené ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkDone(nudge.nudge_id)}
                        className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary transition hover:bg-primary/20"
                      >
                        Označiť
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings footer */}
        <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Nastavenia</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {state.per_week}× týždenne ·{' '}
                {ll ? ll.label : 'jazyk lásky nenastavený'} ·{' '}
                {Math.round(state.novelty_ratio * 100)} % noviniek
              </p>
            </div>
            <button
              onClick={() =>
                setView({
                  kind: 'setup',
                  couple_id: state.couple_id,
                  invite_code: state.invite_code,
                })
              }
              className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
            >
              Upraviť
            </button>
          </div>
        </div>
      </div>
    </Shell>
  )
}
