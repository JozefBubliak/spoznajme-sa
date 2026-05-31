import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Calendar, Gift, Star, Plus, Trash2, Check, Edit3, X, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FREE_TIPS = [
  "Napíš jej konkrétnu pochvalu – nie 'si super', ale čo konkrétne si si na nej dnes všimol.",
  "Vypni mobil počas rozhovoru a venuj jej plnú pozornosť.",
  "Priprav jej čaj alebo kávu bez toho, aby ťa o to požiadala.",
  "Prevezmi jednu povinnosť, ktorú zvyčajne robí ona.",
  "Pošli jej správu uprostred dňa – prečo si rád/rada, že ju máš.",
  "Opýtaj sa jej: 'Čo ti dnes najviac zobralo energiu?'",
  "Daj jej 10 minút len pre seba – bez prerušenia.",
];
const SMALL_TIPS = [
  "Kúp jej obľúbené sladkosti alebo kvietok.",
  "Vezmi jej obľúbenú kávu bez pýtania.",
  "Kúp lístky do kina na film, ktorý chcela vidieť.",
  "Objednaj jej obľúbené jedlo na doručenie.",
];
const CHALLENGE_TIPS = [
  "Napíš jej list – rukou, nie správou.",
  "Naplánuj prekvapenie na víkend – nehovor čo, len čas.",
  "Zorganizuj večer podľa toho, čo má ona najradšej.",
  "Zavolaj jej uprostred dňa len preto, aby si povedal/a, že na ňu myslíš.",
];

function pickByDay(arr) {
  const d = new Date().getDay() + new Date().getDate();
  return arr[d % arr.length];
}

function DnesTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Každý deň jeden nápad – podľa tvojich možností.</p>
      {[
        { label: "Nulový rozpočet", icon: "💚", tip: pickByDay(FREE_TIPS), color: "bg-green-50 border-green-200" },
        { label: "Malý rozpočet", icon: "💛", tip: pickByDay(SMALL_TIPS), color: "bg-amber-50 border-amber-200" },
        { label: "Výzva týždňa", icon: "💜", tip: pickByDay(CHALLENGE_TIPS), color: "bg-purple-50 border-purple-200" },
      ].map(({ label, icon, tip, color }) => (
        <div key={label} className={cn("rounded-xl border p-4 space-y-1", color)}>
          <p className="text-xs font-semibold text-muted-foreground">{icon} {label}</p>
          <p className="text-sm font-medium leading-relaxed">{tip}</p>
        </div>
      ))}
    </div>
  );
}

function ProfilTab({ user }) {
  const qc = useQueryClient();
  const { data: profile = {} } = useQuery({
    queryKey: ["partner-profile", user?.id],
    queryFn: () => dataApi.companion.partnerProfiles.getMine(),
    enabled: !!user,
  });
  const [form, setForm] = useState(null);

  const save = useMutation({
    mutationFn: async (data) => {
      return dataApi.companion.partnerProfiles.save({ ...data, user_id: user.id });
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["partner-profile"] }); setForm(null); toast.success("Uložené!"); },
  });

  const fields = [
    { key: "flowers", label: "Obľúbené kvety", placeholder: "napr. tulipány, ruže..." },
    { key: "coffee", label: "Obľúbená káva", placeholder: "napr. flatwhite, cappuccino..." },
    { key: "chocolate", label: "Obľúbené sladkosti", placeholder: "napr. tmavá čokoláda..." },
    { key: "clothing_size", label: "Veľkosť oblečenia", placeholder: "napr. S, M, 38..." },
    { key: "shoe_size", label: "Veľkosť topánok", placeholder: "napr. 39..." },
    { key: "film_genre", label: "Obľúbený žáner", placeholder: "napr. komédia, thriller..." },
    { key: "favorite_place", label: "Obľúbené miesto", placeholder: "kaviareň, park, hora..." },
    { key: "hard_day_help", label: "Po ťažkom dni pomáha", placeholder: "objatie, ticho, jedlo..." },
    { key: "gift_dont", label: "Ako darček NIE", placeholder: "čo nechce dostať..." },
    { key: "wishes", label: "Raz spomínala/spomínal, že chce...", placeholder: "túžby, plány..." },
  ];

  const editing = form !== null;
  const current = editing ? form : profile;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Uložené preferencie tvojho partnera/partnerky.</p>
        {!editing && (
          <Button size="sm" variant="outline" onClick={() => setForm({ ...profile })} className="gap-1.5">
            <Edit3 className="w-3.5 h-3.5" /> Upraviť
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <p className="text-xs font-medium text-muted-foreground mb-1">{label}</p>
            {editing ? (
              <Input
                placeholder={placeholder}
                value={form[key] || ""}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              />
            ) : (
              <p className={cn("text-sm px-3 py-2 rounded-lg", profile[key] ? "bg-muted/50" : "text-muted-foreground italic")}>
                {profile[key] || "—"}
              </p>
            )}
          </div>
        ))}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Ďalšie poznámky</p>
          {editing ? (
            <Textarea
              placeholder="Čokoľvek, čo si chceš pamätať..."
              value={form.notes || ""}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              rows={3}
            />
          ) : (
            <p className={cn("text-sm px-3 py-2 rounded-lg", profile.notes ? "bg-muted/50" : "text-muted-foreground italic")}>
              {profile.notes || "—"}
            </p>
          )}
        </div>
      </div>
      {editing && (
        <div className="flex gap-2">
          <Button onClick={() => save.mutate(form)} disabled={save.isPending} className="flex-1 gap-2">
            <Check className="w-4 h-4" /> Uložiť profil
          </Button>
          <Button variant="outline" onClick={() => setForm(null)}><X className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  );
}

function DatumuTab({ user }) {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", month: "", day: "", year: "", type: "výročie", notes: "" });

  const { data: dates = [] } = useQuery({
    queryKey: ["relationship-dates", user?.id],
    queryFn: () => dataApi.companion.relationshipDates.list(),
    enabled: !!user,
  });

  const add = useMutation({
    mutationFn: () => dataApi.companion.relationshipDates.create({ ...form, month: +form.month, day: +form.day, year: form.year ? +form.year : null }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["relationship-dates"] }); setShowForm(false); setForm({ title: "", month: "", day: "", year: "", type: "výročie", notes: "" }); toast.success("Dátum uložený!"); },
  });
  const remove = useMutation({
    mutationFn: (id) => dataApi.companion.relationshipDates.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["relationship-dates"] }),
  });

  const daysUntil = (month, day) => {
    const now = new Date();
    const thisYear = new Date(now.getFullYear(), month - 1, day);
    const nextYear = new Date(now.getFullYear() + 1, month - 1, day);
    const target = thisYear >= now ? thisYear : nextYear;
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  };

  const sorted = [...dates].sort((a, b) => daysUntil(a.month, a.day) - daysUntil(b.month, b.day));

  return (
    <div className="space-y-4">
      <Button size="sm" onClick={() => setShowForm(!showForm)} className="gap-1.5">
        <Plus className="w-4 h-4" /> Pridať dátum
      </Button>
      {showForm && (
        <div className="rounded-xl border border-border p-4 space-y-3 bg-card">
          <Input placeholder="Názov (napr. Výročie, Narodeniny Zuzky...)" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-3 gap-2">
            <Input placeholder="Mesiac" type="number" min="1" max="12" value={form.month} onChange={e => setForm(f => ({ ...f, month: e.target.value }))} />
            <Input placeholder="Deň" type="number" min="1" max="31" value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))} />
            <Input placeholder="Rok (vol.)" type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
          </div>
          <select className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
            {["výročie", "narodeniny", "prvé rande", "svadba", "iné"].map(t => <option key={t}>{t}</option>)}
          </select>
          <Input placeholder="Poznámka" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          <Button className="w-full" onClick={() => add.mutate()} disabled={!form.title || !form.month || !form.day}>Uložiť</Button>
        </div>
      )}
      <div className="space-y-2">
        {sorted.map(d => {
          const days = daysUntil(d.month, d.day);
          const urgent = days <= 14;
          return (
            <div key={d.id} className={cn("flex items-center justify-between p-3 rounded-xl border", urgent ? "border-amber-300 bg-amber-50" : "border-border bg-card")}>
              <div>
                <p className="font-medium text-sm">{d.title}</p>
                <p className="text-xs text-muted-foreground">{d.day}.{d.month}.{d.year || ""} · {d.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full", urgent ? "bg-amber-200 text-amber-800" : "bg-muted text-muted-foreground")}>
                  {days === 0 ? "Dnes! 🎉" : `za ${days} dní`}
                </span>
                <button onClick={() => remove.mutate(d.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        {dates.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">Zatiaľ žiadne dátumy.</p>}
      </div>
    </div>
  );
}

function DarcekTab({ user }) {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Zážitok", budget: "do 10€", notes: "" });

  const { data: gifts = [] } = useQuery({
    queryKey: ["gift-notes", user?.id],
    queryFn: () => dataApi.companion.giftNotes.list(),
    enabled: !!user,
  });

  const add = useMutation({
    mutationFn: () => dataApi.companion.giftNotes.create(form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["gift-notes"] }); setShowForm(false); setForm({ title: "", category: "Zážitok", budget: "do 10€", notes: "" }); toast.success("Uložené!"); },
  });
  const toggle = useMutation({
    mutationFn: ({ id, used }) => dataApi.companion.giftNotes.update(id, { used: !used }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gift-notes"] }),
  });
  const remove = useMutation({
    mutationFn: (id) => dataApi.companion.giftNotes.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gift-notes"] }),
  });

  const unused = gifts.filter(g => !g.used);
  const used = gifts.filter(g => g.used);

  return (
    <div className="space-y-4">
      <Button size="sm" onClick={() => setShowForm(!showForm)} className="gap-1.5">
        <Plus className="w-4 h-4" /> Pridať nápad
      </Button>
      {showForm && (
        <div className="rounded-xl border border-border p-4 space-y-3 bg-card">
          <Input placeholder="Nápad na darček..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          <div className="grid grid-cols-2 gap-2">
            <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {["Zážitok", "Kvety", "Jedlo & nápoje", "Oblečenie", "Kozmetika", "Knihy", "Iné"].map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
              {["Bezplatné", "do 10€", "10–30€", "30–100€", "100€+"].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <Input placeholder="Poznámka" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          <Button className="w-full" onClick={() => add.mutate()} disabled={!form.title}>Uložiť</Button>
        </div>
      )}
      <div className="space-y-2">
        {unused.map(g => (
          <div key={g.id} className="flex items-start justify-between p-3 rounded-xl border border-border bg-card gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{g.title}</p>
              <p className="text-xs text-muted-foreground">{g.category} · {g.budget}</p>
              {g.notes && <p className="text-xs text-muted-foreground mt-0.5">{g.notes}</p>}
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => toggle.mutate({ id: g.id, used: g.used })} className="p-1.5 rounded-md hover:bg-green-50 text-muted-foreground hover:text-green-600 transition-colors" title="Označiť ako použité">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => remove.mutate(g.id)} className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {unused.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Žiadne nevyužité nápady.</p>}
        {used.length > 0 && (
          <details className="mt-4">
            <summary className="text-xs text-muted-foreground cursor-pointer">Využité ({used.length})</summary>
            <div className="space-y-2 mt-2">
              {used.map(g => (
                <div key={g.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 opacity-60">
                  <div>
                    <p className="text-sm line-through">{g.title}</p>
                    <p className="text-xs text-muted-foreground">{g.category} · {g.budget}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => toggle.mutate({ id: g.id, used: g.used })} className="p-1.5 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
                    <button onClick={() => remove.mutate(g.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}

export default function NezabudniNaNU() {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
          <h1 className="text-2xl font-bold">Nezabudni na ňu</h1>
        </div>
        <p className="text-muted-foreground text-sm">Vzťahový pomocník – malé veci, ktoré udržujú vzťah živý.</p>
      </div>
      <Tabs defaultValue="dnes">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="dnes" className="gap-1.5"><Lightbulb className="w-3.5 h-3.5" /><span className="hidden sm:inline">Dnes</span></TabsTrigger>
          <TabsTrigger value="profil" className="gap-1.5"><Star className="w-3.5 h-3.5" /><span className="hidden sm:inline">Profil</span></TabsTrigger>
          <TabsTrigger value="datumy" className="gap-1.5"><Calendar className="w-3.5 h-3.5" /><span className="hidden sm:inline">Dátumy</span></TabsTrigger>
          <TabsTrigger value="darcek" className="gap-1.5"><Gift className="w-3.5 h-3.5" /><span className="hidden sm:inline">Darčeky</span></TabsTrigger>
        </TabsList>
        <TabsContent value="dnes" className="mt-4"><DnesTab /></TabsContent>
        <TabsContent value="profil" className="mt-4"><ProfilTab user={user} /></TabsContent>
        <TabsContent value="datumy" className="mt-4"><DatumuTab user={user} /></TabsContent>
        <TabsContent value="darcek" className="mt-4"><DarcekTab user={user} /></TabsContent>
      </Tabs>
    </div>
  );
}
