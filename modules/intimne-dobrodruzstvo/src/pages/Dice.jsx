import { useState } from 'react';
import GameHero from '../components/GameHero';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const DICE_CONFIG = [
  {
    label: 'Miesto',
    emoji: '📍',
    color: '#e08090',
    sides: ['Pery', 'Krk', 'Ramená', 'Chrbát', 'Brucho', 'Stehná', 'Chodidlá', 'Ruky', 'Uši', 'Vlasy', 'Prsia', 'Bedra', 'Celé telo', 'Tvár', 'Dlaká', 'Zátylok'],
  },
  {
    label: 'Akcia',
    emoji: '💋',
    color: '#f0a060',
    sides: ['Pobozkaj', 'Masíruj', 'Pohlaď', 'Olizuj', 'Šteklí', 'Dýchaj na', 'Obkresli perom', 'Pomaž medom', 'Ľadom', 'Pierkom', 'Pevne stlač', 'Jemne zahryź', 'Sleduj', 'Ováľaj ľadom', 'Teplo sviečky', 'Šelest pier'],
  },
  {
    label: 'Trvanie',
    emoji: '⏱️',
    color: '#80c0a0',
    sides: ['30 sekúnd', '1 minúta', '2 minúty', '3 minúty', '5 minút', 'Kým nepovieš stop', '10 sekúnd rýchlo', 'Pomaly 2 min', 'Kým nebudeš spokojný/á', '7 minút', 'Do prvého vzdichu', '15 sekúnd intenzívne'],
  },
  {
    label: 'Intenzita',
    emoji: '🔥',
    color: '#c080e0',
    sides: ['Ultra jemne', 'Pomaly a zmyselne', 'Normálne', 'Vášnivo', 'Intenzívne', 'Čo najrýchlejšie', 'Striedavo', 'Stupňujúco', 'Prerušovane', 'Bez zastavenia', 'Zo všetkej sily (opatrne)', 'Hypnoticky pomaly'],
  },
];

export default function Dice() {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState(DICE_CONFIG.map(() => null));
  const [rolling, setRolling] = useState(false);
  const [locked, setLocked] = useState(DICE_CONFIG.map(() => false));

  if (!started) return (
    <GameHero
      emoji="🎲"
      title="Erotické kocky"
      subtitle="4 kocky, nekonečné kombinácie. Hoď a splň čo padne."
      features={['Miesto · Akcia · Trvanie · Intenzita', 'Zamykanie obľúbených kociek', 'Tisíce kombinácií']}
      onStart={() => setStarted(true)}
    />
  );

  const rollAll = () => {
    if (rolling) return;
    setRolling(true);
    setTimeout(() => {
      setResults(DICE_CONFIG.map((d, i) => locked[i] ? results[i] : d.sides[Math.floor(Math.random() * d.sides.length)]));
      setRolling(false);
    }, 600);
  };

  const rollOne = (i) => {
    if (locked[i]) return;
    const d = DICE_CONFIG[i];
    const next = [...results];
    next[i] = d.sides[Math.floor(Math.random() * d.sides.length)];
    setResults(next);
  };

  const toggleLock = (i) => {
    const next = [...locked];
    next[i] = !next[i];
    setLocked(next);
  };

  const allRolled = results.every(r => r !== null);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Erotické kocky</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 relative z-10 gap-6">
        <p className="text-sm text-center" style={{ color: '#7a5060' }}>Klepni na kocku pre samostatné hodenie • Zamkni čo nechceš meniť</p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {DICE_CONFIG.map((d, i) => (
            <motion.div
              key={i}
              animate={rolling && !locked[i] ? { rotateY: [0, 180, 360], scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.6 }}
              onClick={() => rollOne(i)}
              className="rounded-2xl p-4 cursor-pointer select-none relative"
              style={{
                background: results[i] ? `rgba(${d.color === '#e08090' ? '224,128,144' : d.color === '#f0a060' ? '240,160,96' : d.color === '#80c0a0' ? '128,192,160' : '192,128,224'},0.1)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${locked[i] ? d.color + '60' : 'rgba(255,255,255,0.08)'}`,
                backdropFilter: 'blur(10px)',
                minHeight: '120px',
              }}
            >
              <button
                onClick={e => { e.stopPropagation(); toggleLock(i); }}
                className="absolute top-2 right-2 text-xs border-0 bg-transparent cursor-pointer"
                style={{ color: locked[i] ? d.color : '#5a3040' }}
              >
                {locked[i] ? '🔒' : '🔓'}
              </button>
              <div className="text-2xl mb-1">{d.emoji}</div>
              <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: d.color }}>{d.label}</div>
              <div className="text-sm font-medium" style={{ color: results[i] ? '#f0dde3' : '#5a3040' }}>
                {results[i] || '?'}
              </div>
            </motion.div>
          ))}
        </div>

        {allRolled && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-sm w-full p-4 rounded-2xl text-center"
            style={{ background: 'rgba(200,80,100,0.08)', border: '1px solid rgba(200,80,100,0.2)' }}>
            <p className="text-sm" style={{ color: '#c08090' }}>
              <span style={{ color: '#f0dde3' }}>{results[1]}</span> na <span style={{ color: '#f0dde3' }}>{results[0]}</span> — <span style={{ color: '#f0dde3' }}>{results[2]}</span> — <span style={{ color: '#f0dde3' }}>{results[3]}</span>
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
          onClick={rollAll}
          className="px-10 py-4 rounded-full text-white font-semibold text-base cursor-pointer border-0 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 30px rgba(192,64,90,0.4)' }}>
          <RefreshCw className="w-5 h-5" />
          Hodiť kocky
        </motion.button>
      </main>
    </div>
  );
}