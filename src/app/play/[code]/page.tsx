// PATH: src/app/play/[code]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RealtimeClient } from '@/lib/realtime/client'
import { channelFor } from '@/lib/realtime/types'

type Player = { id: string; name: string; score: number }

export default function PlayJoinPage() {
  const params = useParams()
  const code = String((params as any)?.code || '').toUpperCase()

  const [name, setName] = useState('')
  const [me, setMe] = useState<Player | null>(null)
  const [players, setPlayers] = useState<Player[]>([])
  const [err, setErr] = useState<string>('')

  // polling lobby
  useEffect(() => {
    let t: any
    const tick = async () => {
      if (!code) return
      try {
        const r = await fetch(`/api/games/${code}/players`, { cache: 'no-store' })
        if (r.ok) {
          const j = await r.json()
          setPlayers(j.players || [])
        }
      } catch {}
      t = setTimeout(tick, 2000)
    }
    tick()
    return () => t && clearTimeout(t)
  }, [code])

  const [gameState, setGameState] = useState<'lobby' | 'question' | 'locked' | 'results'>('lobby')
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null)
  const [currentRoundId, setCurrentRoundId] = useState<string>('')

  // realtime odbery – START/LOCK/RESULTS
  useEffect(() => {
    if (!code || !me) return
    const ch = channelFor(code)
    const unsub = RealtimeClient.subscribe(ch, async (ev) => {
      console.log('[PLAYER] Event received:', ev)
      
      if (ev.type === 'question:show') {
        setCurrentRoundId(ev.roundId)
        setSelectedAnswer(null)
        setCorrectAnswer(null)
        setGameState('question')
        try {
          const r = await fetch(`/api/games/${code}/rounds/${ev.roundId}/question?qIndex=${ev.qIndex}`)
          if (r.ok) {
            const questionData = await r.json()
            setCurrentQuestion(questionData)
            setTimeLeft(0)
          }
        } catch (error) {
          console.error('Failed to load question:', error)
        }
      }

      if (ev.type === 'timer:start') {
        setGameState('question')
        setTimeLeft(ev.durationSec)
      }
      
      if (ev.type === 'round:lock') {
        setGameState('locked')
      }
      
      if (ev.type === 'round:results') {
        setCorrectAnswer(ev.correct)
        setGameState('results')
        // Update player scores from leaderboard
        const updatedMe = ev.leaderboard.find((p: any) => p.id === me?.id)
        if (updatedMe) {
          setMe(updatedMe)
        }
      }

      if (ev.type === 'round:finish') {
        setGameState('lobby')
        setCurrentQuestion(null)
        setSelectedAnswer(null)
        setCorrectAnswer(null)
      }
    })
    return () => unsub()
  }, [code, me])

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'question' || timeLeft <= 0) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState, timeLeft])

  const join = async () => {
    setErr('')
    const n = name.trim()
    if (!n) { setErr('Napíš názov tímu / meno.'); return }
    try {
      const r = await fetch(`/api/games/${code}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n })
      })
      const j = await r.json()
      if (!r.ok) { setErr(j.error || 'Nepodarilo sa pripojiť'); return }
      setMe({ id: j.playerId, name: j.name, score: 0 })
    } catch {
      setErr('Chyba spojenia')
    }
  }

  const submitAnswer = async (answer: 'A' | 'B' | 'C' | 'D') => {
    if (!me || !currentRoundId || !currentQuestion) return
    
    setSelectedAnswer(answer)
    
    try {
      await fetch(`/api/games/${code}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: me.id,
          roundId: currentRoundId,
          qIndex: currentQuestion.qIndex,
          answer
        })
      })
    } catch (error) {
      console.error('Failed to submit answer:', error)
    }
  }

  if (!me) {
    return (
      <div className='mx-auto max-w-xl p-6 space-y-4'>
        <h1 className='text-2xl font-bold'>Herd Vote – pripojenie</h1>
        <div className='text-sm text-gray-600'>Kód hry: <b>{code}</b></div>

        <div className='rounded border p-4 space-y-3'>
          <label className='block text-sm'>Názov tímu / meno</label>
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            className='w-full border rounded px-3 py-2'
            placeholder='Napr. Super tím'
            onKeyPress={e => e.key === 'Enter' && join()}
          />
          <button onClick={join} className='px-4 py-2 bg-blue-600 text-white rounded'>Pripojiť sa</button>
          {err && <div className='text-red-600 text-sm'>{err}</div>}
        </div>

        <div className='rounded border p-4'>
          <div className='font-semibold mb-2'>Lobby ({players.length}):</div>
          <ul className='list-disc pl-6'>
            {players.map(p => <li key={p.id}>{p.name}</li>)}
          </ul>
        </div>
      </div>
    )
  }

  if (gameState === 'question' && currentQuestion) {
    return (
      <div className='mx-auto max-w-xl p-6 space-y-4'>
        <div className='text-center'>
          <div className='text-sm text-gray-600'>Otázka {currentQuestion.qIndex + 1} z {currentQuestion.totalQuestions}</div>
          <div className='text-lg font-bold text-red-600'>{timeLeft}s</div>
        </div>
        
        <div className='rounded border p-4'>
          <h2 className='text-lg font-semibold mb-4'>{currentQuestion.text}</h2>
          <div className='grid grid-cols-1 gap-2'>
            {currentQuestion.options.map((option: string, idx: number) => {
              const letter = ['A', 'B', 'C', 'D'][idx] as 'A' | 'B' | 'C' | 'D'
              const isSelected = selectedAnswer === letter
              return (
                <button
                  key={letter}
                  onClick={() => submitAnswer(letter)}
                  disabled={!!selectedAnswer}
                  className={`p-3 rounded text-left border-2 transition-colors ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${selectedAnswer ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                >
                  <span className='font-bold'>{letter})</span> {option}
                </button>
              )
            })}
          </div>
        </div>
        
        <div className='text-center text-sm text-gray-600'>
          {selectedAnswer ? `Zvolili ste odpoveď ${selectedAnswer}` : 'Vyberte odpoveď'}
        </div>
      </div>
    )
  }

  if (gameState === 'locked') {
    return (
      <div className='mx-auto max-w-xl p-6 space-y-4'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold'>Odpovede uzamknuté!</h2>
          <p className='text-gray-600'>Čakajte na výsledky...</p>
        </div>
        
        {selectedAnswer && (
          <div className='rounded border p-4 text-center'>
            <p>Vaša odpoveď: <span className='font-bold'>{selectedAnswer}</span></p>
          </div>
        )}
      </div>
    )
  }

  if (gameState === 'results' && correctAnswer) {
    const wasCorrect = selectedAnswer === correctAnswer
    return (
      <div className='mx-auto max-w-xl p-6 space-y-4'>
        <div className='text-center'>
          <h2 className='text-xl font-semibold'>Výsledky</h2>
        </div>
        
        <div className='rounded border p-4 space-y-3'>
          <div className='text-center'>
            <p>Správna odpoveď: <span className='font-bold text-green-600'>{correctAnswer}</span></p>
            <p>Vaša odpoveď: <span className={`font-bold ${wasCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {selectedAnswer || 'Neodpovedali ste'}
            </span></p>
          </div>
          
          <div className='text-center'>
            <p className={`text-lg font-bold ${wasCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {wasCorrect ? '✓ Správne!' : '✗ Nesprávne'}
            </p>
            <p className='text-sm text-gray-600'>Vaše skóre: {me.score} bodov</p>
          </div>
        </div>
        
        <div className='text-center text-sm text-gray-600'>
          Čakajte na ďalšiu otázku...
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-xl p-6 space-y-4'>
      <h1 className='text-2xl font-bold'>Herd Vote</h1>
      <div className='text-sm text-gray-600'>Kód hry: <b>{code}</b></div>
      
      <div className='rounded border p-4'>
        <p>Ste prihlásený ako <b>{me.name}</b></p>
        <p className='text-sm text-gray-600'>Skóre: {me.score} bodov</p>
        <p className='text-sm text-gray-600 mt-2'>Čakajte na štart kola...</p>
      </div>

      <div className='rounded border p-4'>
        <div className='font-semibold mb-2'>Lobby ({players.length}):</div>
        <div className='grid grid-cols-2 gap-2 max-h-40 overflow-y-auto'>
          {players.map(p => (
            <div key={p.id} className='text-sm bg-gray-50 rounded px-2 py-1'>
              {p.name} ({p.score})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
