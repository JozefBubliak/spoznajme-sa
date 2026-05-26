'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

// One scoped helper — reuses the existing singleton's auth session
const rel = supabase.schema('rel')

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
    const { data, error } = await rel.rpc('get_my_couple')

    if (error || !data || (Array.isArray(data) && data.length === 0)) {
      setView({ kind: 'no-couple' })
      return
    }

    const state: CoupleState = Array.isArray(data) ? data[0] : data

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
    const { data: nudges } = await rel.rpc('get_recent_nudges', { p_limit: 8 })
    setRecentNudges((nudges ?? []) as RecentNudge[])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadState()
  }, [loadState])

  // ── Handlers ─────────────────────────────────────────────────────────────

  async function handleCreate() {
    setJoinLoading(true)
    setJoinError('')
    const { data, error } = await rel.rpc('create_couple')
    if (error) {
      setJoinError(error.message)
      setJoinLoading(false)
      return
    }
    const row = Array.isArray(data) ? data[0] : data
    setJoinLoading(false)
    setView({ kind: 'pending', invite_code: row.invite_code })
  }

  async function handleJoin() {
    if (joinCode.trim().length < 6) {
      setJoinError('Zadaj platný kód (min. 6 znakov)')
      return
    }
    setJoinLoading(true)
    setJoinError('')
    const { error } = await rel.rpc('join_couple', { p_code: joinCode.trim() })
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
    const { error } = await rel.rpc('save_nudge_prefs', {
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
    const { data, error } = await rel.rpc('request_nudge')
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
    await rel.rpc('mark_nudge_done', { p_nudge_id: nudgeId })
    setLiveNudge(null)
    setRecentNudges((prev) =>
      prev.map((n) => (n.nudge_id === nudgeId ? { ...n, marked_done: true } : n)),
    )
  }

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // ── Render helpers ────────────────────────────────────────────────────────

  function Shell({ children }: { children: React.ReactNode }) {
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

  // ── Loading ───────────────────────────────────────────────────────────────

  if (view.kind === 'loading') {
    return (
      <Shell>
        <div className="flex items-center justify-center py-24 text-muted-foreground text-sm">
          Načítavam…
        </div>
      </Shell>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────

  if (view.kind === 'error') {
    return (
      <Shell>
        <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-7 text-sm text-destructive">
          {view.message}
        </div>
      </Shell>
    )
  }

  // ── No couple ─────────────────────────────────────────────────────────────

  if (view.kind === 'no-couple') {
    return (
      <Shell>
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
      <Shell>
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

          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Tvoj párovací kód
            </p>
            <p className="mt-4 font-mono text-5xl font-bold tracking-[0.3em] text-foreground">
              {view.invite_code}
            </p>
            <button
              onClick={() => copyCode(view.invite_code)}
              className="mt-5 rounded-xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/20"
            >
              {copied ? '✓ Skopírované' : 'Kopírovať kód'}
            </button>
          </div>

          <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
            <p className="text-sm font-semibold text-foreground">Čo teraz?</p>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. Pošli partnerovi kód cez správu alebo ho ukáž na obrazovke.</li>
              <li>
                2. Partner si otvorí{' '}
                <Link
                  href={`/${lang}/apps/nudge/home`}
                  className="text-primary hover:underline"
                >
                  túto stránku
                </Link>
                , prihlási sa a zadá kód.
              </li>
              <li>3. Potom nastavíte jazyk lásky a frekvenciu nudgov.</li>
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
      <Shell>
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
    <Shell>
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
