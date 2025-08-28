import { useState } from 'react'

interface RoundConfig {
  category: string
  questionCount: number
}

interface RoundSetupWizardProps {
  totalRounds: number
  onFinish: (rounds: RoundConfig[]) => void
}

export default function RoundSetupWizard({ totalRounds, onFinish }: RoundSetupWizardProps) {
  const [rounds, setRounds] = useState<RoundConfig[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleRoundSubmit = (category: string, questionCount: number) => {
    const updated = [...rounds]
    updated[currentIndex] = { category, questionCount }
    setRounds(updated)

    if (currentIndex + 1 < totalRounds) {
      setCurrentIndex(currentIndex + 1)
    } else {
      onFinish(updated)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>
        Nastav kolo {currentIndex + 1} z {totalRounds}
      </h2>
      <RoundForm onSubmit={handleRoundSubmit} />
    </div>
  )
}

interface RoundFormProps {
  onSubmit: (category: string, count: number) => void
}

function RoundForm({ onSubmit }: RoundFormProps) {
  const [category, setCategory] = useState('')
  const [count, setCount] = useState(3)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        onSubmit(category, count)
      }}
    >
      <label>Kategória</label>
      <select
        required
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
      >
        <option value="">-- Vyber kategóriu --</option>
        <option value="team">Tím</option>
        <option value="fun">Zábava</option>
      </select>

      <label>Počet otázok</label>
      <input
        type="number"
        min={1}
        max={10}
        value={count}
        onChange={e => setCount(Number(e.target.value))}
        style={{ display: 'block', marginBottom: '1rem' }}
      />

      <button type="submit">Nastaviť kolo</button>
    </form>
  )
}

