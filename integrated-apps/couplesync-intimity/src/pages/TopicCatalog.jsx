import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2 } from "lucide-react";
import TopicCard from "../components/TopicCard";

export default function TopicCatalog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: allTopics = [], isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => dataApi.topics.list(),
  });

  const topics = allTopics;

  // Extrahuj top-level kategórie z path_sk (prvá časť breadcrumbu)
  const categories = ["all", ...new Set(
    topics.map((t) => {
      if (t.category) return t.category;
      if (t.path_sk) {
        const parts = t.path_sk.split(" > ");
        return parts.length > 1 ? parts[1] : parts[0];
      }
      return null;
    }).filter(Boolean)
  )].slice(0, 20);

  const filtered = topics.filter((t) => {
    const matchesSearch =
      !search ||
      t.name_sk.toLowerCase().includes(search.toLowerCase()) ||
      t.description_sk?.toLowerCase().includes(search.toLowerCase()) ||
      t.alt_names?.some((n) => n.toLowerCase().includes(search.toLowerCase()));
    const topicCategory = t.category || (t.path_sk ? t.path_sk.split(" > ")[1] : null);
    const matchesCategory = activeCategory === "all" || topicCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Témy na preskúmanie</h1>
        <p className="text-muted-foreground text-sm">
          {topics.length} tém na objavovanie — z {allTopics.length} položiek katalógu.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Hľadaj tému..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? "default" : "secondary"}
            className="cursor-pointer shrink-0 transition-all"
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "Všetky" : cat}
          </Badge>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid sm:grid-cols-2 gap-3">
        {filtered.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg mb-1">Žiadne výsledky</p>
          <p className="text-sm">Skús iný výraz alebo kategóriu</p>
        </div>
      )}
    </div>
  );
}
