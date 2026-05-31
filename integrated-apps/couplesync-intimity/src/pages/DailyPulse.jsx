import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Zap, Check, Lock, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const TODAY = new Date().toISOString().slice(0, 10);
const DAY_OF_YEAR = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);

const QUESTIONS = [
  { id: "dp1", text: "Čo ti dnes dalo energiu?", emoji: "⚡", options: ["Práca alebo škola", "Čas s ľuďmi", "Čas sám/sama", "Niečo prekvapivé", "Nič moc, bol to ťažký deň"] },
  { id: "dp2", text: "Ako sa dnes cítiš vo vzťahu?", emoji: "💛", options: ["Veľmi blízko a prepojene", "Dobre, v pohode", "Trochu vzdialene", "Potrebujem viac pozornosti", "Som unavený/á — potrebujem len kľud"] },
  { id: "dp3", text: "Čo by si dnes potreboval/a od partnera najviac?", emoji: "🤍", options: ["Objatie alebo fyzický kontakt", "Pochvalu alebo slová uznania", "Čas strávený spolu", "Pomoc s niečím konkrétnym", "Priestor a ticho"] },
  { id: "dp4", text: "Čo ťa dnes prekvapilo?", emoji: "✨", options: ["Niečo príjemné", "Niečo nepríjemné", "Sám/sama seba", "Partner/ka", "Nič zvláštne"] },
  { id: "dp5", text: "Ako si spokojný/á s dnešným večerom?", emoji: "🌙", options: ["Chcem byť len s partnerom/kou", "Chcem byť v spoločnosti", "Chcem byť sám/sama", "Je mi to jedno", "Mám konkrétny plán"] },
  { id: "dp6", text: "Čo ťa dnes stresovalo?", emoji: "🌊", options: ["Práca alebo škola", "Peniaze alebo zodpovednosti", "Vzťahy s ľuďmi", "Zdravie", "Nič konkrétne"] },
  { id: "dp7", text: "Aká nálada ťa dnes sprevádza?", emoji: "🎨", options: ["Hravá a ľahká", "Pokojná a zemitá", "Zamyslená a tichá", "Napätá alebo rozhnevaná", "Smutná alebo melancholická"] },
  { id: "dp8", text: "Čo by si chcel/a dnes večer zažiť?", emoji: "🕯️", options: ["Blízkosť a intímny čas", "Spoločný film alebo seriál", "Rozhovor o niečom hlbšom", "Tichú večeru bez telefónu", "Každý len svoje — a to je OK"] },
  { id: "dp9", text: "Ako veľmi si dnes myslel/a na partnera?", emoji: "💭", options: ["Veľmi — bol/a si mi v myšlienkach", "Normálne — pár krát", "Málo — bol som zaneprázdnený/á", "Vôbec — bol to náročný deň", "Záleží čo myslíš..."] },
  { id: "dp10", text: "Čo by si chcel/a dnes partnerovi/ke povedať?", emoji: "💬", options: ["Ďakujem za niečo konkrétne", "Prepáč za niečo", "Milujem ťa — a nestačím to hovoriť dosť", "Potrebujem si pohovoriť", "Nič špeciálne — je to OK"] },
  { id: "dp11", text: "Ako sa cítiš vo vlastnom tele dnes?", emoji: "🌱", options: ["Silný/á a vitálny/á", "V poriadku", "Unavený/á", "Nepríjemne — niečo mi nesedí", "Potrebujem pohyb alebo dotyky"] },
  { id: "dp12", text: "Čo ti robí radosť bez ohľadu na to, čo sa deje?", emoji: "🌞", options: ["Príroda alebo čerstvý vzduch", "Hudba alebo umenie", "Jedlo a pohoda", "Smech a ľudia", "Ticho a pokoj"] },
  { id: "dp13", text: "Nakoľko si dnes otvorený/á novým zážitkom?", emoji: "🚪", options: ["Veľmi — som zvedavý/á", "Trochu — záleží čo", "Radšej v bezpečnej zóne", "Dnes nie — potrebujem rutinu", "Závisí od toho, s kým"] },
  { id: "dp14", text: "Ako si sa zobudil/a?", emoji: "🌅", options: ["Oddýchnutý/á a nabití/á", "Pomaly, ale dobre", "Unavený/á napriek spánku", "Nervózny/á z niečoho", "Úprimne — nerád/a"] },
  { id: "dp15", text: "Čo ti dnes chýba?", emoji: "🫧", options: ["Viac pokoja", "Viac blízkosti", "Viac zábavy", "Viac priestoru", "Nič mi nechýba — je to dobré"] },
];

const QUESTION = QUESTIONS[DAY_OF_YEAR % QUESTIONS.length];

export default function DailyPulse() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: mySession, isLoading: loadingSession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: todayPulses = [], isLoading: loadingPulses } = useQuery({
    queryKey: ["daily-pulse", mySession?.id, TODAY],
    queryFn: () => dataApi.companion.dailyPulses.list(mySession.id, TODAY),
    enabled: !!mySession,
  });

  const myPulse = todayPulses.find((p) => p.user_id === user?.id);
  const partnerPulse = todayPulses.find((p) => p.user_id !== user?.id);
  const bothAnswered = !!myPulse && !!partnerPulse;

  const savePulse = useMutation({
    mutationFn: (answer) => dataApi.companion.dailyPulses.save({
      session_id: mySession.id,
      user_id: user.id,
      date: TODAY,
      question_id: QUESTION.id,
      answer,
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["daily-pulse"] }),
  });

  if (loadingSession || loadingPulses) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  if (!mySession) return (
    <div className="text-center py-20 space-y-4">
      <p className="text-muted-foreground">Najprv si vytvor reláciu s partnerom.</p>
      <Link to="/app"><Button>Prejsť na hlavnú</Button></Link>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
          <Zap className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Denný impulz</h1>
          <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="text-3xl text-center">{QUESTION.emoji}</div>
        <p className="text-lg font-semibold text-center leading-snug">{QUESTION.text}</p>
      </div>

      {/* My answer */}
      {!myPulse ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground font-medium">Tvoja odpoveď:</p>
          {QUESTION.options.map((opt) => (
            <button
              key={opt}
              onClick={() => savePulse.mutate(opt)}
              disabled={savePulse.isPending}
              className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/40 transition-all text-sm"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600 shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-800">Odpovedal/a si</p>
            <p className="text-sm text-green-700">„{myPulse.answer}"</p>
          </div>
        </div>
      )}

      {/* Partner status */}
      {myPulse && (
        <div className={cn(
          "rounded-xl border p-4",
          bothAnswered ? "border-primary/20 bg-primary/5" : "border-amber-200 bg-amber-50"
        )}>
          {bothAnswered ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary">Obaja ste odpovedali! 🎉</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-[10px] text-blue-500 font-semibold uppercase mb-1">Ty</p>
                  <p className="text-xs font-medium text-blue-900">{myPulse.answer}</p>
                </div>
                <div className="rounded-lg bg-pink-50 p-3">
                  <p className="text-[10px] text-pink-500 font-semibold uppercase mb-1">Partner/ka</p>
                  <p className="text-xs font-medium text-pink-900">{partnerPulse.answer}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800">Čaká sa na odpoveď partnera. Výsledok sa zobrazí po odpovedaní oboch.</p>
            </div>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
        <RefreshCw className="w-3 h-3" /> Otázka sa mení každý deň
      </p>
    </div>
  );
}
