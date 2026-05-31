import { useState } from "react";
import { ROUNDS } from "@/lib/data/thirtySixQuestions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-100 text-blue-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100 text-purple-700" },
  rose:   { bg: "bg-rose-50",   border: "border-rose-200",   text: "text-rose-700",   badge: "bg-rose-100 text-rose-700" },
};

export default function TridsiestSestOtazok() {
  const [activeRound, setActiveRound] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [discussed, setDiscussed] = useState(new Set());

  const round = ROUNDS[activeRound];
  const question = round.questions[questionIdx];
  const qKey = `${activeRound}-${questionIdx}`;
  const isDiscussed = discussed.has(qKey);
  const colors = COLORS[round.color];

  const totalQuestions = ROUNDS.reduce((s, r) => s + r.questions.length, 0);
  const currentTotal = ROUNDS.slice(0, activeRound).reduce((s, r) => s + r.questions.length, 0) + questionIdx + 1;
  const totalDiscussed = discussed.size;

  const goNext = () => {
    if (questionIdx < round.questions.length - 1) setQuestionIdx(q => q + 1);
    else if (activeRound < ROUNDS.length - 1) { setActiveRound(r => r + 1); setQuestionIdx(0); }
  };

  const goPrev = () => {
    if (questionIdx > 0) setQuestionIdx(q => q - 1);
    else if (activeRound > 0) { setActiveRound(r => r - 1); setQuestionIdx(ROUNDS[activeRound - 1].questions.length - 1); }
  };

  const toggleDiscussed = () => {
    const next = new Set(discussed);
    if (next.has(qKey)) next.delete(qKey); else next.add(qKey);
    setDiscussed(next);
    if (!next.has(qKey)) return;
    if (questionIdx < round.questions.length - 1) setTimeout(() => setQuestionIdx(q => q + 1), 300);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">36 Otázok</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Vedecky overená metóda pre hlbšie spoznanie. Prechádzajte otázkami spolu – obaja odpovedajte na každú.
        </p>
      </div>

      {/* Overall progress */}
      <div className="rounded-xl bg-muted/50 p-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Celkový postup</span>
        <span className="font-semibold text-sm">{totalDiscussed} / {totalQuestions}</span>
      </div>

      {/* Round tabs */}
      <div className="grid grid-cols-3 gap-2">
        {ROUNDS.map((r, i) => {
          const c = COLORS[r.color];
          const done = r.questions.filter((_, qi) => discussed.has(`${i}-${qi}`)).length;
          return (
            <button key={r.id} onClick={() => { setActiveRound(i); setQuestionIdx(0); }}
              className={cn("p-3 rounded-xl border text-left transition-all",
                i === activeRound ? `${c.bg} ${c.border}` : "border-border hover:border-primary/20 bg-card")}>
              <p className={cn("text-xs font-semibold", i === activeRound ? c.text : "text-muted-foreground")}>Kolo {r.id}</p>
              <p className={cn("text-xs mt-0.5 font-bold", c.badge.split(" ")[1] && i === activeRound ? c.text : "text-foreground")}>{done}/{r.questions.length}</p>
            </button>
          );
        })}
      </div>

      {/* Round header */}
      <div className={cn("rounded-xl border p-3", colors.bg, colors.border)}>
        <p className={cn("font-semibold text-sm", colors.text)}>{round.title}</p>
        <p className="text-xs text-muted-foreground">{round.subtitle}</p>
      </div>

      {/* Question card */}
      <div className={cn("rounded-2xl border p-8 min-h-[200px] flex items-center justify-center transition-all",
        isDiscussed ? "border-green-200 bg-green-50/30" : "border-border bg-card")}>
        <div className="text-center space-y-4 max-w-lg">
          <p className="text-xs text-muted-foreground">{currentTotal} z {totalQuestions}</p>
          <p className="text-xl font-semibold leading-relaxed">{question}</p>
          {isDiscussed && (
            <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-100 px-3 py-1 rounded-full font-medium">
              <Check className="w-3 h-3" /> Prebrané
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={goPrev} disabled={activeRound === 0 && questionIdx === 0}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant={isDiscussed ? "outline" : "default"}
          className={cn("flex-1 gap-2", isDiscussed && "border-green-300 text-green-700 hover:bg-green-50")}
          onClick={toggleDiscussed}>
          <Check className="w-4 h-4" />
          {isDiscussed ? "Zrušiť ✓" : "Prebrané – ďalšia"}
        </Button>
        <Button variant="outline" size="icon" onClick={goNext}
          disabled={activeRound === ROUNDS.length - 1 && questionIdx === round.questions.length - 1}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* All questions in this round */}
      <details className="group">
        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
          Všetky otázky tohto kola ({round.questions.length})
        </summary>
        <div className="mt-3 space-y-1.5">
          {round.questions.map((q, qi) => {
            const key = `${activeRound}-${qi}`;
            const done = discussed.has(key);
            return (
              <button key={qi} onClick={() => setQuestionIdx(qi)}
                className={cn("w-full flex items-start gap-2 p-2.5 rounded-lg text-left text-sm transition-all",
                  qi === questionIdx ? `${colors.bg} ${colors.border} border` : "hover:bg-muted/50",
                  done ? "opacity-60" : "")}>
                <span className={cn("w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                  done ? "border-green-400 bg-green-100" : "border-muted-foreground/40")}>
                  {done && <Check className="w-2.5 h-2.5 text-green-600" />}
                </span>
                <span className={done ? "line-through text-muted-foreground" : ""}>{q}</span>
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}