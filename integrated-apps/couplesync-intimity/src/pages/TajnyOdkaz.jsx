import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Send, Loader2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function TajnyOdkaz() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [revealed, setRevealed] = useState({});

  const { data: mySession, isLoading: loadingSession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: messages = [], isLoading: loadingMsgs } = useQuery({
    queryKey: ["tajne-spravy", mySession?.id],
    queryFn: () => dataApi.companion.secretMessages.list(mySession.id),
    enabled: !!mySession,
  });

  const sendMessage = useMutation({
    mutationFn: () => dataApi.companion.secretMessages.create({
      session_id: mySession.id,
      text,
      revealed: false,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tajne-spravy"] });
      setText("");
    },
  });

  const revealMessage = useMutation({
    mutationFn: (id) => dataApi.companion.secretMessages.reveal(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tajne-spravy"] }),
  });

  if (loadingSession || loadingMsgs) return (
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

  const myMessages = messages.filter((m) => m.user_id === user?.id);
  const partnerMessages = messages.filter((m) => m.user_id !== user?.id);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Lock className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Tajný odkaz</h1>
          <p className="text-xs text-muted-foreground">Povedz niečo — partner odhalí, keď bude pripravený</p>
        </div>
      </div>

      {/* Compose */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <p className="text-sm font-medium">Napíš odkaz partnerovi:</p>
        <Textarea
          placeholder="Niečo, čo chceš povedať — ale nevedel/a si ako začať..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <p className="text-xs text-muted-foreground">Partner uvidí, že mu prišiel odkaz, ale text bude uzamknutý, kým ho sám neodhalí.</p>
        <Button className="w-full gap-2" disabled={!text.trim() || sendMessage.isPending} onClick={() => sendMessage.mutate()}>
          <Send className="w-4 h-4" /> Odoslať tajne
        </Button>
      </div>

      {/* Partner's messages for me to reveal */}
      {partnerMessages.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Odkaz od partnera:</h2>
          {partnerMessages.map((msg) => (
            <div key={msg.id} className={cn(
              "rounded-2xl border p-4 space-y-3 transition-all",
              msg.revealed ? "border-primary/20 bg-primary/5" : "border-amber-200 bg-amber-50"
            )}>
              {msg.revealed || revealed[msg.id] ? (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Lock className="w-4 h-4 shrink-0" />
                    <p className="text-sm">Uzamknutý odkaz. Odhalíš, keď budeš pripravený/á.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-amber-300 text-amber-800 hover:bg-amber-100"
                    onClick={() => {
                      setRevealed((prev) => ({ ...prev, [msg.id]: true }));
                      revealMessage.mutate(msg.id);
                    }}
                  >
                    <Eye className="w-4 h-4" /> Odhaliť odkaz
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* My sent messages */}
      {myMessages.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Tvoje odoslané:</h2>
          {myMessages.map((msg) => (
            <div key={msg.id} className={cn(
              "rounded-2xl border p-4 text-sm",
              msg.revealed ? "border-green-200 bg-green-50" : "border-border bg-card/60"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {msg.revealed
                  ? <><Unlock className="w-3.5 h-3.5 text-green-600" /><span className="text-xs text-green-700 font-medium">Partner odhalil</span></>
                  : <><Lock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Zatiaľ neodhalené</span></>
                }
              </div>
              <p className="text-muted-foreground">{msg.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
