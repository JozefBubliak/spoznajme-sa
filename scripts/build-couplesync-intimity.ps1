$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$app = Join-Path $root 'integrated-apps\couplesync-intimity'
$dist = Join-Path $app 'dist'
$public = Join-Path $root 'public\couplesync-intimity'
$rootEnv = Join-Path $root '.env.local'

if (Test-Path $rootEnv) {
  foreach ($line in Get-Content $rootEnv) {
    if ($line -match '^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY)=(.*)$') {
      $name = $Matches[1] -replace '^NEXT_PUBLIC_', 'VITE_'
      [Environment]::SetEnvironmentVariable($name, $Matches[2], 'Process')
    }
  }
}

Push-Location $app
try {
  npm run build
} finally {
  Pop-Location
}

New-Item -ItemType Directory -Force -Path $public | Out-Null
Copy-Item -Path (Join-Path $dist '*') -Destination $public -Recurse -Force

Write-Host "Copied CoupleSync intimacy build to $public"
