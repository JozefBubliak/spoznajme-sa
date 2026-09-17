import { useState } from 'react';
import GameHero from '../components/GameHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const LEVELS = ['Jemné', 'Pikantné', 'Horúce', 'Extrémne'];

const DATA = {
  pravda: {
    'Jemné': [
      'Čo ťa na mne fyzicky priťahuje najviac?',
      'Kde si ešte nikdy nechcel/a aby som ťa dotýkal/a, ale teraz áno?',
      'Aká je tvoja najobľúbenejšia časť nášho intímneho života?',
      'Čo robím, čo ťa potešuje viac ako si myslíš?',
      'Aké miesto na tvojom tele je najcitlivejšie?',
      'Čo by si chcel/a robiť viac v spálni?',
      'Aká je tvoja obľúbená denná doba na intimitu?',
    ],
    'Pikantné': [
      'Aká je tvoja najväčšia sexuálna fantázia?',
      'Kde okrem spálne by si chcel/a byť so mnou intimný/á?',
      'Aká poloha ťa dostáva najviac a prečo?',
      'Čo by si chcel/a aby som ti urobil/a a ešte si mi to nepovedal/a?',
      'Aké slovné vyjadrovanie počas sexu ťa vzrušuje?',
      'Čo som urobil/a, čo ťa nečakane veľmi vzrušilo?',
      'Akú fantáziu máš a bojíš sa mi povedať?',
    ],
    'Horúce': [
      'Povedz mi svoju najdivokejšiu sexuálnu spomienku na nás.',
      'Čo by si chcel/a vyskúšať čo sme ešte nikdy nerobili?',
      'Aká je tvoja tajná dominantná alebo submisívna stránka?',
      'Čo ťa vzrušuje na predohre najviac?',
      'Opíš detailne čo by si chcel/a dnes večer.',
      'Aký je tvoj najodvážnejší sexuálny sen?',
    ],
    'Extrémne': [
      'Povedz bez cenzúry svoju najtajnejšiu sexuálnu fantáziu.',
      'Čo by si nikdy nerobil/a, ale si tajne zvedavý/á?',
      'Aká je hranica, ku ktorej by si chcel/a sa priblížiť?',
      'Povedz mi najdivokejšiu vec čo by si chcel/a aby som ti urobil/a.',
      'Čo ťa vzrušuje na zakázaných veciach?',
      'Aký je tvoj absolútny sexuálny sen bez obmedzení?',
    ],
  },
  odvaha: {
    'Jemné': [
      'Pobozkaj ma tak ako keď sme sa prvýkrát bozkávali.',
      'Šepni mi do ucha čo chceš dnes večer.',
      'Masíruj mi krk a plecia 3 minúty.',
      'Prezri si ma od hlavy po päty a povedz čo vidíš.',
      'Tancuj pre mňa 1 minútu.',
      'Nakresli prstom slovo na môj chrbát — nech hádám.',
    ],
    'Pikantné': [
      'Ukáž mi svoju najzmyslovejšiu stranu — 2 minúty improvizácie.',
      'Rozopni mi kúsok oblečenia čo najpomalšie.',
      'Opíš čo by si mi chcel/a urobiť — čo najdetailnejšie.',
      'Masáž stehien — 3 minúty.',
      'Prines jeden predmet z domu a ukáž ako by sa dal použiť.',
      'Fotka pre mňa — ty si rozhodneš aká.',
    ],
    'Horúce': [
      'Striptíz — aspoň 3 vrstvy oblečenia, pomaly.',
      'Zaviažem ti oči — rob čo cítiš 5 minút.',
      'Vyber polohu a ukáž mi ju bez slov.',
      'Zviaž mi ruky — rob čo chceš 5 minút.',
      'Roleplay — ty si scenárista, 10 minút.',
      'Masáž celého tela — ruky aj ústa.',
    ],
    'Extrémne': [
      'Blindfold + 15 minút tvojej fantázie — bez obmedzení.',
      'Hra moci — rozkazuješ 20 minút, ja plním.',
      'Vyberi aktivitu čo sme ešte nikdy nerobili — teraz.',
      'Maratón — 4 polohy za 15 minút.',
      'Predveď svoju najdivokejšiu fantáziu — bez slov.',
      'Noc tvojich pravidiel — ty určuješ všetko.',
    ],
  },
};

export default function TruthDare() {
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState('Pikantné');
  const [mode, setMode] = useState(null);
  const [question, setQuestion] = useState(null);

  if (!started) return (
    <GameHero
      emoji="🎯"
      title="Pravda alebo Odvaha"
      subtitle="Klasická hra pre dospelých párov. Odpovedaj úprimne alebo splň výzvu."
      features={['Pravda — tajné otázky', 'Odvaha — odvážne úlohy', '4 úrovne intenzity']}
      onStart={() => setStarted(true)}
    />
  );

  const pick = (m) => {
    setMode(m);
    const qs = DATA[m][level];
    setQuestion(qs[Math.floor(Math.random() * qs.length)]);
  };

  const reroll = () => {
    const qs = DATA[mode][level];
    setQuestion(qs[Math.floor(Math.random() * qs.length)]);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Pravda alebo Odvaha</h1>
        <div className="w-9" />
      </header>

      <div className="relative z-10 px-4 pb-4 flex gap-2 overflow-x-auto">
        {LEVELS.map(l => (
          <button key={l} onClick={() => { setLevel(l); setMode(null); setQuestion(null); }}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border-0 transition-all"
            style={{
              background: level === l ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.05)',
              color: level === l ? '#f0c0cc' : '#8a6070',
              border: `1px solid ${level === l ? 'rgba(200,70,100,0.4)' : 'rgba(255,255,255,0.07)'}`,
            }}>{l}</button>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 relative z-10 gap-6">
        <AnimatePresence mode="wait">
          {!question ? (
            <motion.div key="pick" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="w-full max-w-sm space-y-4">
              <p className="text-center text-sm mb-6" style={{ color: '#7a5060' }}>Vyber si...</p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => pick('pravda')}
                className="w-full py-8 rounded-3xl text-2xl font-bold cursor-pointer border-0"
                style={{ background: 'rgba(100,150,255,0.12)', color: '#a0b8f0', border: '1px solid rgba(100,150,255,0.2)', fontFamily: "'Playfair Display', serif" }}>
                🔵 Pravda
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => pick('odvaha')}
                className="w-full py-8 rounded-3xl text-2xl font-bold cursor-pointer border-0"
                style={{ background: 'rgba(200,70,100,0.12)', color: '#f0a0b0', border: '1px solid rgba(200,70,100,0.2)', fontFamily: "'Playfair Display', serif" }}>
                🔴 Odvaha
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="max-w-sm w-full p-6 rounded-3xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.2)', backdropFilter: 'blur(10px)' }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: mode === 'pravda' ? '#a0b8f0' : '#f0a0b0' }}>
                {mode === 'pravda' ? '🔵 Pravda' : '🔴 Odvaha'} — {level}
              </p>
              <p className="text-xl leading-relaxed font-medium mb-6" style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>{question}</p>
              <div className="flex gap-3">
                <button onClick={reroll}
                  className="flex-1 py-3 rounded-2xl text-sm font-medium cursor-pointer border-0 flex items-center justify-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#9a7080', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <RefreshCw className="w-4 h-4" /> Iná
                </button>
                <button onClick={() => { setMode(null); setQuestion(null); }}
                  className="flex-1 py-3 rounded-2xl text-sm font-medium cursor-pointer border-0"
                  style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', color: 'white' }}>
                  Nové kolo ♥
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}