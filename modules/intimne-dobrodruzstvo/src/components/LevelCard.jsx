import { motion } from 'framer-motion';

const LEVEL_CONFIG = {
  1: { label: 'Jemné', desc: 'Romantické a nežné úlohy', emoji: '🌸', glow: 'rgba(220,150,170,0.15)' },
  2: { label: 'Odvážne', desc: 'Mierne odvážnejšie úlohy', emoji: '🔥', glow: 'rgba(220,100,80,0.15)' },
  3: { label: 'Zmyselné', desc: 'Vášnivé a zmyselné úlohy', emoji: '💋', glow: 'rgba(200,60,100,0.18)' },
  4: { label: 'Intímne', desc: 'Vzrušujúce a intímne úlohy', emoji: '🌙', glow: 'rgba(140,60,160,0.15)' },
  5: { label: 'Finále', desc: 'Vyvrcholenie dobrodružstva', emoji: '⭐', glow: 'rgba(220,160,60,0.15)' },
  6: { label: 'Odmena', desc: 'Zaslúžený oddych a odmena', emoji: '🎁', glow: 'rgba(200,80,120,0.18)' },
};

export default function LevelCard({ level, onClick, delay = 0 }) {
  const c = LEVEL_CONFIG[level];
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(level)}
      className="w-full p-5 rounded-2xl text-left group relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(200,100,130,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at left center, ${c.glow}, transparent 70%)` }} />

      <div className="flex items-center gap-4 relative z-10">
        <span className="text-3xl">{c.emoji}</span>
        <div>
          <div className="font-semibold group-hover:text-primary transition-colors duration-300"
            style={{ color: '#e8d0d8' }}>
            Úroveň {level}: {c.label}
          </div>
          <div className="text-sm mt-0.5" style={{ color: '#9a6070' }}>{c.desc}</div>
        </div>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: '#c0405a' }}>→</div>
      </div>
    </motion.button>
  );
}