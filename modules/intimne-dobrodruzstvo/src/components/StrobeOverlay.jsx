import { useEffect, useState } from 'react';

export default function StrobeOverlay({ active, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); onDone?.(); }, 1200);
    return () => clearTimeout(t);
  }, [active]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ animation: 'strobeFlash 0.12s steps(1) 10' }}
    >
      <style>{`
        @keyframes strobeFlash {
          0%, 100% { background: rgba(255,220,230,0); }
          50%       { background: rgba(255,200,215,0.55); }
        }
      `}</style>
    </div>
  );
}