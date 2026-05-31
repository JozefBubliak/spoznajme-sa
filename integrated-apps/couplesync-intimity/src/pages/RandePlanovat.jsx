import { useState } from "react";
import { DATE_IDEAS, BUDGETS, ENERGIES, TYPES } from "@/lib/data/dateIdeas";
import { MapPin, RefreshCw, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RandePlanovat() {
  const [budget, setBudget] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [type, setType] = useState(null);
  const [saved, setSaved] = useState(new Set());

  const filtered = DATE_IDEAS.filter(idea => {
    if (budget && idea.budget !== budget) return false;
    if (energy && idea.energy !== energy) return false;
    if (type && idea.type !== type && idea.type !== 'both') return false;
    return true;
  });

  const toggleSaved = (key) => {
    setSaved(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const reset = () => { setBudget(null); setEnergy(null); setType(null); };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Rande plánovač</h1>
        </div>
        <p className="text-sm text-muted-foreground">Filtruj podľa nálady, rozpočtu a energie – nájdi ideálne rande.</p>
      </div>

      {/* Filters */}
      <div className="space-y-4 p-4 rounded-xl border border-border bg-card">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Rozpočet</p>
          <div className="flex gap-2 flex-wrap">
            {BUDGETS.map(b => (
              <button key={b.key} onClick={() => setBudget(budget === b.key ? null : b.key)}
                className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  budget === b.key ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
                {b.emoji} {b.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Energia</p>
          <div className="flex gap-2 flex-wrap">
            {ENERGIES.map(e => (
              <button key={e.key} onClick={() => setEnergy(energy === e.key ? null : e.key)}
                className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  energy === e.key ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
                {e.emoji} {e.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Kde</p>
          <div className="flex gap-2 flex-wrap">
            {TYPES.map(t => (
              <button key={t.key} onClick={() => setType(type === t.key ? null : t.key)}
                className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  type === t.key ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
        </div>
        {(budget || energy || type) && (
          <button onClick={reset} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Zrušiť filtre
          </button>
        )}
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">{filtered.length} nápadov</p>
        <div className="grid gap-3">
          {filtered.map((idea, i) => {
            const isSaved = saved.has(idea.title);
            return (
              <div key={i} className={cn("flex items-center justify-between p-4 rounded-xl border transition-all",
                isSaved ? "border-rose-200 bg-rose-50/50" : "border-border bg-card hover:border-primary/20")}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{idea.emoji}</span>
                  <div>
                    <p className="font-medium text-sm">{idea.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {BUDGETS.find(b => b.key === idea.budget) && (
                        <span className="text-xs text-muted-foreground">{BUDGETS.find(b => b.key === idea.budget)?.label}</span>
                      )}
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-xs text-muted-foreground">{idea.time}</span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-xs text-muted-foreground">{idea.type === 'indoor' ? '🏠 Vnútri' : idea.type === 'outdoor' ? '🌳 Vonku' : '🔄'}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => toggleSaved(idea.title)}
                  className={cn("p-2 rounded-lg transition-all", isSaved ? "text-rose-500" : "text-muted-foreground hover:text-rose-400")}>
                  <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Žiadne nápady pre tieto filtre. Skús iné kombinácie.
            </div>
          )}
        </div>
      </div>

      {saved.size > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="font-semibold text-sm text-rose-800 mb-2">❤️ Uložené nápady ({saved.size})</p>
          <ul className="space-y-1">
            {[...saved].map(title => <li key={title} className="text-sm text-rose-700">{title}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
