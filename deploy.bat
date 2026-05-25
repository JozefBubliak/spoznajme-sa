@echo off
echo ===================================
echo  CoupleSync – Deploy na Vercel
echo ===================================
echo.

cd /d "%~dp0"

echo [0/4] Mazem konfliktny middleware.ts...
if exist "src\middleware.ts" (
    del "src\middleware.ts"
    echo      Zmazany OK.
) else (
    echo      Neexistuje, preskakujem.
)

echo.
echo [1/4] Pridavam subory...
git add src/proxy.ts
git add "src/app/[lang]/apps/couplesync/data.ts"
git add "src/app/[lang]/apps/couplesync/Client.tsx"
git add "src/app/[lang]/apps/couplesync/page.tsx"
git add "src/app/[lang]/apps/couplesync/play/page.tsx"
git add "src/app/[lang]/apps/couplesync/unlock/page.tsx"
git add -u src/middleware.ts

echo.
echo [2/4] Commit...
git commit -m "feat(couplesync): questionnaire + move protection to proxy.ts"

echo.
echo [3/4] Push na GitHub...
git push origin main

echo.
echo ===================================
echo  Hotovo! Vercel nasadzuje zmeny.
echo  Za ~2 minuty bude live na:
echo  deeptalks.eu/sk/apps/couplesync/play
echo ===================================
echo.
pause
