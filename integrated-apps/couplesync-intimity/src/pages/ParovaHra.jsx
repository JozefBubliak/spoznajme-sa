import { useState } from "react";
import { CHALLENGES, CATEGORIES } from "@/lib/data/coupleGame";
import { Shuffle, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CAT_COLORS = {
  'Romantika': 'bg-rose-100 text-rose-700 border-rose-200',
  'Blízkosť': 'bg-violet-100 text-violet-700 border-violet-200',
  'Humor': 'bg-amber-100 text-amber-700 border-amber-200',
  'Odvaha': 'bg-red-100 text-red-700 border-red-200',
  'Objavovanie': 'bg-blue-100 text-blue-700 border-blue-200',
};

export default function ParovaHra() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [done, setDone] = useState(new Set());
  const [flipped, setFlipped] = useState(false);

  const pool = activeCategory
    ? CHALLENGES.filter(c => c.category === activeCategory && !done.has(c.key))
    : CHALLENGES.filter(c => !done.has(c.key));

  const draw = () => {
    if (pool.length === 0) return;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setCurrentCard(random);
    setFlipped(true);
  };

  const markDone = () => {
    if (!currentCard) return;
    setDone(prev => new Set([...prev, currentCard.key]));
    setCurrentCard(null);
    setFlipped(false);
  };

  const resetAll = () => { setDone(new Set()); setCurrentCard(null); setFlipped(false); };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Shuffle className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Párová hra</h1>
        </div>
        <p className="text-sm text-muted-foreground">Losujte výzvy a výzvy spolu – pre romantiku, blízkosť aj smiech.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory(null)}
          className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
            !activeCategory ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
          Všetky ({CHALLENGES.length - done.size} zostatok)
        </button>
        {CATEGORIES.map(cat => {
          const remaining = CHALLENGES.filter(c => c.category === cat && !done.has(c.key)).length;
          return (
            <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
              {cat} ({remaining})
            </button>
          );
        })}
      </div>

      {/* Card area */}
      <div className="min-h-[280px] flex flex-col items-center justify-center gap-4">
        {!flipped ? (
          <div className="text-center space-y-4">
            <div className="w-40 h-52 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center mx-auto">
              <Shuffle className="w-10 h-10 text-primary/30" />
            </div>
            <Button onClick={draw} disabled={pool.length === 0} size="lg" className="gap-2">
              <Shuffle className="w-5 h-5" />
              {pool.length === 0 ? "Všetky splnené! 🎉" : "Losovať kartu"}
            </Button>
            {pool.length > 0 && <p className="text-xs text-muted-foreground">{pool.length} kariet zostáva</p>}
          </div>
        ) : currentCard && (
          <div className="w-full max-w-sm mx-auto">
            <div className={cn("rounded-2xl border-2 p-8 text-center space-y-4", CAT_COLORS[currentCard.category])}>
              <p className="text-4xl">{currentCard.emoji}</p>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">{currentCard.category}</span>
                {currentCard.duration && (
                  <span className="ml-2 text-xs font-medium opacity-70">⏱ {currentCard.duration}</span>
                )}
              </div>
              <p className="text-lg font-semibold leading-relaxed">{currentCard.text}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 gap-2" onClick={() => { setCurrentCard(null); setFlipped(false); draw(); }}>
                <RefreshCw className="w-4 h-4" /> Iná
              </Button>
              <Button className="flex-1 gap-2" onClick={markDone}>
                <Check className="w-4 h-4" /> Splnené
              </Button>
            </div>
          </div>
        )}
      </div>

      {done.size > 0 && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-green-800">✅ Splnené výzvy ({done.size})</p>
            <button onClick={resetAll} className="text-xs text-green-600 hover:text-green-800 transition-colors">Resetovať</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...done].map(key => {
              const c = CHALLENGES.find(ch => ch.key === key);
              if (!c) return null;
              return (
                <span key={key} className="text-xs bg-white border border-green-200 rounded-full px-2 py-0.5">
                  {c.emoji} {c.category}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}