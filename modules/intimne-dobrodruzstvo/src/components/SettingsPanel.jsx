import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Zap, ZapOff } from 'lucide-react';

export default function SettingsPanel({ open, onClose, settings, toggle }) {
  const rows = [
    { key: 'sound', labelOn: 'Zvukové signály', labelOff: 'Zvuk vypnutý', IconOn: Volume2, IconOff: VolumeX, desc: 'Pípnutie na začiatku a konci úlohy' },
    { key: 'strobe', labelOn: 'Stroboskop', labelOff: 'Stroboskop vypnutý', IconOn: Zap, IconOff: ZapOff, desc: 'Záblesk obrazovky pri signáli' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-sm p-6 rounded-t-3xl"
            style={{
              background: 'linear-gradient(160deg, #2a0e1a 0%, #180810 100%)',
              border: '1px solid rgba(200,80,100,0.2)',
              borderBottom: 'none',
              boxShadow: '0 -20px 60px rgba(180,50,80,0.2)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>
                Nastavenia
              </h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors border-0 bg-transparent cursor-pointer"
                style={{ color: '#9a7080' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {rows.map(({ key, labelOn, labelOff, IconOn, IconOff, desc }) => {
                const enabled = settings[key];
                const Icon = enabled ? IconOn : IconOff;
                return (
                  <motion.button
                    key={key}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggle(key)}
                    className="w-full p-4 rounded-2xl text-left flex items-center gap-4 cursor-pointer border-0 transition-all"
                    style={{
                      background: enabled ? 'rgba(200,70,100,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${enabled ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.07)'}`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: enabled ? 'rgba(200,70,100,0.2)' : 'rgba(255,255,255,0.06)' }}>
                      <Icon className="w-5 h-5" style={{ color: enabled ? '#e08090' : '#5a4050' }} />
                    </div>
                    <div>
                      <div className="font-medium text-sm" style={{ color: enabled ? '#f0dde3' : '#6a4050' }}>
                        {enabled ? labelOn : labelOff}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#7a5060' }}>{desc}</div>
                    </div>
                    <div className="ml-auto w-11 h-6 rounded-full relative flex-shrink-0"
                      style={{ background: enabled ? 'linear-gradient(135deg, #c0405a, #8b2040)' : 'rgba(255,255,255,0.08)' }}>
                      <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300"
                        style={{ left: enabled ? '22px' : '2px' }} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}