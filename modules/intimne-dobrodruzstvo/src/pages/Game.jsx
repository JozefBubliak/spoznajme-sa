import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Settings } from 'lucide-react';
import LevelCard from '../components/LevelCard';
import TaskDisplay from '../components/TaskDisplay';
import CountdownTimer from '../components/CountdownTimer';
import FloatingHearts from '../components/FloatingHearts';
import SettingsPanel from '../components/SettingsPanel';
import StrobeOverlay from '../components/StrobeOverlay';
import GameHero from '../components/GameHero';
import { playStart, playEnd } from '../lib/gameAudio';
import { useGameSettings } from '../hooks/useGameSettings';

const PHASES = { LEVELS: 'levels', TASK: 'task', TIME_SELECT: 'timeSelect', PREP: 'prep', RUNNING: 'running', DONE: 'done' };

const PageWrap = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
    {children}
  </motion.div>
);

export default function Game() {
  // ALL hooks must come before any conditional returns
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(PHASES.LEVELS);
  const [level, setLevel] = useState(1);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);
  const [chosenTime, setChosenTime] = useState(60);
  const [showSettings, setShowSettings] = useState(false);
  const [strobeActive, setStrobeActive] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const queryClient = useQueryClient();
  const { settings, toggle } = useGameSettings();

  const triggerAlert = useCallback((type) => {
    if (settings.sound) type === 'start' ? playStart() : playEnd();
    if (settings.strobe) setStrobeActive(true);
  }, [settings]);

  const { data: allTasks = [], error: loadError } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => base44.entities.Task.list(),
  });

  const updateTask = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Task.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  const filteredTasks = useMemo(() => {
    const base = allTasks.filter(t => {
      if (t.level !== level) return false;
      if (t.status === 'Nevhodná') return false;
      if (onlyFavorites && t.status !== 'Obľúbené') return false;
      if (t.shown && t.status !== 'Obľúbené') return false;
      return true;
    });
    const arr = [...base];
    let seed = shuffleSeed;
    for (let i = arr.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      const j = Math.abs(seed) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [allTasks, level, onlyFavorites, shuffleSeed]);

  const currentTask = filteredTasks[taskIndex] || null;

  const pickLevel = useCallback((lvl) => {
    setLevel(lvl);
    setTaskIndex(0);
    setShuffleSeed(Date.now());
    setPhase(PHASES.TASK);
  }, []);

  // Conditional return AFTER all hooks
  if (loadError) return <div className="adventure-error" role="alert"><h1>Dáta sa nepodarilo načítať</h1><p>{loadError.message}</p><button onClick={() => window.location.reload()}>Skúsiť znova</button></div>;
  if (!started) return (
    <GameHero
      emoji="♥"
      title="Erotická hra"
      subtitle="6 úrovní odvážnych úloh s prípravným časom, časovačom a zvukmi."
      features={['6 úrovní od jemnej po extrémnu', 'Časovač & prípravná fáza', 'Obľúbené úlohy', 'Strobe & zvukové efekty']}
      onStart={() => setStarted(true)}
    />
  );

  const handleAccept = () => {
    if (level >= 5) { setChosenTime(-1); setPhase(PHASES.RUNNING); }
    else setPhase(PHASES.TIME_SELECT);
  };

  const handleTimeSelect = (t) => {
    setChosenTime(t);
    if (currentTask?.prep_time > 0) setPhase(PHASES.PREP);
    else { triggerAlert('start'); setPhase(PHASES.RUNNING); }
  };

  const handlePrepDone = () => {
    triggerAlert('start');
    setPhase(PHASES.RUNNING);
  };

  const handleTaskDone = () => {
    triggerAlert('end');
    if (currentTask && currentTask.status !== 'Obľúbené')
      updateTask.mutate({ id: currentTask.id, data: { shown: true } });
    setPhase(PHASES.DONE);
  };

  const nextTask = () => {
    setTaskIndex(prev => prev + 1);
    setPhase(PHASES.TASK);
  };

  const skipTask = () => {
    if (currentTask && currentTask.status !== 'Obľúbené')
      updateTask.mutate({ id: currentTask.id, data: { shown: true } });
    nextTask();
  };

  const toggleFavorite = (id) => {
    const task = allTasks.find(t => t.id === id);
    if (!task) return;
    const nextStatus = task.status === 'Obľúbené' ? 'Nevhodná' : task.status === 'Nevhodná' ? '' : 'Obľúbené';
    updateTask.mutate({ id, data: { status: nextStatus } });
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 30%, #3d1020 0%, #180810 50%, #0a0408 100%)' }}
    >
      <FloatingHearts />
      <StrobeOverlay active={strobeActive} onDone={() => setStrobeActive(false)} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180,50,80,0.14) 0%, transparent 70%)' }} />

      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <button onClick={() => setStarted(false)} className="transition-colors p-2 rounded-full hover:bg-white/5 border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        {phase !== PHASES.LEVELS && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-sm px-3 py-1 rounded-full"
            style={{ color: '#c08090', background: 'rgba(200,80,100,0.1)', border: '1px solid rgba(200,80,100,0.15)' }}>
            ♥ Úroveň {level}
          </motion.span>
        )}
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full hover:bg-white/5 transition-colors border-0 bg-transparent cursor-pointer"
          style={{ color: '#7a5060' }}
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-12 relative z-10">
        <AnimatePresence mode="wait">

          {phase === PHASES.LEVELS && (
            <PageWrap key="levels">
              <div className="w-full max-w-md space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Vyberte úroveň</h2>
                  <p className="text-sm" style={{ color: '#7a5060' }}>Aká vášnivá bude dnešná noc?</p>
                </div>
                <div className="flex items-center justify-center gap-3 mb-5 p-3 rounded-2xl"
                  style={{ background: 'rgba(200,80,100,0.06)', border: '1px solid rgba(200,80,100,0.12)' }}>
                  <Switch id="fav" checked={onlyFavorites} onCheckedChange={setOnlyFavorites} />
                  <Label htmlFor="fav" className="text-sm flex items-center gap-1.5 cursor-pointer" style={{ color: '#c08090' }}>
                    ♥ Len obľúbené úlohy
                  </Label>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((l, i) => (
                    <LevelCard key={l} level={l} onClick={pickLevel} delay={i * 0.07} />
                  ))}
                </div>
              </div>
            </PageWrap>
          )}

          {phase === PHASES.TASK && (
            filteredTasks.length === 0 ? (
              <PageWrap key="empty">
                <div className="text-center space-y-5 max-w-sm">
                  <div className="text-5xl">💔</div>
                  <p className="text-xl" style={{ color: '#c08090' }}>Žiadne úlohy pre túto úroveň.</p>
                  <button onClick={() => setPhase(PHASES.LEVELS)}
                    className="px-8 py-3 rounded-full text-sm font-medium cursor-pointer border-0"
                    style={{ background: 'rgba(200,80,100,0.15)', color: '#e08090', border: '1px solid rgba(200,80,100,0.2)' }}>
                    ← Späť na úrovne
                  </button>
                </div>
              </PageWrap>
            ) : (
              <TaskDisplay
                key={`task-${taskIndex}`}
                task={currentTask}
                level={level}
                currentIndex={taskIndex}
                totalTasks={filteredTasks.length}
                onAccept={handleAccept}
                onSkip={skipTask}
                onToggleFavorite={toggleFavorite}
                onPrev={() => setTaskIndex(prev => (prev - 1 + filteredTasks.length) % filteredTasks.length)}
                onNext={() => setTaskIndex(prev => (prev + 1) % filteredTasks.length)}
                onChangeLevel={() => setPhase(PHASES.LEVELS)}
              />
            )
          )}

          {phase === PHASES.TIME_SELECT && (
            <PageWrap key="time">
              <div className="max-w-sm w-full space-y-5 text-center">
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Zvoľte čas</h2>
                <p className="text-sm" style={{ color: '#9a7080' }}>Koľko času si doprajete?</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { s: 30, l: '30 sekúnd' }, { s: 60, l: '1 minúta' },
                    { s: 120, l: '2 minúty' }, { s: 180, l: '3 minúty' },
                    { s: 300, l: '5 minút' }, { s: -1, l: '∞ Bez limitu' },
                  ].map((t, i) => (
                    <motion.button
                      key={t.s}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => handleTimeSelect(t.s)}
                      className="py-5 rounded-2xl text-base font-medium cursor-pointer border-0 transition-all"
                      style={{ background: 'rgba(200,80,100,0.08)', color: '#e0a0b0', border: '1px solid rgba(200,80,100,0.18)' }}
                    >
                      {t.l}
                    </motion.button>
                  ))}
                </div>
              </div>
            </PageWrap>
          )}

          {phase === PHASES.PREP && (
            <PageWrap key="prep">
              <div className="text-center space-y-4">
                <p className="text-sm uppercase tracking-widest" style={{ color: '#7a5060' }}>Pripravte sa</p>
                <CountdownTimer seconds={currentTask?.prep_time || 5} label="Úloha začne o..." onComplete={handlePrepDone} />
              </div>
            </PageWrap>
          )}

          {phase === PHASES.RUNNING && (
            <PageWrap key="running">
              <div className="text-center space-y-8">
                {chosenTime > 0 ? (
                  <CountdownTimer seconds={chosenTime} label="Úloha prebieha ♥" onComplete={handleTaskDone} />
                ) : (
                  <div className="space-y-8">
                    <div className="text-6xl animate-pulse">♥</div>
                    <p className="text-2xl" style={{ color: '#c08090', fontFamily: "'Playfair Display', serif" }}>
                      Užite si to — bez limitu
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={handleTaskDone}
                      className="px-12 py-4 rounded-full text-white font-semibold text-base cursor-pointer border-0"
                      style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 30px rgba(192,64,90,0.4)' }}
                    >
                      Hotovo ♥
                    </motion.button>
                  </div>
                )}
              </div>
            </PageWrap>
          )}

          {phase === PHASES.DONE && (
            <PageWrap key="done">
              <div className="text-center space-y-7 max-w-sm mx-auto">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], filter: ['drop-shadow(0 0 5px #c04060)', 'drop-shadow(0 0 20px #e04070)', 'drop-shadow(0 0 5px #c04060)'] }}
                  transition={{ duration: 1.5, repeat: 3 }}
                  className="text-7xl"
                >
                  ♥
                </motion.div>
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>Skvelé!</h2>
                <p style={{ color: '#9a7080' }}>Úloha splnená. Pokračujte ďalej...</p>
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={nextTask}
                    className="w-full py-4 rounded-2xl text-white font-semibold cursor-pointer border-0"
                    style={{ background: 'linear-gradient(135deg, #c0405a, #8b2040)', boxShadow: '0 0 25px rgba(192,64,90,0.4)' }}
                  >
                    Ďalšia úloha →
                  </motion.button>
                  <button onClick={() => setPhase(PHASES.LEVELS)}
                    className="w-full py-3 rounded-2xl text-sm font-medium cursor-pointer border-0"
                    style={{ background: 'rgba(255,255,255,0.04)', color: '#9a7080', border: '1px solid rgba(255,255,255,0.07)' }}>
                    Zmeniť úroveň
                  </button>
                </div>
              </div>
            </PageWrap>
          )}

        </AnimatePresence>
      </main>

      <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} settings={settings} toggle={toggle} />
    </div>
  );
}
