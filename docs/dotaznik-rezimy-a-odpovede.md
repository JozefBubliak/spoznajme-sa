# Dotazník — režimy vypĺňania, párovanie a typy odpovedí

> Nadväzuje na `dotaznik-strom-navrh.md` (strom tém). Tu je **ako to dvaja ľudia vypĺňajú**,
> aké sú **režimy**, ako sa to **vyhodnocuje vedľa seba** a aké **typy odpovedí** potrebujeme.
> Stav: **rozhodnuté (2026-09-08)**, viď §8. Nasadené na produkcii, len pre admina (`/[lang]/dotaznik`).

## 0. Rozhodnutia (zapracované)

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
- **Vyhodnotenie položiek** (až keď obaja dokončia tému):
  - Zobrazí sa **len** to, kde sú **obaja pozitívni** (`Toto chcem` / `Skôr áno` / `Zaujíma ma`).
  - **Nesúlad** (jeden chce, druhý nie) → položka sa **vôbec nezobrazí**. Nikto sa nedozvie ani o túžbe, ani o odmietnutí.
  - Zhodné `Neutrál` alebo zhodné `Nie` → nezobrazí sa (voliteľne „zhodné hranice" ako samostatný, diskrétny zoznam).
- **Výstup:** *Mapa spoločnej rozkoše* — len zhody, zoradené 💚 obaja chcú → 🌱 obaja zvedaví → … + odporúčaný ďalší krok.
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
| 1 | **Postoj / chuť** (hlavný, na L4) | „páči sa mi to?" | `Toto chcem` · `Skôr áno` · `Je mi to jedno` · `Skôr nie` · `Nechcem (hranica)` · `Neskúšal(a), zaujíma ma` |
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

- Na spoločne otvorenú tému: tabuľka **JA | PARTNER** po okruhoch — ale len riadky so **zhodou**.
- **% zhody** na tému = podiel položiek, kde sú obaja ≥ `Skôr áno`.
- Zóny: 💚 **zhoda** = obaja `chcem`/`skôr áno` **alebo obaja `neskúšal, zaujíma ma`** (počíta sa ako zhoda) · 😐 obaja neutrál · *(nesúlad skrytý)*.
- Odporúčania: 💚 (skúsenosť) → naplánujte konkrétne · 💚 (obaja zvedaví) → skúste scenár S0/S1 · 😐 → netlačte.
- Prepojenie ďalej: na 💚/🌱 ponúknuť kartičku / rozhovor / „session card".

---

## 6. Čo postaviť ďalej (poradie) — stav

1. ✅ **Anonymná párovacia infra** (§3): tabuľky `dotaznik_*`, RLS bez policies, kód+secret v `#k=`,
   `localStorage`, cron auto-mazanie +30 dní, „Zmazať všetko". Bez prihlásenia partnerov.
   *(Treba spustiť `supabase/migrations/20260908_dotaznik.sql`.)*
2. ✅ **Voľba režimu** (`live` / `blind`) + prezývky + spárovanie — `/dotaznik/par`, `/dotaznik/p/[kod]`.
3. ✅ **8 komponentov typov odpovedí** — `_odpovede.tsx` (postoj, semafor, frekvencia, rola=2 zrkadlové
   riadky, intenzita, multi, skúsenosť, text). Auto-save, predvyplnenie pri návrate.
4. ✅ **Screening logika so zámkami** (§2 Režim B), symetrická, polling (mount/fokus/8 s).
   `_screening.tsx` + `_stav.ts`.
5. 🟡 **Úroveň L3 `okruh`** — zatiaľ `okruh = sekcia`. Reálne otázky v `otazky.ts`:
   `predohra-naladenie / mentalna-priprava` (skúsenosť/preferencie/hranice) +
   **`oralna-intimita / face-sitting`** (kontext, skúsenosť, parametre, preferencie, techniky,
   scenáre, hranice, rizikové, pocity, session-card; ~55 položiek, HORE=prijímam / DOLE=poskytujem;
   vzor: podporná dokumentácia „Face sitting ž./M.").
   Plný L3 route level + prepísanie `strom.ts` podľa `dotaznik-strom-navrh.md` = ešte pred nami.
   Pozn.: úvod modulu/témy a screening sú **zlúčené do jednej obrazovky** — `m/[modul]/page.tsx`
   a `t/[tema]/page.tsx` renderujú priamo `<Screening>`; staré `/chcem` routy len `redirect()`.
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

**Náš model:** ako MojoUpgrade/YNM (žiadny účet, len kód + prezývka, zobrazí sa len zhoda),
+ navyše **auto-mazanie po 30 dňoch** a tlačidlo „Zmazať všetko", + **secret v URL fragmente**
(`#k=…`, nechodí na server) namiesto verejne uhádnuteľného odkazu → opravená slabina MojoUpgrade.

Zdroje: [MojoUpgrade – čo to je](https://emira.io/articles/what-is-mojo-upgrade) ·
[MojoUpgrade alternatívy](https://ynm.me/blog/mojoupgrade-alternative/) ·
[YNM – digitálny yes/no/maybe](https://ynm.me/blog/yes-no-maybe-app/) ·
[Yes/No/Maybe list (Wikipedia)](https://en.wikipedia.org/wiki/Yes_no_maybe_list)

## 8. Stav rozhodnutí

Všetkých 6 otázok zodpovedaných — viď **§0**. Ďalší krok: implementovať §6 body 1–3
(anonymná párovacia infra + režim + prvé komponenty odpovedí).
