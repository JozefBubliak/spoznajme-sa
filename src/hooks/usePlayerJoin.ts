export default async function usePlayerJoin({ code, name }: { code: string; name: string }) {
  const res = await fetch(`/api/games/${code}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Chyba pri pripájaní')
  }

  const data = await res.json()
  return data.player
}
