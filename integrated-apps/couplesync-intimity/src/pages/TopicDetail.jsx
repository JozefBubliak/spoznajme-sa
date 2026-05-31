import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ClipboardList, Zap, Loader2 } from "lucide-react";

const typeDescriptions = {
  role_based: "Rolová téma",
  power_dynamic: "Dynamika moci",
  object_toy_matrix: "Pomôcky a objekty",
  visibility_media: "Viditeľnosť a médiá",
  social_group_scenario: "Skupinový scenár",
  technical_body_practice: "Telesná praktika",
  giver_receiver_technique_matrix: "Dáva / prijíma",
  selection_matrix: "Výber možností",
  solo_shared_visibility: "Sólo a zdieľanie",
  edge_filter: "Citlivá hranica",
};

export default function TopicDetail() {
  const { slug: rawSlug } = useParams();
  const slug = decodeURIComponent(rawSlug || "");

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: () => dataApi.topics.list(),
  });

  const topic = topics.find((t) => t.topic_id === slug || t.slug === slug);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">T\u00e9ma nebola n\u00e1jden\u00e1</p>
        <Link to="/topics"><Button variant="outline">Sp\u00e4\u0165 na t\u00e9my</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/topics" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Sp\u00e4\u0165 na t\u00e9my
      </Link>

      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          {topic.image && (
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <img src={topic.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold mb-1">{topic.name_sk}</h1>
            <p className="text-muted-foreground text-sm mb-3">{topic.description_sk}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{topic.category}</Badge>
              <Badge variant="outline">{typeDescriptions[topic.module_type] || topic.module_type}</Badge>
              {topic.alt_names?.map((n) => (
                <Badge key={n} variant="outline" className="text-xs">{n}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roles */}
      {topic.roles?.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-sm mb-2">Mo\u017en\u00e9 roly</h3>
          <div className="flex gap-2">
            {topic.roles.map((r) => (
              <Badge key={r} className="bg-primary/10 text-primary border-0">{r}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Version Selection */}
      <div className="grid gap-3">
        <Link to={`/quiz/simple/${encodeURIComponent(topic.topic_id)}`}>
          <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Jednoduch\u00e1 verzia</h3>
                <p className="text-xs text-muted-foreground">R\u00fdchly radar z\u00e1ujmu \u2013 6-8 ot\u00e1zok</p>
              </div>
              <Button size="sm" variant="outline">Za\u010da\u0165</Button>
            </div>
          </div>
        </Link>

        {(topic.advanced_available || topic.advanced_enabled) && (
          <Link to={`/quiz/advanced/${encodeURIComponent(topic.topic_id)}`}>
            <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Roz\u0161\u00edren\u00fd modul</h3>
                  <p className="text-xs text-muted-foreground">H\u013abkov\u00fd prieskum \u2013 v\u0161etky dimenzie</p>
                </div>
                <Button size="sm">Presk\u00fama\u0165</Button>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
