# CLAUDE CODE PROMPT — CategorySelector pre Herd Vote
# Skopíruj celý tento text ako prvú správu Claude Code.
# Prilož aj súbor: kategorie-widget-standalone.html

---

Implementuj stránku výberu kategórií pre Herd Vote kvíz.

## Referencia dizajnu

Prikladám HTML súbor `kategorie-widget-standalone.html` — to je PRESNÁ referencia.
Tvojou úlohou je previesť tento standalone HTML do Next.js komponentu.
Dizajn musí byť identický — ikony, farby, skupiny, animácie, všetko.

## Čo HTML obsahuje (nemazaj, prepíš do React):

### Vizuál:
- Svetlé pozadie `#f5f3f0`, karty biele `#fff` s jemným tieňom
- Karty: border-radius 12px, border `1px solid #e2ddd8`
- Hover: translateY(-1px) + oranžová linka dolu (`#e86b3a`, 2.5px)
- Vybraná karta: modrý border `2px solid #2563eb`, modré pozadie `#eff6ff`, modrý text
- Emoji ikona 22px, tučný názov 13px, sivý popis 11px, svetlosivý tag 10px

### Štruktúra:
- Nadpis + popis navrchu
- Search input (biely, rounded 10px)
- Filter pills (aktívny = čierny, neaktívny = biely s šedým textom)
- Grid 3 stĺpce (2 na tablete, 1 na mobile)
- Pri "Všetky" filtri: sekcie s label napr. "🎬 Zábava & Pop" + deliaca čiara
- Sticky bottom bar: vybrané ako modré pills (klik = odober), počet, tlačidlá

### Interaktivita:
- Kliknutie na kartu = toggle výber (modrá farba celej karty)
- Filter buttons = show/hide podľa group_tag
- Search = real-time filter podľa name + description
- Pill v bottom baru = kliknutím odober
- "Kopírovať" = clipboard s názvami
- "Potvrdiť výber" = callback s poľom vybraných

## Tech stack

- Next.js App Router, TypeScript, Tailwind CSS
- Supabase pre dáta (ale komponent prijme dáta ako props)
- Žiadne externé UI knižnice pre tento komponent

## Súbory na vytvorenie:

### 1. `components/quiz/CategorySelector.tsx`

```typescript
// Props
interface Category {
  id: string
  name: string
  slug: string
  icon: string        // emoji
  group_tag: string   // 'zabava' | 'sport' | 'kultura' | 'historia' | 'geo' | 'jedlo' | 'veda' | 'tech' | 'sk' | 'funny' | 'deti' | 'deeptalks'
  description_sk: string | null
  source_hint: string | null
  sort_order: number
  question_count?: number
}

interface CategorySelectorProps {
  categories: Category[]
  onConfirm: (selected: Category[]) => void
  maxSelect?: number  // default: 8, 0 = neobmedzené
}
```

DÔLEŽITÉ pre Tailwind — použij tieto utility classes presne:

```
// karta default:
"bg-white border border-gray-200 rounded-xl p-3 cursor-pointer transition-all duration-150 hover:-translate-y-px relative overflow-hidden group"

// karta selected:
"bg-blue-50 border-2 border-blue-500 rounded-xl p-3 cursor-pointer relative overflow-hidden"

// filter btn default:
"px-3.5 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all cursor-pointer"

// filter btn active:
"px-3.5 py-1.5 rounded-full text-xs font-medium border border-gray-900 bg-gray-900 text-white cursor-pointer"

// pill selected:
"inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 border border-blue-200 text-blue-700 cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all max-w-[180px]"
```

Oranžová hover linka na karte — urob cez pseudo-element alebo absolute div:
```tsx
// Vnútri karty (pred ostatným obsahom):
<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
```

### 2. `app/sk/apps/quiz/kategorie/page.tsx`

Server component ktorý:
1. Fetchne kategórie zo Supabase
2. Renderuje CategorySelector
3. Po potvrdení presmeruje na `/sk/apps/quiz/lobby?cats=id1,id2,...`

```typescript
// Supabase query:
const { data } = await supabase
  .from('herd_categories')
  .select('id, name, slug, icon, group_tag, description_sk, source_hint, sort_order')
  .eq('is_active', true)
  .eq('locale', 'sk')
  .order('sort_order', { ascending: true })
```

### 3. Sekcie (group_tag → label) — použiť presne toto poradie:

```typescript
const SECTIONS = [
  { key: 'zabava',    label: '🎬 Zábava & Pop' },
  { key: 'sport',     label: '⚽ Šport' },
  { key: 'kultura',   label: '🎨 Kultúra & Umenie' },
  { key: 'historia',  label: '⚔️ História & Politika' },
  { key: 'geo',       label: '🌍 Geografia' },
  { key: 'jedlo',     label: '🍕 Jedlo & Pitie' },
  { key: 'veda',      label: '🔬 Veda & Príroda' },
  { key: 'tech',      label: '💻 Tech & Veda' },
  { key: 'sk',        label: '🇸🇰 Slovensko' },
  { key: 'funny',     label: '🤯 Zábavné & Niche' },
  { key: 'deti',      label: '🧒 Pre deti & Školu' },
  { key: 'deeptalks', label: '💬 DeepTalks originál ⭐' },
]
```

### 4. Filter buttons — presne toto:

```typescript
const FILTERS = [
  { key: 'all',       label: 'Všetky',          emoji: '' },
  { key: 'zabava',    label: 'Zábava & Pop',     emoji: '🎬' },
  { key: 'veda',      label: 'Veda & Príroda',   emoji: '🔬' },
  { key: 'sport',     label: 'Šport',            emoji: '⚽' },
  { key: 'kultura',   label: 'Kultúra & Umenie', emoji: '🎨' },
  { key: 'historia',  label: 'História & Politika', emoji: '⚔️' },
  { key: 'geo',       label: 'Geografia',        emoji: '🌍' },
  { key: 'jedlo',     label: 'Jedlo & Pitie',    emoji: '🍕' },
  { key: 'tech',      label: 'Tech & Veda',      emoji: '💻' },
  { key: 'sk',        label: 'sk Slovensko',     emoji: '🇸🇰' },  // 'sk' ako small badge
  { key: 'funny',     label: 'Zábavné & Niche',  emoji: '🤯' },
  { key: 'deti',      label: 'Pre deti & Školu', emoji: '🧒' },
  { key: 'deeptalks', label: 'DeepTalks',        emoji: '💬' },
]
```

## Čo NESMIEŠ urobiť:
- Nepoužívaj shadcn Card, Badge ani iné UI komponenty — píš čisté Tailwind
- Nemeň farby — oranžová hover linka (#e86b3a), modrý výber (#2563eb / blue-500)
- Nepridávaj funkcie ktoré nie sú v HTML refencii
- Karty musia mať EMOJI IKONU veľkú (text-2xl / 22px) — nie textový placeholder

## Fallobezpečnosť:
- Ak kategória nemá icon, zobraz '❓'
- Ak nemá description_sk, nezobrazuj description row
- Ak je question_count = 0 alebo undefined, nezobrazuj count badge
- Search a filtre fungujú aj keď DB vráti prázdne pole

## Začni:
1. Pozri sa na priložený HTML súbor (kategorie-widget-standalone.html)
2. Skopíruj štýly do Tailwind tried
3. Vytvor CategorySelector.tsx
4. Vytvor page.tsx s Supabase fetchom
5. Otestuj na /sk/apps/quiz/kategorie

Dizajn musí vyzerať IDENTICKY ako v HTML refencii.
