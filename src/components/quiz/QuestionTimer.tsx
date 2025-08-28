import { useEffect, useState } from 'react'

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
    const interval = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(interval)
  }, [seconds, onTimeout])

  return (
    <div
      style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: seconds <= 5 ? 'red' : 'black',
        margin: '1rem auto'
      }}
    >
      ⏱️ {seconds}s
    </div>
  )
}

