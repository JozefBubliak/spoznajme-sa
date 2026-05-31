/**
 * Match engine — počíta prienik odpovedí muža a ženy.
 *
 * Hodnoty záujmu:
 *   "yes"           → Áno, veľmi
 *   "maybe"         → Možno
 *   "fantasy_only"  → Len fantázia
 *   "no"            → Nie (priame odmietnutie)
 *
 * Match úrovne:
 *   MATCH         → obaja áno / komplementárna zhoda
 *   POSSIBLE      → jeden áno + druhý možno, alebo obaja možno
 *   FANTASY_ONLY  → aspoň jeden fantasy_only, druhý nie je no
 *   TALK_NEEDED   → jeden chce v realite, druhý len fantázia / iné
 *   REJECTED      → aspoň jeden povedal priame "no"
 *   UNKNOWN       → chýbajú odpovede
 */

const FANTASY = ["fantasy_only"];
const NEGATIVE = ["no", "hard_no", "not_interested", "no_not_interested"];

export const MATCH_LEVELS = {
  MATCH: "match",
  POSSIBLE: "possible",
  FANTASY_ONLY: "fantasy_only",
  TALK_NEEDED: "talk_needed",
  REJECTED: "rejected",
  UNKNOWN: "unknown",
};

export const MATCH_CONFIG = {
  match: {
    label: "Zhoda!",
    sublabel: "Obaja chcú to isté",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
    priority: 1,
  },
  possible: {
    label: "Možné",
    sublabel: "Záujem je, treba sa dohodnúť",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    dot: "bg-blue-400",
    priority: 2,
  },
  fantasy_only: {
    label: "Fantázia",
    sublabel: "Aspoň pre jedného len v predstavách",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    dot: "bg-purple-400",
    priority: 3,
  },
  talk_needed: {
    label: "Treba sa porozprávať",
    sublabel: "Rôzne očakávania — stojí za rozhovor",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-400",
    priority: 4,
  },
  rejected: {
    label: "Odmietnuté",
    sublabel: "Aspoň jeden partner povedal nie",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-400",
    priority: 5,
  },
  unknown: {
    label: "Chýba odpoveď",
    sublabel: "Jedna alebo obe strany nevyplnili",
    color: "text-muted-foreground",
    bg: "bg-muted/40",
    border: "border-border",
    dot: "bg-muted-foreground/40",
    priority: 6,
  },
};

function normalizeValue(v) {
  if (!v) return null;
  if (NEGATIVE.includes(v)) return "no";
  if (FANTASY.includes(v)) return "fantasy";
  if (v === "yes" || v === "strong_yes" || v === "yes_positive" || v === "reality_now") return "yes";
  if (v === "maybe" || v === "neutral" || v === "yes_mixed" || v === "reality_someday") return "maybe";
  return v;
}

export function computePairMatch(partner1Value, partner2Value) {
  const m = normalizeValue(partner1Value);
  const w = normalizeValue(partner2Value);

  if (!m && !w) return MATCH_LEVELS.UNKNOWN;
  if (!m || !w) return MATCH_LEVELS.UNKNOWN;

  if (m === "no" || w === "no") return MATCH_LEVELS.REJECTED;

  if (m === "yes" && w === "yes") return MATCH_LEVELS.MATCH;

  if (m === "fantasy" && w === "fantasy") return MATCH_LEVELS.FANTASY_ONLY;
  if (m === "fantasy" || w === "fantasy") {
    // jedna strana chce reál, druhá len fantázia
    if ((m === "yes" || m === "maybe") || (w === "yes" || w === "maybe")) {
      return MATCH_LEVELS.TALK_NEEDED;
    }
    return MATCH_LEVELS.FANTASY_ONLY;
  }

  if ((m === "yes" || m === "maybe") && (w === "yes" || w === "maybe")) {
    return MATCH_LEVELS.POSSIBLE;
  }

  return MATCH_LEVELS.TALK_NEEDED;
}

/**
 * Vypočíta všetky match výsledky pre tému.
 * @param {object} manAnswers - odpovede muža (z Response.answers)
 * @param {object} womanAnswers - odpovede ženy (z Response.answers)
 * @param {Array} matchPairs - z topicModuleMap
 * @returns {Array} results
 */
export function computeTopicMatches(partner1Answers, partner2Answers, matchPairs) {
  return matchPairs.map((pair) => {
    const partner1Value = partner1Answers?.[pair.man_key];
    const partner2Value = partner2Answers?.[pair.woman_key];
    const level = computePairMatch(partner1Value, partner2Value);
    return {
      ...pair,
      partner1_value: partner1Value,
      partner2_value: partner2Value,
      level,
      config: MATCH_CONFIG[level],
    };
  });
}

/**
 * Vráti najvyšší (najlepší) match level zo zoznamu výsledkov.
 */
export function getBestMatchLevel(results) {
  if (!results.length) return MATCH_LEVELS.UNKNOWN;
  return results.reduce((best, r) => {
    const bp = MATCH_CONFIG[best]?.priority ?? 99;
    const rp = MATCH_CONFIG[r.level]?.priority ?? 99;
    return rp < bp ? r.level : best;
  }, MATCH_LEVELS.UNKNOWN);
}

/**
 * Vráti ľudsky čitateľný label hodnoty odpovede.
 */
export function formatAnswerValue(value) {
  if (!value) return "—";
  if (value === "yes") return "Áno";
  if (value === "yes_positive") return "Áno, pozitívna skúsenosť";
  if (value === "yes_mixed") return "Áno, zmiešaná skúsenosť";
  if (value === "maybe") return "Možno";
  if (value === "fantasy_only") return "Len fantázia";
  if (value === "no" || value === "not_interested" || value === "no_not_interested") return "Nie";
  if (value === "no_curious") return "Nie, ale som zvedavý/á";
  if (typeof value === "number") return `${value}/5`;
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}
