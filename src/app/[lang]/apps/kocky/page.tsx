'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DiceRollResult } from '@/app/api/kocky/roll/route';

// ── Types ──────────────────────────────────────────────────────────────────

type Phase = 'names' | 'settings' | 'rolling' | 'result';
type Gender = 'female' | 'male';

type Partner = {
  name: string;
  gender: Gender;
};

type GameSettings = {
  play_mode: string;
  max_intensity: number;
  exclude_genital: boolean;
};

type RollResponse = {
  result: DiceRollResult;
  duration_seconds: number;
};

type Assignment = {
  actor: Partner;
  receiver: Partner;
  scope: DiceRollResult['actor_scope'];
};

// ── Constants ──────────────────────────────────────────────────────────────

const PLAY_MODES = [
  { slug: 'explore',  label: 'Objavovanie',  emoji: '🌸', desc: 'Jemné spoznávanie — bez tlaku', color: 'from-rose-400 to-pink-500' },
  { slug: 'sensual',  label: 'Zmyselné',     emoji: '🔥', desc: 'Bozky, dotyk, jazyk, celé telo', color: 'from-orange-400 to-rose-500' },
  { slug: 'intense',  label: 'Intenzívne',   emoji: '⚡', desc: 'Silnejší tlak, rýchlejšie tempo', color: 'from-purple-500 to-indigo-600' },
  { slug: 'toys',     label: 'Pomôcky',      emoji: '💜', desc: 'Vibrátor, pierko, ľad…', color: 'from-violet-500 to-purple-700' },
  { slug: 'bdsm',     label: 'BDSM',         emoji: '🖤', desc: 'Moc, senzory, impact — len s dohodou', color: 'from-gray-700 to-gray-900' },
];

const INTENSITY_LABELS: Record<number, string> = { 1: 'Ultra jemne', 2: 'Jemne', 3: 'Stredne', 4: 'Silno', 5: 'BDSM/kink' };
const GENDER_LABELS: Record<Gender, string> = { female: 'Žena', male: 'Muž' };

// ── Helpers ────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatSeconds(s: number): string {
  if (s < 60) return `${s} sekúnd`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r === 0 ? `${m} min` : `${m}:${String(r).padStart(2, '0')} min`;
}

/** Determine who acts and who receives based on DB fields + partner genders */
function resolveAssignment(result: DiceRollResult, p1: Partner, p2: Partner): Assignment {
  const scope = result.actor_scope;
  const target = result.receiver_target;

  let receiver: Partner;
  let actor: Partner;

  if (target === 'female') {
    receiver = p1.gender === 'female' ? p1 : p2;
    actor = receiver === p1 ? p2 : p1;
  } else if (target === 'male') {
    receiver = p1.gender === 'male' ? p1 : p2;
    actor = receiver === p1 ? p2 : p1;
  } else {
    // 'all' — random
    receiver = pick([p1, p2]);
    actor = receiver === p1 ? p2 : p1;
  }

  // mutual / self overrides
  if (scope === 'mutual') {
    return { actor: p1, receiver: p2, scope };
  }
  if (scope === 'receiver_self') {
    return { actor: receiver, receiver, scope };
  }

  return { actor, receiver, scope };
}

/** Build a natural Slovak sentence: "Jozef, masíruj Monike chodidlá" */
function buildPrompt(prompt: string, assignment: Assignment): string {
  const { actor, receiver, scope } = assignment;
  if (scope === 'mutual') {
    return `${actor.name} a ${receiver.name}: ${prompt}`;
  }
  if (scope === 'receiver_self') {
    return `${actor.name}: ${prompt}`;
  }
  // partner_to_receiver or either
  return `${actor.name} → ${receiver.name}: ${prompt}`;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function DiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="4" y="4" width="56" height="56" rx="10" fill="currentColor" opacity="0.15" />
      <rect x="4" y="4" width="56" height="56" rx="10" stroke="currentColor" strokeWidth="3" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <circle cx="44" cy="20" r="4" fill="currentColor" />
      <circle cx="20" cy="44" r="4" fill="currentColor" />
      <circle cx="44" cy="44" r="4" fill="currentColor" />
      <circle cx="32" cy="32" r="4" fill="currentColor" />
    </svg>
  );
}

function CountdownTimer({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const done = useRef(false);

  useEffect(() => {
    done.current = false;
    setRemaining(seconds);
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          if (!done.current) { done.current = true; setTimeout(onDone, 300); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const pct = remaining / seconds;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#374151" strokeWidth="5" />
          <circle cx="40" cy="40" r="34" fill="none"
            stroke={pct > 0.3 ? '#f43f5e' : '#ef4444'} strokeWidth="5"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct)}`}
            strokeLinecap="round" className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-white">{remaining}</span>
        </div>
      </div>
      <span className="text-xs text-gray-500">sekúnd</span>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'kocky_partners';
const SETTINGS_KEY = 'kocky_settings';

export default function KockyPage() {
  const [phase, setPhase] = useState<Phase>('names');
  const [p1, setP1] = useState<Partner>({ name: '', gender: 'female' });
  const [p2, setP2] = useState<Partner>({ name: '', gender: 'male' });
  const [settings, setSettings] = useState<GameSettings>({ play_mode: 'sensual', max_intensity: 3, exclude_genital: false });
  const [roll, setRoll] = useState<RollResponse | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timerDone, setTimerDone] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [diceRot, setDiceRot] = useState(0);

  // Load saved names + settings
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { p1: sp1, p2: sp2 } = JSON.parse(saved);
        if (sp1?.name) { setP1(sp1); setP2(sp2); setPhase('settings'); }
      }
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch { /* ignore */ }
  }, []);

  const savePartners = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ p1, p2 }));
  };

  const saveSettings = (s: GameSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  };

  const currentMode = PLAY_MODES.find((m) => m.slug === settings.play_mode) ?? PLAY_MODES[1];

  const doRoll = useCallback(async () => {
    setLoading(true);
    setError(null);
    setTimerDone(false);
    setPhase('rolling');
    setDiceRot((r) => r + 360 + Math.floor(Math.random() * 360));

    try {
      const res = await fetch('/api/kocky/roll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          play_mode: settings.play_mode,
          max_intensity: settings.max_intensity,
          exclude_genital: settings.exclude_genital,
          receiver_target: pick(['female', 'male', 'all']),
        }),
      });
      const data: RollResponse = await res.json();
      if (!res.ok) {
        const msg = (data as unknown as { error: string }).error;
        setError(msg ?? 'Chyba servera');
        setPhase('settings');
        return;
      }
      setRoll(data);
      setAssignment(resolveAssignment(data.result, p1, p2));
      setRollCount((c) => c + 1);
      setTimeout(() => setPhase('result'), 700);
    } catch {
      setError('Sieťová chyba — skús znova.');
      setPhase('settings');
    } finally {
      setLoading(false);
    }
  }, [settings, p1, p2]);

  const goToSettings = () => setPhase('settings');
  const endGame = () => { setPhase('settings'); setRoll(null); setTimerDone(false); setRollCount(0); };

  // ── Names screen ────────────────────────────────────────────────────────

  if (phase === 'names') {
    const valid = p1.name.trim().length > 0 && p2.name.trim().length > 0;
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-8">

          <div className="text-center">
            <div className="text-5xl mb-4">🎲</div>
            <h1 className="text-3xl font-black">Intímne kocky</h1>
            <p className="text-gray-400 mt-2">Zadajte mená — budú súčasťou každej úlohy.</p>
          </div>

          {[{ label: 'Prvý partner', val: p1, set: setP1 }, { label: 'Druhý partner', val: p2, set: setP2 }].map(({ label, val, set }) => (
            <div key={label} className="space-y-3">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
              <input
                type="text"
                placeholder="Meno…"
                value={val.name}
                onChange={(e) => set((v) => ({ ...v, name: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500 text-lg font-semibold"
              />
              <div className="flex gap-2">
                {(['female', 'male'] as Gender[]).map((g) => (
                  <button key={g} onClick={() => set((v) => ({ ...v, gender: g }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      val.gender === g ? 'bg-rose-600 border-rose-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'
                    }`}>
                    {g === 'female' ? '♀ Žena' : '♂ Muž'}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <motion.button whileTap={{ scale: 0.97 }} disabled={!valid}
            onClick={() => { savePartners(); setPhase('settings'); }}
            className="w-full py-4 rounded-3xl font-black text-lg bg-gradient-to-r from-rose-500 to-pink-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-rose-900">
            Pokračovať →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ── Settings screen ──────────────────────────────────────────────────────

  if (phase === 'settings') {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black">🎲 Intímne kocky</h1>
            <button onClick={() => setPhase('names')} className="text-xs text-gray-500 hover:text-gray-300 mt-0.5">
              👤 {p1.name} & {p2.name} ·&nbsp;<span className="underline">zmeniť</span>
            </button>
          </div>
          {rollCount > 0 && (
            <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">{rollCount}× hodené</span>
          )}
        </div>

        <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md space-y-6">

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-2xl px-4 py-3 text-red-300 text-sm">
              {error === 'no_candidates'
                ? 'Pre tieto nastavenia nie sú dostupné kombinácie. Zníž intenzitu alebo vyber iný mód.'
                : error}
            </div>
          )}

          {/* Mode */}
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Mód hry</p>
            <div className="space-y-2">
              {PLAY_MODES.map((m) => (
                <button key={m.slug}
                  onClick={() => { setSettings((s) => { const ns = { ...s, play_mode: m.slug }; saveSettings(ns); return ns; }); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-left transition-all ${
                    settings.play_mode === m.slug ? 'border-white/30 bg-white/10' : 'border-white/5 bg-white/5 hover:bg-white/8'
                  }`}>
                  <span className="text-2xl">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{m.label}</p>
                    <p className="text-gray-400 text-xs truncate">{m.desc}</p>
                  </div>
                  {settings.play_mode === m.slug && <span className="w-2 h-2 rounded-full bg-white shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
              Max intenzita — <span className="text-white font-bold">{INTENSITY_LABELS[settings.max_intensity]}</span>
            </p>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((i) => (
                <button key={i}
                  onClick={() => { setSettings((s) => { const ns = { ...s, max_intensity: i }; saveSettings(ns); return ns; }); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                    i <= settings.max_intensity ? 'bg-rose-600 text-white' : 'bg-white/8 text-gray-600'
                  }`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Genital toggle */}
          <button
            onClick={() => { setSettings((s) => { const ns = { ...s, exclude_genital: !s.exclude_genital }; saveSettings(ns); return ns; }); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
              settings.exclude_genital ? 'border-amber-500/40 bg-amber-500/10' : 'border-white/5 bg-white/5'
            }`}>
            <div>
              <p className={`text-sm font-semibold ${settings.exclude_genital ? 'text-amber-300' : 'text-gray-300'}`}>
                Vynechať genitálne zóny
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Len nesexuálne časti tela</p>
            </div>
            <div className={`w-10 h-6 rounded-full border-2 relative transition-all ${
              settings.exclude_genital ? 'bg-amber-400 border-amber-400' : 'bg-white/10 border-white/20'
            }`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                settings.exclude_genital ? 'left-4' : 'left-0.5'
              }`} />
            </div>
          </button>

          {/* Roll button */}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={doRoll} disabled={loading}
            className={`w-full py-5 rounded-3xl font-black text-xl bg-gradient-to-r ${currentMode.color} flex items-center justify-center gap-3 shadow-xl disabled:opacity-40`}>
            <DiceIcon className="w-7 h-7" />
            Hodiť kocku
          </motion.button>

          {settings.play_mode === 'bdsm' && (
            <p className="text-center text-xs text-gray-500 px-2">
              🔒 BDSM mód vyžaduje predbežnú dohodu o safeword a hraniciach.
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  // ── Rolling animation ────────────────────────────────────────────────────

  if (phase === 'rolling') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6">
        <motion.div animate={{ rotate: diceRot }} transition={{ duration: 0.8, ease: 'easeOut' }}>
          <DiceIcon className="w-28 h-28 text-rose-500" />
        </motion.div>
        <p className="text-gray-400 text-lg font-medium animate-pulse">Generujem kombináciu…</p>
      </div>
    );
  }

  // ── Result screen ────────────────────────────────────────────────────────

  if (phase === 'result' && roll && assignment) {
    const { actor, receiver, scope } = assignment;
    const isMutual = scope === 'mutual';
    const isSelf = scope === 'receiver_self';
    const prompt = buildPrompt(roll.result.prompt_sk, assignment);

    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-8">

        {/* Who header */}
        <div className="w-full max-w-md mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">🎲 Úloha #{rollCount}</span>
            <span className="text-gray-500">{INTENSITY_LABELS[settings.max_intensity]} · {currentMode.emoji} {currentMode.label}</span>
          </div>
        </div>

        <motion.div key={`result-${rollCount}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-4">

          {/* Main card */}
          <div className={`rounded-3xl bg-gradient-to-br ${currentMode.color} p-6 text-white shadow-2xl`}>

            {/* WHO does WHAT to WHOM */}
            <div className="flex items-center gap-2 mb-4 bg-black/20 rounded-2xl px-3 py-2">
              {isMutual ? (
                <span className="font-black text-base">{actor.name} ↔ {receiver.name}</span>
              ) : isSelf ? (
                <span className="font-black text-base">{actor.name} (sám/sama)</span>
              ) : (
                <>
                  <span className="font-black text-base">{actor.name}</span>
                  <span className="text-white/60 text-sm">robí</span>
                  <span className="font-black text-base">{receiver.name}</span>
                </>
              )}
            </div>

            {/* Zone + technique */}
            <div className="mb-3">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">
                {GENDER_LABELS[receiver.gender]} · {roll.result.region}
              </p>
              <h2 className="text-4xl font-black mt-1">{roll.result.zone_label_sk}</h2>
              <p className="text-xl font-bold opacity-80 mt-0.5">{roll.result.technique_label_sk}</p>
            </div>

            {/* Prompt — natural sentence */}
            <div className="bg-black/25 rounded-2xl px-4 py-3">
              <p className="text-base leading-relaxed font-medium">{prompt}</p>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                ⏱ {formatSeconds(roll.duration_seconds)}
              </span>
              {roll.result.requires_tool && roll.result.tool_tags?.length > 0 && (
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🧰 {roll.result.tool_tags.join(', ')}
                </span>
              )}
              {roll.result.requires_lube && (
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">💧 Lubrikant</span>
              )}
              {roll.result.requires_warmup && (
                <span className="bg-amber-200/25 text-amber-100 text-xs font-bold px-3 py-1 rounded-full">🔆 Rozohriať najprv</span>
              )}
            </div>
          </div>

          {/* Caution */}
          {roll.result.caution_sk && (
            <div className="bg-amber-900/30 border border-amber-700/50 rounded-2xl px-4 py-3 flex gap-2">
              <span className="shrink-0">⚠️</span>
              <p className="text-amber-200 text-sm leading-relaxed">{roll.result.caution_sk}</p>
            </div>
          )}

          {roll.result.requires_aftercare && (
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-2xl px-4 py-3 flex gap-2">
              <span className="shrink-0">💙</span>
              <p className="text-blue-200 text-sm leading-relaxed">
                Po tejto aktivite patrí aftercare — objatie, rozhovor, voda.
              </p>
            </div>
          )}

          {/* Timer */}
          <AnimatePresence>
            {!timerDone && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center py-4 gap-2">
                <CountdownTimer seconds={roll.duration_seconds} onDone={() => setTimerDone(true)} />
                <p className="text-xs text-gray-500">Odpočítava čas aktivity</p>
              </motion.div>
            )}
            {timerDone && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-3">
                <p className="text-green-400 font-black text-xl">✅ Hotovo!</p>
                <p className="text-gray-400 text-sm mt-1">Ako sa cítili {actor.name} a {receiver.name}?</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button whileTap={{ scale: 0.96 }} onClick={doRoll}
              className={`py-4 rounded-2xl font-black text-base bg-gradient-to-r ${currentMode.color} flex items-center justify-center gap-2`}>
              <DiceIcon className="w-5 h-5" />
              Ďalšia
            </motion.button>
            <motion.button whileTap={{ scale: 0.96 }} onClick={goToSettings}
              className="py-4 rounded-2xl font-bold bg-white/10 hover:bg-white/15 transition-colors">
              ⚙️ Nastavenia
            </motion.button>
          </div>

          <button onClick={endGame}
            className="w-full py-3 text-sm text-gray-600 hover:text-gray-400 transition-colors">
            Ukončiť hru
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
}
