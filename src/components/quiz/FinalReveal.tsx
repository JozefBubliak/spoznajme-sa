interface Player {
  id: string
  name: string
  score: number
}

interface FinalRevealProps {
  players: Player[]
}

export default function FinalReveal({ players }: FinalRevealProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  if (!winner) return null

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🎉 Finálne poradie</h2>
      <p>Víťazom sa stáva:</p>
      <h1
        style={{ fontSize: '2.5rem', margin: '1rem 0', color: '#1e90ff' }}
      >
        🏆 {winner.name}
      </h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sorted.map((player, idx) => (
          <li key={player.id} style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
            {idx + 1}. {player.name} — {player.score} bodov
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Ďakujeme za hranie!
      </p>
    </div>
  )
}

