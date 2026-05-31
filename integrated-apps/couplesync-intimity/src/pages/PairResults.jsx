import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/AuthContext";
import { dataApi } from "@/api/dataApi";
import { Button } from "@/components/ui/button";
import {
  Loader2, ChevronRight, Eye, EyeOff,
  ChevronDown, ChevronUp, Sparkles, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  computeTopicMatches, getBestMatchLevel,
  MATCH_CONFIG, formatAnswerValue
} from "@/lib/matchEngine";
import { getMatchPairs, hasManualTopicMap } from "@/lib/topicModuleMap";
import { deriveMatchPairs } from "@/lib/questionGenerator";
import MatchLevelBadge from "@/components/MatchLevelBadge";
import MatchStatsBar from "@/components/MatchStatsBar";

const LEVEL_ORDER = ["match", "possible", "fantasy_only", "talk_needed", "rejected", "unknown"];

const MATCH_DESCRIPTIONS = {
  match: "Obaja partneri chcú to isté — zelené svetlo!",
  possible: "Záujem je na oboch stranách, stojí za dohovor.",
  fantasy_only: "Aspoň pre jedného ide zatiaľ o fantáziu.",
  talk_needed: "Rôzne očakávania — odporúčame si povedať.",
  rejected: "Aspoň jeden partner povedal nie. Rešpektujte to.",
  unknown: "Ešte nie sú dostupné obe odpovede.",
};

function AnswerCompare({ result }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-black/5">
      <div className={cn("rounded-lg p-2 text-center", "bg-blue-50")}>
        <p className="text-[10px] text-blue-500 font-medium mb-0.5">Partner 1</p>
        <p className="text-xs font-semibold text-blue-800">{formatAnswerValue(result.partner1_value)}</p>
      </div>
      <div className={cn("rounded-lg p-2 text-center", "bg-pink-50")}>
        <p className="text-[10px] text-pink-500 font-medium mb-0.5">Partner 2</p>
        <p className="text-xs font-semibold text-pink-800">{formatAnswerValue(result.partner2_value)}</p>
      </div>
    </div>
  );
}

function MatchPairRow({ result }) {
  const cfg = result.config;
  return (
    <div className={cn("rounded-xl border p-3.5 space-y-1", cfg.bg, cfg.border)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="text-lg leading-none mt-0.5">{result.emoji}</span>
          <div>
            <p className="text-sm font-semibold leading-tight">{result.label}</p>
            <p className="text-xs text-muted-foreground">{result.description}</p>
          </div>
        </div>
        <MatchLevelBadge level={result.level} />
      </div>
      <AnswerCompare result={result} />
    </div>
  );
}

const getPairsForTopic = (topic, topicId) => hasManualTopicMap(topicId)
  ? getMatchPairs(topicId)
  : deriveMatchPairs(topic);

function TopicMatchCard({ topicId, topic, partner1Response, partner2Response, showRejected }) {
  const [expanded, setExpanded] = useState(false);
  const matchPairs = getPairsForTopic(topic, topicId);
  const partner1Answers = partner1Response?.answers || {};
  const partner2Answers = partner2Response?.answers || {};
  const results = computeTopicMatches(partner1Answers, partner2Answers, matchPairs);

  const visibleResults = showRejected
    ? results
    : results.filter((r) => r.level !== "rejected");

  if (visibleResults.length === 0 && partner1Response && partner2Response) return null;

  const bestLevel = getBestMatchLevel(results);
  const bestCfg = MATCH_CONFIG[bestLevel];
  const bothCompleted = !!partner1Response && !!partner2Response;

  // Počty match úrovní pre mini-bar v karte
  const miniStats = results.reduce((acc, r) => {
    acc[r.level] = (acc[r.level] || 0) + 1;
    return acc;
  }, {});

  const MINI_COLORS = {
    match: "bg-green-400",
    possible: "bg-blue-400",
    fantasy_only: "bg-purple-400",
    talk_needed: "bg-amber-400",
    rejected: "bg-red-400",
    unknown: "bg-gray-200",
  };

  return (
    <div className={cn(
      "rounded-2xl border overflow-hidden transition-all duration-200",
      expanded ? "shadow-md border-primary/20" : "border-border hover:border-primary/20 hover:shadow-sm"
    )}>
      <button
        className="w-full flex items-center gap-3 p-4 hover:bg-secondary/20 transition-colors text-left"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Topic image or icon */}
        <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
          {topic?.image ? (
            <img src={topic.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <Sparkles className="w-5 h-5 text-primary/50" />
          )}
        </div>

        {/* Topic info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{topic?.name_sk || topicId}</h3>
          </div>

          {!bothCompleted ? (
            <span className="text-[11px] text-amber-600 font-medium">⏳ Čaká sa na partnera</span>
          ) : (
            <div className="flex items-center gap-2">
              <MatchLevelBadge level={bestLevel} />
              {/* Mini color bar */}
              <div className="flex gap-0.5 h-2 overflow-hidden rounded-full flex-1 max-w-[80px]">
                {LEVEL_ORDER.map((l) => {
                  const c = miniStats[l] || 0;
                  if (!c) return null;
                  const total = results.length || 1;
                  return (
                    <div
                      key={l}
                      className={cn("h-full", MINI_COLORS[l])}
                      style={{ width: `${(c / total) * 100}%` }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Expand chevron */}
        <div className="shrink-0 text-muted-foreground">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border/60">
          {!bothCompleted ? (
            <p className="text-xs text-amber-600 py-2 text-center">
              Prienik sa zobrazí, keď obaja partneri vyplnia dotazník pre túto tému.
            </p>
          ) : (
            <>
              <p className={cn("text-xs px-3 py-2 rounded-lg mt-3", bestCfg.bg, bestCfg.color)}>
                {MATCH_DESCRIPTIONS[bestLevel]}
              </p>
              <div className="space-y-2">
                {visibleResults.map((result) => (
                  <MatchPairRow key={result.id} result={result} />
                ))}
              </div>
              <Link
                to={`/topic/${encodeURIComponent(topic?.topic_id || topicId)}`}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
              >
                Otvoriť tému <ChevronRight className="w-3 h-3" />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function PairResults() {
  const { user } = useAuth();
  const [showRejected, setShowRejected] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: mySession, isLoading: loadingSession } = useQuery({
    queryKey: ["my-session", user?.id],
    queryFn: async () => {
      return dataApi.sessions.getMine(user.id);
    },
    enabled: !!user,
  });

  const { data: responses = [], isLoading: loadingResponses } = useQuery({
    queryKey: ["responses", mySession?.id],
    queryFn: () => dataApi.responses.listPair(mySession.id),
    enabled: !!mySession,
  });

  const { data: topics = [] } = useQuery({
    queryKey: ["topics"],
    queryFn: () => dataApi.topics.list(),
  });

  if (loadingSession || loadingResponses) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!mySession) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
          <BarChart3 className="w-7 h-7 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Nemáš žiadnu aktívnu reláciu</p>
        <Link to="/app"><Button>Vytvoriť reláciu</Button></Link>
      </div>
    );
  }

  // Zostavíme páry podľa pozície v relácii. Perspektíva textov nemení identitu partnera.
  const topicGroups = {};
  responses.forEach((r) => {
    if (!topicGroups[r.topic_id]) topicGroups[r.topic_id] = {};
    const slot = r.partner_slot === 2 ? "partner2" : "partner1";
    if (!topicGroups[r.topic_id][slot] || r.updated_at > topicGroups[r.topic_id][slot].updated_at) {
      topicGroups[r.topic_id][slot] = r;
    }
  });

  const topicEntries = Object.entries(topicGroups);

  // Štatistiky + best level per topic
  const matchStats = {};
  const topicBestLevel = {};

  topicEntries.forEach(([topicId, group]) => {
    if (!group.partner1 || !group.partner2) return;
    const topic = topics.find((item) => item.topic_id === topicId);
    const pairs = getPairsForTopic(topic, topicId);
    const results = computeTopicMatches(group.partner1.answers || {}, group.partner2.answers || {}, pairs);
    results.forEach((r) => {
      matchStats[r.level] = (matchStats[r.level] || 0) + 1;
    });
    topicBestLevel[topicId] = getBestMatchLevel(results);
  });

  const totalAnswered = topicEntries.length;
  const bothAnswered = topicEntries.filter(([, group]) => group.partner1 && group.partner2).length;

  // Filter podľa úrovne
  const filteredEntries = activeFilter === "all"
    ? topicEntries
    : topicEntries.filter(([slug]) => topicBestLevel[slug] === activeFilter);

  const FILTER_TABS = [
    { id: "all", label: "Všetky", count: topicEntries.length },
    { id: "match", label: "✅ Zhoda", count: topicEntries.filter(([s]) => topicBestLevel[s] === "match").length },
    { id: "possible", label: "💚 Možné", count: topicEntries.filter(([s]) => topicBestLevel[s] === "possible").length },
    { id: "fantasy_only", label: "💜 Fantázia", count: topicEntries.filter(([s]) => topicBestLevel[s] === "fantasy_only").length },
    { id: "talk_needed", label: "💛 Porozprávať", count: topicEntries.filter(([s]) => topicBestLevel[s] === "talk_needed").length },
  ].filter((tab) => tab.id === "all" || tab.count > 0);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold mb-1">Párové výsledky</h1>
          <p className="text-muted-foreground text-sm">
            Relácia <span className="font-mono font-semibold text-foreground bg-muted px-1.5 py-0.5 rounded">{mySession.code}</span>
          </p>
        </div>
        <button
          onClick={() => setShowRejected(!showRejected)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all",
            showRejected
              ? "border-red-300 bg-red-50 text-red-600"
              : "border-border text-muted-foreground hover:border-primary/20"
          )}
        >
          {showRejected ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          {showRejected ? "Skryť odmietnutia" : "Zobraziť odmietnutia"}
        </button>
      </div>

      {/* Progress overview */}
      {totalAnswered > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{totalAnswered}</p>
            <p className="text-xs text-muted-foreground mt-1">Vyplnených tém</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <p className="text-3xl font-bold text-primary">{bothAnswered}</p>
            <p className="text-xs text-muted-foreground mt-1">Úplných párov</p>
          </div>
        </div>
      )}

      {/* Visual stats */}
      {Object.keys(matchStats).length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Rozloženie zhôd
          </h2>
          <MatchStatsBar stats={matchStats} />
        </div>
      )}

      {/* Legend */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Legenda úrovní zhody</h3>
        <div className="space-y-2">
          {["match", "possible", "fantasy_only", "talk_needed", "rejected"].map((level) => {
            const cfg = MATCH_CONFIG[level];
            return (
              <div key={level} className={cn("flex items-center gap-3 px-3 py-2 rounded-xl border text-xs", cfg.bg, cfg.border)}>
                <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", cfg.dot)} />
                <span className={cn("font-semibold", cfg.color)}>{cfg.label}</span>
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground">{cfg.sublabel}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter tabs */}
      {topicEntries.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium shrink-0 transition-all",
                activeFilter === tab.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 bg-card"
              )}
            >
              {tab.label}
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                activeFilter === tab.id ? "bg-white/20" : "bg-muted"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* No data state */}
      {topicEntries.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-border bg-card/50">
          <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-primary/50" />
          </div>
          <p className="font-semibold mb-1">Zatiaľ žiadne odpovede</p>
          <p className="text-sm text-muted-foreground mb-4">Začnite vypĺňať dotazníky, výsledky sa zobrazia tu</p>
          <Link to="/topics"><Button>Preskúmať témy</Button></Link>
        </div>
      )}

      {/* Topic cards */}
      <div className="space-y-3">
        {filteredEntries.map(([topicId, group]) => {
          const topic = topics.find((item) => item.topic_id === topicId);
          return (
            <TopicMatchCard
              key={topicId}
              topicId={topicId}
              topic={topic}
              partner1Response={group.partner1}
              partner2Response={group.partner2}
              showRejected={showRejected}
            />
          );
        })}
      </div>

      {filteredEntries.length === 0 && topicEntries.length > 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">
          Žiadne témy pre tento filter.
        </p>
      )}
    </div>
  );
}
