import { useState } from 'react';
import GameHero from '../components/GameHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import FloatingHearts from '../components/FloatingHearts';

const MOODS = ['Dominantné', 'Submisívne', 'Romantické', 'Divoké', 'Pomalé a zmyselné', 'Rýchle a intenzívne', 'Tajomné', 'Zakázané', 'Hravé', 'Tvrdé'];
const PLACES = ['Spálňa', 'Kúpeľňa', 'Kuchyňa', 'Auto', 'Hotel', 'Príroda', 'Kancelária', 'Výťah', 'Bar', 'Vlak', 'Bazén', 'Balkón'];
const THEMES = ['Cudzinci', 'Šéf a zamestnanec', 'Lekár a pacient', 'Detektív a podozrivý', 'Bohatý a chudobný', 'Zakázaná láska', 'Tajná aféra', 'Hra moci', 'Voyeur', 'Exhibicionizmus', 'BDSM', 'Slobodný výber'];

export default function FantasyGenerator() {
  const [started, setStarted] = useState(false);
  const [mood, setMood] = useState('');
  const [place, setPlace] = useState('');
  const [theme, setTheme] = useState('');
  const [intensity, setIntensity] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  if (!started) return (
    <GameHero
      emoji="✨"
      title="Fantasy Generátor"
      subtitle="AI vytvorí explicitný erotický scenár presne podľa vašich predstáv."
      features={['Nálada · Miesto · Téma · Intenzita', 'Explicitné scenáre bez cenzúry', 'Dominantné, submisívne, roleplay...', 'Neobmedzený počet generovaní']}
      onStart={() => setStarted(true)}
    />
  );

  const generate = async () => {
    if (!mood && !place && !theme) return;
    setLoading(true);
    setResult('');
    const intensityLabel = ['', 'Veľmi jemné', 'Jemné', 'Stredné', 'Odvážne', 'Extrémne'][intensity];
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Si erotický scenárista pre dospelých párov. Vytvor explicitný, vzrušujúci erotický scenár pre dvojicu v slovenčine.

Parametre scenára:
- Nálada/štýl: ${mood || 'slobodný výber'}
- Miesto: ${place || 'slobodný výber'}  
- Téma/roleplay: ${theme || 'slobodný výber'}
- Intenzita: ${intensityLabel}

Pravidlá:
- Scenár musí byť explicitný a detailný, nie romantika pre deti
- Píš v 2. osobe (ty/váš pár)
- Dlžka: 200-300 slov
- Intenzita ${intensity}/5: ${intensity >= 4 ? 'bez cenzúry, veľmi explicitne' : intensity === 3 ? 'odvážne ale nie vulgárne' : 'zmyselne'}
- Začni priamo scenárom, bez úvodu`,
    });
    setResult(typeof res === 'string' ? res : res?.text || JSON.stringify(res));
    setLoading(false);
  };

  const SelectRow = ({ label, options, value, onChange }) => (
    <div>
      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#7a5060' }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button key={o} onClick={() => onChange(value === o ? '' : o)}
            className="px-3 py-1.5 rounded-full text-sm cursor-pointer border-0 transition-all"
            style={{
              background: value === o ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.05)',
              color: value === o ? '#f0c0cc' : '#8a6070',
              border: `1px solid ${value === o ? 'rgba(200,70,100,0.4)' : 'rgba(255,255,255,0.07)'}`,
            }}>{o}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Fantasy Generátor</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 relative z-10 px-4 pb-12 space-y-5 overflow-y-auto">
        <SelectRow label="Nálada" options={MOODS} value={mood} onChange={setMood} />
        <SelectRow label="Miesto" options={PLACES} value={place} onChange={setPlace} />
        <SelectRow label="Téma / Roleplay" options={THEMES} value={theme} onChange={setTheme} />

        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#7a5060' }}>Intenzita: {['', 'Veľmi jemné', 'Jemné', 'Stredné', 'Odvážne', 'Extrémne'][intensity]}</p>
          <input type="range" min={1} max={5} value={intensity} onChange={e => setIntensity(+e.target.value)}
            className="w-full cursor-pointer" style={{ accentColor: '#c0405a' }} />
          <div className="flex justify-between text-xs mt-1" style={{ color: '#5a3040' }}>
            <span>Jemné</span><span>Extrémne</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={generate}
          disabled={loading || (!mood && !place && !theme)}
          className="w-full py-4 rounded-2xl text-white font-semibold cursor-pointer border-0 flex items-center justify-center gap-3 disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 25px rgba(192,64,90,0.35)' }}>
          {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Generujem...</> : <><Sparkles className="w-5 h-5" /> Vygenerovať scenár</>}
        </motion.button>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-3xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.2)', backdropFilter: 'blur(10px)' }}>
              <p className="text-xs uppercase tracking-wider mb-4" style={{ color: '#9a6070' }}>Váš scenár:</p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#e0c8cc' }}>{result}</p>
              <button onClick={generate}
                className="mt-5 w-full py-3 rounded-2xl text-sm font-medium cursor-pointer border-0 flex items-center justify-center gap-2"
                style={{ background: 'rgba(200,80,100,0.1)', color: '#e08090', border: '1px solid rgba(200,80,100,0.2)' }}>
                <RefreshCw className="w-4 h-4" /> Iný scenár
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}