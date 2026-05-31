/**
 * Question Generator — zostavuje otázky z blokov pre danú tému a pohlavie.
 * Integruje: questionBlocks + questionArchetypes + moduleTypes + topicModuleMap (pilot)
 */

import { getBlock } from "./data/questionBlocks";
import { getArchetype } from "./data/questionArchetypes";
import { getModuleType } from "./data/moduleTypes";
import { TOPIC_MODULE_MAP, getQuestionsForGender } from "./topicModuleMap";

/**
 * Preloží šablónu s názvom témy.
 */
function fillTemplate(text, topicName) {
  return text.replace(/\{topic_name\}/g, topicName || "tému");
}

/**
 * Zostaví otázku z archetype + block question definície.
 */
function buildQuestion(blockQuestion, topic, gender, blockId) {
  const archetype = getArchetype(blockQuestion.archetype_id);
  const topicName = topic?.name_sk || "tému";

  // Niektoré otázky majú text priamo (nie z archetype)
  const text = blockQuestion.text_sk
    ? fillTemplate(blockQuestion.text_sk, topicName)
    : fillTemplate(blockQuestion.text || "", topicName);

  const uiType = archetype?.ui_type || blockQuestion.type || "radio";
  const options = blockQuestion.options || archetype?.default_options || [];

  const q = {
    id: blockQuestion.id,
    type: uiType,
    text,
    block_id: blockId,
    archetype_id: blockQuestion.archetype_id,
  };

  if (options.length > 0) q.options = options;
  if (archetype?.max) q.max = archetype.max;
  if (archetype?.labels) q.labels = archetype.labels;
  if (archetype?.placeholder || blockQuestion.placeholder) {
    q.placeholder = blockQuestion.placeholder || archetype.placeholder;
  }

  return q;
}

/**
 * Rozlíši, ktoré bloky sa majú použiť pre dané pohlavie.
 * Pre receiving_role: muz môže byť receiver pri análnom, pri face-sitting tiež.
 * Pre providing_role: žena môže byť giver pri análnom, pri face-sitting tiež.
 * → Obaja dostanú obe roly, len s iným textom.
 */
function getBlocksForVersion(topic, version) {
  // 1. Skús pilot topicModuleMap (hand-crafted)
  const manualMap = TOPIC_MODULE_MAP[topic?.slug] || TOPIC_MODULE_MAP[topic?.topic_id];
  if (version === "simple" && manualMap?.questions) {
    // Má ručne definované otázky — vráť null (rieši topicModuleMap.js priamo)
    return null;
  }

  // 2. Použi bloky z topic záznamu (importované z taxonomy)
  const blocks = version === "advanced"
    ? (topic?.advanced_blocks || [])
    : (topic?.simple_blocks || []);

  if (blocks.length > 0) return blocks;

  // 3. Fallback na module_type
  const moduleType = getModuleType(topic?.module_type || "simple_radar");
  return version === "advanced"
    ? (moduleType?.advanced_blocks || [])
    : (moduleType?.simple_blocks || []);
}

/**
 * Hlavná funkcia — generuje otázky pre tému, pohlavie a verziu.
 * @param {object} topic - Topic entita
 * @param {string} gender - "muz" | "zena"
 * @param {string} version - "simple" | "advanced"
 * @returns {Array} otázky pre QuestionRenderer
 */
export function generateQuestions(topic, gender = "muz", version = "simple") {
  const blocks = getBlocksForVersion(topic, version);

  // Ak null → ručne definovaná téma (face-sitting, anal-fingering)
  // Deleguj na topicModuleMap
  if (blocks === null) {
    return getQuestionsForGender(topic?.slug || topic?.topic_id, gender);
  }

  const questions = [];
  const seenIds = new Set();

  blocks.forEach((blockId) => {
    const block = getBlock(blockId);
    if (!block || !block.questions || block.questions.length === 0) return;

    block.questions.forEach((bq) => {
      // Vygeneruj gender-špecifické ID
      const qId = `${bq.id}`;
      if (seenIds.has(qId)) return;
      seenIds.add(qId);

      const q = buildQuestion(bq, topic, gender, blockId);
      questions.push(q);
    });
  });

  return questions;
}

/**
 * Automaticky odvodí match_pairs z blokov témy.
 * Ak téma má receiving_role + providing_role bloky → cross-role match.
 */
export function deriveMatchPairs(topic) {
  const simpleBlocks = topic?.simple_blocks || getModuleType(topic?.module_type)?.simple_blocks || [];
  const advancedBlocks = topic?.advanced_blocks || getModuleType(topic?.module_type)?.advanced_blocks || [];
  const allBlocks = [...new Set([...simpleBlocks, ...advancedBlocks])];

  const pairs = [
    {
      id: "general_interest",
      man_key: "q_interest",
      woman_key: "q_interest",
      label: "Záujem o tému",
      description: "Porovnanie základného záujmu",
      emoji: "💬",
    },
    {
      id: "fantasy_reality",
      man_key: "q_fantasy_reality",
      woman_key: "q_fantasy_reality",
      label: "Fantázia vs. realita",
      description: "Obaja chcú to isté alebo len fantáziou",
      emoji: "🎯",
    },
  ];

  if (allBlocks.includes("receiving_role") && allBlocks.includes("providing_role")) {
    pairs.push({
      id: "man_receive_woman_give",
      man_key: "q_want_receive",
      woman_key: "q_want_give",
      label: "Muž prijíma, žena dáva",
      description: "Muž chce prijímať • Žena chce poskytovať",
      emoji: "🌹",
    });
    pairs.push({
      id: "man_give_woman_receive",
      man_key: "q_want_give",
      woman_key: "q_want_receive",
      label: "Žena prijíma, muž dáva",
      description: "Muž chce poskytovať • Žena chce prijímať",
      emoji: "💫",
    });
  }

  if (allBlocks.includes("top_bottom_roles")) {
    pairs.push({
      id: "man_bottom_woman_top",
      man_key: "q_top_bottom",
      woman_key: "q_top_bottom",
      label: "Rola hore / dole",
      description: "Porovnanie preferencie roly",
      emoji: "🔄",
    });
  }

  return pairs;
}

export function generateQuestionSections(topic, gender = "neutral", version = "advanced") {
  const questions = generateQuestions(topic, gender, version);
  const sections = [];
  questions.forEach((question) => {
    const blockId = question.block_id || "topic";
    let section = sections.find((item) => item.id === blockId);
    if (!section) {
      const block = getBlock(blockId);
      section = { id: blockId, title: block?.label_sk || "Téma", questions: [] };
      sections.push(section);
    }
    section.questions.push(question);
  });
  return sections;
}
