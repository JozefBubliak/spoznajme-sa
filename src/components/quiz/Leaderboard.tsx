interface Player {
  id: string
  name: string
  score: number
}

interface LeaderboardProps {
  players: Player[]
}

export default function Leaderboard({ players }: LeaderboardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🏁 Konečné poradie</h2>
      <ol>
        {sorted.map((player, idx) => (
          <li key={player.id} style={{ fontSize: '1.2rem', marginBottom: '.5rem' }}>
            <strong>
              {idx + 1}. {player.name}
            </strong>{' '}
            — {player.score} bodov
          </li>
        ))}
      </ol>
    </div>
  )
}

