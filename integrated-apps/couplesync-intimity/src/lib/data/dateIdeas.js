export const DATE_IDEAS = [
  // Free + Low energy
  { title: 'Ve\u010dern\u00e1 prech\u00e1dzka a rozhovor', budget: 'free', energy: 'low', type: 'outdoor', time: '1h', emoji: '\ud83c\udf19' },
  { title: 'Sladkosť a film na gauči', budget: 'free', energy: 'low', type: 'indoor', time: '2h', emoji: '\ud83c\udfac' },
  { title: 'Otázky zo Spoznajme sa pri \u010daji', budget: 'free', energy: 'low', type: 'indoor', time: '1h', emoji: '\u2615' },
  { title: 'Pohľad na hviezdnu oblohu', budget: 'free', energy: 'low', type: 'outdoor', time: '45min', emoji: '\u2b50' },
  { title: 'Spolo\u010dn\u00e9 \u010d\u00edtanie na gauči', budget: 'free', energy: 'low', type: 'indoor', time: '1h', emoji: '\ud83d\udcda' },
  { title: 'Ru\u010dn\u00e9 p\u00edsanie listov navz\u00e1jom', budget: 'free', energy: 'low', type: 'indoor', time: '1h', emoji: '\ud83d\udc8c' },

  // Free + High energy
  { title: 'Tanec doma na obľúbené playlisty', budget: 'free', energy: 'high', type: 'indoor', time: '1h', emoji: '\ud83c\udfb5' },
  { title: 'Turistika alebo beh v prir\u00f3de', budget: 'free', energy: 'high', type: 'outdoor', time: '2h', emoji: '\ud83c\udfde' },
  { title: 'Spoločné varenie nového receptu', budget: 'free', energy: 'high', type: 'indoor', time: '2h', emoji: '\ud83c\udf73' },
  { title: 'Bicyklovan\u00ed po meste', budget: 'free', energy: 'high', type: 'outdoor', time: '2h', emoji: '\ud83d\udeb4' },

  // Small budget + Low energy
  { title: 'Káva v kav\u00e1rni, ktor\u00fa sme ne\u0161li', budget: 'small', energy: 'low', type: 'outdoor', time: '1h', emoji: '\u2615' },
  { title: 'Zmrzlina a prech\u00e1dzka', budget: 'small', energy: 'low', type: 'outdoor', time: '1h', emoji: '\ud83c\udf66' },
  { title: 'Kino – film, ktor\u00fd chcela/chcel', budget: 'small', energy: 'low', type: 'indoor', time: '2h', emoji: '\ud83c\udfac' },
  { title: 'Spolo\u010dn\u00e1 hra zo spolo\u010densk\u00fdch hier', budget: 'small', energy: 'low', type: 'indoor', time: '2h', emoji: '\ud83c\udfb2' },
  { title: 'Obed v novej re\u0161taur\u00e1cii', budget: 'small', energy: 'low', type: 'outdoor', time: '1.5h', emoji: '\ud83c\udf7d' },

  // Small budget + High energy
  { title: 'Minigolf alebo bowling', budget: 'small', energy: 'high', type: 'outdoor', time: '2h', emoji: '\ud83c\ude62' },
  { title: 'Trh alebo farmársky market', budget: 'small', energy: 'high', type: 'outdoor', time: '2h', emoji: '\ud83c\udf3f' },
  { title: 'Escape room', budget: 'small', energy: 'high', type: 'indoor', time: '1.5h', emoji: '\ud83d\udd13' },
  { title: 'Paintball alebo laser game', budget: 'small', energy: 'high', type: 'indoor', time: '2h', emoji: '\ud83c\udfaf' },

  // Big budget + Low energy
  { title: 'Wellness a sp\u00e1 na cel\u00fd de\u0148', budget: 'big', energy: 'low', type: 'indoor', time: 'fullday', emoji: '\ud83d\udec1' },
  { title: 'Tasting menu v re\u0161taur\u00e1cii', budget: 'big', energy: 'low', type: 'indoor', time: '3h', emoji: '\ud83c\udf77' },
  { title: 'Noc v hotel\u00ed v inom meste', budget: 'big', energy: 'low', type: 'both', time: 'fullday', emoji: '\ud83c\udfe8' },
  { title: 'Divadeln\u00e9 predstavenie alebo koncert', budget: 'big', energy: 'low', type: 'indoor', time: '3h', emoji: '\ud83c\udfad' },

  // Big budget + High energy
  { title: 'Výlet do hôr – túra a nocľah', budget: 'big', energy: 'high', type: 'outdoor', time: 'fullday', emoji: '\u26f0\ufe0f' },
  { title: 'Kurz varen\u00ed, kera\u014diky alebo tanca', budget: 'big', energy: 'high', type: 'indoor', time: '3h', emoji: '\ud83c\udfa8' },
  { title: 'Skydiving alebo zipline', budget: 'big', energy: 'high', type: 'outdoor', time: '4h', emoji: '\ud83e\ude82' },
];

export const BUDGETS = [
  { key: 'free', label: 'Zadarmo', emoji: '\ud83d\udcb0' },
  { key: 'small', label: 'Do 30\u20ac', emoji: '\ud83d\udcb3' },
  { key: 'big', label: '30\u20ac+', emoji: '\u2728' },
];
export const ENERGIES = [
  { key: 'low', label: 'Pohodov\u00e9', emoji: '\ud83d\udec4' },
  { key: 'high', label: 'Akt\u00edvne', emoji: '\ud83d\udcaa' },
];
export const TYPES = [
  { key: 'indoor', label: 'Doma/Vnútri', emoji: '\ud83c\udfe0' },
  { key: 'outdoor', label: 'Vonku', emoji: '\ud83c\udf33' },
];
