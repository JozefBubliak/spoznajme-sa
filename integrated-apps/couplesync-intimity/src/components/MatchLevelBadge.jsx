import { cn } from "@/lib/utils";
import { MATCH_CONFIG } from "@/lib/matchEngine";

const ICONS = {
  match: "✅",
  possible: "💚",
  fantasy_only: "💜",
  talk_needed: "💛",
  rejected: "🚫",
  unknown: "❓",
};

export default function MatchLevelBadge({ level, size = "sm" }) {
  const cfg = MATCH_CONFIG[level] || MATCH_CONFIG.unknown;
  const icon = ICONS[level] || "❓";

  if (size === "lg") {
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-medium text-sm", cfg.bg, cfg.border, cfg.color)}>
        <span>{icon}</span>
        <span>{cfg.label}</span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium", cfg.bg, cfg.border, cfg.color)}>
      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
      {cfg.label}
    </div>
  );
}