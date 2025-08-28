export async function cleanOldGames() {
  try {
    await fetch('/api/cleanup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ olderThanHours: 24 }),
    })
    console.log('✅ Staré hry vyčistené')
  } catch (err) {
    console.error('❌ Chyba pri čistení hier', err)
  }
}
