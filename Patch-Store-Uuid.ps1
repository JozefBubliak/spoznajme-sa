$ErrorActionPreference = "Stop"
$store = "src/lib/herdvote/store.ts"

if (-not (Test-Path -LiteralPath $store)) {
  Write-Host "⚠️  Nenájdem $store" -ForegroundColor Yellow
  exit 1
}

# 1) Backup
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = "$store.bak-$stamp"
Copy-Item -LiteralPath $store -Destination $backup -Force
Write-Host "💾 Backup: $backup"

# 2) Načítanie obsahu
$content = Get-Content -LiteralPath $store -Raw

# 3) Nahradenie celej funkcie uuid() za korektnú verziu
$patternUuid = 'function\s+uuid\(\)\s*\{[\s\S]*?\}'
$replacementUuid = @"
function uuid() {
  return (globalThis.crypto?.randomUUID)
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}
"@

$patched = [Regex]::Replace($content, $patternUuid, $replacementUuid, 'Singleline')

# 4) Odstránenie zablúdeného reťazca `}- }` a pod.
$patched = [Regex]::Replace($patched, '}\s*-\s*}', '}', 'Singleline')

# 5) Uloženie
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($store, $patched, $utf8NoBom)
Write-Host "✅ Opravený súbor: $store"

Write-Host "`nTeraz reštartuj dev server: npm run dev"
