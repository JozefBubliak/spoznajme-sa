import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { QUESTIONS } from "@/lib/data/mutualProfileQuestions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Users, BarChart3, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function AnswerGrid({ question, selected, onSelect }) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">{question.label}</p>
      <div className="grid grid-cols-2 gap-2">
        {question.options.map(opt => (
          <button key={opt} onClick={() => onSelect(opt)}
            className={cn("p-2.5 rounded-lg border text-xs font-medium text-left transition-all",
              selected === opt ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/30 bg-card")}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function VzajomnyProfil() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [selfAnswers, setSelfAnswers] = useState({});
  const [guessAnswers, setGuessAnswers] = useState({});

  const { data: session } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: allAnswers = [], isLoading } = useQuery({
    queryKey: ["mutual-answers", session?.id],
    queryFn: () => dataApi.companion.mutualAnswers.list(session.id, QUESTIONS.length),
    enabled: !!session,
  });

  useEffect(() => {
    const mine = allAnswers.filter(a => a.user_id === user?.id);
    const selfMap = {};
    const guessMap = {};
    mine.forEach(a => { selfMap[a.question_key] = a.self_answer; guessMap[a.question_key] = a.partner_guess; });
    setSelfAnswers(selfMap);
    setGuessAnswers(guessMap);
  }, [allAnswers, user?.id]);

  const save = useMutation({
    mutationFn: async () => {
      const ops = QUESTIONS.map(q => {
        const data = { session_id: session.id, user_id: user.id, question_key: q.key, self_answer: selfAnswers[q.key] || null, partner_guess: guessAnswers[q.key] || null };
        return dataApi.companion.mutualAnswers.save(data);
      });
      await Promise.all(ops);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["mutual-answers"] }); toast.success("Uložené!"); },
  });

  const myAnswers = allAnswers.filter(a => a.user_id === user?.id);
  const partnerAnswers = allAnswers.filter(a => a.user_id !== user?.id);

  // Results: how well did partner guess me?
  const partnerGuessMap = Object.fromEntries(partnerAnswers.map(a => [a.question_key, a.partner_guess]));
  const mySelfMap = Object.fromEntries(myAnswers.map(a => [a.question_key, a.self_answer]));
  const myGuessMap = Object.fromEntries(myAnswers.map(a => [a.question_key, a.partner_guess]));
  const partnerSelfMap = Object.fromEntries(partnerAnswers.map(a => [a.question_key, a.self_answer]));

  const hasMyData = myAnswers.some(a => a.self_answer);
  const hasPartnerData = partnerAnswers.some(a => a.self_answer);

  const results = QUESTIONS.map(q => {
    const partnerGuessedMe = partnerGuessMap[q.key];
    const iKnowMe = mySelfMap[q.key];
    const iGuessedPartner = myGuessMap[q.key];
    const partnerKnowsThemself = partnerSelfMap[q.key];
    return {
      ...q,
      partnerGuessedMe,
      iKnowMe,
      iGuessedPartner,
      partnerKnowsThemself,
      partnerCorrect: partnerGuessedMe && iKnowMe && partnerGuessedMe === iKnowMe,
      iCorrect: iGuessedPartner && partnerKnowsThemself && iGuessedPartner === partnerKnowsThemself,
    };
  });

  const partnerScore = results.filter(r => r.partnerCorrect).length;
  const myScore = results.filter(r => r.iCorrect).length;
  const filledCount = results.filter(r => r.iKnowMe).length;

  if (!session) return (
    <div className="text-center py-20 text-muted-foreground">Potrebuješ aktívnu reláciu s partnerom.</div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Ako dobre sa poznáme?</h1>
        </div>
        <p className="text-sm text-muted-foreground">Odpovedajte nezávisle. Potom porovnajte – odhalíte slepé miesta.</p>
      </div>

      <Tabs defaultValue="self">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="self" className="gap-1.5"><User className="w-3.5 h-3.5" />O mne</TabsTrigger>
          <TabsTrigger value="guess" className="gap-1.5"><Users className="w-3.5 h-3.5" />O partnerovi</TabsTrigger>
          <TabsTrigger value="results" className="gap-1.5" disabled={!hasMyData || !hasPartnerData}>
            <BarChart3 className="w-3.5 h-3.5" />Výsledky
          </TabsTrigger>
        </TabsList>

        <TabsContent value="self" className="mt-4 space-y-5">
          <p className="text-sm text-muted-foreground">Odpovedaj za seba – čo platí pre teba?</p>
          {QUESTIONS.map(q => (
            <AnswerGrid key={q.key} question={q} selected={selfAnswers[q.key]}
              onSelect={v => setSelfAnswers(prev => ({ ...prev, [q.key]: v }))} />
          ))}
          <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending}>
            <Check className="w-4 h-4 mr-1.5" /> Uložiť odpovede o mne ({filledCount}/{QUESTIONS.length})
          </Button>
        </TabsContent>

        <TabsContent value="guess" className="mt-4 space-y-5">
          <p className="text-sm text-muted-foreground">Tipuj, ako by odpovedal/a tvoj partner/partnerka.</p>
          {QUESTIONS.map(q => (
            <AnswerGrid key={q.key} question={q} selected={guessAnswers[q.key]}
              onSelect={v => setGuessAnswers(prev => ({ ...prev, [q.key]: v }))} />
          ))}
          <Button className="w-full" onClick={() => save.mutate()} disabled={save.isPending}>
            <Check className="w-4 h-4 mr-1.5" /> Uložiť tipy o partnerovi
          </Button>
        </TabsContent>

        <TabsContent value="results" className="mt-4 space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{partnerScore}/{QUESTIONS.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Partner uhádol mňa</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center">
                  <p className="text-3xl font-bold text-primary">{myScore}/{QUESTIONS.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ja uhádol/a partnera</p>
                </div>
              </div>

              <div className="space-y-3">
                {results.map(r => {
                  if (!r.iKnowMe || !r.partnerKnowsThemself) return null;
                  const correct = r.iCorrect;
                  return (
                    <div key={r.key} className={cn("rounded-xl border p-3 space-y-2",
                      correct ? "border-green-200 bg-green-50/50" : "border-amber-200 bg-amber-50/50")}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground">{r.label}</p>
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", correct ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                          {correct ? "✅ Trafil/a si" : "🟡 Inak"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-blue-500 font-medium mb-0.5">Partner/ka o sebe</p>
                          <p className="font-semibold text-blue-800">{r.partnerKnowsThemself || "—"}</p>
                        </div>
                        <div className={cn("rounded-lg p-2", correct ? "bg-green-50" : "bg-amber-50")}>
                          <p className={cn("font-medium mb-0.5", correct ? "text-green-500" : "text-amber-500")}>Môj tip</p>
                          <p className={cn("font-semibold", correct ? "text-green-800" : "text-amber-800")}>{r.iGuessedPartner || "—"}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {!hasPartnerData && (
                <p className="text-center text-sm text-muted-foreground py-4">Čaká sa na odpovede partnera/partnerky.</p>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
