import { useState, useEffect, useRef } from 'react';
import GameHero from '../components/GameHero';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, RotateCcw, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const CHALLENGES = [
  { id: 'positions', label: 'Počet polôh', emoji: '🔄', unit: 'polôh', goals: [5, 8, 10, 15, 20] },
  { id: 'acts', label: 'Počet aktov', emoji: '🔥', unit: 'aktov', goals: [2, 3, 5, 7, 10] },
  { id: 'orgasms_both', label: 'Orgázmy spolu', emoji: '⚡', unit: 'celkovo', goals: [3, 5, 8, 10, 15] },
  { id: 'orgasms_her', label: 'Orgázmy pre ňu', emoji: '💗', unit: 'orgázmov', goals: [3, 5, 7, 10] },
  { id: 'orgasms_him', label: 'Orgázmy pre neho', emoji: '💙', unit: 'orgázmov', goals: [2, 3, 5, 7] },
  { id: 'edging', label: 'Edging kola', emoji: '🌊', unit: 'kôl', goals: [3, 5, 7, 10] },
  { id: 'techniques', label: 'Techniky predohry', emoji: '✨', unit: 'techník', goals: [5, 8, 10, 15] },
  { id: 'locations', label: 'Miesta v dome', emoji: '📍', unit: 'miest', goals: [2, 3, 5, 7] },
  { id: 'duration', label: 'Maratón výdrže', emoji: '⏱️', unit: 'hodín', goals: [1, 2, 3, 5], isTime: true },
  { id: 'no_stop', label: 'Non-stop aktov', emoji: '♾️', unit: 'bez prestávky', goals: [2, 3, 4, 5] },
];

export default function Marathon() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [goal, setGoal] = useState(0);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  if (!started) return (
    <GameHero
      emoji="🏆"
      title="Maratón"
      subtitle="Sleduj výkony, nastav ciele a bí osobné rekordy."
      features={['Počet polôh & aktov', 'Orgázmy & edging kola', 'Časovač výdrže', 'Techniky predohry & miesta']}
      onStart={() => setStarted(true)}
    />
  );

  const reset = () => { setCount(0); setSeconds(0); setRunning(false); };

  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progress = goal > 0 ? Math.min(count / goal, 1) : 0;
  const circumference = 2 * Math.PI * 54;

  if (!selected) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
        <FloatingHearts />
        <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
          <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Maratón</h1>
          <div className="w-9" />
        </header>
        <main className="flex-1 relative z-10 px-4 pb-12">
          <p className="text-sm text-center mb-6" style={{ color: '#7a5060' }}>Vyber výzvu a nastav cieľ</p>
          <div className="grid grid-cols-2 gap-3">
            {CHALLENGES.map((ch, i) => (
              <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => { setSelected(ch); setGoal(ch.goals[1]); setCount(0); setSeconds(0); setRunning(false); }}
                className="rounded-2xl p-4 cursor-pointer hover:scale-[1.02] transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.12)' }}>
                <div className="text-2xl mb-2">{ch.emoji}</div>
                <p className="text-sm font-medium" style={{ color: '#f0dde3' }}>{ch.label}</p>
                <p className="text-xs mt-1" style={{ color: '#7a5060' }}>Cieľ až {ch.goals[ch.goals.length - 1]} {ch.unit}</p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-white/5 transition-colors border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>{selected.emoji} {selected.label}</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 relative z-10 gap-8">
        {/* Progress Ring */}
        <div className="relative">
          <svg width="140" height="140" className="-rotate-90">
            <circle cx="70" cy="70" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <circle cx="70" cy="70" r="54" fill="none" stroke="#c0405a" strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease', filter: 'drop-shadow(0 0 6px rgba(192,64,90,0.6))' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold" style={{ color: '#f0dde3' }}>{count}</span>
            <span className="text-xs" style={{ color: '#7a5060' }}>/ {goal} {selected.unit}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="text-2xl font-mono" style={{ color: running ? '#e08090' : '#5a3040' }}>{formatTime(seconds)}</div>

        {/* Goal selector */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-2 text-center" style={{ color: '#7a5060' }}>Cieľ</p>
          <div className="flex gap-2">
            {selected.goals.map(g => (
              <button key={g} onClick={() => setGoal(g)}
                className="px-3 py-1.5 rounded-full text-sm cursor-pointer border-0 transition-all"
                style={{
                  background: goal === g ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.05)',
                  color: goal === g ? '#f0c0cc' : '#8a6070',
                  border: `1px solid ${goal === g ? 'rgba(200,70,100,0.4)' : 'rgba(255,255,255,0.07)'}`,
                }}>{g}</button>
            ))}
          </div>
        </div>

        {/* Counter controls */}
        <div className="flex items-center gap-6">
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setCount(c => Math.max(0, c - 1))}
            className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-0"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#9a7080', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Minus className="w-6 h-6" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setCount(c => c + 1)}
            className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer border-0"
            style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 25px rgba(192,64,90,0.5)', color: 'white' }}>
            <Plus className="w-8 h-8" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }}
            onClick={() => setRunning(r => !r)}
            className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-0"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#9a7080', border: '1px solid rgba(255,255,255,0.1)' }}>
            {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </motion.button>
        </div>

        {count >= goal && goal > 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 rounded-2xl"
            style={{ background: 'rgba(80,200,100,0.1)', border: '1px solid rgba(80,200,100,0.2)' }}>
            <div className="text-3xl mb-2">🏆</div>
            <p className="font-semibold" style={{ color: '#80e080' }}>Cieľ dosiahnutý!</p>
            <p className="text-sm" style={{ color: '#5a9060' }}>Čas: {formatTime(seconds)}</p>
          </motion.div>
        )}

        <button onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer border-0"
          style={{ background: 'rgba(255,255,255,0.04)', color: '#5a3040', border: '1px solid rgba(255,255,255,0.06)' }}>
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </main>
    </div>
  );
}