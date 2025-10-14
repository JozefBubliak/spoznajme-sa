import { useEffect } from 'react'
import { playSound } from '../../utils/playSound'

interface QuestionEvaluationProps {
  playerAnswer: string | null
  correctAnswer: string
  funFact?: string
}

export default function QuestionEvaluation({ playerAnswer, correctAnswer, funFact }: QuestionEvaluationProps) {
  const isCorrect = playerAnswer === correctAnswer

  useEffect(() => {
    if (playerAnswer) {
      playSound(isCorrect ? 'correct' : 'wrong')
    }
  }, [playerAnswer, isCorrect])

  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        border: '1px solid #eee',
        borderRadius: '12px',
        maxWidth: '500px',
        margin: '2rem auto'
      }}
    >
      <h3>✅ Výsledok otázky</h3>
      <p>
        <strong>Správna odpoveď:</strong> {correctAnswer}
      </p>
      <p>
        <strong>Tvoja odpoveď:</strong> {playerAnswer ?? '—'}
      </p>
      <p
        style={{
          fontSize: '1.5rem',
          color: isCorrect ? 'green' : 'red',
          marginTop: '1rem'
        }}
      >
        {isCorrect ? 'Správne! ✅' : 'Nesprávne ❌'}
      </p>

      {funFact && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: '8px',
            background: '#f0f8ff',
            fontStyle: 'italic'
          }}
        >
          💡 <strong>Zaujímavosť:</strong> {funFact}
        </div>
      )}
    </div>
  )
}

