# Herd Vote — Dokumentácia hry

> Stav: predbežná dokumentácia na review a opravu  
> Dátum: 2026-05-25

---

## Čo je Herd Vote

Herd Vote je skupinový kvíz s **moderátorom** (admin hry) a **hráčmi** (ľudia s telefónom). Moderátor zobrazuje otázky na veľkej obrazovke, hráči odpovedajú na svojom mobile. Po každom kole systém porovná odpovede, vyhodnotí skóre a zobrazí rebríček.

Cieľ: zábava pri rodine, priateľoch, teambuildingoch, triedach.

---

## Herné prostredie — moderátor (admin hry)

### Kto je moderátor
Moderátorom môže byť **hociktorý prihlásený používateľ** — nielen administrátor platformy. Vytvorí hru a dostane rolu hostitelia tejto konkrétnej session.

### Kde sa moderátor pohybuje

| Route | Čo tam robí |
|-------|-------------|
| `/[lang]/apps/herd-vote` | Vytvorí novú hru, dostane herný kód |
| `/[lang]/apps/herd-vote/admin` | Ovládač počas hry (AdminPanel) |
| `/[lang]/play/[code]` | Zobrazuje lobby kód pre hráčov |

### Čo moderátor vidí a robí — krok po kroku

```
1. VYTVORENIE HRY
   - Klikne "Vytvoriť hru"
   - Systém vygeneruje unikátny 6-znakový kód (napr. AB12CD)
   - Hra je v stave: lobby

2. LOBBY (čakáreň)
   - Moderátor vidí zoznam hráčov ako sa pripájajú (realtime)
   - Môže zobraziť kód na veľkej obrazovke
   - Keď sú všetci — zamkne lobby (hráči sa ďalej nepripájajú)

3. KONFIGURÁCIA KOLA
   - Vyberie kategóriu otázok (100+ kategórií)
   - TODO: Zatiaľ nie je jasné, či sa kategória vyberá pred každým kolom alebo raz pre celú hru
   - Nastaví počet kôl

4. HRANIE
   - Spustí kolo → hráčom sa zobrazí otázka
   - Spustí odpočet (timer)
   - Zamkne odpovede (zastaví odpovedanie)
   - Pozrie výsledky kola (kto odpovedal čo, správna odpoveď)
   - Klikne "Ďalšia otázka" → ďalšie kolo

5. KONIEC HRY
   - Zobrazí finálny leaderboard
   - Ukončí hru
```

### Čo AdminPanel zobrazuje

- Aktuálna fáza hry (`lobby | locked | config | playing | final`)
- Aktuálna otázka + možnosti A/B/C/D
- Správna odpoveď (vidí len moderátor)
- Odpovede hráčov v reálnom čase
- Leaderboard (rebríček)
- Tlačidlá akcií podľa fázy

---

## Herné prostredie — hráč

### Kto je hráč
Hráč **nemusí byť prihlásený**. Vstúpi cez URL s herným kódom alebo naskenuje QR.

### Kde sa hráč pohybuje

| Route | Čo tam robí |
|-------|-------------|
| `/[lang]/play/[code]` | Zadá meno, čaká v lobby |
| Rovnaká stránka | Odpovedá na otázky, vidí výsledky |

### Čo hráč vidí a robí — krok po kroku

```
1. VSTUP
   - Otvorí odkaz alebo zadá kód na play stránke
   - Zadá svoje meno (bez registrácie)
   - Čaká v lobby (vidí ostatných hráčov ako sa pripájajú)

2. HRANIE
   - Moderátor spustí hru → hráčovi sa zobrazí otázka
   - 4 možnosti (A, B, C, D) — klikne na jednu
   - Vidí odpočet (timer)
   - Po zamknutí odpovedí sa zobrazí správna odpoveď
   - Vidí, kto odpovedal správne

3. MEDZI KOLAMI
   - Leaderboard (rebríček) po každom kole
   - Čaká na ďalšiu otázku od moderátora

4. KONIEC
   - Finálny rebríček
   - Výsledky — winner
```

---

## Realtime komunikácia (WebSocket)

Hra funguje cez **Supabase Realtime** (broadcast channel). Moderátor posiela udalosti, všetci hráči ich dostávajú okamžite.

| Udalosť | Kto posiela | Čo spôsobí |
|---------|-------------|------------|
| `question:show` | moderátor | Hráčom sa zobrazí nová otázka |
| `timer:start` | moderátor | Spustí sa odpočet |
| `round:lock` | moderátor | Zamkne odpovedanie |
| `round:results` | systém | Zobrazí výsledky kola |
| `round:finish` | systém | Ukončí kolo |
| `game:finish` | moderátor | Zobrazí finálny výsledok |
| `player:join` | hráč | Moderátor vidí nového hráča v lobby |

---

## Fázy hry (Game Phase)

```
lobby → locked → config → playing → final
```

| Fáza | Popis |
|------|-------|
| `lobby` | Hráči sa pripájajú, moderátor čaká |
| `locked` | Lobby zamknuté, nikto nový sa nepridá |
| `config` | Moderátor vyberá kategóriu/nastavenia kola |
| `playing` | Prebieha kolo (otázka + odpovede) |
| `final` | Hra skončila, finálny leaderboard |

---

## Typy otázok

Momentálne implementované typy (`domain.ts`):

| Typ | Popis | Použitie |
|-----|-------|---------|
| `single_choice` | 1 správna odpoveď (A/B/C/D) | Herd Vote kvíz |
| `multiple_choice` | Viaceré správne odpovede | (zatiaľ?) |
| `scale` | Stupnica 1–10 | Páry, CoupleSync |
| `text` | Voľný text | Karty, Deep talks |
| `reciprocal` | Dvaja ľudia odpovedia → porovnanie | CoupleSync, páry |

V Herd Vote sa momentálne používa hlavne `single_choice`.

---

## Kategórie otázok (100+)

Otázky sú rozdelené do skupín:

| Skupina | Príklady kategórií |
|---------|-------------------|
| Zábava | Filmy, Hudba, Videohry, Knihy, Seriály |
| Šport | Futbal, Hokej, Tenis, F1, Olympiáda, Basketbal, Box |
| Kultúra | Umenie, Architektúra, Mytológia, Tanec, Klasická hudba |
| História | Vojny, Prezidenti, Kráľovské rodiny, Civilizácie |
| Geografia | Hlavné mestá, Vlajky, Hory, Rieky, Ostrovy |
| Jedlo & Nápoje | Víno, Pivo, Káva, Sýry, Dezerty, Koktaily |
| Veda | Biológia, Chémia, Vesmír, Fyzika, Zvieratá |
| Tech | Internet, AI, Smartfóny, Autá, Kryptomeny |
| Slovensko | História, Príroda, Šport, Hrady, Kuchyňa |
| DeepTalks | Rodina, Páry, Percentá, Psychológia, Emócie, Sny, Detstvo |

---

## Kde sú uložené dáta

### Databáza: Supabase (PostgreSQL)

Všetky dáta sú v cloudovej Supabase databáze.

#### Tabuľky hry

| Tabuľka | Čo obsahuje |
|---------|-------------|
| `herd_games` | Herné sessions (kód, fáza, vlastník, počet kôl, timer) |
| `herd_players` | Hráči v hre (meno, skóre, čas pripojenia) |
| `herd_rounds` | Kolá hry (index, kategória, otázka, stav) |
| `herd_answers` | Odpovede hráčov (hráč, kolo, odpoveď, čas) |
| `herd_events` | Log udalostí pre Realtime (kód, typ udalosti, payload JSON) |

#### Tabuľky obsahu

| Tabuľka | Čo obsahuje |
|---------|-------------|
| `herd_questions` | Otázky (text, možnosti A/B/C/D, správna, kategória, obtiažnosť, fun fact) |
| `herd_categories` | Kategórie (názov, ikona, skupina, popis, poradie) |
| `question_usage_tracking` | Sledovanie, ktoré otázky sa použili |

#### Tabuľky používateľov

| Tabuľka | Čo obsahuje |
|---------|-------------|
| `auth.users` | Prihlásení používatelia (Supabase Auth) |
| `user_profiles` | Profil (premium prístup, denný limit otázok) |
| `user_question_history` | História zobrazených otázok |
| `user_favorites` | Obľúbené otázky |

### Bezpečnosť dát (RLS)

Databáza má **Row Level Security** — každá tabuľka má pravidlá, kto čo môže čítať/písať:

- Schválené otázky (`admin_status = 3`) — viditeľné pre všetkých
- Hráč vidí len svoju hernú session
- Admin (`is_admin()`) môže robiť všetko
- Server-side API používa service role key (obchádza RLS)

### Statické dáta (v kóde)

| Súbor | Čo obsahuje |
|-------|-------------|
| `src/data/ano-nie-hm/` | Otázky pre ANO-NIE-HM hru |
| `src/data/kompas/` | Komunikačné scenáre |
| `src/lib/kompas-content.ts` | Obsah Komunikačného kompasu |

---

## Administrátor platformy

Toto NIE JE moderátor hry. Admin platformy má prístup k celej databáze.

**Admin emailové adresy (hardcoded v DB):**
- `rezvalia@gmail.com`
- `jozef.bubliak@gmail.com`

**Čo admin môže:**
- CRUD otázky (`herd_questions`)
- Schvaľovať otázky (zmena `admin_status`)
- Spravovať kategórie
- Vidieť všetky herné sessions

---

## Čo zatiaľ chýba / nie je jasné

> Tieto body treba preriešiť alebo doplniť:

- [ ] **Scoring systémy** — sú zmienené módy Classic, Safe, Risk, Podium — ako presne fungujú?
- [ ] **Výber kategórie** — vyberá moderátor kategóriu raz alebo pred každým kolom?
- [ ] **Počet kôl** — je fixný alebo si to moderátor nastaví?
- [ ] **Timer** — koľko sekúnd má hráč na odpoveď? Je konfigurovateľný?
- [ ] **Fun fact** — zobrazuje sa hráčom po správnej odpovedi?
- [ ] **Registrácia hráčov** — hráč bez účtu, uchováva sa jeho história?
- [ ] **QR kód** — generuje sa automaticky pri vytvorení hry?
- [ ] **Admin panel route** — `/apps/herd-vote/admin` je oddelená stránka alebo tab?
- [ ] **Mobilná optimalizácia** — je player interface otestovaný na mobile?
- [ ] **Čo keď hráč stratí spojenie** — môže sa znova pripojiť?
- [ ] **Maximálny počet hráčov** — existuje limit?
- [ ] **Deep Talk otázky** — majú iné správne odpovede (percentá, nie A/B/C/D)?

---

## Technológie (skrátený prehľad)

| Vrstva | Technológia |
|--------|-------------|
| Frontend | Next.js 16 + React 19 + TypeScript |
| Štýly | Tailwind CSS + Radix UI |
| Backend | Next.js API Routes (serverless) |
| Databáza | Supabase (PostgreSQL) |
| Auth | Supabase Auth (JWT) |
| Realtime | Supabase Broadcast (WebSocket) |
| State | Zustand + custom React hooks |
| Platby | Stripe |
| Deploy | (doplniť — Vercel? Supabase hosting?) |

---

## Súborová mapa (kľúčové súbory)

```
src/
├── app/
│   ├── [lang]/apps/herd-vote/          # Moderátor UI (vytvorenie hry)
│   ├── [lang]/play/[code]/             # Hráč UI (lobby + hra)
│   └── api/games/[code]/               # API endpointy hry
│       ├── route.ts                    # GET/POST hra
│       ├── start/route.ts              # Spustiť hru
│       ├── players/route.ts            # Hráči
│       ├── rounds/route.ts             # Kolá
│       ├── answers/route.ts            # Odpovede
│       └── leaderboard/route.ts        # Rebríček
├── components/
│   ├── AdminPanel.tsx                  # Ovládač moderátora
│   └── PlayApp.tsx                     # Lobby hráča
├── hooks/
│   ├── useRealtimeGame.ts              # WebSocket events
│   ├── useGameState.ts                 # Stav hry
│   └── usePlayerJoin.ts                # Pripojenie hráča
├── lib/
│   └── herdvote/                       # Herná logika
└── integrations/supabase/
    ├── client.ts                       # DB client
    └── types.ts                        # Vygenerované typy z DB
```

---

*Dokumentácia vytvorená na základe kódu. Treba overiť a doplniť pri reálnom testovaní hry.*
