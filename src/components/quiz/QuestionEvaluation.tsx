interface QuestionEvaluationProps {
  playerAnswer: string | null
  correctAnswer: string
}

export default function QuestionEvaluation({ playerAnswer, correctAnswer }: QuestionEvaluationProps) {
  const isCorrect = playerAnswer === correctAnswer

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
    </div>
  )
}

