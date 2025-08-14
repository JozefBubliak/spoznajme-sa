$ErrorActionPreference = "Stop"

function Ensure-Dir([string]$p) {
  if (-not (Test-Path -LiteralPath $p)) {
    [void][System.IO.Directory]::CreateDirectory($p)
    Write-Host "CREATE DIR  $p"
  }
}

# ---------- A) store.ts: oprav uuid() alebo prepíš na čistú verziu, ak je súbor rozbitý ----------
$store = "src/lib/herdvote/store.ts"
if (Test-Path -LiteralPath $store) {
  $src = Get-Content -LiteralPath $store -Raw
  $isBroken = ($src -match '}\s*-\s*}') -or ($src -match '\$\{Date\.now\(\)\}-;') -or ($src -match '\$\{Date\.now\(\)\}\s*-\s*$') -or ($src -match 'function\s+uuid\(\)\s*\{[^\}]*\$\{')

  if ($isBroken) {
    $backup = "$store.bak-" + (Get-Date -Format "yyyyMMdd-HHmmss")
    Copy-Item -LiteralPath $store -Destination $backup -Force
    Write-Host "💾 Backup: $backup"

    $clean = @"
export type Player = { id: string; name: string; score: number };
export type Question = {
  question_text: string;
  options: string[];
  correct_answer: 'A'|'B'|'C'|'D';
  time_limit: number;
  points_correct: number;
  points_incorrect: number;
  theme?: string | null;
  age_groups?: { junior: number; teenager: number; classic: number };
};
export type ScoringClassic = { mode:'classic'; correct:number; incorrect:number; none:number };
export type ScoringPodium  = { mode:'podium';  tiers:number[]; incorrect:number; none:number };
export type RoundSettings  = { timeLimit:number; scoring: ScoringClassic | ScoringPodium };
export type Round          = { id:string; category:string; questions: Question[]; settings: RoundSettings };
export type PlayerAnswer   = { playerId:string; questionIndex:number; answer:'A'|'B'|'C'|'D'|null; ts:number };

export type Game = {
  id: string;
  code: string;
  status: 'waiting'|'active'|'finished';
  settings: Record<string, any>;
  players: Player[];
  rounds: Round[];
  answers: Record<string, PlayerAnswer[]>;
  createdAt: number;
};

function rand(n: number) { return Math.floor(Math.random()*n); }
function pickCode(len = 6) {
  const alph = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length: len}, () => alph[rand(alph.length)]).join('');
}
function uuid() {
  return (globalThis.crypto?.randomUUID)
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

export const store = {
  games: new Map<string, Game>(),

  createGame(settings: Record<string,any> = {}) {
    const code = pickCode(6);
    const game: Game = {
      id: uuid(),
      code,
      status: 'waiting',
      settings,
      players: [],
      rounds: [],
      answers: {},
      createdAt: Date.now()
    };
    this.games.set(code, game);
    return game;
  },

  getGame(code: string) { return this.games.get(code) || null; },

  addRound(code: string, category: string, questions: Question[], settings: RoundSettings) {
    const g = this.getGame(code);
    if (!g) return null;
    const r: Round = { id: uuid(), category, questions, settings };
    g.rounds.push(r);
    g.answers[r.id] = [];
    return r;
  },

  addBulkQuestions(code: string, questions: Question[], settings: RoundSettings) {
    return this.addRound(code, 'bulk', questions, settings);
  }
};
"@

    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($store, $clean, $utf8NoBom)
    Write-Host "✅ store.ts opravený (prepísaný čistou verziou)"
  } else {
    Write-Host "ℹ️  store.ts vyzerá OK – bez zásahu."
  }
} else {
  Write-Host "⚠️  Nenájdem $store"
}

# ---------- B) page.tsx: oprav zle escapovaný fetch ----------
$page = "src/app/sk/apps/herd-vote/page.tsx"
if (Test-Path -LiteralPath $page) {
  $txt = Get-Content -LiteralPath $page -Raw
  $before = $txt

  # fix zle escapovaných lomiek a doplnenie gameCode v URL
  $txt = [regex]::Replace($txt, 'fetch\(.+?rounds\\s*\\,\s*\{', 'fetch(`/api/games/${gameCode}/rounds`, {', 'Singleline')

  if ($txt -ne $before) {
    $backup = "$page.bak-" + (Get-Date -Format "yyyyMMdd-HHmmss")
    Copy-Item -LiteralPath $page -Destination $backup -Force
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($page, $txt, $utf8NoBom)
    Write-Host "✅ page.tsx opravený (fetch URL)"
  } else {
    Write-Host "ℹ️  page.tsx: fetch vyzerá OK – bez zásahu."
  }
} else {
  Write-Host "⚠️  Nenájdem $page"
}

# ---------- C) kategórie route – vytvor ak chýba ----------
$catRoute = "src/app/api/games/herd-vote/categories/route.ts"
if (-not (Test-Path -LiteralPath $catRoute)) {
  Ensure-Dir (Split-Path -Parent $catRoute)
  $route = @"
import { NextResponse } from "next/server";
import data from "@/../content/sk/apps/herd-vote/kviz_questions.json";

export async function GET() {
  const all = (data as any[]).filter(Boolean);
  const map = new Map<string, number>();
  for (const q of all) {
    const theme = (q.theme || "Nezaradené") as string;
    map.set(theme, (map.get(theme) || 0) + 1);
  }
  const categories = Array.from(map.entries()).map(([name,count]) => ({ name, count }));
  return NextResponse.json({ categories });
}
"@
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($catRoute, $route, $utf8NoBom)
  Write-Host "✅ Vytvorený: $catRoute"
} else {
  Write-Host "ℹ️  Route kategórií už existuje."
}

Write-Host "-------------------------------------------"
Write-Host "Hotovo. Reštartuj dev server: npm run dev"
Write-Host "Potom skús:"
Write-Host "  GET  http://localhost:3000/api/games/herd-vote/categories"
Write-Host "  POST http://localhost:3000/api/games    (vráti gameCode)"
Write-Host "  POST http://localhost:3000/api/games/<code>/rounds  (bez lomky na konci)"
Write-Host "-------------------------------------------"
