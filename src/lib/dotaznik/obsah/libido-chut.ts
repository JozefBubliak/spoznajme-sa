import type { TemaObsah, Blok, Moznost } from './typ'

// ─────────────────────────────────────────────────────────────────────────────
// Libido a chuť — okruh „libido-chut" v module A1 „Mentálna príprava,
// túžba a dlhodobá intimita".
// Zdroj: „05_Tuzba_a_libido.docx" bol prázdny (len názov, žiadny obsah) —
// táto téma je preto napísaná od základu podľa existujúceho L4 seedu modulu
// (úroveň túžby, rozdiel medzi nami, spontánna vs responzívna, čo chuť
// spúšťa/zabíja). Mechanika situačných spúšťačov a bŕzd (dual control model)
// má vlastnú tému „Brzdy a spúšťače vzrušenia" — tu je dôraz na úroveň
// a dlhodobú dynamiku túžby medzi partnermi, nie na jednotlivé situácie.
// Doplnené 2026-10-01 po gap audite: Bogaert 2015; Yule et al. 2017;
// Antonsen et al. 2020 (ace/gray/demi); Brotto et al. 2010 a Van Houdenhove
// et al. 2015 (príťažlivosť, vzrušenie a ochota nie sú tá istá os);
// WHO SHAPE (oddelenie dávania/prijímania) a komunitné ace zdroje AVEN/
// r/asexuality k sex-positive/neutral/averse a partnerskej iniciácii.
// ─────────────────────────────────────────────────────────────────────────────

const g = (m: string, z: string): TemaObsah['nadpis'] => ({ m, z })

const POSTOJ: Moznost[] = [
  { v: 'silne_platia', label: 'Silne to na mňa platí' },
  { v: 'skor_ano', label: 'Skôr áno' },
  { v: 'neutral', label: 'Neutrálne' },
  { v: 'skor_nie', label: 'Skôr nie' },
  { v: 'vobec', label: 'Vôbec' },
]
const p = (id: string, text: TemaObsah['nadpis']): Blok => ({
  druh: 'otazka', id, typ: 'skala', text, moznosti: POSTOJ,
})

// ── Úroveň túžby ─────────────────────────────────────────────────────
const UROVEN: Blok = {
  druh: 'skupina', id: 'uroven', nadpis: 'Úroveň túžby',
  bloky: [
    {
      druh: 'otazka', id: 'uro_frekvencia', typ: 'jeden',
      text: 'Ako často by som si ideálne želal(a) intimitu (akéhokoľvek druhu)',
      moznosti: [
        { v: 'denne', label: 'Denne alebo takmer denne' },
        { v: 'niekolkokrat_tyzdenne', label: 'Niekoľkokrát týždenne' },
        { v: 'tyzdenne', label: 'Približne raz týždenne' },
        { v: 'mesacne', label: 'Niekoľkokrát mesačne' },
        { v: 'zriedka', label: 'Zriedka, nie je to pre mňa prioritou' },
      ],
    },
    {
      druh: 'otazka', id: 'uro_zmena', typ: 'jeden',
      text: 'Ako sa moja túžba mení v čase',
      moznosti: [
        { v: 'stabilna', label: 'Je pomerne stabilná' },
        { v: 'kolisa_kratkodobo', label: 'Kolíše v priebehu dní/týždňov (cyklus, nálada)' },
        { v: 'klesa_dlhodobo', label: 'Dlhodobo klesá' },
        { v: 'rastie_dlhodobo', label: 'Dlhodobo rastie' },
      ],
    },
    {
      druh: 'text', id: 'uro_synchronia', ton: 'info',
      telo:
        '30-dňový denníkový výskum 133 párov (Vowels, Mark a kol., 2018) zistil, že túžba u väčšiny ľudí ' +
        'kolíše pravidelne — zhruba raz až dvakrát mesačne — a je stabilná len na obdobia do 3 dní. U väčšiny ' +
        'párov toto kolísanie prebieha dokonca súbežne (synchrónne). Nesúlad v konkrétny deň je preto skôr ' +
        'štatistická náhoda než znak problému vo vzťahu.',
    },
    {
      druh: 'otazka', id: 'uro_styl', typ: 'viac', inePovolene: true,
      text: 'Aký štýl intimity mi najviac sedí (môžeš vybrať viac)',
      moznosti: [
        { v: 'romanticky', label: 'Romantický, pomalý' },
        { v: 'vasnivy', label: 'Vášnivý, naliehavý' },
        { v: 'hravy', label: 'Hravý, so smiechom' },
        { v: 'ritualizovany', label: 'Ritualizovaný — vždy podobný postup' },
        { v: 'spontanny', label: 'Spontánny, rôzny zakaždým' },
      ],
    },
  ],
}

// ── Asexuálne spektrum ────────────────────────────────────────────────
const ASEXUALITA: Blok = {
  druh: 'skupina', id: 'asexualita', nadpis: 'Ak sexuálna túžba chýba takmer úplne',
  uvod:
    'Pre časť ľudí nejde len o „nižšiu" chuť, ale o jej takmer úplnu neprítomnosť — to je legitímna súčasť ' +
    'ľudskej sexuality (asexuálne spektrum), nie porucha, ktorú treba opraviť.',
  bloky: [
    {
      druh: 'otazka', id: 'asex_identifikacia', typ: 'jeden',
      text: 'Ako by som opísal(a) svoju sexuálnu túžbu k druhým ľuďom',
      moznosti: [
        { v: 'bezna', label: 'Bežne ju cítim, sedí na mňa nič z tohto' },
        { v: 'len_vztah', label: '„Demisexuálne" — túžbu cítim len k ľuďom, s ktorými mám hlbokú citovú väzbu' },
        { v: 'zriedkava', label: '„Graysexuálne" — cítim ju len zriedka alebo veľmi slabo' },
        { v: 'takmer_nikdy', label: 'Takmer nikdy necítim sexuálnu príťažlivosť k nikomu (asexuálne)' },
      ],
    },
    {
      druh: 'text', id: 'asex_romanticka', ton: 'info',
      telo:
        'Sexuálna a romantická príťažlivosť sú dve oddelené veci. Človek môže byť asexuálny a zároveň túžiť ' +
        'po romantickom vzťahu, blízkosti, bozkoch a objatí — alebo naopak, sex si užívať bez potreby romantiky.',
    },
    {
      druh: 'otazka', id: 'asex_romanticka_tuzba', typ: 'jeden',
      text: 'Bez ohľadu na sex — po akej blízkosti túžim',
      moznosti: [
        { v: 'romanticka_aj_fyzicka', label: 'Romantická aj nesexuálna fyzická blízkosť (objatie, bozky)' },
        { v: 'len_romanticka', label: 'Len romantická/citová, fyzický kontakt ma neláka' },
        { v: 'len_priatelska', label: 'Skôr hlboké priateľstvo než romantika' },
      ],
    },
    { druh: 'otazka', id: 'asex_partnerovi', typ: 'text', text: 'Čo by som chcel(a), aby o tomto partner/ka vedel(a) alebo pochopil(a):' },
  ],
}

const ACE_HLBKA: Blok = {
  druh: 'skupina', id: 'ace_hlbka', nadpis: 'Ace, gray, demi a aromantické spektrum — čo presne prežívam',
  uvod:
    'Príťažlivosť, telesné vzrušenie, libido, romantická väzba a ochota mať sex sú rozdielne veci. Človek môže necítiť sexuálnu príťažlivosť a pritom mať libido, užívať si dotyk alebo sa slobodne rozhodnúť darovať partnerovi rozkoš.',
  bloky: [
    {
      druh: 'otazka', id: 'ace_postoj_k_sexu', typ: 'jeden',
      text: 'Ako vo všeobecnosti prežívam sexuálny kontakt',
      moznosti: [
        { v: 'positive', label: 'Sex-positive — môže ma baviť a aktívne ho vyhľadávam' },
        { v: 'favorable', label: 'Príjemný v správnom kontexte, aj keď príťažlivosť cítim zriedka alebo vôbec' },
        { v: 'neutral', label: 'Sex-neutral — neprekáža mi, ale bez vlastnej potreby ho nevyhľadávam' },
        { v: 'ambivalent', label: 'Ambivalentný — podľa dňa, aktivity alebo dôvodu' },
        { v: 'averse', label: 'Sex-averse/repulsed — sexuálny kontakt nechcem' },
      ],
    },
    {
      druh: 'otazka', id: 'ace_osi', typ: 'viac', inePovolene: true,
      text: 'Ktoré výroky ma opisujú',
      moznosti: [
        { v: 'libido_bez_osoby', label: 'Mávam telesné libido, ale nie je nasmerované na konkrétneho človeka' },
        { v: 'pritazlivost_bez_chuti', label: 'Môžem cítiť príťažlivosť a pritom nemať chuť na sexuálny kontakt' },
        { v: 'romantika_bez_sexu', label: 'Túžim po romantike bez sexu' },
        { v: 'sex_bez_romantiky', label: 'Sex mi môže byť príjemný aj bez romantickej väzby' },
        { v: 'aromanticke', label: 'Romantickú príťažlivosť cítim zriedka alebo vôbec' },
        { v: 'queerplatonicke', label: 'Najhlbšie spojenie si predstavujem skôr queerplatonicky než romanticky' },
      ],
    },
    {
      druh: 'otazka', id: 'ace_ochota', typ: 'jeden',
      text: g('Keď nemám spontánnu chuť, ale partnerka túži po intimite', 'Keď nemám spontánnu chuť, ale partner túži po intimite'),
      moznosti: [
        { v: 'chcem_darovat', label: g('Môžem jej s radosťou darovať rozkoš bez potreby prijímať', 'Môžem mu s radosťou darovať rozkoš bez potreby prijímať') },
        { v: 'skusim_responzivne', label: 'Môžem začať zvedavo a zistiť, či chuť príde responzívne' },
        { v: 'len_blizkost', label: 'Chcem ponúknuť iba nesexuálnu blízkosť' },
        { v: 'nechcem', label: 'Nechcem sexuálny kontakt a potrebujem, aby to nebolo brané ako odmietnutie človeka' },
      ],
    },
    {
      druh: 'otazka', id: 'ace_dotyky', typ: 'viac', inePovolene: true,
      text: 'Blízkosť, ktorú chcem mať dostupnú aj bez sexuálneho pokračovania',
      moznosti: [
        { v: 'objatie', label: 'Objatie a ležanie pri sebe' },
        { v: 'bozky', label: 'Bozky' },
        { v: 'masaz', label: 'Masáž alebo hladkanie' },
        { v: 'nahota', label: 'Nahota a kontakt koža na kožu' },
        { v: 'spanok', label: 'Spoločné zaspávanie' },
        { v: 'slova', label: 'Slová túžby, uznania a uistenia' },
      ],
    },
    { druh: 'otazka', id: 'ace_citim_sa_ziadany', typ: 'text', text: g('Čo mi pomáha cítiť sa partnerkou skutočne žiadaný, aj keď sex neiniciuje:', 'Čo mi pomáha cítiť sa partnerom skutočne žiadaná, aj keď sex neiniciuje:') },
    {
      druh: 'text', id: 'ace_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo: 'Mýtus: ace človek partnera nemiluje alebo sex nikdy nemôže mať rád. Realita: spektrum opisuje najmä príťažlivosť, nie schopnosť milovať, telesne sa vzrušiť ani slobodne si zvoliť sexuálnu blízkosť. Dôležitá je presná osobná dohoda, nie nálepka.',
    },
  ],
}

const DAVANIE_PRIJIMANIE: Blok = {
  druh: 'skupina', id: 'davanie_prijimanie', nadpis: 'Dávanie a prijímanie nemusia byť symetrické',
  uvod:
    'Pre niekoho je najväčšou rozkošou prijímať, pre iného poskytovať a sledovať reakciu. Reciprocita nemusí znamenať rovnaký akt v tej istej chvíli; môže prísť inokedy alebo mať úplne inú podobu.',
  bloky: [
    {
      druh: 'otazka', id: 'dp_moja_mapa', typ: 'viac', inePovolene: true,
      text: 'Ktoré usporiadanie ma úprimne láka',
      moznosti: [
        { v: 'prijimam_bez_oplatenia', label: 'Prijímať pozornosť bez povinnosti ju hneď oplatiť' },
        { v: 'davam_bez_prijimania', label: 'Poskytovať rozkoš bez potreby, aby sa partner venoval môjmu telu' },
        { v: 'striedame', label: 'Striedať večery alebo roly, nie robiť všetko naraz' },
        { v: 'vzajomne', label: 'Vzájomná stimulácia v rovnakom čase' },
        { v: 'stredobod', label: 'Byť niekedy úplným stredobodom' },
        { v: 'sluzba', label: g('Erotická služba — potešenie z toho, že plním túžbu partnerky', 'Erotická služba — potešenie z toho, že plním túžbu partnera') },
      ],
    },
    {
      druh: 'otazka', id: 'dp_partner_tuzi', typ: 'jeden',
      text: g('Keď partnerku vzrušuje iba prijímať alebo iba dávať', 'Keď partnera vzrušuje iba prijímať alebo iba dávať'),
      moznosti: [
        { v: 'laka', label: 'Je to so mnou kompatibilné a vzrušuje ma to' },
        { v: 'obcas', label: 'Áno občas, nie ako jediný dlhodobý model' },
        { v: 'potrebujem_rec', label: 'Potrebujem jasnú formu reciprocity, hoci nemusí byť okamžitá' },
        { v: 'nepasuje', label: 'Takáto asymetria mi nevyhovuje' },
      ],
    },
    { druh: 'otazka', id: 'dp_rec_vyznam', typ: 'text', text: 'Čo pre mňa znamená „opätovaná rozkoš“ — rovnaký akt, čas, iniciatíva, nadšenie, alebo niečo iné:' },
  ],
}

const MOTIVY_SEXU: Blok = {
  druh: 'skupina', id: 'motivy_sexu', nadpis: 'Prečo chcem sex alebo intimitu — aj bez spontánnej túžby',
  uvod:
    'Ľudia vstupujú do intimity z mnohých slobodne zvolených dôvodov: pre spojenie, hravosť, upokojenie, zvedavosť alebo radosť z rozkoše druhého. Motív nemusí byť spontánne telesné „musím ťa mať“, aby bol zážitok úprimný.',
  bloky: [
    {
      druh: 'otazka', id: 'mot_sex_dovody', typ: 'viac', inePovolene: true,
      text: 'Ktoré dôvody sú pre mňa autentické',
      moznosti: [
        { v: 'spontanna_tuzba', label: 'Spontánna telesná túžba' },
        { v: 'spojenie', label: 'Chcem cítiť blízkosť a znovu sa spojiť' },
        { v: 'partnerova_radost', label: g('Teší ma partnerkina rozkoš', 'Teší ma partnerova rozkoš') },
        { v: 'zvedavost', label: g('Som zvedavý na nový zážitok alebo na to, či chuť príde', 'Som zvedavá na nový zážitok alebo na to, či chuť príde') },
        { v: 'hravost', label: 'Chcem sa hrať, smiať alebo vybočiť z rutiny' },
        { v: 'ukludnenie', label: 'Túžim po regulácii stresu, úteche alebo pocite bezpečia' },
        { v: 'ritual', label: 'Je to náš rituál spojenia alebo oslava' },
        { v: 'planovane', label: 'Vyhradili sme si čas a chcem mu dať šancu' },
      ],
    },
    {
      druh: 'otazka', id: 'mot_zaciatok_bez_chuti', typ: 'jeden',
      text: 'Začať bez plnej chuti a priebežne vnímať, či sa objaví',
      moznosti: [
        { v: 'laka', label: 'Áno, často sa takto príjemne naladím' },
        { v: 'podmienky', label: 'Možno, keď môžem bez sklamania prejsť iba k blízkosti' },
        { v: 'nie', label: 'Nie, potrebujem túžbu cítiť ešte pred začiatkom' },
      ],
    },
    { druh: 'otazka', id: 'mot_partner_vyznam', typ: 'text', text: g('Ktoré partnerkine dôvody vo mne vyvolávajú pocit, že som naozaj žiadaný, a ktoré by ma zraňovali:', 'Ktoré partnerove dôvody vo mne vyvolávajú pocit, že som naozaj žiadaná, a ktoré by ma zraňovali:') },
    {
      druh: 'text', id: 'mot_mytus', ton: 'info', nadpis: 'Mýtus verzus realita',
      telo: 'Mýtus: dobrý sex začína vždy spontánnou chuťou oboch v tej istej sekunde. Realita: responzívna túžba a slobodne zvolená ochota sú bežné. Rozdiel robí vnútorné „áno, chcem tomu dať priestor“, nie povinnosť ani predstieranie.',
    },
  ],
}

// ── Rozdiel medzi nami ────────────────────────────────────────────────
const ROZDIEL: Blok = {
  druh: 'skupina', id: 'rozdiel', nadpis: 'Rozdiel medzi nami',
  bloky: [
    {
      druh: 'text', id: 'rozdiel_info', ton: 'info',
      telo:
        'Rozdielna úroveň túžby medzi partnermi je bežná a sama osebe nie je problém — problémom sa stáva ' +
        'až vtedy, keď sa o nej mlčí alebo sa berie osobne.',
    },
    {
      druh: 'otazka', id: 'roz_kto_castejsie', typ: 'jeden',
      text: 'V našom páre obvykle',
      moznosti: [
        { v: 'ja_castejsie', label: 'Ja mám častejšie väčšiu chuť' },
        { v: 'partner_castejsie', label: 'Partner/ka má častejšie väčšiu chuť' },
        { v: 'strieda_sa', label: 'Strieda sa to podľa obdobia' },
        { v: 'podobne', label: 'Sme si celkom podobní/é' },
      ],
    },
    p('roz_osobne', 'Keď má partner/ka menšiu chuť, dokážem to nebrať osobne (nie je to o mojej príťažlivosti)'),
    {
      druh: 'text', id: 'roz_vyskum', ton: 'info',
      telo:
        'Výskum 229 dlhodobých párov (Vowels & Mark, 2020) ukázal 17 rôznych stratégií zvládania rozdielnej ' +
        'chuti — a stratégie, ktoré zapájajú OBOCH partnerov (komunikácia, spoločná iná aktivita, „mať sex aj tak"), ' +
        'vedú k vyššej spokojnosti než samotárske stratégie (masturbácia sólo) alebo úplné odpútanie sa („nič nerobiť").',
    },
    {
      druh: 'otazka', id: 'roz_riesenie', typ: 'viac',
      text: 'Čo nám pri rozdielnej chuti pomáha (vyber všetko, čo sedí)',
      moznosti: [
        { v: 'rozhovor', label: 'Pravidelný otvorený rozhovor o tom, bez obviňovania' },
        { v: 'planovanie', label: 'Naplánovanie konkrétneho termínu namiesto čakania na spontánnu chuť oboch naraz' },
        { v: 'iny_akt', label: 'Iná forma intimity namiesto plného sexu (orál, ruky, hračky)' },
        { v: 'blizkost_bez_sexu', label: 'Fyzická blízkosť bez sexu (masáž, spoločná sprcha, objatie)' },
        { v: 'spusobit_chut', label: 'Partner s väčšou chuťou sa snaží jemne „nadchnúť" toho druhého (dotyk, nálada), nie tlačiť' },
        { v: 'kompromis', label: 'Hľadanie strednej cesty (frekvencia aj forma)' },
        { v: 'solo_s_ohladom', label: 'Sólo aktivita (masturbácia) s ohľaduplným vysvetlením, nie ako odmietnutie partnera' },
        { v: 'pockat', label: 'Jednoducho počkať, kým chuť príde sama — a byť s tým v pohode' },
      ],
    },
  ],
}

// ── Spontánna vs responzívna túžba ────────────────────────────────────
const TYP_TUZBY: Blok = {
  druh: 'skupina', id: 'typ_tuzby', nadpis: 'Spontánna vs responzívna túžba',
  bloky: [
    {
      druh: 'text', id: 'typ_info',
      telo:
        'Spontánna túžba príde sama, „znenazdajky". Responzívna túžba príde až v reakcii na podnet alebo dotyk — ' +
        'nie je horšia ani menej „reálna", len má iné poradie (najprv aktivita, potom chuť).',
    },
    {
      druh: 'otazka', id: 'typ_moj', typ: 'jeden',
      text: 'Ktorý typ prevažne opisuje mňa',
      moznosti: [
        { v: 'spontanna', label: 'Prevažne spontánna' },
        { v: 'responzivna', label: 'Prevažne responzívna' },
        { v: 'oboje', label: 'Kombinácia, závisí od obdobia' },
      ],
    },
    p('typ_akceptacia', 'Chcem, aby sme obaja akceptovali, že „začať bez plnej chuti" a nechať ju prísť je v poriadku'),
  ],
}

// ── Čo chuť dlhodobo živí ──────────────────────────────────────────
const ZIVI: Blok = {
  druh: 'skupina', id: 'zivi', nadpis: 'Čo moju chuť dlhodobo živí',
  bloky: [
    {
      druh: 'otazka', id: 'ziv_co', typ: 'viac', inePovolene: true,
      text: 'Čo dlhodobo udržiava moju chuť na intimitu (nie jednorazový spúšťač, ale trvalejšia podmienka)',
      moznosti: [
        { v: 'kvalita_vztahu', label: 'Celková kvalita a pohoda vzťahu' },
        { v: 'ocenenie', label: 'Pocit, že som ocenený/á mimo postele' },
        { v: 'oddych', label: 'Dostatok odpočinku a spánku' },
        { v: 'spravodlivost', label: 'Pocit spravodlivo rozdelenej domácej/mentálnej záťaže' },
        { v: 'telo_pohoda', label: 'Pohoda vo vlastnom tele' },
        { v: 'novota_dlhodobo', label: 'Pravidelná novota a spoločné zážitky (nielen v posteli)' },
      ],
    },
  ],
}

// ── Čo ju spoľahlivo zabíja ─────────────────────────────────────────
const ZABIJA: Blok = {
  druh: 'skupina', id: 'zabija', nadpis: 'Čo moju chuť dlhodobo zabíja',
  bloky: [
    {
      druh: 'otazka', id: 'zab_co', typ: 'viac', inePovolene: true,
      text: 'Čo dlhodobo najviac tlmí moju túžbu',
      moznosti: [
        { v: 'chronicky_stres', label: 'Chronický stres alebo preťaženie' },
        { v: 'pocit_povinnosti', label: 'Pocit, že sex je „povinnosť" alebo úloha na zoznam' },
        { v: 'nespravodlivost', label: 'Dlhodobý pocit nespravodlivosti vo vzťahu' },
        { v: 'nedostatok_nezhodnutia', label: 'Nedostatok nesexuálnej blízkosti a pozornosti' },
        { v: 'rutina_dlhodobo', label: 'Dlhodobá rutina bez zmeny' },
        { v: 'zdravie', label: 'Zdravotné alebo hormonálne faktory' },
      ],
    },
    { druh: 'otazka', id: 'zab_najsilnejsie', typ: 'text', text: 'Ktorý jeden faktor je u mňa aktuálne najsilnejší:' },
  ],
}

// ── Komunikácia o rozdielnom libide ────────────────────────────────
const KOMUNIKACIA: Blok = {
  druh: 'skupina', id: 'komunikacia', nadpis: 'Ako o tom hovoríme',
  bloky: [
    {
      druh: 'otazka', id: 'kom_kedy', typ: 'jeden',
      text: 'Kedy je najlepší čas hovoriť o rozdielnej chuti',
      moznosti: [
        { v: 'mimo_postele', label: 'Mimo spálne, v pokojnej chvíli — nie tesne po odmietnutí' },
        { v: 'pravidelne', label: 'Pravidelne, ako súčasť bežného „check-inu" o vzťahu' },
        { v: 'ked_treba', label: 'Len keď to začne byť problém' },
      ],
    },
    { druh: 'otazka', id: 'pozn_partnerovi', typ: 'text', text: 'Čo chcem, aby partner/ka vedel(a) o mojej túžbe (1–3 vety):' },
  ],
}

export const LIBIDO_CHUT: TemaObsah = {
  slug: 'mentalna-priprava-tuzba/libido-chut',
  nadpis: 'Libido a chuť',
  zdielanieDovod: true,
  uvod: [
    {
      druh: 'text', id: 'preco', nadpis: 'Rozdielna chuť je normálna',
      telo:
        'Takmer v každom páre má niekto väčšinou vyššiu a niekto nižšiu chuť na sex. Cieľom nie je ' +
        '„vyrovnať" sa, ale poznať vlastnú úroveň, pomenovať rozdiel a nájsť spoločnú reč.',
    },
    {
      druh: 'text', id: 'odkaz', nadpis: 'Súvisiaca téma', ton: 'info',
      telo: 'Konkrétne situačné spúšťače a brzdy vzrušenia (dual control model) má vlastná téma „Brzdy a spúšťače vzrušenia".',
    },
  ],
  telo: [
    UROVEN,
    ASEXUALITA,
    ACE_HLBKA,
    DAVANIE_PRIJIMANIE,
    MOTIVY_SEXU,
    ROZDIEL,
    TYP_TUZBY,
    ZIVI,
    ZABIJA,
    KOMUNIKACIA,
  ],
  zaver: [
    {
      druh: 'text', id: 'zaver',
      telo: 'Výsledky zohľadnia len zhody a doplnky medzi tebou a partnerom — cieľom je porozumenie, nie porovnávanie „kto má väčšiu chuť".',
    },
  ],
}
