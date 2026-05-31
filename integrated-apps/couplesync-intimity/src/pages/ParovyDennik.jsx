import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Trash2, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { format } from "date-fns";
import { sk } from "date-fns/locale";

const TAGS = ["Zistenie", "Spomienka", "Vďačnosť", "Výzva", "Moment", "Iné"];
const MOODS = ["😊", "❤️", "😂", "🥺", "😮", "💪"];
const TAG_COLORS = {
  Zistenie: "bg-blue-100 text-blue-700",
  Spomienka: "bg-amber-100 text-amber-700",
  Vďačnosť: "bg-green-100 text-green-700",
  Výzva: "bg-red-100 text-red-700",
  Moment: "bg-purple-100 text-purple-700",
  Iné: "bg-gray-100 text-gray-600",
};

export default function ParovyDennik() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [activeTag, setActiveTag] = useState("Všetky");
  const [form, setForm] = useState({ title: "", content: "", tag: "Moment", mood: "❤️" });

  const { data: session } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: entries = [] } = useQuery({
    queryKey: ["journal-entries", session?.id],
    queryFn: () => dataApi.companion.journalEntries.list({ session_id: session.id }),
    enabled: !!session,
  });

  const add = useMutation({
    mutationFn: () => dataApi.companion.journalEntries.create({ ...form, session_id: session.id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["journal-entries"] });
      setShowForm(false);
      setForm({ title: "", content: "", tag: "Moment", mood: "❤️" });
      toast.success("Zápis uložený!");
    },
  });
  const remove = useMutation({
    mutationFn: (id) => dataApi.companion.journalEntries.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journal-entries"] }),
  });

  const filtered = activeTag === "Všetky" ? entries : entries.filter(e => e.tag === activeTag);

  if (!session) return (
    <div className="text-center py-20 text-muted-foreground">Potrebuješ aktívnu reláciu s partnerom.</div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold">Párový denník</h1>
        </div>
        <p className="text-sm text-muted-foreground">Zdieľané záznamy – zistenia, spomienky, vďačnosť, výzvy.</p>
      </div>

      <Button onClick={() => setShowForm(!showForm)} className="gap-2">
        <Plus className="w-4 h-4" /> Nový záznam
      </Button>

      {showForm && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <Input placeholder="Nadpis..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <Textarea placeholder="Čo chceš zaznamenať?" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} />
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Štítok</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(tag => (
                <button key={tag} onClick={() => setForm(f => ({ ...f, tag }))}
                  className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-all",
                    form.tag === tag ? TAG_COLORS[tag] + " border-transparent" : "border-border text-muted-foreground hover:border-primary/30")}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Nálada</p>
            <div className="flex gap-3">
              {MOODS.map(m => (
                <button key={m} onClick={() => setForm(f => ({ ...f, mood: m }))}
                  className={cn("text-2xl transition-all", form.mood === m ? "scale-125" : "opacity-50 hover:opacity-80")}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => add.mutate()} disabled={!form.title || !form.content || add.isPending}>
              <Check className="w-4 h-4 mr-1.5" /> Uložiť
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}><X className="w-4 h-4" /></Button>
          </div>
        </div>
      )}

      {/* Tag filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["Všetky", ...TAGS].map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className={cn("px-3 py-1.5 rounded-full text-xs font-medium border shrink-0 transition-all",
              activeTag === tag ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/30")}>
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(entry => (
          <div key={entry.id} className="rounded-xl border border-border bg-card p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <span className="text-xl leading-none">{entry.mood || "📝"}</span>
                <div>
                  <p className="font-semibold text-sm">{entry.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {entry.tag && (
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", TAG_COLORS[entry.tag] || "bg-muted text-muted-foreground")}>
                        {entry.tag}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {entry.created_at ? format(new Date(entry.created_at), "d. M. yyyy", { locale: sk }) : ""}
                    </span>
                    <span className="text-xs text-muted-foreground">· {entry.user_id === user?.id ? "Ty" : "Partner/ka"}</span>
                  </div>
                </div>
              </div>
              {entry.user_id === user?.id && (
                <button onClick={() => remove.mutate(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{entry.content}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">
            {activeTag === "Všetky" ? "Zatiaľ žiadne záznamy." : `Žiadne záznamy s tagom „${activeTag}".`}
          </div>
        )}
      </div>
    </div>
  );
}
