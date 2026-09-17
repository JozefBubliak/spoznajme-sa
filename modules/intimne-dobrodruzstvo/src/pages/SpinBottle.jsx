import { useState } from 'react';
import GameHero from '../components/GameHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const LEVELS = ['Jemné', 'Pikantné', 'Horúce', 'Extrémne'];

const QUESTIONS = {
  'Jemné': [
    'Pobozkaj partnera na mieste, ktoré si ešte nikdy nebozkával/a.',
    'Šepni partnerovi do ucha čo sa ti na ňom/nej dnes páči.',
    'Masíruj partnerovi ruky 2 minúty.',
    'Pozri sa partnerovi do očí bez smiechu 1 minútu.',
    'Povedz 3 veci, ktoré ťa na partnerovi fyzicky priťahujú.',
    'Tancuj pre partnera 1 minútu.',
    'Nakresli prstom niečo na chrbtici partnera — nech hádá čo.',
    'Objím partnera a nepúšťaj 60 sekúnd.',
    'Povedz partnerovi svoju obľúbenú spomienku na vás dvoch.',
    'Pohlaď tvárou partnerove dlane.',
  ],
  'Pikantné': [
    'Pobozkaj partnera 30 sekúnd bez použitia rúk.',
    'Opíš slovami čo by si chcel/a aby ti partner urobil teraz.',
    'Ukáž partnerovi svojou najzmyslovejšiu stranu — 1 minúta improvizácie.',
    'Pohlaď partnera po stehnách — on/ona sa nesmie pohnúť.',
    'Rozopni partnerovi kúsok oblečenia — pomaly, zúbkami.',
    'Šepni do ucha svoju momentálnu fantáziu.',
    'Masíruj partnerovi krk a plecia — 3 minúty.',
    'Ukáž aký bozk by si chcel/a dostať.',
    'Prezliekni sa pred partnerom čo najpomalšie.',
    'Vyzvi partnera — kto vydrží dlhšie bez dotyku.',
  ],
  'Horúce': [
    'Striptíz — aspoň dve vrstvy oblečenia.',
    'Vyberte si polohu a vyskúšajte ju 5 minút.',
    'Zaviažte si oči — partner robí čo chce 3 minúty.',
    'Masáž celého chrbta — s ústami aj rukami.',
    'Ukáž partnerovi čo ťa potešuje — bez slov.',
    'Zviaž partnerovi ruky a ver jeho/jej fantázii.',
    'Vyberte miesto v byte kde ste ešte neboli intimní.',
    'Roleplay — 5 minút, vyberte postavy.',
    'Fotosession — partner robí čo chceš ty.',
    'Povedzte si nahlas svoju najdivokejšiu spomienku na seba.',
  ],
  'Extrémne': [
    'Blindfold + 10 minút partnerovej fantázie bez obmedzení.',
    'Hra moci — jeden rozkazuje, druhý poslúcha 15 minút.',
    'Vyberte si aktivitu, ktorú ste ešte nikdy neskúsili a urobte ju teraz.',
    'Maratón polôh — 5 polôh za 20 minút.',
    'Napíšte si tajné priania a vymieňajte si ich — plniť tu a teraz.',
    'Zavolajte si zo susednej miestnosti — telefonický roleplay.',
    'Hra s ľadom a teplom — striedanie, zaviazané oči.',
    'Partner si vyberie 3 aktivity — musíš splniť všetky.',
    'Natočte video len pre seba — sledujte hneď.',
    'Noc bez tabu — všetko dohodnuté vopred je povolené.',
  ],
};

export default function SpinBottle() {
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState('Pikantné');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);

  if (!started) return (
    <GameHero
      emoji="🍾"
      title="Otočte fľašu"
      subtitle="Romantické aj extrémne výzvy pre páry — nechajte fľašu rozhodnúť."
      features={['4 úrovne intenzity', 'Jemné → Pikantné → Horúce → Extrémne', 'Animovaná fľaša']}
      onStart={() => setStarted(true)}
    />
  );

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const spins = 1440 + Math.random() * 1080;
    setRotation(r => r + spins);
    setTimeout(() => {
      const qs = QUESTIONS[level];
      setResult(qs[Math.floor(Math.random() * qs.length)]);
      setSpinning(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Fľaša</h1>
        <div className="w-9" />
      </header>

      <div className="relative z-10 px-4 pb-4 flex gap-2 overflow-x-auto">
        {LEVELS.map(l => (
          <button key={l} onClick={() => setLevel(l)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border-0 transition-all"
            style={{
              background: level === l ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.05)',
              color: level === l ? '#f0c0cc' : '#8a6070',
              border: `1px solid ${level === l ? 'rgba(200,70,100,0.4)' : 'rgba(255,255,255,0.07)'}`,
            }}>{l}</button>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 relative z-10 gap-8">
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 2.2, ease: [0.15, 0.85, 0.35, 1.0] }}
          className="text-9xl cursor-pointer select-none"
          onClick={spin}
          style={{ filter: 'drop-shadow(0 0 20px rgba(200,80,100,0.5))' }}
        >
          🍾
        </motion.div>

        {!spinning && !result && (
          <p className="text-sm" style={{ color: '#7a5060' }}>Klepni na fľašu pre točenie</p>
        )}
        {spinning && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#c08090' }}>Točí sa...</motion.p>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="max-w-sm w-full p-6 rounded-3xl relative"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.2)', backdropFilter: 'blur(10px)' }}
            >
              <button onClick={() => setResult(null)} className="absolute top-3 right-3 border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9a6070' }}>Vaša výzva:</p>
              <p className="text-lg leading-relaxed font-medium" style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>{result}</p>
              <button onClick={spin} className="mt-5 w-full py-3 rounded-2xl text-sm font-medium cursor-pointer border-0"
                style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', color: 'white' }}>
                Ďalšie točenie ♥
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}