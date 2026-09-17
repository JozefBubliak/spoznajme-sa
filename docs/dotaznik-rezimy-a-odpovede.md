# Dotazník — režimy vypĺňania, párovanie a typy odpovedí

> Nadväzuje na `dotaznik-strom-navrh.md` (strom tém). Tu je **ako to dvaja ľudia vypĺňajú**,
> aké sú **režimy**, ako sa to **vyhodnocuje vedľa seba** a aké **typy odpovedí** potrebujeme.
> Stav: základný návrh 2026-09-08; preferenčná škála aktualizovaná rozhodnutím PREF-2026-09-17. Dokument opisuje aj cieľové správanie, nie potvrdený stav nasadenia.

## PREF-2026-09-17 — dohodnutá škála postoja a zobrazenie výsledkov

**Produktové rozhodnutie po rozhovore s používateľom 2026-09-17; implementácia ešte nie je potvrdená.** Táto sekcia nahrádza staršie pravidlá skrývania neutrálnej odpovede a Možno. Platí pre postoj ku konkrétnej aktivite v režime B; nemení screening celej témy ani faktické, frekvenčné a skúsenostné otázky.

### Štyri možnosti pre novú preferenčnú škálu

| Možnosť | Čo vyjadruje |
|---|---|
| **Chcem to / páči sa mi to** | Vlastný záujem o aktivitu. |
| **Rád/rada, ak chceš ty** | Ochotne sa zapojím, aj keď to nie je moja vlastná silná túžba. Toto používateľ myslí slovom neutrál. |
| **Možno — potrebujem sa o tom najprv porozprávať** | Váhanie, neistota alebo podmienky; priestor na rozhovor, zatiaľ nie ochota aktivitu uskutočniť. |
| **Nie — toto nechcem** | Odmietnutie, ktoré sa rešpektuje bez presviedčania. |

Samostatné „Skôr nie“ a „Možno, za určitých podmienok“ používateľ vníma ako mätúci prekryv. Pre novú škálu ich zjednotiť do jednej možnosti Možno. „Neutrálne“ nahradiť zrozumiteľným názvom Rád/rada, ak chceš ty; ochota sa nesmie prezentovať ako aktívna túžba.

V bežnom rozhovore môže „skôr nie“ znamenať aktuálne odmietnutie bez definitívneho nikdy. Zrušenie tejto možnosti vo formulári preto neoprávňuje premeniť už uložené odmietnutia na ochotu. Každý môže svoj postoj neskôr sám zmeniť. Ani zobrazená zhoda, ani Možno nenahrádza aktuálnu dohodu oboch o aktivite.

### Úplná matica zobrazenia obom partnerom

Vyhodnocovať až po dokončení témy oboma, pri splnenom screeningu a relevantnej vetve. Matica je symetrická. Chýbajúca odpoveď nie je Možno ani neutrál a nezobrazí sa ako výsledok.

| Odpoveď A / odpoveď B | Chcem | Rád/rada, ak chceš ty | Možno | Nie |
|---|---|---|---|---|
| **Chcem** | Spoločný záujem | Záujem + ochota | Téma na rozhovor | Skryté |
| **Rád/rada, ak chceš ty** | Ochota + záujem | Vzájomná ochota | Téma na rozhovor | Skryté |
| **Možno** | Téma na rozhovor | Téma na rozhovor | Téma na spoločné preskúmanie | Skryté |
| **Nie** | Skryté | Skryté | Skryté | Skryté |

Viditeľné výsledky zobrazia obom ich odlišné postoje; nezlievať Chcem a Možno do jednej kladnej odpovede. Výsledky s Možno označiť ako rozhovor/preskúmanie, nie ako súhlas s uskutočnením. Zhodné Nie ani tabu checklisty nevytvárajú zoznam spoločných hraníc. Povolenie zobrazovať Možno neznamená automatické zdieľanie súkromnej poznámky alebo voľne napísaných podmienok.

### Dopad na implementáciu a existujúce odpovede

- Aplikovať významy konzistentne v generickom dotazníku aj hybridnej knihe a v preferenčných mriežkach. Typ otázky sám neurčuje súhlas na zdieľanie; napr. checklist zakázaných aktivít má opačný význam ako zoznam želaní.
- Staré hodnoty a formulácie najprv zmapovať podľa konkrétnej otázky. Nevykonať hromadnú náhradu všetkých reťazcov neutral, jedno, skor_nie či mozno naprieč rôznymi otázkami.
- Existujúce skor_nie automaticky nepreklasifikovať na zdieľateľné Možno. Návrh migračného pravidla: ponechať ich skryté do novej voľby používateľa; samotná migrácia ešte nie je vykonaná ani schválená týmto zápisom.
- Staré „Neskúšal(a), zaujíma ma“ kombinuje skúsenosť a záujem. Pri prechode na štyri možnosti zachovať túto informáciu; konkrétne mapovanie a oddelenie skúsenosti treba pripraviť, nie automaticky vymazať.
- Výpočet percent zhody pre novú škálu nie je dohodnutý. Možno nemá byť potichu započítané ako kladný súhlas. Zatiaľ je záväzná matica zobrazenia, nie nový percentuálny vzorec.
- Regresné overenie má pokryť všetkých 16 kombinácií, výmenu A/B, nezodpovedanú položku, zamknutú/nedokončenú tému a neodhaľovanie textových poznámok. Existujúce bezpečnostné nálezy DQ-002/DQ-003 týmto produktovým rozhodnutím nezanikajú.

## 0. Základné rozhodnutia (historický základ; aktuálna škála je vyššie)

1. **Bez registrácie. Maximálne anonymne.** Žiadny e-mail, žiadny účet. Len prezývka + kód páru. Dáta ephemerálne, auto-mazanie, tlačidlo „zmazať všetko".
2. **Režim = jeden pre celý pár** a celý dotazník (pokrýva všetky moduly). Nie prepínateľný per modul.
3. **Zhodné `Nie` → úplne skryť** (žiadny zoznam „spoločné hranice").
4. **v1 = Režim A (Naživo) + Režim B (Bez trapasu).** Režim C (Otvorená karta) príde hneď v ďalšej iterácii — potrebuje rovnakú párovaciu infra ako B, ale je jednoduchší.
5. **„Neskúšal(a), zaujíma ma" u oboch = zhoda 💚** (nie len tip).
6. **v1 = 8+ typov odpovedí** (nie len 5).

---

## 1. Základné pravidlá

- Vypĺňa **každý partner sám, oddelene** (vlastné zariadenie / účet). Nikdy nie spolu na jednom mobile.
- Pár je prepojený **jedným kódom** (A vytvorí, pošle B).
- Čo partner uvidí z mojich odpovedí = **závisí od režimu** (nižšie).
- Cieľ: vidieť to **vedľa seba** a bezpečne (nikoho nezahanbiť).

---

## 2. Tri režimy (volí sa na štarte, dá sa zmeniť)

### Režim A — „Naživo" (rozhovor, nič sa neklikne)
- Appka je **sprievodca rozhovorom**, nie formulár. Prechádza strom a na každom okruhu ukáže:
  - mini edu-box (čo to je, 2–3 vety),
  - **návrhové otázky na diskusiu** („Spýtaj sa druhého: …", „Povedz partnerovi: …"),
  - škálu chuti len ako **vizuálnu pomôcku** (ukážeš / povieš), neukladá sa nič.
- Jediné kliknutie = navigácia („ďalej / vrátime sa k tomu / preskočiť").
- **Výstup:** žiadny report, len „prešli sme X z Y tém" + zoznam „vrátiť sa".
- Pre koho: páry, ktoré sa neboja hovoriť a chcú len štruktúru a inšpiráciu.

### Režim B — „Bez trapasu" (Double-Blind) — **default**
- Obaja vypĺňajú oddelene, každý vidí len svoje.
- **Screening témy** (Chcem to skúmať? `Áno` / `Ešte nie` / `Nie`):
  | Partner A | Partner B (ešte neodpovedal) | Výsledok |
  |---|---|---|
  | `Nie` | — | Téma sa **zamkne obom**. B vidí „🔒 Partner túto tému nechce". B už **nevypĺňa**. |
  | `Ešte nie` | — | Téma sa **dočasne zamkne obom**. B vidí „⏳ Partner ešte váha". |
  | `Áno` | `Nie` | Téma sa zamkne. **A sa nedozvie**, že B odmietol (vidí len „zamknuté partnerom"). **B sa nedozvie**, že A chcel. |
  | `Áno` | `Áno` | Obaja vyplnia položky. |
- **Vyhodnotenie položiek** (až keď obaja dokončia tému): podľa matice PREF-2026-09-17 vyššie. Chcem a ochota vytvárajú spoločný záujem/ochotu, Možno sa zobrazuje ako téma na rozhovor. Ak je aspoň jedna odpoveď Nie, položka sa nezobrazí.
- **Výstup:** Mapa spoločnej rozkoše rozlišuje spoločný záujem, ochotu a témy na rozhovor; odlišné postoje partnerov zachováva.
- Anonymná štatistika pre projekt OK; v rámci páru skryté.

### Režim C — „Otvorená karta" (jednosmerné zdieľanie) — *ďalšia iterácia (nie v1)*
- „Chcem, aby partner vedel, čo chcem." Vyplním **celú tému / modul** (aj neutrál, aj hranice) a **pošlem**.
- Partner dostane **report mojich preferencií** — číta, nemusí odpovedať. Môže mi poslať späť ten svoj.
- Bez zamykania, bez skrývania nesúladu — je to **vedomé odhalenie**, riziko trapasu beriem na seba.
- Voľby pri odoslaní: „zdieľať len zelené (čo chcem)" · „zdieľať všetko vrátane hraníc".
- Technicky je jednoduchší než B (žiadne zámky, žiadny double-blind filter) → pridá sa hneď po v1.

---

## 3. Anonymné párovanie a dáta

**Bez účtu, bez e-mailu.** Model:

1. Partner A otvorí `/dotaznik`, zvolí režim, zadá **prezývku** (napr. „Ja"). Vznikne **kód páru** (napr. `LUNA-4712`) + tajný `pin` v URL.
2. A pošle B **link** (`/dotaznik/p/LUNA-4712#k=<secret>`) hocijakým kanálom. Žiadny e-mail cez nás.
3. B otvorí link, zadá svoju prezývku → je spárovaný. Identita = `slot` `a` / `b` + `device_token` v `localStorage` (aby sa vedel vrátiť na tom istom zariadení).
4. **Auto-mazanie:** celý pár + odpovede sa zmažú po **30 dňoch** nečinnosti (cron). Kedykoľvek tlačidlo **„Zmazať všetko"** (obaja aj jeden).
5. Žiadna história medzi „sedeniami" nad rámec tohto kódu. Žiadna analytika nad obsahom odpovedí. Voliteľne: úplne anonymná agregovaná štatistika (len počty „modul X: zhoda áno/nie"), bez väzby na pár — **default vypnuté**, opt-in.

```
dotaznik_pary
  id (uuid)            kod (text, unique)      pin_hash (text)   -- overenie z URL secret
  rezim ('live'|'blind')                       prezyvka_a, prezyvka_b (text, null)
  vytvorene, posledna_aktivita                 zmazat_po (timestamptz)  -- +30 dní, posúva sa

dotaznik_stav_temy       -- screening + zámky; slot = 'a'|'b'
  par_id, slot, modul, tema
  stav ('ano'|'este_nie'|'nie'|'hotovo')
  updated_at
  -- Pozn.: dôvod odmietnutia zámerne NEukladáme (menej dát = menej rizika).

dotaznik_odpovede        -- jednotky hodnotenia (L4); slot = 'a'|'b'
  par_id, slot, modul, okruh, polozka
  typ (viď §4), rola ('prijimam'|'poskytujem'|null)
  hodnota (jsonb)        poznamka (text, null)
  updated_at

-- Režim C (neskôr):
dotaznik_zdielania
  par_id, od_slot, rozsah ('zelene'|'vsetko'), vytvorene
```

- **RLS / prístup:** čítať/písať smie len ten, kto pozná `kod` + `secret` (pin). Server nikdy nevydá odpovede jedného slotu druhému skôr, než to dovolí logika režimu (§2/§5).
- Progresívne ukladanie (auto-save po položke). Zámky **real-time** (Supabase realtime na `dotaznik_stav_temy`).
- Bez `device_token` sa dá pokračovať zadaním kódu + secret znova (link si treba odložiť — ako pri MojoUpgrade).

---

## 4. Typy odpovedí (nie jedna — podľa druhu otázky)

| # | Typ | Kedy | Hodnoty |
|---|---|---|---|
| 1 | **Postoj / chuť** (hlavný, na L4) | „páči sa mi to?" | **Chcem to / páči sa mi to** · **Rád/rada, ak chceš ty** · **Možno — potrebujem sa o tom najprv porozprávať** · **Nie — toto nechcem** (PREF-2026-09-17; staré odpovede vyžadujú mapovanie) |
| 2 | **Semafor hraníc** | sekcia „Hranice" | 🟢 áno · 🟡 za podmienok *(+ pole „podmienka")* · 🔴 tvrdá hranica |
| 3 | **Frekvencia** | „ako často?" | často · podľa nálady · občas ako bonus · raz vyskúšať · nikdy |
| 4 | **Rola (zrkadlová dvojica)** | ⇄ moduly | dve nezávislé škály typu 1: „keď **prijímam**" a „keď **poskytujem**" |
| 5 | **Intenzita / parametre** | tlak, tempo, hĺbka, trvanie | posuvník alebo 3–5 stupňov *(jemné → silné)* |
| 6 | **Výber (jeden)** | „ideálny čas", „poloha hlavy pri…" | rádiové možnosti + „nezáleží" |
| 7 | **Výber (viac)** | „čo ma na tom láka" | checkboxy + „iné: ___" |
| 8 | **Rebríček / priorita** | „zoraď podľa dôležitosti" | drag zoradenie 3–5 položiek |
| 9 | **Áno / Nie / Neviem** | faktické (STI test, antikoncepcia) | 3 tlačidlá |
| 10 | **Mriežka „ja robím" × „chcem od partnera"** | dirty talk, iniciácia | 2 stĺpce, škála typu 1 v každom |
| 11 | **Voľný text** (vždy voliteľný) | „čo by to zlepšilo", „aké slová sú mimo" | textarea |
| 12 | **Skúsenosť** | úvod témy | bohatá · párkrát · raz · nemám (chcem) · nemám (nechcem) |
| 13 | **Kontext-tagy** | „kde/kedy to chcem" | multi: doma/hotel/vonku · spontánne/plánované/rituál |
| 14 | **Kotva jednou vetou** | koniec témy | „jeden detail, bez ktorého to pre mňa nefunguje: ___" |

**Pravidlo:** každá L4 položka má primárne **typ 1**; podľa témy pridá 3/4/5. Sekcie
Preferencie / Techniky / Scenáre miešajú typy 6–11. „Hranice" = typ 2. „Skúsenosť" = typ 12.
Inšpirácia na konkrétne možnosti = prekonvertované `.md` z `dotazník/` (markitdown).

---

## 5. Vyhodnotenie vedľa seba (Režim B)

- Tabuľka JA | PARTNER obsahuje iba položky povolené maticou PREF-2026-09-17.
- Rozlišovať spoločný záujem, ochotu a témy na rozhovor; Možno nie je súhlas s uskutočnením aktivity.
- Ak jeden alebo obaja odpovedia Nie, položku úplne skryť. Zhodná ochota sa zobrazuje.
- Percentuálny vzorec pre novú škálu zostáva otvorený; staré pravidlo „obaja aspoň Skôr áno“ už nie je aktuálnou definíciou zobrazovania.
- Ďalší krok má zodpovedať výsledku: pri Možno najprv rozhovor, pri záujme/ochote možnosť spoločného plánovania.

---
## 6. Čo postaviť ďalej (poradie) — stav

1. ✅ **Anonymná párovacia infra** (§3): tabuľky `dotaznik_*`, RLS bez policies, kód+secret v `#k=`,
   `localStorage`, cron auto-mazanie +30 dní, „Zmazať všetko". Bez prihlásenia partnerov.
   *(`supabase/migrations/20260908_dotaznik.sql` spustená na Supabase 2026-09-10.)*
2. ✅ **Voľba režimu** (`live` / `blind`) + prezývky + spárovanie — `/dotaznik/par`, `/dotaznik/p/[kod]`.
3. ✅ **8 komponentov typov odpovedí** — `_odpovede.tsx` (postoj, semafor, frekvencia, rola=2 zrkadlové
   riadky, intenzita, multi, skúsenosť, text). Auto-save, predvyplnenie pri návrate.
4. ✅ **Screening logika so zámkami** (§2 Režim B), symetrická, polling (mount/fokus/8 s).
   `_screening.tsx` + `_stav.ts`.
5. 🟡 **Obsah tém — dva režimy:**
   - **Generický „section walker"** (`otazky.ts` + `_odpovede.tsx`): pevná kostra sekcií z `strom.ts`.
     Reálne otázky zatiaľ len `predohra-naladenie / mentalna-priprava`.
   - **„Kniha + dotazník" (data-driven)** — `src/lib/dotaznik/obsah/**` + renderer `_kniha.tsx`.
     Žiadna téma nie je v kóde napevno; strom témy je obsah (bloky text/tabuľka/otázka/skupina),
     vetví sa cez `podmienka` podľa skorších odpovedí, každý text má `m`/`z` variant (zrkadlové —
     odpovede oboch partnerov sadnú proti sebe pri Double-Blind). Prvá téma 1:1: **face-sitting**
     (`oralna-intimita/face-sitting`, zdroj „Face sitting M./ž."). Téma s obsahom → screening vedie
     rovno na `/t/[tema]/kniha` (preskočí `rola`, roly rieši obsah cez vetvu skúsenosti).
   - Modulový screening zrušený; úvod témy + screening = jedna obrazovka; staré `/chcem`, `/temy`
     routy len `redirect()`.
   - **TODO:** screening pod-voľba „dôvod v 1 vete", preklik na hĺbkový sprievodcu, `mrezka` render,
     realtime namiesto pollingu.
6. ✅ **Double-Blind vyhodnotenie + Mapa** — `/api/.../vyhodnotenie` + `_mapa.tsx`.
   Zobrazí len zhodu, nesúlad nikde.
7. ⬜ **Režim A „Naživo"** — sprievodca rozhovorom (edu-box + návrhové otázky, nič sa neukladá).
8. ⬜ **Režim C „Otvorená karta"** (jednosmerné zdieľanie).
9. ⬜ Obsah ostatných modulov (z „mišmaš" dokumentov, modul po module).
10. ⬜ Neskôr: nahradiť polling Supabase realtime; L3 route `/m/[modul]/o/[okruh]`.

---

## 7. Ako to robia podobné nástroje vo svete (rešerš)

| Nástroj | Párovanie | Súkromie | Čo si vziať |
|---|---|---|---|
| **MojoUpgrade** (web, zdarma) | žiadny účet; zadáš e-mail partnera len na poslanie linku | nič sa neukladá medzi sedeniami, žiadny profil, žiadne reklamné pixely; výsledok = URL (ktokoľvek s linkom ho otvorí — ich slabina) | čistý „no-account" model; zobrazí sa **len** zhoda; „no" nikdy nevidno; match = obaja „áno" **alebo** jeden „áno" + druhý „ak partner chce" |
| **YNM / „Yes No Maybe" apps** | anonymné prihlásenie by default — **žiadny e-mail ani údaje** | „tvoje možno zostane tvoje, tvoje nie zostane tvoje, žiadny zoznam odmietnutí neexistuje" | anonymná identita bez PII; 100+ otázok od mierneho po odvážne; každý na svojom telefóne, svojím tempom |
| **Kindu** (app) | pár cez kód/pozvánku | swipe „áno/nie/možno", zobrazí sa len match | swipe UX; ideas feed |

**Náš model:** anonymný pár s kódom a prezývkami; pravidlá zobrazovania sú vlastné podľa PREF-2026-09-17 (vrátane Možno),
+ navyše **auto-mazanie po 30 dňoch** a tlačidlo „Zmazať všetko", + **secret v URL fragmente**
(`#k=…`, nechodí na server) namiesto verejne uhádnuteľného odkazu → opravená slabina MojoUpgrade.

Zdroje: [MojoUpgrade – čo to je](https://emira.io/articles/what-is-mojo-upgrade) ·
[MojoUpgrade alternatívy](https://ynm.me/blog/mojoupgrade-alternative/) ·
[YNM – digitálny yes/no/maybe](https://ynm.me/blog/yes-no-maybe-app/) ·
[Yes/No/Maybe list (Wikipedia)](https://en.wikipedia.org/wiki/Yes_no_maybe_list)

## 8. Stav rozhodnutí

Historický stav z 2026-09-08 (nové rozhodnutie o škále a otvorené mapovanie starých odpovedí sú v PREF-2026-09-17): všetkých 6 pôvodných otázok zodpovedaných — viď **§0**. Vtedajší ďalší krok: implementovať §6 body 1–3
(anonymná párovacia infra + režim + prvé komponenty odpovedí).
