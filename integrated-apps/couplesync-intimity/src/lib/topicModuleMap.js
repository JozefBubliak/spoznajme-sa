/**
 * Definuje otázky (per pohlavie) a match_pairs pre každú tému.
 * match_pairs hovorí enginu, ktoré kľúče porovnávať medzi mužom a ženou.
 */

const OPTIONS_INTEREST = [
  { value: "yes", label: "Áno, veľmi" },
  { value: "maybe", label: "Možno, závisí od okolností" },
  { value: "fantasy_only", label: "Len ako fantázia, nie v realite" },
  { value: "no", label: "Nie, to nie je pre mňa" },
];

const OPTIONS_YN = [
  { value: "yes", label: "Áno" },
  { value: "maybe", label: "Možno / závisí" },
  { value: "no", label: "Nie" },
];

const OPTIONS_EXPERIENCE = [
  { value: "yes_positive", label: "Áno, skúsenosť mám a bola pozitívna" },
  { value: "yes_mixed", label: "Áno, mám skúsenosť, ale bola zmiešaná" },
  { value: "no_curious", label: "Nie, ale som zvedavý/á" },
  { value: "no_not_interested", label: "Nie a nemám záujem" },
];

export const TOPIC_MODULE_MAP = {

  "face-sitting": {
    module_type: "role_based_top_bottom",
    questions: {
      muz: [
        {
          id: "topic_interest",
          type: "radio",
          text: "Láka ťa téma face sitting?",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_bottom_role",
          type: "radio",
          text: "Lákalo by ťa byť DOLE — žena sedí na tvojej tvári?",
          subtitle: "Prijímaš orálnu stimuláciu, ona má kontrolu.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_top_role",
          type: "radio",
          text: "Lákalo by ťa byť HORE — sedieť žene na tvári?",
          subtitle: "Ty ovládate tempo a pozíciu, ona prijíma.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "experience_bottom",
          type: "radio",
          text: "Máš skúsenosť s rolou DOLE?",
          options: OPTIONS_EXPERIENCE,
        },
        {
          id: "attraction_drivers",
          type: "textarea",
          text: "Čo ťa na face sitting priťahuje alebo vzrušuje?",
          placeholder: "Napr. intímnosť, kontrola, vôňa, vizuál...",
        },
        {
          id: "hard_no",
          type: "textarea",
          text: "Je niečo, čo by si určite nechcel? (hranice)",
          placeholder: "Nepovinné — písať len ak niečo konkrétne...",
        },
      ],
      zena: [
        {
          id: "topic_interest",
          type: "radio",
          text: "Láka ťa téma face sitting?",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_top_role",
          type: "radio",
          text: "Lákalo by ťa byť HORE — sedieť mužovi na tvári?",
          subtitle: "Ty máš kontrolu, on prijíma a stimuluje.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_bottom_role",
          type: "radio",
          text: "Lákalo by ťa byť DOLE — muž sedí na tvojej tvári?",
          subtitle: "On ovláda tempo a pozíciu, ty prijímaš.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "experience_top",
          type: "radio",
          text: "Máš skúsenosť s rolou HORE?",
          options: OPTIONS_EXPERIENCE,
        },
        {
          id: "attraction_drivers",
          type: "textarea",
          text: "Čo ťa na face sitting priťahuje alebo vzrušuje?",
          placeholder: "Napr. pocit moci, dôvery, intímnosť...",
        },
        {
          id: "hard_no",
          type: "textarea",
          text: "Je niečo, čo by si určite nechcela? (hranice)",
          placeholder: "Nepovinné...",
        },
      ],
    },
    match_pairs: [
      {
        id: "fs_woman_top",
        man_key: "want_bottom_role",
        woman_key: "want_top_role",
        label: "Žena sedí mužovi na tvári",
        description: "Muž chce byť dole • Žena chce byť hore",
        emoji: "👑",
      },
      {
        id: "fs_man_top",
        man_key: "want_top_role",
        woman_key: "want_bottom_role",
        label: "Muž sedí žene na tvári",
        description: "Muž chce byť hore • Žena chce byť dole",
        emoji: "🔄",
      },
      {
        id: "fs_general",
        man_key: "topic_interest",
        woman_key: "topic_interest",
        label: "Všeobecný záujem o tému",
        description: "Obaja odpovedali na základný záujem",
        emoji: "💬",
      },
    ],
  },

  "anal-fingering": {
    module_type: "technical_giver_receiver",
    questions: {
      muz: [
        {
          id: "topic_interest",
          type: "radio",
          text: "Láka ťa análna stimulácia prstami?",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_receive_anal",
          type: "radio",
          text: "Lákalo by ťa PRIJÍMAŤ análnu stimuláciu prstami?",
          subtitle: "Partnerka stimuluje teba análne prstami.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_give_anal",
          type: "radio",
          text: "Lákalo by ťa POSKYTOVAŤ análnu stimuláciu partnerke?",
          subtitle: "Ty stimuluješ partnerku análne prstami.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "experience",
          type: "radio",
          text: "Máš skúsenosť s análnou stimuláciou?",
          options: OPTIONS_EXPERIENCE,
        },
        {
          id: "intensity_preference",
          type: "scale",
          text: "Aká intenzita stimulácie by bola pre teba ideálna?",
          max: 5,
          labels: { min: "Veľmi jemná", max: "Intenzívna" },
        },
        {
          id: "hard_no",
          type: "textarea",
          text: "Je niečo, čo by si určite nechcel?",
          placeholder: "Nepovinné...",
        },
      ],
      zena: [
        {
          id: "topic_interest",
          type: "radio",
          text: "Láka ťa análna stimulácia prstami?",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_receive_anal",
          type: "radio",
          text: "Lákalo by ťa PRIJÍMAŤ análnu stimuláciu prstami?",
          subtitle: "Partner stimuluje teba análne prstami.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "want_give_anal",
          type: "radio",
          text: "Lákalo by ťa POSKYTOVAŤ análnu stimuláciu partnerovi?",
          subtitle: "Ty stimuluješ partnera análne prstami.",
          options: OPTIONS_INTEREST,
        },
        {
          id: "experience",
          type: "radio",
          text: "Máš skúsenosť s análnou stimuláciou?",
          options: OPTIONS_EXPERIENCE,
        },
        {
          id: "intensity_preference",
          type: "scale",
          text: "Aká intenzita stimulácie by bola pre teba ideálna?",
          max: 5,
          labels: { min: "Veľmi jemná", max: "Intenzívna" },
        },
        {
          id: "hard_no",
          type: "textarea",
          text: "Je niečo, čo by si určite nechcela?",
          placeholder: "Nepovinné...",
        },
      ],
    },
    match_pairs: [
      {
        id: "anal_m_receive",
        man_key: "want_receive_anal",
        woman_key: "want_give_anal",
        label: "Muž prijíma, žena dáva",
        description: "Muž chce prijímať análnu stimuláciu • Žena chce ju poskytovať",
        emoji: "🌹",
      },
      {
        id: "anal_w_receive",
        man_key: "want_give_anal",
        woman_key: "want_receive_anal",
        label: "Žena prijíma, muž dáva",
        description: "Muž chce poskytovať análnu stimuláciu • Žena chce ju prijímať",
        emoji: "💫",
      },
      {
        id: "anal_general",
        man_key: "topic_interest",
        woman_key: "topic_interest",
        label: "Všeobecný záujem o tému",
        description: "Obaja odpovedali na základný záujem",
        emoji: "💬",
      },
    ],
  },

  // Generický fallback pre témy bez špecifického mapovania
  _default: {
    module_type: "simple_preference",
    questions: {
      muz: [
        { id: "topic_interest", type: "radio", text: "Láka ťa táto téma?", options: OPTIONS_INTEREST },
        { id: "experience", type: "radio", text: "Máš s tým skúsenosť?", options: OPTIONS_EXPERIENCE },
        { id: "want_try_reality", type: "radio", text: "Chceš to skúsiť v realite?", options: OPTIONS_YN },
        { id: "attraction_drivers", type: "textarea", text: "Čo ťa na tom priťahuje?", placeholder: "Voľné vyjadrenie..." },
        { id: "frequency_mood", type: "textarea", text: "Ako často / v akej nálade?", placeholder: "Napr. výnimočne, keď mám náladu..." },
        { id: "hard_no", type: "textarea", text: "Je niečo, čo určite nie?", placeholder: "Nepovinné..." },
      ],
      zena: [
        { id: "topic_interest", type: "radio", text: "Láka ťa táto téma?", options: OPTIONS_INTEREST },
        { id: "experience", type: "radio", text: "Máš s tým skúsenosť?", options: OPTIONS_EXPERIENCE },
        { id: "want_try_reality", type: "radio", text: "Chceš to skúsiť v realite?", options: OPTIONS_YN },
        { id: "attraction_drivers", type: "textarea", text: "Čo ťa na tom priťahuje?", placeholder: "Voľné vyjadrenie..." },
        { id: "frequency_mood", type: "textarea", text: "Ako často / v akej nálade?", placeholder: "Napr. výnimočne, keď mám náladu..." },
        { id: "hard_no", type: "textarea", text: "Je niečo, čo určite nie?", placeholder: "Nepovinné..." },
      ],
    },
    match_pairs: [
      {
        id: "general_interest",
        man_key: "topic_interest",
        woman_key: "topic_interest",
        label: "Záujem o tému",
        description: "Porovnanie záujmu oboch partnerov",
        emoji: "💬",
      },
      {
        id: "general_reality",
        man_key: "want_try_reality",
        woman_key: "want_try_reality",
        label: "Ochota skúsiť v realite",
        description: "Obaja chcú alebo nechcú v realite",
        emoji: "🎯",
      },
    ],
  },
};

export function getTopicMap(slug) {
  return TOPIC_MODULE_MAP[slug] || TOPIC_MODULE_MAP._default;
}

export function hasManualTopicMap(slug) {
  return Boolean(slug && TOPIC_MODULE_MAP[slug]);
}

export function getQuestionsForGender(slug, gender) {
  const map = getTopicMap(slug);
  return map.questions[gender] || map.questions.muz || [];
}

export function getMatchPairs(slug) {
  return getTopicMap(slug).match_pairs || [];
}
