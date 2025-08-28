import { useEffect, useState } from 'react'
import { playSound } from '../../utils/playSound'

interface QuestionTimerProps {
  duration: number
  onTimeout: () => void
}

export default function QuestionTimer({ duration, onTimeout }: QuestionTimerProps) {
  const [seconds, setSeconds] = useState(duration)

    useEffect(() => {
      if (seconds === 0) {
        onTimeout()
        return
      }
      playSound('tick')
      const interval = setInterval(() => setSeconds(s => s - 1), 1000)
      return () => clearInterval(interval)
    }, [seconds, onTimeout])

    return (
      <div style={{ margin: '1rem auto', textAlign: 'center' }}>
        <div
          style={{
            height: '8px',
            background: '#eee',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              background: '#1e90ff',
              animation: `countdown ${duration}s linear forwards`
            }}
          />
        </div>
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: seconds <= 5 ? 'red' : 'black',
            marginTop: '0.5rem'
          }}
        >
          ⏱️ {seconds}s
        </div>
        <style jsx>{`
          @keyframes countdown {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>
      </div>
    )
}

