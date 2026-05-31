import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Compass, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import { sk } from "date-fns/locale";

const AREAS = [
  { key: "communication", label: "Komunikácia", desc: "Rozprávame sa otvorene a navzájom si rozumieme.", icon: "💬" },
  { key: "closeness", label: "Blízkosť", desc: "Cítim sa emocionálne a fyzicky blízko k partnerovi.", icon: "❤️" },
  { key: "conflict", label: "Konflikty", desc: "Hádky zvládame dobre a nechávame ich za sebou.", icon: "⚡" },
  { key: "time_together", label: "Spoločný čas", desc: "Tráviť čas spolu – kvalitne a vedome.", icon: "🕰️" },
  { key: "overall", label: "Celkovo", desc: "Ako sa cítim vo vzťahu dnes celkovo.", icon: "🧭" },
];

const SCORE_LABELS = ["", "Zle", "Slabo", "Ujde", "Dobre", "Výborne"];
const SCORE_COLORS = ["", "bg-red-400", "bg-orange-400", "bg-amber-400", "bg-blue-400", "bg-green-500"];

function ScoreSlider({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => onChange(n)}
          className={cn("flex-1 h-9 rounded-lg border text-xs font-semibold transition-all",
            value === n ? `${SCORE_COLORS[n]} text-white border-transparent` : "border-border text-muted-foreground hover:border-primary/30")}>
          {n}
        </button>
      ))}
    </div>
  );
}

function ScanCard({ scan }) {
  const [open, setOpen] = useState(false);
  const avg = (Object.values(AREAS.reduce((acc, a) => ({ ...acc, [a.key]: scan[a.key] || 0 }), {})).reduce((s, v) => s + v, 0) / AREAS.length).toFixed(1);
  const avgScore = Math.round(avg);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm", SCORE_COLORS[avgScore] || "bg-muted")}>
            {avg}
          </div>
          <div className="text-left">
            <p className="font-medium text-sm">{scan.created_at ? format(new Date(scan.created_at), "d. MMMM yyyy", { locale: sk }) : "—"}</p>
            <p className="text-xs text-muted-foreground">{SCORE_LABELS[avgScore] || "—"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {AREAS.map(a => (
              <div key={a.key} className={cn("w-2 h-6 rounded-full", SCORE_COLORS[scan[a.key]] || "bg-muted")} title={a.label} />
            ))}
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2 border-t border-border/60">
          {AREAS.map(a => (
            <div key={a.key} className="flex items-center justify-between">
              <span className="text-sm">{a.icon} {a.label}</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(n => (
                    <div key={n} className={cn("w-4 h-4 rounded-sm", n <= (scan[a.key] || 0) ? SCORE_COLORS[scan[a.key]] : "bg-muted")} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground w-14 text-right">{SCORE_LABELS[scan[a.key]] || "—"}</span>
              </div>
            </div>
          ))}
          {scan.notes && <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3 mt-2">{scan.notes}</p>}
        </div>
      )}
    </div>
  );
}

export default function VztahKompas() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [scores, setScores] = useState({ communication: 0, closeness: 0, conflict: 0, time_together: 0, overall: 0 });
  const [notes, setNotes] = useState("");

  const { data: session } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: scans = [] } = useQuery({
    queryKey: ["compass-scans", session?.id],
    queryFn: () => dataApi.companion.compassScans.list({ session_id: session.id }),
    enabled: !!session,
  });

  const submit = useMutation({
    mutationFn: () => dataApi.companion.compassScans.create({ session_id: session.id, ...scores, notes }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["compass-scans"] });
      setShowForm(false);
      setScores({ communication: 0, closeness: 0, conflict: 0, time_together: 0, overall: 0 });
      setNotes("");
      toast.success("Kompas uložený!");
    },
  });

  const allFilled = Object.values(scores).every(v => v > 0);

  if (!session) return (
    <div className="text-center py-20 text-muted-foreground">Potrebuješ aktívnu reláciu s partnerom.</div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Vzťahový kompas</h1>
        </div>
        <p className="text-sm text-muted-foreground">Pravidelný sken vzťahu – nie diagnóza, ale mapa na rozhovor.</p>
      </div>

      <Button onClick={() => setShowForm(!showForm)} className="gap-2">
        <Plus className="w-4 h-4" /> Nový sken
      </Button>

      {showForm && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-5">
          <h2 className="font-semibold">Ako sa nám darí dnes?</h2>
          {AREAS.map(area => (
            <div key={area.key} className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{area.icon} {area.label}</p>
                  <p className="text-xs text-muted-foreground">{area.desc}</p>
                </div>
                {scores[area.key] > 0 && (
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full text-white", SCORE_COLORS[scores[area.key]])}>
                    {SCORE_LABELS[scores[area.key]]}
                  </span>
                )}
              </div>
              <ScoreSlider value={scores[area.key]} onChange={v => setScores(s => ({ ...s, [area.key]: v }))} />
            </div>
          ))}
          <div>
            <p className="text-sm font-medium mb-1.5">Čo by sme chceli zlepšiť?</p>
            <Textarea placeholder="Voliteľná poznámka..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} />
          </div>
          <Button className="w-full" onClick={() => submit.mutate()} disabled={!allFilled || submit.isPending}>
            Uložiť sken
          </Button>
        </div>
      )}

      {scans.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">História</p>
          {scans.map(s => <ScanCard key={s.id} scan={s} />)}
        </div>
      )}
      {scans.length === 0 && !showForm && (
        <div className="text-center py-12 text-muted-foreground text-sm">Zatiaľ žiadny sken. Klikni na „Nový sken".</div>
      )}
    </div>
  );
}
