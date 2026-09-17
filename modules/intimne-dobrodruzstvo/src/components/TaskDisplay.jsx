import { motion } from 'framer-motion';
import { SkipForward, Clock, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

export default function TaskDisplay({
  task, level, currentIndex, totalTasks,
  onAccept, onSkip, onToggleFavorite, onPrev, onNext, onChangeLevel,
}) {
  if (!task) return null;

  const isFav = task.status === 'Obľúbené';
  const isDislike = task.status === 'Nevhodná';

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-lg mx-auto w-full"
    >
      <div
        className="rounded-3xl p-7 md:p-9 space-y-7 relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(80,20,35,0.85) 0%, rgba(40,10,20,0.95) 100%)',
          border: '1px solid rgba(200,80,110,0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(180,50,80,0.15), 0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Ambient inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(200,70,100,0.12), transparent 70%)' }} />

        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: 'rgba(200,70,100,0.15)', color: '#e8909e', border: '1px solid rgba(200,70,100,0.2)' }}
          >
            {task.action_type}
          </span>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggleFavorite(task.id)}
            className="text-2xl transition-all"
            style={{ color: isFav ? '#e05070' : isDislike ? '#4a3040' : '#6a4050', filter: isFav ? 'drop-shadow(0 0 8px rgba(220,60,90,0.6))' : 'none' }}
          >
            {isDislike ? '♡' : '♥'}
          </motion.button>
        </div>

        {/* Description */}
        <p className="text-xl md:text-2xl leading-relaxed relative z-10"
          style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>
          {task.description}
        </p>

        {/* Prep time */}
        {task.prep_time > 0 && level <= 4 && (
          <div className="flex items-center gap-2 text-sm relative z-10" style={{ color: '#9a6070' }}>
            <Clock className="w-3.5 h-3.5" />
            <span>Čas prípravy: {task.prep_time}s</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 relative z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAccept}
            className="w-full py-4 rounded-2xl text-white font-semibold text-base cursor-pointer border-0"
            style={{
              background: 'linear-gradient(135deg, #c0405a, #8b2040)',
              boxShadow: '0 0 30px rgba(192,64,90,0.4), 0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            ♥ &nbsp; Prijať úlohu
          </motion.button>

          <div className="flex gap-3">
            {level <= 4 && (
              <button onClick={onSkip}
                className="flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer border-0 transition-colors"
                style={{ background: 'rgba(200,80,100,0.1)', color: '#c08090', border: '1px solid rgba(200,80,100,0.15)' }}>
                <SkipForward className="w-4 h-4" /> Preskočiť
              </button>
            )}
            <button onClick={onChangeLevel}
              className="flex-1 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 cursor-pointer border-0 transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#9a7080', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ArrowLeft className="w-4 h-4" /> Úrovne
            </button>
          </div>
        </div>

        {/* Level 5/6 navigation */}
        {level >= 5 && totalTasks > 1 && (
          <div className="flex items-center justify-center gap-6 pt-1 relative z-10">
            <button onClick={onPrev} className="p-2 rounded-full cursor-pointer border-0 transition-colors hover:bg-white/10"
              style={{ color: '#9a7080' }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm tabular-nums" style={{ color: '#7a5060' }}>
              {currentIndex + 1} / {totalTasks}
            </span>
            <button onClick={onNext} className="p-2 rounded-full cursor-pointer border-0 transition-colors hover:bg-white/10"
              style={{ color: '#9a7080' }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
