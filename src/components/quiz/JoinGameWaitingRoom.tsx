interface Player {
  id: string
  name: string
}

interface JoinGameWaitingRoomProps {
  code: string
  players: Player[]
  onLock: () => void
}

export default function JoinGameWaitingRoom({ code, players, onLock }: JoinGameWaitingRoomProps) {
  const joinUrl = `https://deeptalks.eu/sk/play/${code}`

  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#000' }}>
      <h2>🟢 Miestnosť aktívna</h2>
      <p>Hráči sa môžu pripájať cez link:</p>
      <p>
        <a href={joinUrl}>{joinUrl}</a>
      </p>

      <h3>👥 Pripojení hráči ({players.length})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {players.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <button onClick={onLock} style={{ marginTop: '2rem' }}>
        🔒 Zamknúť lobby a začať konfiguráciu
      </button>
    </div>
  )
}

