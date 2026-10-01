import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Brzdy a spúšťače vzrušenia — okruh „brzdy-spustace" v module A1
// „Mentálna príprava, túžba a dlhodobá intimita".
// Zdroj: „06_Brzdy_a_spustace_vzrusenia.docx" bol prázdny (len názov, žiadny
// obsah) — táto téma je preto napísaná od základu podľa dobre zavedeného
// psychoedukačného rámca „Dual Control Model" (akcelerátor / brzda vzrušenia),
// so zachovaním existujúcich L4 seedov modulu (kontexty ktoré zapínajú/vypínajú,
// strach z následkov, hnev, únava, alkohol). z/m verzia zrkadlová.
// Doplnené 2026-10-01: WHO SHAPE k medzikultúrnemu jazyku; Natsal-3
// religiozita a sexualita; Leonhardt et al. k sexuálnej posvätnosti,
// vine a spokojnosti; kvalitatívny výskum moslimských, kresťanských a
// židovských rodín k hraniciam a sexuálnym skriptom.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string): TemaObsah['nadpis'] => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'silny', label: 'Silne to na mňa platí' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne / nevšímam si to' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'vobec', label: 'Vôbec' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Akcelerátor — čo túžbu zapína ────────────────────────────────────
const AKCELERATOR: Blok = {
  druh: 'skupina', id: 'akcelerator', nadpis: 'Môj akcelerátor — čo túžbu zapína',
  bloky: [
    {
      druh: 'otazka', id: 'akc_co', typ: 'viac', inePovolene: true,
      text: 'Čo u mňa najspoľahlivejšie naštartuje túžbu',
      moznosti: [
        { v: 'dovera_bezpecie', label: 'Pocit dôvery a bezpečia s partnerom' },
        { v: 'novota', label: 'Novota — nové miesto, technika, situácia' },
        { v: 'pozornost', label: 'Plná pozornosť partnera, byť „videný/á"' },
        { v: 'vzhlad', label: 'Vlastný pocit atraktivity / dobrý vzhľad' },
        { v: 'predstavivost', label: 'Fantázia a predstavivosť — aj bez dotyku' },
        { v: 'priama_stimulacia', label: 'Priama fyzická stimulácia (aj bez „nálady" vopred)' },
        { v: 'pochvala', label: 'Slovná pochvala alebo túžba počuť „chcem ťa"' },
        { v: 'napatie', label: 'Napätie z očakávania (flirt počas dňa, odkladanie)' },
      ],
    },
    p('akc_responzivna', 'Moja túžba je skôr responzívna — príde až počas stimulácie, nie vopred'),
    p('akc_spontanna', 'Moja túžba je skôr spontánna — príde sama, bez podnetu'),
  ],
}

// ── Brzda — čo túžbu vypína ───────────────────────────────────────────
const BRZDA: Blok = {
  druh: 'skupina', id: 'brzda', nadpis: 'Moja brzda — čo túžbu vypína',
  bloky: [
    {
      druh: 'otazka', id: 'brz_co', typ: 'viac', inePovolene: true,
      text: 'Čo u mňa najspoľahlivejšie vzrušenie vypne',
      moznosti: [
        { v: 'stres', label: 'Stres a starosti (práca, financie, deti)' },
        { v: 'strach_nasledkov', label: 'Strach z následkov (tehotenstvo, STI, „čo si o mne pomyslí")' },
        { v: 'hnev_konflikt', label: 'Hnev alebo nevyriešený konflikt' },
        { v: 'unava', label: 'Únava' },
        { v: 'telo_image', label: 'Nespokojnosť s vlastným telom v danej chvíli' },
        { v: 'tlak_na_vykon', label: 'Tlak na výkon / pozorovanie seba počas sexu' },
        { v: 'hluk_vyrusenie', label: 'Hluk, vyrušenie, strach že nás niekto počuje' },
        { v: 'rutina', label: 'Pocit, že „to je vždy rovnaké"' },
      ],
    },
    {
      druh: 'otazka', id: 'brz_alkohol', typ: 'jeden',
      text: 'Alkohol — ako naň reagujem',
      moznosti: [
        { v: 'uvolni', label: 'Malé množstvo uvoľní a pomôže brzde povoliť' },
        { v: 'vypne', label: 'Väčšie množstvo skôr vzrušenie vypne / otupí' },
        { v: 'nezalezi', label: 'Nemá na mňa výrazný vplyv' },
      ],
    },
    { druh: 'otazka', id: 'brz_ktore_najsilnejsie', typ: 'text', text: 'Ktoré 1–2 brzdy sú u mňa najsilnejšie a najčastejšie sa spúšťajú:' },
  ],
}

// ── Kontext ────────────────────────────────────────────────────────────
const KONTEXT: Blok = {
  druh: 'skupina', id: 'kontext', nadpis: 'Kontext — miesto, čas a energia',
  bloky: [
    {
      druh: 'otazka', id: 'kon_cas', typ: 'jeden',
      text: 'Kedy mám najviac priestoru pre túžbu',
      moznosti: [
        { v: 'rano', label: 'Ráno, s čerstvou energiou' },
        { v: 'vecer', label: 'Večer, keď je za nami deň' },
        { v: 'vikend', label: 'Cez víkend, bez časového tlaku' },
        { v: 'nezalezi', label: 'Nezáleží na čase, skôr na nálade' },
      ],
    },
    p('kon_cas_tlak', 'Časový tlak („musíme to stihnúť pred niečím") je pre mňa brzda'),
    p('kon_prostredie_bezpecie', 'Potrebujem pocit súkromia a bezpečia priestoru, inak sa neuvoľním'),
  ],
}

const KULTURA_VIERA_JAZYK: Blok = {
  druh: 'skupina', id: 'kultura_viera_jazyk', nadpis: 'Kultúra, náboženstvo a jazyk túžby',
  uvod:
    'Kultúrne a náboženské prostredie môže priniesť hanbu a prísne roly, ale aj vernosť, posvätnosť, rituál a hlboký význam manželskej sexuality. Neexistuje jediný „náboženský“ ani „moderný“ postoj — dôležité je oddeliť vlastné hodnoty od pravidiel, ktoré človek prijal zo strachu.',
  bloky: [
    {
      druh: 'otazka', id: 'kvj_skripty', typ: 'viac', inePovolene: true,
      text: 'Ktoré vety alebo kultúrne skripty vo mne stále pôsobia',
      moznosti: [
        { v: 'dobry_muz', label: '„Správny muž musí stále chcieť, viesť a podať výkon“' },
        { v: 'dobra_zena', label: '„Dobrá žena nemá byť príliš sexuálna ani iniciovať“' },
        { v: 'sex_laska', label: 'Sex má zmysel iba s láskou alebo záväzkom' },
        { v: 'manzelstvo', label: 'Sex patrí iba do manželstva' },
        { v: 'panenstvo', label: 'Panenstvo a „čistota“ určujú hodnotu človeka' },
        { v: 'nahota', label: 'Nahota, masturbácia alebo hovorenie o sexe sú hanba' },
        { v: 'povinnost', label: 'Partner má vo vzťahu sexuálnu povinnosť' },
        { v: 'rodove_roly', label: 'Penetrácia, vedenie a prijímanie majú byť pevne rozdelené podľa rodu' },
        { v: 'rodina', label: 'O našom sexuálnom živote rozhodujú aj očakávania rodiny alebo komunity' },
      ],
    },
    {
      druh: 'otazka', id: 'kvj_co_si_chcem_nechat', typ: 'viac', inePovolene: true,
      text: 'Čo si zo svojich hodnôt chcem v intimite zachovať',
      moznosti: [
        { v: 'vernost', label: 'Vernosť a výnimočnosť nášho spojenia' },
        { v: 'posvatnost', label: 'Pocit, že sex je posvätný alebo spirituálny' },
        { v: 'ritual', label: 'Rituály, modlitbu, vďačnosť alebo vedomú prítomnosť' },
        { v: 'sukromie', label: 'Súkromie a skromnosť pred svetom' },
        { v: 'zavazok', label: 'Sex ako vyjadrenie záväzku a starostlivosti' },
        { v: 'rovnost', label: 'Rovnaké právo oboch na túžbu, iniciatívu a potešenie' },
        { v: 'sloboda', label: 'Slobodu vytvoriť si vlastnú erotickú kultúru páru' },
      ],
    },
    {
      druh: 'otazka', id: 'kvj_hanba', typ: 'viac', inePovolene: true,
      text: 'Pri čom sa vo mne ozýva naučená hanba, aj keď to vedome považujem za prijateľné',
      moznosti: [
        { v: 'iniciovat', label: 'Iniciovať alebo otvorene prejaviť túžbu' },
        { v: 'prijimat', label: 'Iba prijímať rozkoš a byť stredobodom' },
        { v: 'hlas', label: g('Byť hlučný, vulgárny alebo telesne nespútaný', 'Byť hlučná, vulgárna alebo telesne nespútaná') },
        { v: 'fantazie', label: 'Priznať fantázie, ktoré nezodpovedajú môjmu obrazu „dobrého človeka“' },
        { v: 'telo', label: 'Ukázať telo pri svetle alebo pomenovať genitálie' },
        { v: 'hracky', label: 'Používať hračky, masturbovať alebo potrebovať inú stimuláciu' },
        { v: 'rola', label: 'Túžiť po dominantnej, submisívnej alebo rodovo netypickej role' },
      ],
    },
    {
      druh: 'otazka', id: 'kvj_jazyk', typ: 'viac', inePovolene: true,
      text: 'V akom jazyku sa mi o túžbe hovorí najprirodzenejšie',
      moznosti: [
        { v: 'slovensky', label: 'Po slovensky — priamo a bez eufemizmov' },
        { v: 'iny_jazyk', label: 'V inom jazyku, ktorý znižuje hanbu alebo znie erotickejšie' },
        { v: 'odborne', label: 'Anatomické a odborné názvy' },
        { v: 'jemne', label: 'Jemné prezývky a metafory' },
        { v: 'vulgarne', label: 'Vulgárny alebo pornografický slovník' },
        { v: 'bez_slov', label: 'Radšej gestá, zvuky a ukazovanie než pomenovanie' },
        { v: 'striedat', label: 'Iný jazyk pri rozhovore a iný počas sexu' },
      ],
    },
    {
      druh: 'otazka', id: 'kvj_partner', typ: 'jeden',
      text: g('Keď má partnerka iný kultúrny, náboženský alebo jazykový vzťah k sexu', 'Keď má partner iný kultúrny, náboženský alebo jazykový vzťah k sexu'),
      moznosti: [
        { v: 'zvedavost', label: g('Chcem pochopiť, čo je pre ňu hodnota a čo naučená hanba', 'Chcem pochopiť, čo je pre neho hodnota a čo naučená hanba') },
        { v: 'spolocny_jazyk', label: 'Chcem vytvoriť náš vlastný spoločný jazyk a rituály' },
        { v: 'kompromis', label: 'Vieme rešpektovať odlišnosť, ak sa nepopiera túžba ani hranice druhého' },
        { v: 'konflikt', label: 'Tento rozdiel vo mne vyvoláva konflikt, strach alebo pocit hodnotenia' },
      ],
    },
    { druh: 'otazka', id: 'kvj_veta', typ: 'text', text: g('Jedna veta o sexe, ktorú som si priniesol z rodiny alebo komunity a chcem ju zachovať, prepísať alebo opustiť:', 'Jedna veta o sexe, ktorú som si priniesla z rodiny alebo komunity a chcem ju zachovať, prepísať alebo opustiť:') },
    {
      druh: 'text', id: 'kvj_myty', ton: 'info', nadpis: 'Mýty verzus realita',
      telo:
        'Mýtus: náboženstvo sexualitu iba potláča. Realita: môže prinášať vinu a rigidné skripty, ale aj posvätnosť, vernosť a hlbokú spokojnosť — záleží na tom, aký význam mu pár dáva. Mýtus: hovoriť v inom jazyku je neautentické. Realita: odstup cudzieho jazyka môže človeku dovoliť pomenovať túžbu bez starej hanby a neskôr si nájsť vlastné slová aj doma.',
    },
  ],
}

// ── Komunikácia o brzde ────────────────────────────────────────────────
const KOMUNIKACIA: Blok = {
  druh: 'skupina', id: 'komunikacia', nadpis: 'Keď sa brzda zapne — ako o tom hovoriť',
  bloky: [
    {
      druh: 'text', id: 'kom_info', ton: 'info',
      telo:
        'Brzda nie je odmietnutie partnera — je to signál tela alebo mysle. Pomenovanie brzdy nahlas ' +
        '(„som unavený/á", „mám v hlave prácu") je oveľa jednoduchšie zvládnuteľné než ticho a domnienky.',
    },
    {
      druh: 'otazka', id: 'kom_ako', typ: 'jeden',
      text: 'Ako najradšej dám vedieť, že mám práve zapnutú brzdu',
      moznosti: [
        { v: 'priamo', label: 'Priamo poviem, čo sa deje' },
        { v: 'signal', label: 'Radšej krátky dohodnutý signál/slovo' },
        { v: 'neverbalne', label: 'Neverbálne — partner to spozná sám' },
      ],
    },
    { druh: 'otazka', id: 'kom_pomaha', typ: 'text', text: 'Čo mi vtedy pomáha (čas, rozhovor, nesexuálna blízkosť, odložiť na inokedy):' },
  ],
}

export const BRZDY_SPUSTACE: TemaObsah = {
  slug: 'mentalna-priprava-tuzba/brzdy-spustace',
  nadpis: 'Brzdy a spúšťače vzrušenia (dual control)',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Akcelerátor a brzda',
      telo:
        'Vzrušenie funguje ako dva nezávislé systémy — akcelerátor (reaguje na sexuálne podnety) a brzda ' +
        '(reaguje na čokoľvek, čo vyhodnotí ako riziko alebo rozptýlenie). U každého sú inak citlivé. ' +
        'Nejde o to mať „silnejší" akcelerátor, ale poznať a rešpektovať vlastnú brzdu.',
    },
    {
      druh: 'text', id: 'ramec', nadpis: 'Prečo je to dôležité', ton: 'info',
      telo:
        'Nízka túžba často nie je „slabý akcelerátor" — je to aktívna brzda. Poznanie vlastných spúšťačov ' +
        'a brzdičov pomáha partnerovi vytvárať podmienky, v ktorých sa túžba objaví prirodzene, bez tlaku.',
    },
  ],
  telo: [
    AKCELERATOR,
    BRZDA,
    KONTEXT,
    KULTURA_VIERA_JAZYK,
    KOMUNIKACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — je to mapa na spoločné vytváranie podmienok, nie hodnotenie.',
    },
  ],
}
