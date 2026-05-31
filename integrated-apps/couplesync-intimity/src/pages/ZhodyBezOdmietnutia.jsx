import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { PROPOSALS, CATEGORIES } from "@/lib/data/matchingProposals";
import { Loader2, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ANSWER_CONFIG = {
  yes:   { label: "Áno 💚",    bg: "bg-green-500 text-white border-green-500", light: "bg-green-50 border-green-300 text-green-700" },
  maybe: { label: "Možno 💛",  bg: "bg-amber-500 text-white border-amber-500", light: "bg-amber-50 border-amber-300 text-amber-700" },
  later: { label: "Neskôr 🔵", bg: "bg-blue-500 text-white border-blue-500",   light: "bg-blue-50 border-blue-300 text-blue-700" },
  no:    { label: "Nie ❌",     bg: "bg-gray-200 text-gray-600 border-gray-300", light: "bg-gray-50 border-gray-200 text-gray-500" },
};

export default function ZhodyBezOdmietnutia() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [activeCategory, setActiveCategory] = useState("Všetky");

  const { data: session } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: allAnswers = [], isLoading } = useQuery({
    queryKey: ["matching-answers", session?.id],
    queryFn: () => dataApi.companion.matchingAnswers.list(session.id),
    enabled: !!session,
  });

  const answerStateMap = Object.fromEntries(allAnswers.map(a => [a.proposal_key, a]));
  const myAnswerMap = Object.fromEntries(allAnswers.map(a => [a.proposal_key, a.my_answer]));

  const saveAnswer = useMutation({
    mutationFn: ({ key, answer }) => dataApi.companion.matchingAnswers.save({
      session_id: session.id,
      user_id: user.id,
      proposal_key: key,
      answer,
    }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["matching-answers"] }),
  });

  const matches = PROPOSALS.filter(p => answerStateMap[p.key]?.is_match);

  const filtered = activeCategory === "Všetky" ? PROPOSALS : PROPOSALS.filter(p => p.category === activeCategory);

  if (!session) return (
    <div className="text-center py-20 text-muted-foreground">
      <p>Potrebuješ aktívnu reláciu s partnerom.</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Zhody bez odmietnutia</h1>
        <p className="text-sm text-muted-foreground">Odpovedáte samostatne – vidíte iba to, kde sa zhodujete. Nič iné.</p>
      </div>

      {matches.length > 0 && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-green-600 fill-green-200" />
            <p className="font-semibold text-sm text-green-800">Vaše zhody ({matches.length})</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {matches.map(p => (
              <span key={p.key} className="text-sm bg-white border border-green-200 rounded-full px-3 py-1">
                {p.icon} {p.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Všetky", ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={cn("px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 transition-all",
              activeCategory === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(proposal => {
            const myAns = myAnswerMap[proposal.key];
            return (
              <div key={proposal.key} className={cn("rounded-xl border p-4 space-y-3 transition-all",
                myAns === "yes" ? "border-green-200 bg-green-50/50" :
                myAns === "maybe" ? "border-amber-200 bg-amber-50/50" :
                myAns === "later" ? "border-blue-100 bg-blue-50/30" :
                "border-border bg-card")}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5">{proposal.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{proposal.category}</p>
                    <p className="font-medium text-sm">{proposal.title}</p>
                  </div>
                  {answerStateMap[proposal.key]?.partner_answered && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium shrink-0">
                      Partner odp.
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(["yes", "maybe", "later", "no"]).map(ans => {
                    const cfg = ANSWER_CONFIG[ans];
                    const isSelected = myAns === ans;
                    return (
                      <button key={ans}
                        onClick={() => saveAnswer.mutate({ key: proposal.key, answer: ans })}
                        className={cn("py-1.5 px-1 rounded-lg border text-xs font-medium transition-all",
                          isSelected ? cfg.bg : "border-border text-muted-foreground hover:border-primary/30 bg-background")}>
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {matches.length === 0 && allAnswers.length > 5 && (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary/40" />
          <p>Zatiaľ žiadne zhody. Nechaj partnera odpovedať.</p>
        </div>
      )}
    </div>
  );
}
