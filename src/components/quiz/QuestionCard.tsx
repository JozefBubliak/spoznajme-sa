import { useState } from 'react'

interface Question {
  text: string
  options: [string, string, string, string]
}

interface QuestionCardProps {
  question: Question
  onAnswer: (choice: string) => void
}

export default function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const handleClick = (label: string) => {
    if (selected) return
    setSelected(label)
    onAnswer(label)
  }

  const renderButton = (label: string, text: string) => (
    <button
      key={label}
      onClick={() => handleClick(label)}
      style={{
        backgroundColor: selected === label ? '#1e90ff' : '#f0f0f0',
        color: selected === label ? '#fff' : '#000',
        padding: '1rem',
        margin: '0.5rem 0',
        width: '100%',
        fontSize: '1rem',
        borderRadius: '8px',
        cursor: selected ? 'default' : 'pointer',
        border: '1px solid #ccc'
      }}
      disabled={!!selected}
    >
      {label}. {text}
    </button>
  )

  return (
    <div style={{ padding: '2rem' }}>
      <h3>{question.text}</h3>
      <div>
        {renderButton('A', question.options[0])}
        {renderButton('B', question.options[1])}
        {renderButton('C', question.options[2])}
        {renderButton('D', question.options[3])}
      </div>
    </div>
  )
}

