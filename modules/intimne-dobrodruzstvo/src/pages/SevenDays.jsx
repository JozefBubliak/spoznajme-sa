import { useState, useEffect } from 'react';
import GameHero from '../components/GameHero';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Lock, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const PACKS = [
  {
    id: 'romantic',
    name: '🌸 Romantická cesta',
    desc: 'Jemné, zmyselné, plné nežnosti',
    days: [
      { title: 'Deň 1: Dotyk', task: 'Masáž celého tela bez očakávaní. Len dávajte a prijímajte 45 minút.' },
      { title: 'Deň 2: Slová', task: 'Napíšte si navzájom erotický list. Prečítajte si ho nahlas pri víne.' },
      { title: 'Deň 3: Pohľad', task: 'Pozrite si do očí 5 minút a potom robte čo cítite — žiadne plány.' },
      { title: 'Deň 4: Prekvapenie', task: 'Jeden partner celý večer prekvapuje — čo chce, kedy chce. Druhý len prijíma.' },
      { title: 'Deň 5: Pomalé', task: 'Predohra bez cieľa — 30 minút. Každý krok čo najpomalší.' },
      { title: 'Deň 6: Nové miesto', task: 'Nájdite jedno nové miesto v dome kde ste ešte neboli intimní.' },
      { title: 'Deň 7: Celá noc', task: 'Žiadny plán. Žiadne telefóny. Len vy dvaja a všetok čas sveta.' },
    ],
  },
  {
    id: 'fire',
    name: '🔥 Vášnivý týždeň',
    desc: 'Odvážne, intenzívne, nezabudnuteľné',
    days: [
      { title: 'Deň 1: Pravda bez hraníc', task: 'Povedzte si navzájom top 3 fantázie bez cenzúry. Aspoň jednu splňte.' },
      { title: 'Deň 2: Striptíz', task: 'Obaja si pripravte striptíz — kostým, hudba, šou. Striedajte sa.' },
      { title: 'Deň 3: Roleplay', task: 'Cudzinci v bare — stretnete sa „prvýkrát". Celý večer v role.' },
      { title: 'Deň 4: Moc', task: 'Jeden dominuje celú noc. Druhý plní. Vymieňajte si roly o polnoci.' },
      { title: 'Deň 5: Kocky', task: 'Hráte kocky 1 hodinu — čo padne sa musí splniť. Bez výhovoriek.' },
      { title: 'Deň 6: Maratón', task: 'Cieľ: 8 polôh za jednu noc. Zachovajte počet.' },
      { title: 'Deň 7: Bez tabu', task: 'Všetko čo ste obaja označili ✅ za týždeň — dnes v noci sa to splní.' },
    ],
  },
  {
    id: 'dark',
    name: '🖤 Temná strana',
    desc: 'Extrémne, odvážne, pre skúsených',
    days: [
      { title: 'Deň 1: Edging', task: '3x zastaviť tesne pred vrcholom — štvrtý je povolený. Obaja.' },
      { title: 'Deň 2: Senzorika', task: 'Zaviazané oči + štuple do uší — partner riadi všetko 30 minút.' },
      { title: 'Deň 3: Pútanie', task: 'Dohodnuté vopred: 30 minút partnerovej fantasy bez obmedzení.' },
      { title: 'Deň 4: Vonku', task: 'Nájdite súkromné miesto vonku. Čo sa stane zostane tajomstvom.' },
      { title: 'Deň 5: Natáčanie', task: 'Natočte video — len pre seba. Sledujte spolu a opakujte scény.' },
      { title: 'Deň 6: Maratón', task: 'Cieľ: 10 orgazmov celkovo. Ľubovoľné rozdelenie. Dokumentujte.' },
      { title: 'Deň 7: Ultimátna noc', task: 'Noc bez tabu. Vopred dohodnete pravidlá — počas noci sa dodržiavajú.' },
    ],
  },
  {
    id: 'senses',
    name: '✨ Zmyslový reset',
    desc: 'Objavovanie tela, pomalé a intenzívne',
    days: [
      { title: 'Deň 1: Sluch', task: 'Šepkajte si do ucha čo robíte a čo cítite — celú hodinu.' },
      { title: 'Deň 2: Chuť', task: 'Med, čokoláda, ovocie — kŕmte sa navzájom so zaviazanými očami.' },
      { title: 'Deň 3: Čuch', task: 'Aromatické oleje, parfémy — nájdite vône ktoré vás vzrušujú.' },
      { title: 'Deň 4: Hmat', task: 'Iba ruky — 45 minút iba dotyky, žiadne bozky ani viac.' },
      { title: 'Deň 5: Zrak', task: 'Sledujte sa navzájom — jeden robí, druhý iba pozerá. Potom vymeňte.' },
      { title: 'Deň 6: Teplota', task: 'Ľad a teplo — striedajte na celom tele. Zaviazané oči.' },
      { title: 'Deň 7: Všetky zmysly', task: 'Kombinujte všetko z predchádzajúcich dní — vlastná kompozícia.' },
    ],
  },
];

const STORAGE_KEY = 'sevendays_progress';

export default function SevenDays() {
  const [started, setStarted] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleDay = (packId, dayIdx) => {
    const key = `${packId}_${dayIdx}`;
    setProgress(p => ({ ...p, [key]: !p[key] }));
  };

  const getDaysDone = (packId) => PACKS.find(p => p.id === packId)?.days.filter((_, i) => progress[`${packId}_${i}`]).length || 0;

  if (!started) return (
    <GameHero
      emoji="📅"
      title="7-dňová výzva"
      subtitle="Tematické programy na celý týždeň — každý deň nová úloha."
      features={['Romantická cesta', 'Vášnivý týždeň', 'Temná strana', 'Zmyslový reset', 'Progress tracking']}
      onStart={() => setStarted(true)}
    />
  );

  if (!selectedPack) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
        <FloatingHearts />
        <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
          <Link to="/" className="p-2 rounded-full hover:bg-white/5 transition-colors" style={{ color: '#7a5060' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>7-dňová výzva</h1>
          <div className="w-9" />
        </header>
        <main className="flex-1 relative z-10 px-4 pb-12 space-y-4">
          {PACKS.map((pack, i) => {
            const done = getDaysDone(pack.id);
            return (
              <motion.div key={pack.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => setSelectedPack(pack)}
                className="rounded-2xl p-5 cursor-pointer hover:scale-[1.01] transition-all"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.15)', backdropFilter: 'blur(8px)' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1" style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>{pack.name}</h3>
                    <p className="text-sm" style={{ color: '#8a6070' }}>{pack.desc}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold" style={{ color: done === 7 ? '#80e080' : '#c08090' }}>{done}/7</div>
                    <div className="text-xs" style={{ color: '#5a3040' }}>dní</div>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  {pack.days.map((_, di) => (
                    <div key={di} className="flex-1 h-1.5 rounded-full"
                      style={{ background: progress[`${pack.id}_${di}`] ? '#c0405a' : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}>
      <FloatingHearts />
      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <button onClick={() => setSelectedPack(null)} className="p-2 rounded-full hover:bg-white/5 transition-colors border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>{selectedPack.name}</h1>
        <div className="w-9" />
      </header>

      <main className="flex-1 relative z-10 px-4 pb-12 space-y-3">
        {selectedPack.days.map((day, i) => {
          const done = !!progress[`${selectedPack.id}_${i}`];
          const prevDone = i === 0 || !!progress[`${selectedPack.id}_${i - 1}`];
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => prevDone && setSelectedDay(i)}
              className="rounded-2xl p-4 transition-all"
              style={{
                background: done ? 'rgba(192,64,90,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${done ? 'rgba(192,64,90,0.3)' : 'rgba(255,255,255,0.08)'}`,
                cursor: prevDone ? 'pointer' : 'not-allowed',
                opacity: prevDone ? 1 : 0.5,
              }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: done ? '#c0405a' : 'rgba(255,255,255,0.06)' }}>
                  {done ? <CheckCircle2 className="w-4 h-4 text-white" /> : !prevDone ? <Lock className="w-4 h-4" style={{ color: '#5a3040' }} /> : <span className="text-sm font-bold" style={{ color: '#7a5060' }}>{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm" style={{ color: done ? '#f0dde3' : '#c0a0a8' }}>{day.title}</p>
                  {done && <p className="text-xs mt-0.5" style={{ color: '#80e080' }}>✓ Splnené</p>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>

      <AnimatePresence>
        {selectedDay !== null && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedDay(null)} />
            <motion.div
              initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-3xl p-6"
              style={{ background: 'linear-gradient(160deg, #2a0e1a 0%, #180810 100%)', border: '1px solid rgba(200,80,100,0.2)', borderBottom: 'none' }}>
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs uppercase tracking-wider" style={{ color: '#9a6070' }}>{selectedPack.days[selectedDay].title}</p>
                <button onClick={() => setSelectedDay(null)} className="border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xl leading-relaxed font-medium mb-6" style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>
                {selectedPack.days[selectedDay].task}
              </p>
              <button
                onClick={() => { toggleDay(selectedPack.id, selectedDay); setSelectedDay(null); }}
                className="w-full py-4 rounded-2xl text-white font-semibold cursor-pointer border-0"
                style={{ background: progress[`${selectedPack.id}_${selectedDay}`] ? 'rgba(255,255,255,0.08)' : 'linear-gradient(135deg, #c0405a, #8b2040)' }}>
                {progress[`${selectedPack.id}_${selectedDay}`] ? 'Označiť ako nesplnené' : '✓ Splnené! Ďalší deň →'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}