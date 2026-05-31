export const faceSittingModule = {
  slug: "face-sitting",
  title: "Face Sitting \u2013 Roz\u0161\u00edren\u00fd modul",
  intro: "Face sitting je int\u00edmna poloha, kde jeden partner sed\u00ed na tv\u00e1ri druh\u00e9ho. Existuje v mnoh\u00fdch verzi\u00e1ch \u2013 od jemnej po dominantn\u00fa, od worship po service. Alternat\u00edvne n\u00e1zvy: queening (\u017eena hore), kinging (mu\u017e hore).",
  sections: [
    {
      id: "experience",
      title: "Sk\u00fasenos\u0165",
      questions: [
        {
          id: "exp_level",
          text: "Ak\u00e1 je tvoja sk\u00fasenos\u0165 s face sitting?",
          type: "radio",
          options: [
            { value: "top_exp", label: "M\u00e1m sk\u00fasenos\u0165 v poz\u00edcii hore" },
            { value: "bottom_exp", label: "M\u00e1m sk\u00fasenos\u0165 v poz\u00edcii dole" },
            { value: "both_exp", label: "M\u00e1m sk\u00fasenos\u0165 v oboch poz\u00edci\u00e1ch" },
            { value: "no_exp", label: "Nem\u00e1m sk\u00fasenos\u0165" },
          ],
        },
        {
          id: "exp_feeling",
          text: "Ako by si op\u00edsal/a svoje pocity z tejto sk\u00fasenosti?",
          type: "radio",
          options: [
            { value: "loved", label: "Ve\u013emi sa mi to p\u00e1\u010dilo" },
            { value: "liked", label: "Bolo to pr\u00edjemn\u00e9" },
            { value: "neutral", label: "Neutr\u00e1lne" },
            { value: "uncomfortable", label: "Nebolo mi to pr\u00edjemn\u00e9" },
            { value: "na", label: "Nem\u00e1m sk\u00fasenos\u0165" },
          ],
        },
      ],
    },
    {
      id: "role_top",
      title: "Rola HORE",
      subtitle: "\u010co \u0165a l\u00e1ka na poz\u00edcii, ke\u010f si hore",
      questions: [
        {
          id: "top_attraction",
          text: "\u010co \u0165a na tejto role pri\u0165ahuje?",
          type: "checkbox",
          options: [
            { value: "control", label: "Kontrola a vedenie" },
            { value: "view", label: "V\u00fdh\u013ead na partnera" },
            { value: "power", label: "Pocit moci" },
            { value: "worship_from", label: "Worship od partnera" },
            { value: "oral_stim", label: "Or\u00e1lna stimul\u00e1cia" },
            { value: "intimacy", label: "Int\u00edmna bl\u00edzkos\u0165" },
          ],
        },
        {
          id: "top_pressure",
          text: "Ak\u00fd tlak by ti vyhovoval?",
          type: "radio",
          options: [
            { value: "light", label: "Jemn\u00fd \u2013 len \u013eahk\u00e9 posadenie" },
            { value: "medium", label: "Stredn\u00fd \u2013 c\u00edti\u0165 v\u00e1hu" },
            { value: "heavy", label: "Siln\u00fd \u2013 pln\u00e1 v\u00e1ha" },
            { value: "depends", label: "Z\u00e1vis\u00ed od n\u00e1lady" },
          ],
        },
        {
          id: "top_tempo",
          text: "Ak\u00e9 tempo preferuje\u0161?",
          type: "radio",
          options: [
            { value: "slow", label: "Pomal\u00e9 a zmyslov\u00e9" },
            { value: "alternating", label: "Striedav\u00e9" },
            { value: "intense", label: "Intenz\u00edvne" },
          ],
        },
        {
          id: "top_lead",
          text: "Chce\u0161 vies\u0165 alebo by\u0165 veden\u00fd/\u00e1?",
          type: "radio",
          options: [
            { value: "lead", label: "Chcem vies\u0165" },
            { value: "be_led", label: "Chcem by\u0165 veden\u00fd/\u00e1" },
            { value: "alternate", label: "Strieda\u0165 pod\u013ea n\u00e1lady" },
          ],
        },
        {
          id: "top_dominance",
          text: "L\u00e1ka \u0165a dominantn\u00fd aspekt tejto poz\u00edcie?",
          type: "scale",
          max: 5,
          labels: { min: "V\u00f4bec nie", max: "Ve\u013emi" },
        },
        {
          id: "top_worship",
          text: "L\u00e1ka \u0165a worship aspekt (by\u0165 uctievan\u00fd/\u00e1)?",
          type: "scale",
          max: 5,
          labels: { min: "V\u00f4bec nie", max: "Ve\u013emi" },
        },
        {
          id: "top_turnoff",
          text: "\u010co by \u0165a v tejto role odradilo?",
          type: "checkbox",
          options: [
            { value: "intensity", label: "Pr\u00edli\u0161 vysok\u00e1 intenzita" },
            { value: "duration", label: "Pr\u00edli\u0161 dlh\u00e9 trvanie" },
            { value: "partner_discomfort", label: "Nepohodlie partnera" },
            { value: "self_consciousness", label: "Pocit tr\u00e1pnosti" },
            { value: "nothing", label: "Ni\u010d, som otvoren\u00fd/\u00e1" },
          ],
        },
      ],
    },
    {
      id: "role_bottom",
      title: "Rola DOLE",
      subtitle: "\u010co \u0165a l\u00e1ka na poz\u00edcii, ke\u010f si dole",
      questions: [
        {
          id: "bottom_attraction",
          text: "\u010co \u0165a na tejto role pri\u0165ahuje?",
          type: "checkbox",
          options: [
            { value: "service", label: "Slu\u017eba partnerovi" },
            { value: "surrender", label: "Pocit odovzdania" },
            { value: "scent_taste", label: "V\u00f4\u0148a / chu\u0165 / bl\u00edzkos\u0165" },
            { value: "pressure", label: "Tlak a v\u00e1ha partnera" },
            { value: "visual", label: "Vizu\u00e1lny aspekt" },
            { value: "being_used", label: "Pocit podriadenosti" },
          ],
        },
        {
          id: "bottom_service",
          text: "L\u00e1ka \u0165a pocit slu\u017eby partnerovi?",
          type: "scale",
          max: 5,
          labels: { min: "V\u00f4bec nie", max: "Ve\u013emi" },
        },
        {
          id: "bottom_surrender",
          text: "L\u00e1ka \u0165a pocit odovzdania?",
          type: "scale",
          max: 5,
          labels: { min: "V\u00f4bec nie", max: "Ve\u013emi" },
        },
        {
          id: "bottom_sensory",
          text: "L\u00e1ka \u0165a zmyslov\u00fd aspekt (v\u00f4\u0148a, chu\u0165, bl\u00edzkos\u0165)?",
          type: "scale",
          max: 5,
          labels: { min: "V\u00f4bec nie", max: "Ve\u013emi" },
        },
        {
          id: "bottom_pressure_pref",
          text: "L\u00e1ka \u0165a tlak a v\u00e1ha?",
          type: "radio",
          options: [
            { value: "yes", label: "\u00c1no, je to s\u00fa\u010das\u0165 z\u00e1\u017eitku" },
            { value: "mild", label: "Mierne, nechcem pr\u00edli\u0161" },
            { value: "no", label: "Nie, preferujem \u013eahkos\u0165" },
          ],
        },
        {
          id: "bottom_discomfort",
          text: "\u010co by ti bolo nepr\u00edjemn\u00e9?",
          type: "checkbox",
          options: [
            { value: "heavy_pressure", label: "Siln\u00fd tlak na tv\u00e1r" },
            { value: "long_duration", label: "Pr\u00edli\u0161 dlh\u00e9 trvanie" },
            { value: "breathing", label: "Obmedzen\u00e9 d\u00fdchanie" },
            { value: "position", label: "Nepohodln\u00e1 poz\u00edcia" },
            { value: "nothing", label: "Ni\u010d, som otvoren\u00fd/\u00e1" },
          ],
        },
      ],
    },
    {
      id: "intensity",
      title: "Intenzita a Tempo",
      questions: [
        {
          id: "pref_pressure",
          text: "Preferovan\u00fd tlak:",
          type: "radio",
          options: [
            { value: "light", label: "Jemn\u00fd" },
            { value: "medium", label: "Stredn\u00fd" },
            { value: "heavy", label: "Siln\u00fd" },
            { value: "varies", label: "Men\u00ed sa pod\u013ea n\u00e1lady" },
          ],
        },
        {
          id: "pref_tempo",
          text: "Preferovan\u00e9 tempo:",
          type: "radio",
          options: [
            { value: "slow", label: "Pomal\u00e9 a zmyslov\u00e9" },
            { value: "alternating", label: "Striedav\u00e9" },
            { value: "intense", label: "R\u00fdchle a intenz\u00edvne" },
          ],
        },
      ],
    },
    {
      id: "dynamics",
      title: "Dynamika a Atmosf\u00e9ra",
      questions: [
        {
          id: "style_pref",
          text: "Ak\u00fd \u0161t\u00fdl \u0165a l\u00e1ka?",
          type: "checkbox",
          options: [
            { value: "gentle", label: "Jemn\u00fd a romantick\u00fd" },
            { value: "playful", label: "Hrav\u00fd" },
            { value: "dominant", label: "Dominantn\u00fd" },
            { value: "submissive", label: "Submis\u00edvny" },
            { value: "worship", label: "Worship / service" },
            { value: "dirty_talk", label: "S dirty talk" },
            { value: "humiliation", label: "Poni\u017eovanie ako kink" },
          ],
        },
        {
          id: "atmosphere",
          text: "Ak\u00e1 atmosf\u00e9ra ti vyhovuje?",
          type: "radio",
          options: [
            { value: "romantic", label: "Romantick\u00e1 a ne\u017en\u00e1" },
            { value: "playful", label: "Hrav\u00e1 a uvo\u013enen\u00e1" },
            { value: "intense", label: "Intenz\u00edvna a v\u00e1\u0161niv\u00e1" },
            { value: "experimental", label: "Experiment\u00e1lna" },
          ],
        },
      ],
    },
    {
      id: "fantasy_reality",
      title: "Fant\u00e1zia vs Realita",
      questions: [
        {
          id: "fantasy_status",
          text: "Je to pre teba...",
          type: "radio",
          options: [
            { value: "want_try", label: "Chcem to sk\u00fasi\u0165 / robi\u0165" },
            { value: "maybe_conditions", label: "Mo\u017eno za ur\u010dit\u00fdch podmienok" },
            { value: "fantasy_only", label: "Iba fant\u00e1zia, nechcem re\u00e1lne" },
            { value: "not_interested", label: "Nechcem prenies\u0165 do reality" },
          ],
        },
        {
          id: "conditions",
          text: "Ak za podmienok \u2013 ak\u00e9 by to boli?",
          type: "textarea",
          subtitle: "Nap\u00ed\u0161, \u010do by muselo plati\u0165, aby si to chcel/a sk\u00fasi\u0165",
          placeholder: "Napr. d\u00f4vera, spr\u00e1vna n\u00e1lada, \u010distota...",
        },
      ],
    },
    {
      id: "partner_note",
      title: "Pozn\u00e1mka pre partnera",
      subtitle: "Tieto odpovede uvid\u00ed tvoj partner v porovnan\u00ed",
      questions: [
        {
          id: "want_to_try",
          text: "\u010co by si chcel/a sk\u00fasi\u0165?",
          type: "textarea",
          placeholder: "Nap\u00ed\u0161 otvorene...",
        },
        {
          id: "fantasy_share",
          text: "\u010co iba ako fant\u00e1ziu?",
          type: "textarea",
          placeholder: "Nie\u010do, \u010do \u0165a l\u00e1ka len v predstav\u00e1ch...",
        },
        {
          id: "not_yet",
          text: "\u010co zatia\u013e nie?",
          type: "textarea",
          placeholder: "\u010comu sa chce\u0161 vyhn\u00fa\u0165 alebo na \u010do nie si pripraven\u00fd/\u00e1...",
        },
        {
          id: "never",
          text: "\u010co ur\u010dite nie?",
          type: "textarea",
          placeholder: "Tvoje pevn\u00e9 hranice...",
        },
      ],
    },
  ],
};