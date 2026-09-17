import { useState } from 'react';
import GameHero from '../components/GameHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shuffle, Plus, Sparkles, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import { base44 } from '@/api/base44Client';

// ─── STROM VÝZIEV ───────────────────────────────────────────────────────────
const TREE = [
  {
    category: '💋 Romantika & Bozky',
    level: 1,
    color: '#c06070',
    items: [
      'Nikdy som... nepobozkala/-al niekoho na verejnosti.',
      'Nikdy som... nebozkával/-a sa dlhšie ako 5 minút v kuse.',
      'Nikdy som... nedostal/-a kvetiny po intimnom večere.',
      'Nikdy som... nestanoval/-a s partnerom pod hviezdami.',
      'Nikdy som... nepísal/-a erotický odkaz SMS-kou.',
      'Nikdy som... nenechala/-l sa kŕmiť partnerom pri sviečkach.',
    ],
  },
  {
    category: '🔥 Základné experimenty',
    level: 2,
    color: '#c07050',
    items: [
      'Nikdy som... nezažila/-l sex na verejnom mieste.',
      'Nikdy som... nenosil/-a spodnú bielizeň celý deň a neskrýval/-a to.',
      'Nikdy som... nezahrala/-l si striptíz pre partnera.',
      'Nikdy som... nepoužila/-l vibrátor/toy s partnerom.',
      'Nikdy som... nesledoval/-a erotický film vo dvojici.',
      'Nikdy som... nezažila/-l sex na balkóne alebo terase.',
      'Nikdy som... nerobila/-l masáž s olejom od hlavy až po päty.',
      'Nikdy som... nezviazala/-l partnerovi ruky improvizovanou šatkou.',
    ],
  },
  {
    category: '🌶️ Odvážnejšie',
    level: 3,
    color: '#b05040',
    items: [
      'Nikdy som... nefotografoval/-a partnerku/-a pri intimnom momente (so súhlasom).',
      'Nikdy som... nezažila/-l sex v aute na odľahlom mieste.',
      'Nikdy som... nepoužil/-a bondage / viazanie so súhlasom.',
      'Nikdy som... nehrala/-l dominantno-submisívnu hru.',
      'Nikdy som... nezažila/-l orgazmus iba od dotyku bez penetrácie.',
      'Nikdy som... nezažila/-l role-play (sused, lekár, cudzinec...).',
      'Nikdy som... nedostala/-l erotickú masáž od cudzieho maséra/-ky.',
      'Nikdy som... nespala/-l celú noc bez intimného kontaktu cielene.',
    ],
  },
  {
    category: '🏳️‍🌈 Rovnaké pohlavie',
    level: 3,
    color: '#8060a0',
    items: [
      'Nikdy som... nepobozkala ženu (ženy).',
      'Nikdy som... nepobozkával muža (muži).',
      'Nikdy som... neobjímala ženu s citeľným vzrušením.',
      'Nikdy som... neflirtoval/-a s niekým rovnakého pohlavia.',
      'Nikdy som... nezdieľala sprchu so ženou kamarátkou.',
      'Nikdy som... neuvažoval/-a o bisexuálnom zážitku.',
      'Nikdy som... neskúsila intimný dotyk so ženou.',
      'Nikdy som... nespal/-a s niekým rovnakého pohlavia.',
    ],
  },
  {
    category: '👥 Trojky & Viac ľudí',
    level: 4,
    color: '#907040',
    items: [
      'Nikdy som... neuvažoval/-a o trojke.',
      'Nikdy som... nebol/-a prítomný/-á pri intimnom akte iných (ako hosť).',
      'Nikdy som... nezúčastnil/-a sa trojky s dvoma ženami.',
      'Nikdy som... nezúčastnil/-a sa trojky s dvoma mužmi.',
      'Nikdy som... nezažila/-l spiacu/gang fantasy s partnerom.',
      'Nikdy som... bol/-a na párty kde sa niečo intimné stalo v skupinke.',
      'Nikdy som... nezažila/-l MMF alebo FFM scenár.',
    ],
  },
  {
    category: '♟️ Swinging & Open',
    level: 4,
    color: '#606080',
    items: [
      'Nikdy som... neuvažoval/-a o swingingu s partnerom.',
      'Nikdy som... nenavštívil/-a swinger klub.',
      'Nikdy som... nevymenil/-a partnera na jedno intimné stretnutie.',
      'Nikdy som... nezažil/-a polyamorickú situáciu.',
      'Nikdy som... nezdieľal/-a partnera na základe vzájomnej dohody.',
      'Nikdy som... nezažil/-a "hotwife" alebo "stag" scenár.',
    ],
  },
  {
    category: '⛓️ BDSM & Extrémne',
    level: 5,
    color: '#803040',
    items: [
      'Nikdy som... nezažil/-a tvrdé viazanie (shibari alebo podobné).',
      'Nikdy som... nepoužil/-a zatvárač (chastity).',
      'Nikdy som... nezažil/-a trestnú hru (spanking, paddle).',
      'Nikdy som... nebol/-a na BDSM párty.',
      'Nikdy som... nezažil/-a wax play (kvapkanie sviečky).',
      'Nikdy som... nepodstúpil/-a 24h D/s (dominantný/submisívny) scenár.',
      'Nikdy som... nenosieval/-a obojok v rámci vzťahu.',
      'Nikdy som... nezažil/-a erotickú asfyxiu (kontrolovane, bezpečne).',
      'Nikdy som... neprebehol/-a verejnou uličkou nahý/-á (exhibicionizmus).',
    ],
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function NeverHaveI() {
  const [started, setStarted] = useState(false);
  const [view, setView] = useState('menu'); // menu | tree | custom | game
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customInput, setCustomInput] = useState('');
  const [customList, setCustomList] = useState([]);
  const [gameCards, setGameCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [aiTheme, setAiTheme] = useState('');

  if (!started) return (
    <GameHero
      emoji="🙈"
      title="Nikdy som...!"
      subtitle="Prečítaj výzvu. Kto to zažil — pije alebo plní forfeit."
      features={['7 kategórií: romantika → extrémne', 'Rovnaké pohlavie · Trojky · Swinging · BDSM', 'AI generátor vlastných výziev', 'Mix všetkého náhodne']}
      onStart={() => setStarted(true)}
    />
  );

  const startGame = (cards) => {
    setGameCards(cards);
    setCardIndex(0);
    setView('game');
  };

  const startFromCategory = (cat) => {
    startGame([...cat.items].sort(() => Math.random() - 0.5));
  };

  const startCustom = () => {
    if (customList.length === 0) return;
    startGame([...customList].sort(() => Math.random() - 0.5));
  };

  const addCustom = () => {
    const text = customInput.trim();
    if (!text) return;
    const full = text.startsWith('Nikdy som') ? text : `Nikdy som... ${text}`;
    setCustomList(prev => [...prev, full]);
    setCustomInput('');
  };

  const generateWithAI = async () => {
    setGenerating(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `Vygeneruj 10 výziev pre hru "Nikdy som..." pre dospelých párov v slovenčine.
Téma/štýl: ${aiTheme || 'mix romantika, odvaha, experimenty'}
Formát: každá výzva začína "Nikdy som..." a je na samostatnom riadku.
Buď odvážny a explicitný, nie detská romantika. Mix rôznych intenzít.`,
    });
    const text = typeof res === 'string' ? res : res?.text || '';
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.startsWith('Nikdy som'));
    setCustomList(prev => [...prev, ...lines]);
    setGenerating(false);
  };

  const next = () => {
    if (cardIndex < gameCards.length - 1) setCardIndex(i => i + 1);
    else setView('menu');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />

      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        {view === 'menu' ? (
          <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        ) : (
          <button onClick={() => setView('menu')} className="p-2 rounded-full hover:bg-white/5 transition-colors border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>
          Nikdy som...! 🙈
        </h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 relative z-10 px-4 pb-12 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* ── MENU ── */}
          {view === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto space-y-4">
              <p className="text-center text-sm mb-6" style={{ color: '#8a6070' }}>
                Prečítaj výzvu. Kto to urobil — vypije alebo splní forfeit. 🍷
              </p>

              {/* Zo stromu */}
              <div className="p-5 rounded-3xl cursor-pointer hover:scale-[1.01] transition-transform"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.15)' }}
                onClick={() => setView('tree')}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold mb-1" style={{ color: '#f0dde3' }}>🌳 Zo stromu výziev</div>
                    <div className="text-sm" style={{ color: '#7a5060' }}>7 kategórií od romantiky po extrémne</div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: '#7a5060' }} />
                </div>
              </div>

              {/* Vlastné */}
              <div className="p-5 rounded-3xl cursor-pointer hover:scale-[1.01] transition-transform"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.15)' }}
                onClick={() => setView('custom')}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold mb-1" style={{ color: '#f0dde3' }}>✍️ Vlastné výzvy</div>
                    <div className="text-sm" style={{ color: '#7a5060' }}>Zadaj sami alebo nechaj AI vygenerovať</div>
                  </div>
                  <ChevronRight className="w-5 h-5" style={{ color: '#7a5060' }} />
                </div>
              </div>

              {/* Mix všetkého */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const all = TREE.flatMap(c => c.items).sort(() => Math.random() - 0.5);
                  startGame(all);
                }}
                className="w-full py-4 rounded-2xl text-white font-semibold cursor-pointer border-0 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 25px rgba(192,64,90,0.35)' }}>
                <Shuffle className="w-5 h-5" /> Mix všetkého (náhodne)
              </motion.button>
            </motion.div>
          )}

          {/* ── STROM ── */}
          {view === 'tree' && (
            <motion.div key="tree" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto space-y-3">
              <p className="text-center text-xs uppercase tracking-widest mb-4" style={{ color: '#5a3040' }}>Vyber kategóriu</p>
              {TREE.map((cat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => startFromCategory(cat)}
                  className="p-4 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform"
                  style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${cat.color}30` }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold" style={{ color: '#f0dde3' }}>{cat.category}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#7a5060' }}>{cat.items.length} výziev · {'⭐'.repeat(cat.level)}</div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── VLASTNÉ ── */}
          {view === 'custom' && (
            <motion.div key="custom" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-lg mx-auto space-y-4">

              {/* AI Helper */}
              <div className="p-4 rounded-2xl space-y-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.15)' }}>
                <div className="text-sm font-semibold" style={{ color: '#f0dde3' }}>✨ AI pomocník</div>
                <input
                  value={aiTheme}
                  onChange={e => setAiTheme(e.target.value)}
                  placeholder="Téma (napr. BDSM, swinging, lesbické...)"
                  className="w-full px-4 py-3 rounded-xl bg-transparent text-sm border-0 outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#f0dde3', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <button onClick={generateWithAI} disabled={generating}
                  className="w-full py-3 rounded-xl text-sm font-medium cursor-pointer border-0 flex items-center justify-center gap-2 disabled:opacity-40"
                  style={{ background: 'rgba(200,80,100,0.15)', color: '#e08090', border: '1px solid rgba(200,80,100,0.2)' }}>
                  <Sparkles className="w-4 h-4" />
                  {generating ? 'Generujem...' : 'Vygenerovať výzvy s AI'}
                </button>
              </div>

              {/* Ručné pridanie */}
              <div className="flex gap-2">
                <input
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCustom()}
                  placeholder="Vlastná výzva... (Enter = pridaj)"
                  className="flex-1 px-4 py-3 rounded-xl text-sm border-0 outline-none"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#f0dde3', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <button onClick={addCustom}
                  className="px-4 py-3 rounded-xl cursor-pointer border-0"
                  style={{ background: 'rgba(200,80,100,0.2)', color: '#e08090' }}>
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Zoznam */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {customList.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="flex-1 text-sm" style={{ color: '#c0a0a8' }}>{item}</span>
                    <button onClick={() => setCustomList(prev => prev.filter((_, j) => j !== i))}
                      className="border-0 bg-transparent cursor-pointer p-0.5" style={{ color: '#5a3040' }}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {customList.length > 0 && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={startCustom}
                  className="w-full py-4 rounded-2xl text-white font-semibold cursor-pointer border-0"
                  style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 25px rgba(192,64,90,0.35)' }}>
                  ▶ Začať hru ({customList.length} výziev)
                </motion.button>
              )}
            </motion.div>
          )}

          {/* ── HRA ── */}
          {view === 'game' && gameCards.length > 0 && (
            <motion.div key={`game-${cardIndex}`} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35 }}
              className="max-w-lg mx-auto flex flex-col items-center gap-8 pt-4">

              <div className="text-xs" style={{ color: '#5a3040' }}>
                {cardIndex + 1} / {gameCards.length}
              </div>

              <motion.div
                className="w-full rounded-3xl p-8 text-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,80,100,0.2)', backdropFilter: 'blur(12px)', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="text-2xl font-bold leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>
                  {gameCards[cardIndex]}
                </p>
              </motion.div>

              <div className="w-full space-y-3">
                <p className="text-center text-sm" style={{ color: '#7a5060' }}>
                  Kto to urobil/zažil? → Pije / plní forfeit 🍷
                </p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={next}
                  className="w-full py-4 rounded-2xl text-white font-semibold cursor-pointer border-0"
                  style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 25px rgba(192,64,90,0.35)' }}>
                  {cardIndex < gameCards.length - 1 ? 'Ďalšia karta →' : '🎉 Koniec hry'}
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}