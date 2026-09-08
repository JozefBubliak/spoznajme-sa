# Dotazník — režimy vypĺňania, párovanie a typy odpovedí

> Nadväzuje na `dotaznik-strom-navrh.md` (strom tém). Tu je **ako to dvaja ľudia vypĺňajú**,
> aké sú **režimy**, ako sa to **vyhodnocuje vedľa seba** a aké **typy odpovedí** potrebujeme.
> Stav: návrh na revíziu. Nasadené na produkcii, **len pre admina** (`/[lang]/dotaznik`).

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

### Režim C — „Otvorená karta" (jednosmerné zdieľanie)
- „Chcem, aby partner vedel, čo chcem." Vyplním **celú tému / modul** (aj neutrál, aj hranice) a **pošlem**.
- Partner dostane **report mojich preferencií** — číta, nemusí odpovedať. Môže mi poslať späť ten svoj.
- Bez zamykania, bez skrývania nesúladu — je to **vedomé odhalenie**, riziko trapasu beriem na seba.
- Voľby pri odoslaní: „zdieľať len zelené (čo chcem)" · „zdieľať všetko vrátane hraníc".

### Hybrid (odporúčané neskôr)
Default beží **Režim B**, ale pri konkrétnej téme si môžem prepnúť na **C**:
„Túto tému: [Vyhodnotiť ako zhodu 🔒] alebo [Ukázať partnerovi otvorene 📨]".

---

## 3. Párovanie a dáta (návrh schémy)

```
dotaznik_pary
  id (uuid)              kod (text, unique, 6–8 zn.)
  user_a / user_b (uuid) rezim ('live' | 'blind' | 'open')
  vytvorene, aktualizovane

dotaznik_stav_temy         -- screening + zámky, per user
  par_id, user_id, modul, tema
  stav ('ano' | 'este_nie' | 'nie' | 'hotovo')
  dovod (text, null), zdielat_dovod (bool)
  updated_at

dotaznik_odpovede          -- jednotky hodnotenia (L4)
  par_id, user_id, modul, okruh, polozka
  typ (viď §4), rola ('prijimam' | 'poskytujem' | null)
  hodnota (jsonb — podľa typu)
  poznamka (text, null)
  updated_at

dotaznik_zdielania         -- Režim C
  par_id, od_user, modul/tema, rozsah ('zelene' | 'vsetko'), vytvorene
```

- Progresívne ukladanie (auto-save po každej položke).
- Zámky sa prejavia **real-time** (Supabase realtime na `dotaznik_stav_temy`).
- Obaja partneri = prihlásení používatelia (alebo „host" s menom + device-token, ak nechceme nútiť registráciu).

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
- Zóny: 💚 spoločná chuť · 🌱 spoločná zvedavosť (obaja `zaujíma ma`) · 😐 obaja neutrál · *(nesúlad skrytý)*.
- Odporúčania: 💚 → naplánujte konkrétne · 🌱 → skúste scenár S0/S1 · 😐 → netlačte.
- Prepojenie ďalej: na 💚/🌱 ponúknuť kartičku / rozhovor / „session card".

---

## 6. Čo postaviť ďalej (poradie)

1. **DB schéma** (§3) v Supabase + pair-kód flow (znovupoužiť model z `apps/couplesync` alebo nový).
2. **Auth pre oboch** partnerov (alebo host + device-token). Admin gate už je.
3. **Voľba režimu** na štarte + prepínač (`live` / `blind` / `open`).
4. **Komponenty typov odpovedí** — najprv 5 najčastejších: Postoj (1), Semafor (2), Škála/Intenzita (5), Multi (7), Skúsenosť (12).
5. **Screening logika** so zámkami (§2 Režim B), symetrická, real-time.
6. **Úroveň L3 `okruh`** do stromu + prvé reálne otázky pre 1 Tier-1 modul (napr. `A1`).
7. **Vyhodnotenie** — Double-Blind filter + *Mapa spoločnej rozkoše*.
8. Až potom obsah ostatných modulov (z „mišmaš" dokumentov, modul po module).

---

## 7. Rozhodnutia pre teba

1. **Registrácia povinná** pre oboch, alebo stačí „host + meno + link"?
2. **Režim = na úrovni páru** (jeden pre celý dotazník) alebo **prepínateľný per modul**?
3. Pri **zhodnom `Nie`** — ukázať ako „spoločná hranica" (diskrétne), alebo úplne skryť?
4. **Report o partnerovi (Režim C)** — povoliť hneď v v1, alebo až po Režime B?
5. „Neskúšal(a), zaujíma ma" pri oboch — brať ako **zhodu** (💚 do mapy) alebo len jemný tip (🌱)?
6. Koľko typov odpovedí do **v1** — len 5, alebo rovno 8+?
