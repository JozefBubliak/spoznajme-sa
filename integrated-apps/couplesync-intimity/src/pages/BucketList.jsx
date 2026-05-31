import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListChecks, Plus, Check, Heart, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { id: "Zažiť spolu", emoji: "🌟", color: "bg-yellow-100 text-yellow-800" },
  { id: "Navštíviť", emoji: "🗺️", color: "bg-blue-100 text-blue-800" },
  { id: "Doma & intímne", emoji: "🕯️", color: "bg-rose-100 text-rose-800" },
  { id: "Odvaha", emoji: "🔥", color: "bg-orange-100 text-orange-800" },
  { id: "Sny", emoji: "✨", color: "bg-purple-100 text-purple-800" },
];

function CategoryBadge({ category }) {
  const cat = CATEGORIES.find((c) => c.id === category);
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold", cat?.color)}>
      {cat?.emoji} {category}
    </span>
  );
}

export default function BucketList() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Zažiť spolu");
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  const { data: mySession, isLoading: loadingSession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: () => dataApi.sessions.getMine(user.id),
    enabled: !!user,
  });

  const { data: items = [], isLoading: loadingItems } = useQuery({
    queryKey: ["bucket-items", mySession?.id],
    queryFn: () => dataApi.companion.bucketItems.list({ session_id: mySession.id }),
    enabled: !!mySession,
  });

  const addItem = useMutation({
    mutationFn: () => dataApi.companion.bucketItems.create({
      session_id: mySession.id,
      title: newTitle,
      category: newCategory,
      partner_confirmed: false,
      completed: false,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bucket-items"] });
      setNewTitle("");
      setShowForm(false);
    },
  });

  const confirmItem = useMutation({
    mutationFn: (id) => dataApi.companion.bucketItems.update(id, { partner_confirmed: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bucket-items"] }),
  });

  const completeItem = useMutation({
    mutationFn: (id) => dataApi.companion.bucketItems.update(id, { completed: true }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bucket-items"] }),
  });

  const deleteItem = useMutation({
    mutationFn: (id) => dataApi.companion.bucketItems.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bucket-items"] }),
  });

  if (loadingSession || loadingItems) return (
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

  const filteredItems = filter === "matched"
    ? items.filter((i) => i.partner_confirmed && !i.completed)
    : filter === "done"
    ? items.filter((i) => i.completed)
    : items.filter((i) => !i.completed);

  const matchedCount = items.filter((i) => i.partner_confirmed && !i.completed).length;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <ListChecks className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Spoločný zoznam</h1>
            <p className="text-xs text-muted-foreground">{matchedCount} obojstranná zhoda</p>
          </div>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)} className="gap-1.5">
          <Plus className="w-4 h-4" /> Pridať
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <Input
            placeholder="Čo chcete spolu zažiť?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setNewCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  newCategory === cat.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                )}
              >
                {cat.emoji} {cat.id}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" disabled={!newTitle.trim()} onClick={() => addItem.mutate()}>
              Pridať
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Zrušiť</Button>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "Všetky", count: items.filter((i) => !i.completed).length },
          { id: "matched", label: "💚 Zhoda", count: matchedCount },
          { id: "done", label: "✅ Splnené", count: items.filter((i) => i.completed).length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all",
              filter === tab.id ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground bg-card"
            )}
          >
            {tab.label}
            <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", filter === tab.id ? "bg-white/20" : "bg-muted")}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {filteredItems.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground text-sm">Zatiaľ nič tu</p>
          </div>
        )}
        {filteredItems.map((item) => {
          const ismine = item.user_id === user?.id;
          return (
            <div key={item.id} className={cn(
              "rounded-2xl border p-4 space-y-2 transition-all",
              item.partner_confirmed ? "border-green-200 bg-green-50/50" : "border-border bg-card"
            )}>
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5 flex-1">
                  <p className={cn("font-medium text-sm", item.completed && "line-through text-muted-foreground")}>{item.title}</p>
                  <CategoryBadge category={item.category} />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {item.partner_confirmed && !item.completed && (
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-green-700 hover:text-green-800"
                      onClick={() => completeItem.mutate(item.id)}>
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  {ismine && (
                    <Button size="sm" variant="ghost" className="h-7 px-2 text-muted-foreground hover:text-destructive"
                      onClick={() => deleteItem.mutate(item.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>
              {!ismine && !item.partner_confirmed && !item.completed && (
                <Button size="sm" variant="outline" className="w-full gap-1.5 border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => confirmItem.mutate(item.id)}>
                  <Heart className="w-3.5 h-3.5" /> Aj ja to chcem!
                </Button>
              )}
              {item.partner_confirmed && (
                <p className="text-xs text-green-700 font-medium">💚 Obaja chcete — naplánujte to!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
