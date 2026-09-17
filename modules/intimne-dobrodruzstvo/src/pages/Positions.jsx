import { useState, useMemo } from 'react';
import GameHero from '../components/GameHero';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Shuffle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';

const CATEGORIES = ['Všetky', 'Klasické', 'Ona navrchu', 'Zozadu', 'Bok po boku', 'Sediace', 'Stojacie', 'Špeciálne'];
const DIFFICULTY_LABELS = ['', 'Ľahká', 'Stredná', 'Náročná', 'Veľmi náročná', 'Extrémna'];
const DIFFICULTY_COLORS = ['', '#8fd6a3', '#e8c56a', '#e89070', '#e06070', '#c03060'];

export default function Positions() {
  const [started, setStarted] = useState(false);
  const queryClient = useQueryClient();
  const [category, setCategory] = useState('Všetky');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: positions = [], error: loadError, isLoading } = useQuery({
    queryKey: ['positions'],
    queryFn: () => base44.entities.Position.list(),
  });

  const toggleFavorite = useMutation({
    mutationFn: ({ id, val }) => base44.entities.Position.update(id, { is_favorite: val }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['positions'] }),
  });

  const filtered = useMemo(() => {
    return positions.filter(p => {
      if (category !== 'Všetky' && p.category !== category) return false;
      if (onlyFavorites && !p.is_favorite) return false;
      return true;
    });
  }, [positions, category, onlyFavorites]);

  const randomPick = () => {
    if (filtered.length === 0) return;
    setSelected(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  if (loadError) return <div className="adventure-error" role="alert"><h1>Dáta sa nepodarilo načítať</h1><p>{loadError.message}</p><button onClick={() => window.location.reload()}>Skúsiť znova</button></div>;
  if (!started) return (
    <GameHero
      emoji="🌸"
      title="Polohy"
      subtitle="58 polôh s popisom, tipmi a filtrom. Objavte nové obľúbené."
      features={['7 kategórií', 'Filter obľúbených', 'Náhodný výber', 'Tipy & triky pre každú polohu']}
      onStart={() => setStarted(true)}
    />
  );

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #12050b 0%, #351225 44%, #10212a 100%)' }}
    >
      <FloatingHearts />

      <div className="absolute inset-x-0 top-0 h-[42vh] bg-[linear-gradient(115deg,rgba(232,176,111,0.16),transparent_48%,rgba(95,180,170,0.14))] pointer-events-none" />

      <header className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Link to="/" className="transition-colors p-2 rounded-full hover:bg-white/5" style={{ color: '#7a5060' }}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>
          Polohy
        </h1>
        <button
          onClick={randomPick}
          className="p-2 rounded-full hover:bg-white/5 transition-colors border-0 bg-transparent cursor-pointer"
          style={{ color: '#7a5060' }}
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </header>

      <div className="relative z-10 px-4 pb-4 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border-0 transition-all"
              style={{
                background: category === cat ? 'rgba(200,70,100,0.25)' : 'rgba(255,255,255,0.05)',
                color: category === cat ? '#f0c0cc' : '#8a6070',
                border: `1px solid ${category === cat ? 'rgba(200,70,100,0.4)' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOnlyFavorites(v => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer border-0 transition-all"
          style={{
            background: onlyFavorites ? 'rgba(200,70,100,0.15)' : 'rgba(255,255,255,0.04)',
            color: onlyFavorites ? '#e08090' : '#6a4050',
            border: `1px solid ${onlyFavorites ? 'rgba(200,70,100,0.3)' : 'rgba(255,255,255,0.06)'}`,
          }}
        >
          <Heart className="w-4 h-4" fill={onlyFavorites ? '#e08090' : 'none'} />
          Len obľúbené
        </button>
      </div>

      <main className="flex-1 relative z-10 px-4 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: 'rgba(200,80,100,0.2)', borderTopColor: '#c05070' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#7a5060' }}>
            <div className="text-4xl mb-4">💔</div>
            <p>Žiadne polohy pre tento filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((pos, i) => (
              <motion.div
                key={pos.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(pos)}
                className="rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02]"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(200,80,100,0.12)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,80,100,0.12)', color: '#c08090' }}>
                    {pos.category}
                  </span>
                  <button
                    onClick={e => { e.stopPropagation(); toggleFavorite.mutate({ id: pos.id, val: !pos.is_favorite }); }}
                    className="border-0 bg-transparent cursor-pointer p-1"
                  >
                    <Heart className="w-4 h-4" fill={pos.is_favorite ? '#e06070' : 'none'} style={{ color: pos.is_favorite ? '#e06070' : '#5a3040' }} />
                  </button>
                </div>
                <h3 className="font-semibold mb-1" style={{ color: '#f0dde3', fontFamily: "'Playfair Display', serif" }}>{pos.name}</h3>
                <p className="text-xs line-clamp-2 mb-3" style={{ color: '#8a6070' }}>{pos.description}</p>
                <div className="text-xs font-medium" style={{ color: DIFFICULTY_COLORS[pos.difficulty] || '#aaa' }}>
                  Náročnosť: {DIFFICULTY_LABELS[pos.difficulty] || ''}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-3xl overflow-y-auto max-h-[85vh]"
              style={{
                background: 'linear-gradient(160deg, #2a0e1a 0%, #180810 100%)',
                border: '1px solid rgba(200,80,100,0.2)',
                borderBottom: 'none',
                boxShadow: '0 -20px 60px rgba(180,50,80,0.25)',
              }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: 'rgba(200,80,100,0.12)', color: '#c08090' }}>
                      {selected.category}
                    </span>
                    <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: '#f0dde3' }}>{selected.name}</h2>
                    <div className="text-sm mt-1" style={{ color: DIFFICULTY_COLORS[selected.difficulty] }}>
                      Náročnosť: {DIFFICULTY_LABELS[selected.difficulty]}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { toggleFavorite.mutate({ id: selected.id, val: !selected.is_favorite }); setSelected(p => ({ ...p, is_favorite: !p.is_favorite })); }}
                      className="border-0 bg-transparent cursor-pointer p-2"
                    >
                      <Heart className="w-5 h-5" fill={selected.is_favorite ? '#e06070' : 'none'} style={{ color: selected.is_favorite ? '#e06070' : '#5a3040' }} />
                    </button>
                    <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors border-0 bg-transparent cursor-pointer" style={{ color: '#7a5060' }}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,80,100,0.1)' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#c0a0a8' }}>{selected.description}</p>
                  </div>

                  {selected.partner_position && (
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(200,80,100,0.06)', border: '1px solid rgba(200,80,100,0.12)' }}>
                      <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#9a6070' }}>Pozícia partnerov</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#c0a0a8' }}>{selected.partner_position}</p>
                    </div>
                  )}

                  {selected.tips && (
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(200,150,80,0.06)', border: '1px solid rgba(200,150,80,0.12)' }}>
                      <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#a08050' }}>Tipy a triky</div>
                      <p className="text-sm leading-relaxed" style={{ color: '#c0b090' }}>{selected.tips}</p>
                    </div>
                  )}

                  {selected.tags && selected.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: '#7a5060', border: '1px solid rgba(255,255,255,0.07)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}