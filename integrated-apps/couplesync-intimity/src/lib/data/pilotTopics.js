/**
 * Ručne overené pilotné moduly — zodpovedá pilot_topic_modules_from_docs_v1.json
 * Tieto témy majú presnejšiu definíciu blokov než automaticky generované.
 */
export const PILOT_TOPIC_MODULES = [
  {
    topic_id: "pilot.facesitting",
    name_sk: "Face Sitting",
    module_type: "top_bottom_power_oral",
    roles: ["hore", "dole"],
    simple_blocks: ["topic_gate", "basic_interest", "experience_by_role", "role_preference", "fantasy_reality_transfer", "attraction_drivers", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "top_bottom_roles", "receiving_role", "providing_role", "frequency_style", "attraction_drivers", "technical_parameters", "power_dynamic", "worship_service", "dirty_talk_voice", "fantasy_context", "fantasy_reality_transfer", "barriers", "partner_summary"],
    custom_dimensions: ["tlak", "tempo", "kontrola", "worship_service", "dirty_talk", "fantazia_vs_realita", "bariery"],
    match_cross_roles: [
      { man_role: "bottom", woman_role: "top", scenario: "Žena sedí mužovi na tvári" },
      { man_role: "top", woman_role: "bottom", scenario: "Muž sedí žene na tvári" },
    ],
  },
  {
    topic_id: "pilot.anal_fingering",
    name_sk: "Análna stimulácia prstami",
    module_type: "technical_body_practice",
    roles: ["prijimam", "poskytujem"],
    simple_blocks: ["topic_gate", "basic_interest", "experience", "role_preference", "technical_parameters", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "fantasy_context", "experience_by_role", "receiving_role", "providing_role", "technical_parameters", "combinations", "positions_context", "object_toy_matrix", "barriers", "partner_summary"],
    custom_dimensions: ["rozsah", "tlak", "tempo", "hlbka", "rytmus", "kombinacie", "pomucky"],
    match_cross_roles: [
      { man_role: "receiver", woman_role: "giver", scenario: "Muž prijíma, žena dáva" },
      { man_role: "giver", woman_role: "receiver", scenario: "Žena prijíma, muž dáva" },
    ],
  },
  {
    topic_id: "pilot.oral_intimacy",
    name_sk: "Orálna intimita",
    module_type: "giver_receiver_technique",
    roles: ["prijimam", "poskytujem"],
    simple_blocks: ["topic_gate", "basic_interest", "experience_by_role", "role_preference", "technical_parameters", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "receiving_role", "providing_role", "technical_parameters", "combinations", "body_zone_map", "dirty_talk_voice", "barriers", "partner_summary"],
    custom_dimensions: ["tlak_pier", "tempo", "technika", "kombinacie_s_rukami", "zakonanie", "hranice"],
    match_cross_roles: [
      { man_role: "receiver", woman_role: "giver", scenario: "Žena vykonáva orál mužovi" },
      { man_role: "giver", woman_role: "receiver", scenario: "Muž vykonáva orál žene" },
    ],
  },
  {
    topic_id: "pilot.positions",
    name_sk: "Polohy",
    module_type: "selection_matrix",
    roles: [],
    simple_blocks: ["topic_gate", "basic_interest", "experience", "attraction_drivers", "frequency_style", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "positions_context", "technical_parameters", "frequency_style", "combinations", "barriers", "partner_summary"],
    custom_dimensions: ["hlbka", "kontakt", "kontrola", "pohodlie", "kto_vedie"],
    match_cross_roles: [],
  },
  {
    topic_id: "pilot.masturbation",
    name_sk: "Masturbácia a sólo aktivity",
    module_type: "solo_shared_visibility",
    roles: [],
    simple_blocks: ["topic_gate", "basic_interest", "experience", "visibility_watching", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience", "visibility_watching", "fantasy_context", "object_toy_matrix", "partner_summary"],
    custom_dimensions: ["sledovanie", "byt_sledovany", "spolocne", "pomucky", "hanba_komfort"],
    match_cross_roles: [
      { man_role: "watcher", woman_role: "performer", scenario: "Muž sleduje ženu" },
      { man_role: "performer", woman_role: "watcher", scenario: "Žena sleduje muža" },
    ],
  },
  {
    topic_id: "pilot.bondage",
    name_sk: "Bondage",
    module_type: "power_dynamic",
    roles: ["viazuci", "viazany"],
    simple_blocks: ["topic_gate", "basic_interest", "role_preference", "power_dynamic", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "role_preference", "power_dynamic", "receiving_role", "providing_role", "object_toy_matrix", "fantasy_context", "barriers", "partner_summary"],
    custom_dimensions: ["material", "intenzita", "pohyb", "vizualny_element"],
    match_cross_roles: [
      { man_role: "binder", woman_role: "bound", scenario: "Muž viaže ženu" },
      { man_role: "bound", woman_role: "binder", scenario: "Žena viaže muža" },
    ],
  },
  {
    topic_id: "pilot.dominance_submission",
    name_sk: "Dominancia / Submisia",
    module_type: "power_dynamic",
    roles: ["dominant", "submisivny"],
    simple_blocks: ["topic_gate", "basic_interest", "role_preference", "power_dynamic", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "experience_by_role", "role_preference", "power_dynamic", "dirty_talk_voice", "worship_service", "fantasy_context", "fantasy_reality_transfer", "barriers", "partner_summary"],
    custom_dimensions: ["miera_kontroly", "safeword", "ritualy", "potrestanie"],
    match_cross_roles: [
      { man_role: "dominant", woman_role: "submissive", scenario: "Muž dominuje" },
      { man_role: "submissive", woman_role: "dominant", scenario: "Žena dominuje" },
    ],
  },
  {
    topic_id: "pilot.threesome",
    name_sk: "Trojka",
    module_type: "social_group_scenario",
    roles: [],
    simple_blocks: ["topic_gate", "basic_interest", "social_group_scenario", "fantasy_reality_transfer", "barriers"],
    advanced_blocks: ["intro_warm", "topic_gate", "fantasy_context", "social_group_scenario", "visibility_watching", "barriers", "partner_summary"],
    custom_dimensions: ["zname_vs_nezname", "mff_vs_mmf", "hranice_revulzie"],
    match_cross_roles: [],
  },
];

export function getPilotTopic(topicId) {
  return PILOT_TOPIC_MODULES.find((p) => p.topic_id === topicId);
}