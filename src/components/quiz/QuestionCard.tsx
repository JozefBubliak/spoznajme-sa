import { useState } from 'react'
import Button from './Button'

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
    <Button
      key={label}
      onClick={() => handleClick(label)}
      type={selected === label ? 'primary' : 'secondary'}
      disabled={!!selected}
      style={{
        width: '100%',
        margin: '0.5rem 0',
        border: '1px solid #ccc'
      }}
    >
      {label}. {text}
    </Button>
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

