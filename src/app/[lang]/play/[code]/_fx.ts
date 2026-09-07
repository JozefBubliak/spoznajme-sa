'use client'
// Herd Vote — feel layer: synthesized sound effects (Web Audio, zero assets),
// haptics and confetti. Everything degrades silently when unavailable.

// ─── Sound engine ─────────────────────────────────────────────────────────────

const MUTE_KEY = 'herd-muted'

class SoundEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  muted = false

  constructor() {
    try {
      this.muted = localStorage.getItem(MUTE_KEY) === '1'
    } catch { /* ignore */ }
  }

  /** Must be called from a user gesture at least once so audio can play. */
  unlock() {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const AC = window.AudioContext || (window as any).webkitAudioContext
      if (!AC) return
      this.ctx = new AC()
      this.master = this.ctx.createGain()
      this.master.gain.value = 0.28
      this.master.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {})
  }

  setMuted(v: boolean) {
    this.muted = v
    try { localStorage.setItem(MUTE_KEY, v ? '1' : '0') } catch { /* ignore */ }
  }
  toggleMuted() { this.setMuted(!this.muted); return this.muted }

  private tone(
    freq: number,
    dur: number,
    opts: { type?: OscillatorType; when?: number; vol?: number; glideTo?: number } = {},
  ) {
    if (this.muted || !this.ctx || !this.master) return
    const t0 = this.ctx.currentTime + (opts.when ?? 0)
    const osc = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    osc.type = opts.type ?? 'sine'
    osc.frequency.setValueAtTime(freq, t0)
    if (opts.glideTo) osc.frequency.exponentialRampToValueAtTime(opts.glideTo, t0 + dur)
    const vol = opts.vol ?? 0.6
    g.gain.setValueAtTime(0.0001, t0)
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012)
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    osc.connect(g); g.connect(this.master)
    osc.start(t0); osc.stop(t0 + dur + 0.02)
  }

  private chord(freqs: number[], dur: number, opts: Parameters<SoundEngine['tone']>[2] = {}) {
    freqs.forEach((f, i) => this.tone(f, dur, { ...opts, when: (opts.when ?? 0) + i * 0.005 }))
  }

  join()     { this.tone(660, 0.12, { type: 'triangle', vol: 0.4 }) }
  select()   { this.tone(420, 0.06, { type: 'square', vol: 0.28 }) }
  lock()     { this.tone(240, 0.16, { type: 'sawtooth', vol: 0.3, glideTo: 120 }) }
  tick()     { this.tone(880, 0.05, { type: 'square', vol: 0.22 }) }
  tickLast() { this.tone(1180, 0.09, { type: 'square', vol: 0.32 }) }
  go()       { this.chord([523, 784], 0.22, { type: 'triangle', vol: 0.4 }) }
  timeUp()   { this.tone(200, 0.35, { type: 'sawtooth', vol: 0.35, glideTo: 90 }) }
  correct()  { this.chord([659, 988, 1319], 0.3, { type: 'triangle', vol: 0.4 }) }
  wrong()    { this.tone(160, 0.3, { type: 'sawtooth', vol: 0.32, glideTo: 80 }) }
  reveal()   { this.tone(300, 0.18, { type: 'triangle', vol: 0.3, glideTo: 600 }) }
  results()  { this.chord([392, 523, 659], 0.25, { type: 'triangle', vol: 0.32 }) }
  streak(n: number) {
    const base = 500 + Math.min(n, 6) * 120
    this.chord([base, base * 1.5], 0.18, { type: 'triangle', vol: 0.34 })
  }
  podium() {
    // little fanfare
    const seq = [523, 659, 784, 1047]
    seq.forEach((f, i) => this.tone(f, 0.28, { type: 'triangle', vol: 0.42, when: i * 0.12 }))
    this.chord([523, 659, 784, 1047], 0.7, { type: 'triangle', vol: 0.3, when: seq.length * 0.12 })
  }
}

let _engine: SoundEngine | null = null
export function sfx(): SoundEngine {
  if (typeof window === 'undefined') return NULL_ENGINE as unknown as SoundEngine
  if (!_engine) _engine = new SoundEngine()
  return _engine
}
const NULL_ENGINE = new Proxy({}, { get: () => () => {} })

// ─── Haptics ──────────────────────────────────────────────────────────────────

type HapticKind = 'select' | 'correct' | 'wrong' | 'tick' | 'go'
const HAPTIC_PATTERNS: Record<HapticKind, number | number[]> = {
  select: 12,
  tick: 8,
  go: [0, 30, 40, 30],
  correct: [0, 25, 45, 25],
  wrong: 120,
}
export function haptic(kind: HapticKind) {
  try { navigator.vibrate?.(HAPTIC_PATTERNS[kind]) } catch { /* ignore */ }
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

let _confetti: ((opts?: any) => void) | null = null
async function getConfetti() {
  if (_confetti) return _confetti
  try {
    const mod = await import('canvas-confetti')
    _confetti = (mod.default ?? mod) as (opts?: any) => void
  } catch { _confetti = () => {} }
  return _confetti
}

export async function burstConfetti(originY = 0.7) {
  const c = await getConfetti()
  c({ particleCount: 60, spread: 70, startVelocity: 32, gravity: 1.1, ticks: 120, origin: { y: originY }, scalar: 0.9 })
}

export async function bigConfetti() {
  const c = await getConfetti()
  const end = Date.now() + 1400
  const colors = ['#a855f7', '#ec4899', '#22d3ee', '#facc15', '#4ade80']
  ;(function frame() {
    c({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors })
    c({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  c({ particleCount: 140, spread: 100, startVelocity: 45, origin: { y: 0.6 }, colors })
}

// ─── Fun nickname suggestions (SK) ───────────────────────────────────────────

const ADJ = ['Bystrý', 'Tichá', 'Rýchly', 'Zlatý', 'Divoký', 'Múdry', 'Šťastná', 'Tajný', 'Veselý', 'Ostrý', 'Chytrá', 'Smelý']
const NOUN = ['Jež', 'Líška', 'Sokol', 'Vlk', 'Ryś', 'Bobor', 'Kuna', 'Vydra', 'Jeleň', 'Orol', 'Medveď', 'Delfín']
export function randomNick() {
  const a = ADJ[Math.floor(Math.random() * ADJ.length)]
  const n = NOUN[Math.floor(Math.random() * NOUN.length)]
  return `${a} ${n}`
}
export function nickSuggestions(count = 3) {
  const out = new Set<string>()
  let guard = 0
  while (out.size < count && guard++ < 40) out.add(randomNick())
  return [...out]
}
