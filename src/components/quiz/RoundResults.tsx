export interface Player {
  id: string
  name: string
  score: number
}

interface RoundResultsProps {
  roundIndex: number
  players: Player[]
}

export default function RoundResults({ roundIndex, players }: RoundResultsProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>📊 Priebežné výsledky po kole {roundIndex + 1}</h2>
      <ol style={{ textAlign: 'left', maxWidth: '400px', margin: '1rem auto' }}>
        {sorted.map((player, idx) => (
          <li
            key={player.id}
            style={{
              fontSize: '1.1rem',
              padding: '0.5rem',
              background: idx === 0 ? '#f0f8ff' : 'transparent',
              borderRadius: '6px'
            }}
          >
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
