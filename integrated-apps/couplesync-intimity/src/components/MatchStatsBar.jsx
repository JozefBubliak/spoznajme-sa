import { cn } from "@/lib/utils";
import { MATCH_CONFIG } from "@/lib/matchEngine";

const LEVELS = ["match", "possible", "fantasy_only", "talk_needed", "rejected"];

const ICONS = {
  match: "✅",
  possible: "💚",
  fantasy_only: "💜",
  talk_needed: "💛",
  rejected: "🚫",
};

const BAR_COLORS = {
  match: "bg-green-500",
  possible: "bg-blue-400",
  fantasy_only: "bg-purple-400",
  talk_needed: "bg-amber-400",
  rejected: "bg-red-400",
};

export default function MatchStatsBar({ stats }) {
  const total = LEVELS.reduce((sum, l) => sum + (stats[l] || 0), 0);
  if (total === 0) return null;

  return (
    <div className="space-y-4">
      {/* Visual progress bars */}
      <div className="space-y-2.5">
        {LEVELS.map((level) => {
          const count = stats[level] || 0;
          if (!count) return null;
          const cfg = MATCH_CONFIG[level];
          const pct = Math.round((count / total) * 100);
          return (
            <div key={level} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-40 shrink-0">
                <span className="text-sm">{ICONS[level]}</span>
                <span className={cn("text-xs font-medium", cfg.color)}>{cfg.label}</span>
              </div>
              <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", BAR_COLORS[level])}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-muted-foreground w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Summary pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {LEVELS.map((level) => {
          const count = stats[level] || 0;
          if (!count) return null;
          const cfg = MATCH_CONFIG[level];
          return (
            <div key={level} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs", cfg.bg, cfg.border)}>
              <span>{ICONS[level]}</span>
              <span className={cn("font-bold text-sm", cfg.color)}>{count}</span>
              <span className={cn("font-medium", cfg.color)}>{cfg.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}