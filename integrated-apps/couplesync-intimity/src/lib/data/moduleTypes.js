import moduleTypes from "./generated/module_types_v1.json";

/*
 * JSON je kanonický zdroj. Wrapper ponecháva stabilné importy pre generátor.
 */
export const MODULE_TYPES = moduleTypes;

/*
export const LEGACY_MODULE_TYPES = [
  {
    module_type_id: "simple_radar",
    label_sk: "Jednoduchý radar témy",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "fantasy_reality_transfer", "barriers", "partner_summary"],
    advanced_blocks: [],
    examples: ["bozky", "dotyky", "oblečenie", "atmosféra"],
  },
  {
    module_type_id: "basic_preference",
    label_sk: "Bežná preferencia",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "frequency_style", "attraction_drivers", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "fantasy_context", "frequency_style", "attraction_drivers", "barriers", "partner_summary"],
    examples: ["romantický sex", "spontánny sex", "bozky", "masáž"],
  },
  {
    module_type_id: "role_based",
    label_sk: "Rolová praktika",
    simple_blocks: ["topic_gate", "basic_interest", "experience_by_role", "role_preference", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "role_preference", "receiving_role", "providing_role", "fantasy_context", "fantasy_reality_transfer", "barriers", "partner_summary"],
    examples: ["orál", "pegging", "worship/service", "dominancia/submisia"],
  },
  {
    module_type_id: "top_bottom_power_oral",
    label_sk: "Top/Bottom dynamika + orál",
    simple_blocks: ["topic_gate", "basic_interest", "experience_by_role", "top_bottom_roles", "fantasy_reality_transfer", "attraction_drivers", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "top_bottom_roles", "receiving_role", "providing_role", "frequency_style", "attraction_drivers", "technical_parameters", "power_dynamic", "worship_service", "dirty_talk_voice", "fantasy_context", "fantasy_reality_transfer", "barriers", "partner_summary"],
    examples: ["face sitting", "queening", "smothering"],
  },
  {
    module_type_id: "technical_body_practice",
    label_sk: "Technická / telesná praktika",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "role_preference", "technical_parameters", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "fantasy_context", "experience_by_role", "receiving_role", "providing_role", "technical_parameters", "combinations", "positions_context", "object_toy_matrix", "barriers", "partner_summary"],
    examples: ["análna stimulácia prstami", "análny sex", "pegging", "fisting"],
  },
  {
    module_type_id: "giver_receiver_technique",
    label_sk: "Giver/Receiver + technika",
    simple_blocks: ["topic_gate", "basic_interest", "experience_by_role", "role_preference", "technical_parameters", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "receiving_role", "providing_role", "technical_parameters", "combinations", "body_zone_map", "dirty_talk_voice", "barriers", "partner_summary"],
    examples: ["orálna intimita", "cunnilingus", "fellatio"],
  },
  {
    module_type_id: "selection_matrix",
    label_sk: "Výberová matica",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "attraction_drivers", "frequency_style", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "positions_context", "technical_parameters", "frequency_style", "combinations", "barriers", "partner_summary"],
    examples: ["polohy", "polohy so zadným vstupom"],
  },
  {
    module_type_id: "solo_shared_visibility",
    label_sk: "Sólo + zdieľaná viditeľnosť",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "visibility_watching", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "visibility_watching", "fantasy_context", "object_toy_matrix", "partner_summary"],
    examples: ["masturbácia", "sólo aktivity"],
  },
  {
    module_type_id: "social_group_scenario",
    label_sk: "Sociálny / skupinový scenár",
    simple_blocks: ["topic_gate", "basic_interest", "social_group_scenario", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "fantasy_context", "social_group_scenario", "visibility_watching", "barriers", "partner_summary"],
    examples: ["trojky", "swingers", "hotwife/cuckold"],
  },
  {
    module_type_id: "power_dynamic",
    label_sk: "Dynamika moci",
    simple_blocks: ["topic_gate", "basic_interest", "role_preference", "power_dynamic", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "role_preference", "power_dynamic", "receiving_role", "providing_role", "fantasy_context", "barriers", "partner_summary"],
    examples: ["dominancia/submisia", "BDSM", "bondage"],
  },
  {
    module_type_id: "object_toy_based",
    label_sk: "Pomôcky a objekty",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "object_toy_matrix", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "object_toy_matrix", "technical_parameters", "combinations", "barriers", "partner_summary"],
    examples: ["vibrátor", "análne pomôcky", "bondage rekvizity"],
  },
  {
    module_type_id: "body_zone_focus",
    label_sk: "Telesná zóna",
    simple_blocks: ["topic_gate", "basic_interest", "experience", "body_zone_map", "attraction_drivers", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "body_zone_map", "technical_parameters", "combinations", "barriers", "partner_summary"],
    examples: ["chodidlá", "krk", "prsia"],
  },
  {
    module_type_id: "edge_taboo",
    label_sk: "Edge / tabu téma",
    simple_blocks: ["topic_gate", "basic_interest", "fantasy_context", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "fantasy_context", "fantasy_reality_transfer", "barriers", "partner_summary"],
    examples: ["tabu roly", "extrémne scenáre"],
  },
];
*/

export function getModuleType(id) {
  return MODULE_TYPES.find((m) => m.module_type_id === id);
}
