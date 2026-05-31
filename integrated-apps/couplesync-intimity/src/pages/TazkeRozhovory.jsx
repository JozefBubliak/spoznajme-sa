import { useState } from "react";
import { TOPICS } from "@/lib/data/difficultTopics";
import { MessageSquare, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TazkeRozhovory() {
  const [openKey, setOpenKey] = useState(null);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Ťažké rozhovory</h1>
        </div>
        <p className="text-sm text-muted-foreground">Témy, ktoré sa odkladajú – s konkrétnymi vetami, ako začať.</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Ako to použiť</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            Vyberte tému, prečítajte si vety a vyberte tú, ktorá vám sedí. Nemusíte ju použiť doslova – je to len rozbehnutie rozhovoru.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {TOPICS.map(topic => {
          const isOpen = openKey === topic.key;
          return (
            <div key={topic.key} className={cn("rounded-xl border overflow-hidden transition-all",
              isOpen ? "border-primary/30 shadow-sm" : "border-border")}>
              <button
                className="w-full flex items-center gap-3 p-4 hover:bg-muted/20 transition-colors text-left"
                onClick={() => setOpenKey(isOpen ? null : topic.key)}>
                <span className="text-2xl leading-none">{topic.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{topic.title}</p>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-border/60">
                  <div className="space-y-2 pt-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Vety na začatie rozhovoru</p>
                    {topic.starters.map((s, i) => (
                      <div key={i} className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                        <p className="text-sm leading-relaxed italic text-foreground">"{s}"</p>
                      </div>
                    ))}
                  </div>
                  {topic.tips?.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tipy</p>
                      {topic.tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-center space-y-1">
        <p className="text-sm font-semibold">Pamätaj</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Ťažký rozhovor nie je hádka. Je to pozvanie do hlbšieho porozumenia. Cieľ nie je mať pravdu – cieľ je byť počutý/á a pochopiť.
        </p>
      </div>
    </div>
  );
}