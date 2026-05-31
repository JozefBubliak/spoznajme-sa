import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Users, Copy, Check, XCircle, Zap, MessageSquare, ListChecks, Lock, BarChart3, BookOpen, HeartHandshake, Shuffle, HelpCircle, Compass, BookMarked, MapPin, AlertCircle, UserCheck, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [joinCode, setJoinCode] = useState("");
  const [showJoin, setShowJoin] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedPerspective, setSelectedPerspective] = useState(null);

  const { data: mySession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: async () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  useEffect(() => {
    if (user?.perspective) setSelectedPerspective(user.perspective);
  }, [user]);

  const createSession = useMutation({
    mutationFn: async () => dataApi.sessions.create(),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["my-session"] }); toast.success("Relácia vytvorená!"); },
  });

  const joinSession = useMutation({
    mutationFn: async () => dataApi.sessions.join(joinCode.toUpperCase()),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["my-session"] }); setShowJoin(false); toast.success("Pripojený/á k relácii!"); },
    onError: (e) => toast.error(e.message),
  });

  const savePerspective = useMutation({
    mutationFn: async (perspective) => { await dataApi.profiles.updatePerspective(user.id, perspective); await refreshProfile(); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["my-session"] }); toast.success("Perspektíva uložená!"); },
  });

  const handleCopy = () => { navigator.clipboard.writeText(mySession?.code || ""); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handlePerspectiveSelect = (p) => { setSelectedPerspective(p); savePerspective.mutate(p); };

  const hasSession = !!mySession;
  const closeSession = useMutation({
    mutationFn: () => dataApi.sessions.close(mySession.id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["my-session"] }); toast.success("Relácia bola ukončená"); },
    onError: (error) => toast.error(error.message),
  });

  const hasPerspective = !!user?.perspective || !!selectedPerspective;
  const isReady = hasSession && hasPerspective;

  const QUIZ_MODULES = [
    { to: "/topics", icon: BookOpen, label: "Témy", desc: "Dotazníky páru", color: "bg-primary/10 text-primary" },
    { to: "/36-otazok", icon: HelpCircle, label: "36 Otázok", desc: "45-minútový rituál", color: "bg-blue-100 text-blue-700" },
    { to: "/karty", icon: MessageSquare, label: "Karty rozhovoru", desc: "Otvárač tém", color: "bg-rose-100 text-rose-700" },
    { to: "/zhody", icon: Shuffle, label: "Zhody", desc: "Bez odmietnutia", color: "bg-green-100 text-green-700" },
    { to: "/pulse", icon: Zap, label: "Denný impulz", desc: "Dnešná otázka", color: "bg-amber-100 text-amber-700" },
    { to: "/results", icon: BarChart3, label: "Výsledky", desc: "Párový prienik", color: "bg-indigo-100 text-indigo-700" },
  ];

  const TOOL_MODULES = [
    { to: "/nezabudni", icon: HeartHandshake, label: "Nezabudni na ňu", desc: "Pomocník pozornosti", color: "bg-rose-100 text-rose-600" },
    { to: "/vzajomny-profil", icon: UserCheck, label: "Ako sa poznáme?", desc: "Otestuj znalosti", color: "bg-cyan-100 text-cyan-700" },
    { to: "/kompas", icon: Compass, label: "Vzťahový kompas", desc: "Mesačný sken", color: "bg-teal-100 text-teal-700" },
    { to: "/dennik", icon: BookMarked, label: "Párový denník", desc: "Spoločné záznamy", color: "bg-violet-100 text-violet-700" },
    { to: "/tazke-rozhovory", icon: AlertCircle, label: "Ťažké rozhovory", desc: "Vety na začatie", color: "bg-red-100 text-red-700" },
    { to: "/rande", icon: MapPin, label: "Rande plánovač", desc: "Filtruj podľa nálady", color: "bg-orange-100 text-orange-700" },
    { to: "/hra", icon: Gamepad2, label: "Párová hra", desc: "Výzvy a dobrodružstvo", color: "bg-yellow-100 text-yellow-700" },
    { to: "/zoznam", icon: ListChecks, label: "Spoločný zoznam", desc: "Čo chcete zažiť", color: "bg-purple-100 text-purple-700" },
    { to: "/tajny-odkaz", icon: Lock, label: "Tajný odkaz", desc: "Povedz niečo navyše", color: "bg-slate-100 text-slate-700" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-8 md:p-12">
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary fill-primary/20" />
            <span className="text-sm font-medium text-primary">Bezpečný priestor</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Objavujte spolu</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Dotazník pre páry, ktorý vám pomôže preskúmať vaše túžby, hranice a preferencie. Bezpečne, otvorene, spoločne.
          </p>
        </div>
      </div>

      {/* Session Management */}
      {!hasSession && (
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={() => createSession.mutate()}
            className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Vytvoriť reláciu</h3>
            <p className="text-sm text-muted-foreground">Začni nový dotazník a zdieľaj kód s partnerom</p>
          </button>
          <button onClick={() => setShowJoin(true)}
            className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all text-left">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-accent-foreground" />
            </div>
            <h3 className="font-semibold mb-1">Pripojiť sa</h3>
            <p className="text-sm text-muted-foreground">Zadaj kód od partnera a pripoj sa k relácii</p>
          </button>
        </div>
      )}

      {/* Session Info */}
      {hasSession && (
        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Kód vašej relácie</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-mono font-bold tracking-widest text-primary">{mySession.code}</span>
                <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-primary/10 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${mySession.status === "active" ? "bg-green-500" : "bg-yellow-500"}`} />
              <span className="text-sm text-muted-foreground">{mySession.status === "active" ? "Partner pripojený" : "Čaká na partnera"}</span>
            </div>
            {mySession.created_by === user.id && (
              <Button variant="ghost" size="sm" onClick={() => closeSession.mutate()} className="text-muted-foreground">
                <XCircle className="w-4 h-4 mr-1" /> Ukončiť
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Perspective Selection */}
      {hasSession && !hasPerspective && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ako ti máme formulovať otázky?</h2>
          <p className="text-sm text-muted-foreground">Perspektíva je voliteľná pomôcka pre text otázok. Neurčuje tvoju rolu v páre.</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { value: "neutral", label: "Neutrálne", desc: "Univerzálne texty" },
              { value: "muz", label: "Mužská", desc: "Mužská perspektíva" },
              { value: "zena", label: "Ženská", desc: "Ženská perspektíva" },
            ].map((g) => (
              <button key={g.value} onClick={() => handlePerspectiveSelect(g.value)}
                className={`p-5 rounded-xl border text-center transition-all ${selectedPerspective === g.value ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}>
                <div className="text-lg font-semibold mb-1">{g.label}</div>
                <div className="text-xs text-muted-foreground">{g.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ready State */}
      {isReady && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Otázky &amp; spoznávanie</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUIZ_MODULES.map(({ to, icon: Icon, label, desc, color }) => (
              <button key={to} onClick={() => navigate(to)}
                className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all text-left">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide pt-2">Vzťahové nástroje</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TOOL_MODULES.map(({ to, icon: Icon, label, desc, color }) => (
              <button key={to} onClick={() => navigate(to)}
                className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all text-left">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Join Dialog */}
      <Dialog open={showJoin} onOpenChange={setShowJoin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pripojiť sa k relácii</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input placeholder="Zadaj 6-miestny kód" value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="text-center text-lg font-mono tracking-widest" maxLength={6} />
            <Button className="w-full" disabled={joinCode.length < 6} onClick={() => joinSession.mutate()}>
              Pripojiť sa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
