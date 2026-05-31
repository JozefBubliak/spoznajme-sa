import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, Zap } from "lucide-react";

export default function TopicCard({ topic }) {
  const topicKey = encodeURIComponent(topic.topic_id || topic.slug || topic.id);
  return (
    <Link
      to={`/topic/${topicKey}`}
      className="group block rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
          {topic.image ? (
            <img src={topic.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <Sparkles className="w-5 h-5 text-primary/60" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{topic.name_sk}</h3>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {topic.description_sk}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {topic.category}
            </Badge>
            {(topic.advanced_available || topic.advanced_enabled) && (
              <Badge className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0">
                <Zap className="w-2.5 h-2.5 mr-0.5" /> Rozšírený modul
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
