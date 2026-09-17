import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer({ seconds, label, onComplete }) {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    setRemaining(seconds);
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [seconds]);

  const progress = seconds > 0 ? remaining / seconds : 1;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const r = 45;
  const circumference = 2 * Math.PI * r;
  const isUrgent = remaining <= 10 && seconds > 10;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'backOut' }}
      className="flex flex-col items-center gap-8"
    >
      <p className="text-lg font-medium" style={{ color: '#c08090' }}>{label}</p>

      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: `0 0 60px rgba(192,64,90,${isUrgent ? 0.5 : 0.2})`, transition: 'box-shadow 1s' }} />

        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="2.5"
            stroke="rgba(200,80,110,0.1)" />
          {/* Progress */}
          <circle cx="50" cy="50" r={r} fill="none" strokeWidth="2.5"
            stroke={isUrgent ? '#e84060' : '#c0405a'}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s', filter: 'drop-shadow(0 0 6px rgba(192,64,90,0.7))' }}
          />
        </svg>

        <motion.span
          key={remaining}
          initial={{ scale: 1.2, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-6xl font-bold tabular-nums relative z-10"
          style={{
            color: isUrgent ? '#e84060' : '#f0dde3',
            textShadow: isUrgent ? '0 0 20px rgba(232,64,96,0.7)' : '0 0 20px rgba(200,100,130,0.3)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : remaining}
        </motion.span>
      </div>
    </motion.div>
  );
}