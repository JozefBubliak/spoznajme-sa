import { useState } from 'react';
import GameHero from '../components/GameHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shuffle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const CATEGORIES = ['Všetky', 'Romantická', 'Zmyselná', 'Odvážna', 'Extrémna'];

const CHALLENGES = [
  { cat: 'Romantická', text: 'Kúpeľ pri sviečkach — priprav pre partnera prekvapenie.', duration: '60 min' },
  { cat: 'Romantická', text: 'Masáž celého tela s aromatickým olejom. Žiadny iný cieľ.', duration: '45 min' },
  { cat: 'Romantická', text: 'Napíšte si navzájom erotický list a prečítajte nahlas.', duration: '30 min' },
  { cat: 'Romantická', text: 'Večera na podlahe — sviečky, vino, žiadne telefóny.', duration: '90 min' },
  { cat: 'Romantická', text: 'Tancujte doma na vašu obľúbenú pieseň — bez oblečenia.', duration: '20 min' },
  { cat: 'Zmyselná', text: 'Predohra iba rukami — 20 minút, bez ďalšieho pokračovania.', duration: '20 min' },
  { cat: 'Zmyselná', text: 'Hra s ľadom — sledujte reakcie partnera.', duration: '15 min' },
  { cat: 'Zmyselná', text: 'Zaviazané oči — partner ťa kŕmi niečím sladkým a bozkáva.', duration: '20 min' },
  { cat: 'Zmyselná', text: 'Masáž nohami — zvláštne ale neuveriteľne zmyselné.', duration: '15 min' },
  { cat: 'Zmyselná', text: 'Striedajte sa — 2 min partner A, 2 min partner B. 6 kôl.', duration: '24 min' },
  { cat: 'Zmyselná', text: 'Hra „horúco—studeno" — jeden hľadá, druhý naviguje dotykom.', duration: '20 min' },
  { cat: 'Odvážna', text: 'Spontánny sex na mieste kde ste ešte neboli — v byte.', duration: '—' },
  { cat: 'Odvážna', text: 'Roleplay: Cudzinci v bare — stretnete sa „prvýkrát".', duration: '30 min' },
  { cat: 'Odvážna', text: 'Hra moci — jeden rozkazuje celý večer, druhý plní.', duration: '2 hod' },
  { cat: 'Odvážna', text: 'Striptíz show — full production, hudba, kostým.', duration: '15 min' },
  { cat: 'Odvážna', text: '5 polôh za 30 minút — nestihnuté = trest (dohodnutý).', duration: '30 min' },
  { cat: 'Odvážna', text: 'Natočte video — len pre seba. Sledujte hneď.', duration: '—' },
  { cat: 'Extrémna', text: 'Noc bez tabu — všetko čo ste obaja označili ✅ sa dnes splní.', duration: 'Celú noc' },
  { cat: 'Extrémna', text: 'Maratón: cieľ je 10 orgazmov celkovo (ľubovoľné rozdelenie).', duration: 'Neobmedzene' },
  { cat: 'Extrémna', text: 'Jeden partner nesmie nič robiť — iba prijímať — 1 hodinu.', duration: '1 hod' },
  { cat: 'Extrémna', text: 'Edging challenge — 3x zastaviť tesne pred vrcholom, 4. je povolený.', duration: '—' },
  { cat: 'Extrémna', text: 'Pútanie — dohodnuté vopred, 30 minút partnerovej fantázie.', duration: '30 min' },
  { cat: 'Extrémna', text: 'Vonku (súkromné miesto) — kto nájde ide prvý.', duration: '—' },
  { cat: 'Extrémna', text: 'Senzorickú depriváciu (zaviazané oči + štuple) — partner riadi všetko.', duration: '20 min' },
];

export default function Challenge() {
  const [started, setStarted] = useState(false);
  const [category, setCategory] = useState('Všetky');
  const [selected, setSelected] = useState(null);

  if (!started) return (
    <GameHero
      emoji="⚡"
      title="Výzvy pre dvoch"
      subtitle="24 výziev od romantických momentov po extrémne dobrodružstvá."
      features={['Romantická · Zmyselná · Odvážna · Extrémna', 'Náhodný výber', 'S odhadovaným časom']}
      onStart={() => setStarted(true)}
    />
  );

  const filtered = category === 'Všetky' ? CHALLENGES : CHALLENGES.filter(c => c.cat === category);

  const random = () => {
    setSelected(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  const CAT_COLORS = { 'Romantická': '#f0a0b0', 'Zmyselná': '#a0c0f0', 'Odvážna': '#f0c080', 'Extrémna': '#e080a0' };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Výzvy</h1>
        <button onClick={random} className="p-2 rounded-full hover:bg-white/5 transition-colors border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
          <Shuffle className="w-5 h-5" />
        </button>
      </header>

      <div className="relative z-10 px-4 pb-4 flex gap-2 overflow-x-auto">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border-0 transition-all"
            style={{
              background: category === c ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.05)',
              color: category === c ? '#f0c0cc' : '#8a6070',
              border: `1px solid ${category === c ? 'rgba(200,70,100,0.4)' : 'rgba(255,255,255,0.07)'}`,
            }}>{c}</button>
        ))}
      </div>

      <main className="flex-1 relative z-10 px-4 pb-12">
        <div className="space-y-3">
          {filtered.map((ch, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
              onClick={() => setSelected(ch)}
              className="rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.01]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.1)', backdropFilter: 'blur(8px)' }}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm leading-relaxed flex-1" style={{ color: '#d0a8b0' }}>{ch.text}</p>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,80,100,0.1)', color: CAT_COLORS[ch.cat] }}>{ch.cat}</span>
                  <span className="text-xs" style={{ color: '#5a3040' }}>⏱ {ch.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 60 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-3xl p-6"
              style={{ background: 'linear-gradient(160deg, #2a0e1a 0%, #180810 100%)', border: '1px solid rgba(200,80,100,0.2)', borderBottom: 'none' }}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(200,80,100,0.12)', color: CAT_COLORS[selected.cat] }}>{selected.cat}</span>
                <button onClick={() => setSelected(null)} className="border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xl leading-relaxed font-medium mb-4" style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>{selected.text}</p>
              <p className="text-sm mb-6" style={{ color: '#7a5060' }}>⏱ Odhadovaný čas: {selected.duration}</p>
              <div className="flex gap-3">
                <button onClick={random}
                  className="flex-1 py-3 rounded-2xl text-sm font-medium cursor-pointer border-0"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#9a7080', border: '1px solid rgba(255,255,255,0.08)' }}>
                  Iná výzva
                </button>
                <button onClick={() => setSelected(null)}
                  className="flex-1 py-3 rounded-2xl text-white font-semibold cursor-pointer border-0"
                  style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)' }}>
                  Prijatá! ♥
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}