import { getQuestionsForGender, hasManualTopicMap } from "./topicModuleMap";
import { generateQuestions } from "./questionGenerator";

/**
 * Vráti otázky pre danú tému a pohlavie.
 * Priorita: 1. ručne definovaná mapa (pilot témy), 2. generátor z blokov
 * perspective: "neutral" | "muz" | "zena"
 */
export function getQuestionsForTopic(topic, gender = "muz") {
  // Skús ručne definované otázky z topicModuleMap (face-sitting, anal-fingering...)
  const key = topic?.slug || topic?.topic_id;
  if (hasManualTopicMap(key)) return getQuestionsForGender(key, gender);

  // Fallback: generuj z blokov
  return generateQuestions(topic, gender, "simple");
}
