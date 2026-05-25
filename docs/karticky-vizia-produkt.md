# Kartičky — Vízia hotového produktu

> Toto je dokumentácia ako by mala app vyzerať ako **hotový produkt**.  
> Nie súčasný stav — ale cieľ kam ideme.  
> Dátum: 2026-05-25

---

## Čo sú Kartičky

**Konverzačné kartičky** sú digitálna verzia fyzických kartičiek na hlboké rozhovory. Hráč ťahá kartičku, číta otázku a hovorí. Cieľ nie je vyhrať — cieľ je spoznať druhého lepšie.

Aplikácia funguje na mobile aj deskope, bez potreby registrácie pre základné použitie.

---

## Čo kartica obsahuje

Každá kartica má:

```
┌─────────────────────────────┐
│  [ikona skupiny]  [téma]    │
│                             │
│   Čo by si zmenil na       │
│   našom prvom stretnutí,   │
│   keby si mohol/mohla?     │
│                             │
│  [obtiažnosť: ●●○○○]       │
│  [srdce ♡]  [zdieľať ↗]    │
└─────────────────────────────┘
```

**Polia kartičky:**
- `text` — samotná otázka (preložená do každého jazyka)
- `group` — hlavná skupina (partneri / kamaráti / rodina / rodič–dieťa / škola / tím)
- `theme` — téma v rámci skupiny (ľahké / spomienky / sny / ťažké / ...)
- `depth` — hĺbka otázky (1–5, zobrazuje sa ako guličky)
- `type` — typ kartičky (pozri nižšie)
- `fun_prompt` — voliteľný doplnkový pokyn (napr. "Povedz to tak, aby sa ostatní smiali")
- `admin_status` — schválená (3) alebo v review

---

## Typy kartičiek

| Typ | Popis | Príklad |
|-----|-------|---------|
| `text` | Jeden hovorí, ostatní počúvajú | "Čo ťa v živote najviac prekvapilo?" |
| `reciprocal` | Každý odpovedá samostatne, potom porovnajú | "Čo si myslíš, že ma teraz najviac trápi?" |
| `scale` | Odpovedá sa číslom 1–10, potom vysvetlenie | "Na stupnici 1–10 — ako dobre poznáš svojho partnera?" |
| `challenge` | Herná výzva / aktivita | "Povedz partnerovi jednu vec, za ktorú mu nikdy nedakoval/a." |
| `vote` | Skupinové hlasovanie / odhad | "Kto z nás by vydržal najdlhšie bez telefónu?" |

---

## Skupiny (Skupiny publika)

Každá skupina má vlastnú sadu tém a otázok.

### 1. Partneri 💑
Pre páry v romantickém vzťahu (dlhodobé, nové, zasnúbení, manželia).

**Témy:**
- Ľahké — malé každodenné veci, humor
- Spomienky — prvé stretnutie, spoločné zážitky
- Sny & plány — čo chceme dosiahnuť, kde chceme byť
- Ťažké — konflikty, potreby, strach
- Rodičovstvo — výchova, hodnoty, predstavy
- Sexualita & intimita — otvorené otázky (voliteľný balíček, opt-in)
- Deep dive — filozofické, existenciálne

### 2. Kamaráti 👫
Pre skupiny priateľov (2–∞ ľudí).

**Témy:**
- Ľadolam — rýchle a vtipné
- Spomienky — spoločná história
- Kto z nás by... — hlasovacie otázky
- Snívanie — túžby, plány, bucket list
- Filozofia — čo si myslíte o svete
- Odvaha — výzvy a výzvy

### 3. Rodina 👨‍👩‍👦
Pre celú rodinu spolu (večera, dovolenka, Vianoce).

**Témy:**
- Hravé — pre všetky vekové skupiny
- Spomienky rodiny — história, predkovia
- Hodnoty — čo je pre nás dôležité
- Vďačnosť — ocenenie navzájom
- Snívanie — čo by ste chceli zažiť spolu
- Ťažké rozhovory — otvorené, citlivé témy

### 4. Rodič–Dieťa 👨‍👧
Pre rodiča a jedno dieťa (prípadne viacero).

**Témy:**
- Hravé (dieťa 5–8) — jednoduché, farebné
- Školský vek (8–12) — trocha hlbšie
- Tínedžer (13–17) — otvorené, bez súdenia
- Dospelé dieťa (18+) — vzťah rovnocenných
- Spomienky — detstvo, rodinné momenty
- Budúcnosť — plány, obavy, nádeje

### 5. Škola / Trieda 🏫
Pre učiteľov a triedy, icebreaker na hodinách.

**Témy:**
- Zoznámenie — prvý týždeň
- Tímové budovanie — spolupráca
- Tvorivé myslenie — nápady, fantázia
- Hodnoty — čo je spravodlivé, dobré
- Budúcnosť — čo chcú byť, kde budú

### 6. Pracovný tím 💼
Pre firmy a tímbuildingy.

**Témy:**
- Icebreaker — odľahčenie, smiech
- Spolupráca — ako pracujeme spolu
- Hodnoty tímu — čo nám ide, čo nie
- Inovácia — kreatívne myslenie
- Kariéra — osobný rast, motivácia

---

## Hĺbka otázok (Depth)

Každá otázka má hĺbku 1–5:

| Level | Popis | Príklad |
|-------|-------|---------|
| ⬤○○○○ | Ľahká — smiech, bezpečná | "Čo najčudnejšie si niekedy zjedol?" |
| ⬤⬤○○○ | Ľahká osobná | "Aká bola tvoja obľúbená hračka ako dieťa?" |
| ⬤⬤⬤○○ | Stredná | "Čo ti dáva väčší pokoj — samota alebo ľudia?" |
| ⬤⬤⬤⬤○ | Hlboká | "Čo by si zmenil na tom, ako si vyrástol?" |
| ⬤⬤⬤⬤⬤ | Veľmi hlboká | "Čo v živote ľutuješ a nikdy si to nikomu nepovedal?" |

Používateľ si môže filtrovať podľa hĺbky.

---

## Výber balíčka (Deck selector)

Pred začiatkom používateľ prejde jednoduchým výberom:

```
1. Krok — Kto si? (skupina)
   [Partneri] [Kamaráti] [Rodina] [Rodič–Dieťa] [Trieda] [Tím]

2. Krok — Aká nálada? (téma)
   [Ľahké a zábavné] [Spomienky] [Snívanie] [Hlboké rozhovory] [Mix]

3. Krok — Hĺbka (voliteľné, default = Mix)
   [○ Ľahké] [◑ Stredné] [● Hlboké] [∞ Mix]

4. Krok — Jazyk otázok (ak nie je default jazyk)
   [🇸🇰 SK] [🇬🇧 EN] [🇨🇿 CS] [🇵🇱 PL] ...

→ Vygeneruje deck X otázok (napr. 20–50)
```

---

## Jazyková podpora (Multi-language)

### Databázová štruktúra pre preklady

Každá otázka má preklady ako separátne záznamy alebo JSONB stĺpec:

**Možnosť A — JSONB (odporúčané pre jednoduchosť):**
```sql
ALTER TABLE questions ADD COLUMN translations JSONB;

-- Obsah:
{
  "sk": "Čo by si zmenil na sebe, ak by si mohol?",
  "en": "What would you change about yourself if you could?",
  "cs": "Co bys na sobě změnil, kdybys mohl?",
  "pl": "Co byś zmienił w sobie, gdybyś mógł?",
  "hu": "Mit változtatnál magadon, ha tehetnéd?",
  "de": "Was würdest du an dir ändern, wenn du könntest?",
  "fr": "Que changerais-tu chez toi si tu pouvais?",
  "uk": "Що б ти змінив у собі, якби міг?",
  "ru": "Что бы ты изменил в себе, если бы мог?",
  "es": "¿Qué cambiarías de ti mismo si pudieras?"
}
```

**Možnosť B — Separátna tabuľka `question_translations`:**
```sql
CREATE TABLE question_translations (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
  lang        TEXT NOT NULL,  -- 'sk', 'en', 'cs', ...
  text        TEXT NOT NULL,  -- preložená otázka
  fun_prompt  TEXT,           -- preložený doplnkový pokyn
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX ON question_translations(question_id, lang);
```

### Fallback logika
```
Ak otázka nemá preklad v jazyku používateľa:
  1. Skús 'en' (angličtina ako fallback)
  2. Ak ani 'en' — zobraz originál ('sk')
  3. Zobraz badge "Táto otázka ešte nie je preložená"
```

### Jazyky v roadmape

| Fáza | Jazyky |
|------|--------|
| V1 — Launch | SK, EN |
| V2 | CS, PL |
| V3 | HU, DE, UK |
| V4 | FR, RU, ES |

### Otázky podľa jazyka vs. kultúry
Niektoré otázky majú kultúrny kontext — napr. "Hrady na Slovensku" nedáva zmysel v anglickej verzii. Riešenie:
- `cultural_context: ['sk', 'cs']` — otázka sa zobrazí len v týchto jazykoch
- Default: otázka viditeľná vo všetkých jazykoch

---

## Databázová schéma (cieľový stav)

### Tabuľka `questions` (rozšírená)

```sql
CREATE TABLE questions (
  -- Identifikácia
  id                BIGSERIAL PRIMARY KEY,
  slug              TEXT UNIQUE,              -- 'prvy-dotyk-partnerov' (pre SEO/share)

  -- Základný obsah
  text              TEXT NOT NULL,            -- originál (SK)
  translations      JSONB DEFAULT '{}',       -- preklady {"en": "...", "cs": "..."}
  fun_prompt        TEXT,                     -- doplnkový pokyn (SK)
  fun_prompt_translations JSONB DEFAULT '{}', -- preklady pokynu

  -- Klasifikácia
  group_partneri    BOOLEAN DEFAULT FALSE,
  group_kamarati    BOOLEAN DEFAULT FALSE,
  group_rodina      BOOLEAN DEFAULT FALSE,
  group_rodic_dieta BOOLEAN DEFAULT FALSE,
  group_skola       BOOLEAN DEFAULT FALSE,
  group_tim         BOOLEAN DEFAULT FALSE,

  -- Téma a hĺbka
  theme             TEXT,                     -- 'spomienky', 'snivanie', 'tazke', ...
  depth             SMALLINT DEFAULT 3        -- 1–5
    CHECK (depth BETWEEN 1 AND 5),
  type              TEXT DEFAULT 'text'
    CHECK (type IN ('text','reciprocal','scale','challenge','vote')),

  -- Kultúrny kontext
  cultural_context  TEXT[] DEFAULT NULL,      -- NULL = všetky jazyky, ['sk','cs'] = len tieto

  -- Moderation
  admin_status      SMALLINT DEFAULT 0        -- 0=draft, 1=review, 2=hold, 3=approved
    CHECK (admin_status BETWEEN 0 AND 3),
  admin_note        TEXT,                     -- interná poznámka

  -- Meta
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabuľka `themes` (číselník tém)

```sql
CREATE TABLE themes (
  id          TEXT PRIMARY KEY,               -- 'spomienky', 'snivanie', 'tazke'
  group_id    TEXT NOT NULL,                  -- 'partneri', 'kamarati', ...
  name_sk     TEXT NOT NULL,                  -- 'Spomienky'
  name_en     TEXT,
  icon        TEXT,                           -- emoji alebo ikona 🌙
  description TEXT,
  sort_order  SMALLINT DEFAULT 0,
  active      BOOLEAN DEFAULT TRUE
);
```

### Tabuľka `decks` (používateľské balíčky)

```sql
CREATE TABLE decks (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,                  -- vlastný názov
  group_id    TEXT,                           -- 'partneri', ...
  theme_ids   TEXT[],                         -- ['spomienky', 'snivanie']
  depth_min   SMALLINT DEFAULT 1,
  depth_max   SMALLINT DEFAULT 5,
  question_ids BIGINT[],                      -- manuálne vybrané otázky
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Ostatné tabuľky (zachovanie súčasných)

```sql
-- Zachovávame:
user_question_history   -- sledovanie videných otázok
user_favorites          -- obľúbené otázky  
user_profiles           -- profil + paid_access
```

---

## User flow — kompletný

### GUEST (bez registrácie)

```
1. Príde na /[lang]/apps/spoznajme-sa
2. Vidí: krátky intro + výber skupiny
3. Vyberie skupinu (napr. Partneri)
4. Vyberie tému (napr. Ľahké)
5. Dostane deck 10 voľných otázok (rotujúca sada, nie vždy rovnaká)
6. Potiahnuť/kliknúť → ďalšia otázka
7. Po 10. otázke → GATE:
   "Chcete pokračovať? Odomknite 8000+ otázok za 6,99 €"
   alebo "Zaregistrujte sa zadarmo a získajte 2 otázky denne"
8. Bez obľúbených, bez histórie
```

### FREE USER (prihlásený, bez platby)

```
1. Prihlási sa (email / Google / Apple)
2. Profil: paid_access = false
3. Dostupné: 2 nové otázky DENNE z každej skupiny
4. Reset: každý deň o 00:00
5. Obľúbené: ÁNO (uloží si otázky)
6. História: ÁNO (nevidí rovnaké otázky opakovane)
7. Po limitu: "Zítra máš ďalšie 2 otázky" alebo "Odomknúť za 6,99 €"
```

### PAID USER (paid_access = true)

```
1. Zakúpil jednorazový prístup (6,99 €)
2. Dostupné: všetky schválené otázky (8000+)
3. Bez denného limitu
4. Obľúbené + História
5. Vlastné decky (uložené filtre/výber)
6. Zobrazí sa badge "✨ Plný prístup"
7. Zostatok: "zostáva 7 842 otázok" (nesie sa)
```

---

## Interakcia s kartičkou

### Gesto a animácie

```
Mobilný swipe:
  ← swipe LEFT  → "Preskočiť" (ďalšia bez uloženia)
  → swipe RIGHT → "Páčilo sa mi" (uloží do obľúbených)
  ↑ swipe UP    → Zdieľať otázku
  ↓ swipe DOWN  → Späť na výber

Desktop:
  [←] Preskočiť   [→] Páčilo sa mi   [↑ Zdieľať]
  alebo kláves: ←  →  s(hare)

Animácia:
  - Karta sa otáča/odísde do strany (CSS transform/translate)
  - Nová karta "príde" zdola
  - Transition: 300ms ease-out
```

### Flip (pre `reciprocal` typ)

```
Reciprocal otázky majú 2 strany:
  Predná: "Čo si myslíš, že ma teraz najviac trápi?"
  Zadná:  "Teraz odpovedz druhý/á — čo si SKUTOČNE myslíš?"

Kliknutím na kartu sa otočí (CSS 3D flip)
```

---

## Zdieľanie otázky

Každá otázka má share funkcionalitu:

```
[Zdieľať ↗] kliknutie → modal:

  📋 Kopírovať otázku
  📱 Zdieľať cez (native Share API)
  🔗 Otvoriť odkaz na otázku
     → spoznajme-sa.sk/o/[slug]

  Dynamický OG image pre social media:
  - Pozadie podľa skupiny (farba/gradient)
  - Text otázky
  - Logo + brand
```

---

## Stránka otázky (SEO / Share page)

Každá otázka má vlastnú URL: `/[lang]/o/[slug]`

```
Obsah:
  - Plný text otázky (h1)
  - Téma a skupina (breadcrumb)
  - "Hrať s touto otázkou" → otvorí app
  - 3 podobné otázky
  
OG/Meta:
  <meta og:title="Čo by si zmenil na sebe, ak by si mohol?">
  <meta og:image="[dynamický obrázok s otázkou]">
  <meta og:description="Konverzačné kartičky — spoznajme-sa.sk">
```

---

## Admin panel — správa otázok

Admini (`rezvalia@gmail.com`, `jozef.bubliak@gmail.com`) majú prístup k admin rozhraniu.

### Admin rozhranie pre otázky

```
/admin/questions

Filtre:
  [Skupina ▼] [Téma ▼] [Hĺbka ▼] [Status ▼] [Jazyk ▼]

Tabuľka:
  ID | Text (SK) | Skupiny | Téma | Hĺbka | Status | Akcie

Akcie:
  [✏️ Upraviť] [✅ Schváliť] [🗑️ Zamietnuť]

Bulk akcie:
  Vybrané: [Schváliť vybrané] [Zmeniť tému]
```

### Formulár pre pridanie/úpravu otázky

```
Textové polia:
  🇸🇰 Otázka (SK)*
  🇬🇧 Otázka (EN)
  🇨🇿 Otázka (CS)
  🇵🇱 Otázka (PL)
  ... (ostatné jazyky)

  Fun prompt (SK) — voliteľný pokyn
  Fun prompt (EN)

Kategorizácia:
  Skupiny: [✓] Partneri  [ ] Kamaráti  [ ] Rodina ...
  Téma: [dropdown tém]
  Hĺbka: [1] [2] [3] [4] [5]
  Typ: [text] [reciprocal] [scale] [challenge] [vote]
  Kultúrny kontext: [ ] Iba SK/CS  (default: všetky)

Moderácia:
  Status: [draft → review → schválená]
  Interná poznámka: textarea
```

### Import otázok (bulk)

Admin môže nahrať CSV/Excel s otázkami:

```csv
text_sk,text_en,skupiny,tema,hlbka,typ
"Čo by si si vybral na dlhú cestu?","What would you take on a long trip?","partneri;kamarati","snivanie",2,"text"
```

---

## Notifikácie a retencia

### Denná otázka (otazka-dna)
- Každý deň o 09:00 → push/email s jednou otázkou
- Link → otvorí app na tej otázke
- Pre prihlásených FREE aj PAID users

### Email onboarding
```
Deň 0: "Vitaj! Tu je tvoja prvá otázka..."
Deň 3: "Skúsili ste kartičky s partnerom?"
Deň 7: "7 dní — máš obľúbené otázky? Odomknite všetky za 6,99 €"
```

---

## Monetizácia

### Modely prístupu

| Tier | Cena | Obsah |
|------|------|-------|
| **Guest** | zadarmo | 10 rotujúcich otázok / skupina (bez registrácie) |
| **Free** | zadarmo | 2 nové otázky / deň / skupina + obľúbené |
| **Premium** | 6,99 € jednoraz | 8000+ otázok neobmedzene + všetky skupiny + vlastné decky |
| **B2B Škola** | kontakt | Triedy, teacher dashboard, export |
| **B2B Firma** | kontakt | Tímbuilding deck, firemné brandovanie |

### Checkout flow (Stripe)
```
1. Klikne "Odomknúť za 6,99 €"
2. → /api/checkout → Stripe Checkout Session
3. Stripe platobná stránka
4. Úspech → webhook → update user_profiles.paid_access = true
5. Redirect → /[lang]/apps/spoznajme-sa/play?success=true
6. Zobrazí konfety + "Vítaj v plnom prístupe!"
```

---

## Technická implementácia (roadmap)

### Čo treba dodať k súčasnému stavu

#### Databáza
- [ ] Pridať `translations` JSONB stĺpec do `questions`
- [ ] Pridať `theme`, `depth`, `type`, `slug`, `cultural_context` do `questions`
- [ ] Vytvoriť tabuľku `themes`
- [ ] Vytvoriť tabuľku `decks`
- [ ] Migrovať existujúce `hlavna_skupina`/`podskupina` → `theme`
- [ ] Migrovať `partneri/kamarati/rodina/rodic_dieta` boolean → zachovať + pridať `group_skola`, `group_tim`

#### API
- [ ] `GET /api/questions?group=partneri&theme=spomienky&depth_max=3&lang=en`
- [ ] `GET /api/themes?group=partneri` — zoznam tém pre skupinu
- [ ] `GET /api/questions/[id]` — detail otázky s prekladmi
- [ ] `POST /api/decks` — uložiť vlastný deck
- [ ] `GET /api/decks` — moje decky
- [ ] `GET /api/o/[slug]` — otázka podľa slug (pre share)

#### Frontend
- [ ] Deck selector (3-krokový výber: skupina → téma → hĺbka)
- [ ] Swipe animácie (Framer Motion alebo CSS transform)
- [ ] Flip animácia pre `reciprocal` otázky
- [ ] Share modal + native Share API
- [ ] SEO stránky otázok (`/o/[slug]`)
- [ ] Vlastné decky UI
- [ ] Filter panel (hĺbka, typ)
- [ ] Jazykový prepínač otázok (nezávislý od UI jazyka)

#### Admin
- [ ] Admin stránka na správu otázok
- [ ] Formulár s prekladmi
- [ ] CSV import
- [ ] Bulk schvaľovanie

---

## Súborová mapa (cieľový stav)

```
src/
├── app/
│   ├── [lang]/
│   │   ├── apps/spoznajme-sa/
│   │   │   ├── page.tsx              # Landing + pricing
│   │   │   └── play/page.tsx         # Hra
│   │   ├── o/[slug]/page.tsx         # SEO stránka otázky (NOVÁ)
│   │   └── admin/
│   │       └── questions/page.tsx    # Admin správa (NOVÁ)
│   └── api/
│       ├── questions/
│       │   ├── route.ts              # GET list otázok (NOVÁ s filter params)
│       │   └── [id]/route.ts         # GET/PATCH detail
│       ├── themes/route.ts           # GET číselník tém (NOVÁ)
│       ├── decks/route.ts            # GET/POST vlastné decky (NOVÁ)
│       └── o/[slug]/route.ts         # GET otázka podľa slug (NOVÁ)
│
├── components/
│   ├── cards/
│   │   ├── DeckSelector.tsx          # Výber skupiny/témy/hĺbky (NOVÝ)
│   │   ├── CardView.tsx              # Zobrazenie jednej kartičky (NOVÝ)
│   │   ├── CardStack.tsx             # Stack s animáciami (NOVÝ)
│   │   ├── ShareModal.tsx            # Zdieľanie (NOVÝ)
│   │   └── FavoritesDrawer.tsx       # Obľúbené (NOVÝ)
│   ├── PlayApp.tsx                   # Refaktor — používa nové komponenty
│   └── admin/
│       ├── QuestionTable.tsx         # Admin tabuľka (NOVÁ)
│       └── QuestionForm.tsx          # Admin formulár (NOVÝ)
│
├── hooks/
│   ├── useQuestions.tsx              # Refaktor + nové filtre
│   ├── useDeck.tsx                   # Deck logika (NOVÝ)
│   └── useCardSwipe.tsx              # Swipe gestá (NOVÝ)
│
├── types/
│   └── cards.ts                      # Typy pre kartičky (NOVÝ)
│
└── i18n/
    └── dictionaries/
        ├── sk.json                   # Rozšírené o nové texty
        └── en.json                   # Kompletný preklad UI
```

---

## Príklady otázok podľa skupín a tém

### Partneri → Spomienky (depth 2–3)
- "Aká bol moment, keď si si prvýkrát povedal/a — to je ten/tá?"
- "Čo si si myslel/a, keď sme sa prvý raz pobozkali?"
- "Ktorá dovolenka bola pre teba najlepšia a prečo?"

### Partneri → Ťažké (depth 4–5)
- "Je niečo, čo ti na mne vadí, ale nikdy si mi to nepovedal/a?"
- "Ak by sme sa rozišli, čo by ti na mne chýbalo najviac?"
- "Čo si myslíš, že je naša najväčšia nezodpovedaná otázka ako pár?"

### Kamaráti → Kto z nás by... (depth 1–2, typ: vote)
- "Kto z nás by vydržal najdlhšie na pustom ostrove?"
- "Kto by ako prvý plakal na romantickom filme?"
- "Kto by najskôr prišiel na schôdzku neskoro?"

### Rodič–Dieťa → Tínedžer (depth 3–4)
- "Je niečo, čo by si chcel/a aby som ako rodič robil/a inak?"
- "Čo si myslíš, že o tebe neviem, ale mal/a by som?"
- "Ak by si mohol/a na jeden deň byť rodičom — čo by si zmenil/a?"

### Škola → Zoznámenie (depth 1)
- "Čo je tvoja superhrdinská schopnosť — čo robíš lepšie ako ostatní?"
- "Aký predmet ti ide najlepšie a prečo?"
- "Čo by si robil/a, keby si nemusel/a chodiť do školy?"

---

*Táto dokumentácia slúži ako základ pre implementáciu. Pred začatím kódovania treba odsúhlasiť: databázová schéma, deck selector flow, monetizačný model.*
