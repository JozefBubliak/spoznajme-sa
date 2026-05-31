import questionBlocks from "./generated/question_blocks_v1.json";

/*
 * JSON je kanonický zdroj. Wrapper ponecháva stabilné importy pre generátor.
 */
export const QUESTION_BLOCKS = questionBlocks;

/*
export const LEGACY_QUESTION_BLOCKS = [
  {
    block_id: "intro_warm",
    label_sk: "Úvod a naladenie",
    questions: [],
    output_fields: ["intro_seen"],
  },
  {
    block_id: "topic_gate",
    label_sk: "Chcem tému preskúmať?",
    questions: [
      {
        id: "q_topic_gate",
        archetype_id: "topic_gate",
        text_sk: "Chceš tému {topic_name} preskúmať?",
      },
    ],
    output_fields: ["topic_gate_status"],
    branching: { yes: "continue", later: "soft_exit", no: "end_topic" },
  },
  {
    block_id: "basic_interest",
    label_sk: "Základný záujem",
    questions: [
      {
        id: "q_interest",
        archetype_id: "interest_scale",
        text_sk: "Ako veľmi ťa téma {topic_name} láka?",
      },
    ],
    output_fields: ["interest_level"],
  },
  {
    block_id: "experience",
    label_sk: "Skúsenosť",
    questions: [
      {
        id: "q_experience",
        archetype_id: "experience_status",
        text_sk: "Máš s témou {topic_name} skúsenosť?",
      },
    ],
    output_fields: ["experience_status"],
  },
  {
    block_id: "experience_by_role",
    label_sk: "Skúsenosť podľa roly",
    questions: [
      {
        id: "q_exp_receive",
        archetype_id: "experience_status",
        text_sk: "Máš skúsenosť v role PRIJÍMAJÚCEHO pri {topic_name}?",
      },
      {
        id: "q_exp_give",
        archetype_id: "experience_status",
        text_sk: "Máš skúsenosť v role POSKYTUJÚCEHO pri {topic_name}?",
      },
    ],
    output_fields: ["experience_receive", "experience_give"],
  },
  {
    block_id: "role_preference",
    label_sk: "Preferencia roly",
    questions: [
      {
        id: "q_role",
        archetype_id: "role_choice",
        text_sk: "Ktorá rola ťa pri {topic_name} viac zaujíma?",
      },
    ],
    output_fields: ["role_preference"],
  },
  {
    block_id: "top_bottom_roles",
    label_sk: "Rola hore / dole",
    questions: [
      {
        id: "q_top_bottom",
        archetype_id: "top_bottom_choice",
        text_sk: "Ktorá rola ťa pri {topic_name} priťahuje?",
      },
    ],
    output_fields: ["top_bottom_preference"],
  },
  {
    block_id: "receiving_role",
    label_sk: "Rola prijímajúceho",
    questions: [
      {
        id: "q_want_receive",
        archetype_id: "interest_scale",
        text_sk: "Lákalo by ťa PRIJÍMAŤ pri {topic_name}?",
      },
      {
        id: "q_receive_intensity",
        archetype_id: "intensity_scale",
        text_sk: "Aká intenzita by bola ideálna pre teba ako prijímajúceho?",
      },
    ],
    output_fields: ["want_receive", "receive_intensity"],
    match_role: "receiver",
  },
  {
    block_id: "providing_role",
    label_sk: "Rola poskytujúceho",
    questions: [
      {
        id: "q_want_give",
        archetype_id: "interest_scale",
        text_sk: "Lákalo by ťa POSKYTOVAŤ pri {topic_name}?",
      },
    ],
    output_fields: ["want_give"],
    match_role: "giver",
  },
  {
    block_id: "fantasy_context",
    label_sk: "Fantázia a vnútorný postoj",
    questions: [
      {
        id: "q_fantasy_present",
        archetype_id: "interest_scale",
        text_sk: "Je {topic_name} súčasťou tvojich fantázií?",
      },
      {
        id: "q_fantasy_arousal",
        archetype_id: "intensity_scale",
        text_sk: "Ako silno ťa samotná predstava vzrušuje?",
      },
    ],
    output_fields: ["fantasy_present", "fantasy_arousal"],
  },
  {
    block_id: "fantasy_reality_transfer",
    label_sk: "Fantázia vs. realita",
    questions: [
      {
        id: "q_fantasy_reality",
        archetype_id: "fantasy_reality",
        text_sk: "Je {topic_name} pre teba fantázia alebo reálna možnosť?",
      },
    ],
    output_fields: ["fantasy_reality_status"],
  },
  {
    block_id: "attraction_drivers",
    label_sk: "Čo ťa priťahuje",
    questions: [
      {
        id: "q_attraction",
        archetype_id: "attraction_drivers",
        text_sk: "Čo ťa na {topic_name} priťahuje?",
      },
    ],
    output_fields: ["attraction_drivers"],
  },
  {
    block_id: "frequency_style",
    label_sk: "Frekvencia a štýl",
    questions: [
      {
        id: "q_frequency",
        archetype_id: "frequency",
        text_sk: "Ako často by si chcel/a {topic_name} praktizovať?",
      },
    ],
    output_fields: ["frequency_preference"],
  },
  {
    block_id: "technical_parameters",
    label_sk: "Technické parametre",
    questions: [
      {
        id: "q_pressure",
        archetype_id: "scale_pressure",
        text_sk: "Aký tlak preferuješ?",
      },
      {
        id: "q_tempo",
        archetype_id: "scale_tempo",
        text_sk: "Aké tempo preferuješ?",
      },
    ],
    output_fields: ["pressure_preference", "tempo_preference"],
  },
  {
    block_id: "power_dynamic",
    label_sk: "Dynamika moci",
    questions: [
      {
        id: "q_power",
        archetype_id: "role_choice",
        text_sk: "Ako preferuješ dynamiku moci pri {topic_name}?",
      },
    ],
    output_fields: ["power_dynamic"],
  },
  {
    block_id: "worship_service",
    label_sk: "Worship / service",
    questions: [
      {
        id: "q_worship",
        archetype_id: "interest_scale",
        text_sk: "Priťahuje ťa element worship alebo service pri {topic_name}?",
      },
    ],
    output_fields: ["worship_interest"],
  },
  {
    block_id: "dirty_talk_voice",
    label_sk: "Dirty talk / hlas",
    questions: [
      {
        id: "q_dirty_talk",
        archetype_id: "interest_scale",
        text_sk: "Chcel/a by si pri {topic_name} dirty talk alebo verbálny prejav?",
      },
    ],
    output_fields: ["dirty_talk_interest"],
  },
  {
    block_id: "combinations",
    label_sk: "Kombinácie s inými aktivitami",
    questions: [
      {
        id: "q_combinations",
        archetype_id: "free_text",
        text_sk: "S čím by si chcel/a {topic_name} kombinovať?",
      },
    ],
    output_fields: ["combination_ideas"],
  },
  {
    block_id: "positions_context",
    label_sk: "Polohy a kontext",
    questions: [
      {
        id: "q_positions",
        archetype_id: "free_text",
        text_sk: "Aké polohy alebo kontext by bol ideálny pre {topic_name}?",
      },
    ],
    output_fields: ["position_context"],
  },
  {
    block_id: "object_toy_matrix",
    label_sk: "Pomôcky a objekty",
    questions: [
      {
        id: "q_toys",
        archetype_id: "free_text",
        text_sk: "Chcel/a by si pri {topic_name} používať nejaké pomôcky?",
      },
    ],
    output_fields: ["toy_preferences"],
  },
  {
    block_id: "barriers",
    label_sk: "Bariéry a hranice",
    questions: [
      {
        id: "q_hard_no",
        archetype_id: "barrier_check",
        text_sk: "Je niečo pri {topic_name}, čo by si určite nechcel/a?",
      },
      {
        id: "q_conditions",
        archetype_id: "conditions_text",
        text_sk: "Za akých podmienok by si {topic_name} bol/a ochotný/á skúsiť?",
      },
    ],
    output_fields: ["hard_no", "conditions"],
  },
  {
    block_id: "partner_summary",
    label_sk: "Výstup pre partnera",
    questions: [
      {
        id: "q_partner_note",
        archetype_id: "free_text",
        text_sk: "Čo chceš, aby partner/ka vedel/a o tvojom postoji k {topic_name}?",
      },
    ],
    output_fields: ["partner_note"],
  },
  {
    block_id: "visibility_watching",
    label_sk: "Viditeľnosť a sledovanie",
    questions: [
      {
        id: "q_watch",
        archetype_id: "interest_scale",
        text_sk: "Lákalo by ťa sledovať partnera/ku pri {topic_name}?",
      },
      {
        id: "q_be_watched",
        archetype_id: "interest_scale",
        text_sk: "Lákalo by ťa byť sledovaný/á partnerom/kou pri {topic_name}?",
      },
    ],
    output_fields: ["watch_interest", "be_watched_interest"],
  },
  {
    block_id: "social_group_scenario",
    label_sk: "Sociálny / skupinový scenár",
    questions: [
      {
        id: "q_group",
        archetype_id: "fantasy_reality",
        text_sk: "Je {topic_name} pre teba len fantázia alebo si to vieš predstaviť v realite?",
      },
      {
        id: "q_known_unknown",
        archetype_id: "radio",
        text_sk: "Mala by to byť známa osoba alebo neznáma?",
        options: [
          { value: "known", label: "Známa osoba" },
          { value: "unknown", label: "Neznáma osoba" },
          { value: "both", label: "Oboje" },
          { value: "no_preference", label: "Nezáleží mi na tom" },
        ],
      },
    ],
    output_fields: ["group_scenario_status", "person_preference"],
  },
  {
    block_id: "body_zone_map",
    label_sk: "Telesné zóny",
    questions: [
      {
        id: "q_body_zones",
        archetype_id: "free_text",
        text_sk: "Ktoré časti tela sú pre teba pri {topic_name} najdôležitejšie?",
      },
    ],
    output_fields: ["body_zones"],
  },
];
*/

export function getBlock(blockId) {
  return QUESTION_BLOCKS.find((b) => b.block_id === blockId);
}
