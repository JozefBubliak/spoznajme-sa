import questionArchetypes from "./generated/question_archetypes_v1.json";

/*
 * JSON je kanonický zdroj. Wrapper ponecháva stabilné importy pre generátor.
 */
export const QUESTION_ARCHETYPES = questionArchetypes;

/*
export const LEGACY_QUESTION_ARCHETYPES = [
  {
    archetype_id: "topic_gate",
    ui_type: "radio",
    default_options: [
      { value: "yes", label: "Áno, chcem preskúmať" },
      { value: "later", label: "Ešte nie" },
      { value: "no", label: "Nie, nechcem túto tému riešiť" },
      { value: "lock", label: "Zamknúť tému" },
    ],
  },
  {
    archetype_id: "interest_scale",
    ui_type: "radio",
    default_options: [
      { value: "strong_yes", label: "Áno, veľmi ma láka" },
      { value: "yes", label: "Áno" },
      { value: "maybe", label: "Možno, závisí od okolností" },
      { value: "neutral", label: "Neutrálny/á" },
      { value: "no", label: "Nie" },
      { value: "hard_no", label: "Určite nie" },
    ],
  },
  {
    archetype_id: "experience_status",
    ui_type: "radio",
    default_options: [
      { value: "experienced", label: "Áno, mám skúsenosť" },
      { value: "tried_once", label: "Skúsil/a som raz" },
      { value: "theoretical", label: "Len teoreticky / z fantázie" },
      { value: "none", label: "Nie, nemám skúsenosť" },
    ],
  },
  {
    archetype_id: "role_choice",
    ui_type: "radio",
    default_options: [
      { value: "receive", label: "Prijímam" },
      { value: "give", label: "Poskytujem" },
      { value: "lead", label: "Vediem" },
      { value: "follow", label: "Nechám sa viesť" },
      { value: "both", label: "Obe roly" },
      { value: "unsure", label: "Neviem" },
    ],
  },
  {
    archetype_id: "top_bottom_choice",
    ui_type: "radio",
    default_options: [
      { value: "top", label: "Hore" },
      { value: "bottom", label: "Dole" },
      { value: "both", label: "Oboje" },
      { value: "unsure", label: "Neviem" },
    ],
  },
  {
    archetype_id: "fantasy_reality",
    ui_type: "radio",
    default_options: [
      { value: "reality_now", label: "Chcem to v realite" },
      { value: "reality_someday", label: "Možno niekedy v realite" },
      { value: "fantasy_only", label: "Len ako fantázia" },
      { value: "not_interested", label: "Nemám záujem" },
    ],
  },
  {
    archetype_id: "intensity_scale",
    ui_type: "scale",
    max: 5,
    labels: { min: "Veľmi jemná", max: "Intenzívna" },
  },
  {
    archetype_id: "frequency",
    ui_type: "radio",
    default_options: [
      { value: "daily", label: "Každý deň" },
      { value: "weekly", label: "Niekoľkokrát týždenne" },
      { value: "monthly", label: "Niekoľkokrát za mesiac" },
      { value: "special", label: "Pri špeciálnych príležitostiach" },
      { value: "rarely", label: "Zriedkavo" },
    ],
  },
  {
    archetype_id: "attraction_drivers",
    ui_type: "checkbox",
    default_options: [
      { value: "intimacy", label: "Intímnosť a blízkosť" },
      { value: "control", label: "Pocit kontroly" },
      { value: "surrender", label: "Odovzdanie sa" },
      { value: "trust", label: "Dôvera" },
      { value: "visual", label: "Vizuálna príťažlivosť" },
      { value: "sensation", label: "Intenzívny fyzický pocit" },
      { value: "power", label: "Dynamika moci" },
      { value: "service", label: "Slúžiť partnerovi" },
      { value: "worship", label: "Byť uctievaný/á" },
    ],
  },
  {
    archetype_id: "barrier_check",
    ui_type: "textarea",
    placeholder: "Nepovinné — písať len ak niečo konkrétne...",
  },
  {
    archetype_id: "free_text",
    ui_type: "textarea",
    placeholder: "Voľné vyjadrenie...",
  },
  {
    archetype_id: "conditions_text",
    ui_type: "textarea",
    placeholder: "Aké podmienky by museli byť splnené?",
  },
  {
    archetype_id: "technique_multi",
    ui_type: "checkbox",
    default_options: [],
  },
  {
    archetype_id: "positions_multi",
    ui_type: "checkbox",
    default_options: [],
  },
  {
    archetype_id: "scale_pressure",
    ui_type: "scale",
    max: 5,
    labels: { min: "Veľmi jemný", max: "Silný tlak" },
  },
  {
    archetype_id: "scale_tempo",
    ui_type: "scale",
    max: 5,
    labels: { min: "Veľmi pomalé", max: "Rýchle" },
  },
];
*/

export function getArchetype(id) {
  return QUESTION_ARCHETYPES.find((a) => a.archetype_id === id);
}
