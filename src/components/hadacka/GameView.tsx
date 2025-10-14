'use client'

import { useEffect, useState } from 'react'
import { useGameStore } from '@/lib/stores/gameStore'
import { TimerService } from '@/lib/services/timerService'
import { SoundService } from '@/lib/services/soundService'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WordCard } from './WordCard'
import { TimerRing } from './TimerRing'
import { Scoreboard } from './Scoreboard'
import { Badge } from '@/components/ui/badge'

export function GameView() {
  const {
    gameState,
    settings,
    guessWord,
    skipWord,
    pauseTimer,
    resumeTimer,
    endRound,
    nextRound,
    setTimeLeft,
    decrementTime,
  } = useGameStore()

  const [timer] = useState(() => TimerService.getInstance('game'))

  // Current entity (team or player)
  const currentEntity = settings.gameMode === 'teams'
    ? settings.teams[gameState.currentTeamIndex]
    : settings.players[gameState.currentPlayerIndex]

  // Timer management
  useEffect(() => {
    if (gameState.isTimerRunning) {
      timer.start(gameState.timeLeft, {
        onTick: (timeLeft) => {
          setTimeLeft(timeLeft)
        },
        onEnd: () => {
          endRound()
          SoundService.playTimeUp()
        },
        onWarning: (seconds) => {
          SoundService.playWarning(seconds)
        },
      })
    } else {
      timer.pause()
    }

    return () => timer.stop()
  }, [gameState.isTimerRunning, gameState.timeLeft])

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSpace: () => {
      if (gameState.isActive && gameState.currentWord) {
        handleGuess()
      }
    },
    onArrowRight: () => {
      if (gameState.isActive && gameState.currentWord) {
        handleSkip()
      }
    },
    onKeyS: () => {
      if (gameState.isActive) {
        handleTimerToggle()
      }
    },
    onEnter: () => {
      if (!gameState.isTimerRunning && gameState.timeLeft === settings.timePerRound) {
        // Only allow next round when timer is not running and time is reset
        handleNextRound()
      }
    },
  })

  const handleGuess = () => {
    guessWord()
    SoundService.playSuccess()
    SoundService.vibrate(100)
  }

  const handleSkip = () => {
    skipWord()
    SoundService.playSkip()
    SoundService.vibrate([50, 50, 50])
  }

  const handleTimerToggle = () => {
    if (gameState.isTimerRunning) {
      pauseTimer()
    } else {
      resumeTimer()
    }
  }

  const handleEndRound = () => {
    endRound()
    SoundService.playRoundEnd()
  }

  const handleNextRound = () => {
    if (gameState.currentRound >= settings.roundCount * (settings.gameMode === 'teams' ? settings.teams.length : settings.players.length)) {
      // Game finished
      useGameStore.getState().endGame()
      return
    }
    nextRound()
    SoundService.playGameStart()
  }

  // Check if game is finished
  const isGameFinished = gameState.currentRound > settings.roundCount * 
    (settings.gameMode === 'teams' ? settings.teams.length : settings.players.length)

  if (isGameFinished) {
    // Show final results
    const entities = settings.gameMode === 'teams' ? settings.teams : settings.players
    const sortedEntities = [...entities].sort((a, b) => b.score - a.score)
    
    return (
      <div className="space-y-6">
        <Card className="card-elegant text-center">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text">🎉 Koniec hry!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {sortedEntities.slice(0, 3).map((entity, index) => (
                <div key={entity.id} className={`flex items-center justify-center gap-4 p-4 rounded-lg ${
                  index === 0 ? 'bg-warning/20 dark:bg-warning/20' :
                  index === 1 ? 'bg-muted dark:bg-muted/20' :
                  'bg-warning/10 dark:bg-warning/20'
                }`}>
                  <span className="text-2xl">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </span>
                  <span className="font-semibold text-lg">{entity.name}</span>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {entity.score} bodov
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.reload()} size="lg" className="btn-primary">
                🔄 Nová hra
              </Button>
              <Button variant="outline" size="lg" onClick={() => {
                useGameStore.getState().resetGame()
              }}>
                📊 Hrať odvetu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
      {/* Main Game Area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Round Info */}
        <Card className="card-elegant">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-lg px-3 py-1">
                  Kolo {gameState.currentRound} / {settings.roundCount}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Na ťahu:</span>
                  <span className="font-semibold text-lg">{currentEntity?.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Uhádnuté:</span>
                <Badge variant="secondary">{gameState.roundWords.guessed.length}</Badge>
                <span className="text-sm text-muted-foreground">Preskočené:</span>
                <Badge variant="destructive">{gameState.roundWords.skipped.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timer and Word Card */}
        <div className="grid md:grid-cols-4 gap-6 items-center">
          <div className="flex justify-center">
            <TimerRing
              seconds={gameState.timeLeft}
              totalSeconds={settings.timePerRound}
              running={gameState.isTimerRunning}
              size={120}
              onEnd={handleEndRound}
            />
          </div>
          <div className="md:col-span-3">
            <WordCard
              word={gameState.currentWord}
              playMode={settings.playMode}
              showTabooTerms={true}
              className="h-64"
            />
          </div>
        </div>

        {/* Game Controls */}
        <Card className="card-elegant">
          <CardContent className="py-4">
            <div className="flex flex-wrap gap-4 justify-center">
              {gameState.timeLeft > 0 && gameState.currentWord && (
                <>
                  <Button
                    onClick={handleGuess}
                    size="lg"
                    className="btn-primary min-w-32"
                    disabled={!gameState.isTimerRunning}
                  >
                    ✅ Uhadnuté
                    <kbd className="ml-2 px-1 bg-primary-foreground/20 rounded text-xs">Space</kbd>
                  </Button>
                  <Button
                    onClick={handleSkip}
                    variant="outline"
                    size="lg"
                    className="min-w-32"
                    disabled={!gameState.isTimerRunning}
                  >
                    🔄 Preskočiť
                    <kbd className="ml-2 px-1 bg-muted rounded text-xs">→</kbd>
                  </Button>
                </>
              )}
              
              <Button
                onClick={handleTimerToggle}
                variant={gameState.isTimerRunning ? 'destructive' : 'default'}
                size="lg"
                className="min-w-32"
                disabled={gameState.timeLeft === 0}
              >
                {gameState.isTimerRunning ? '⏸ Pauza' : '▶️ Štart'}
                <kbd className="ml-2 px-1 bg-primary-foreground/20 rounded text-xs">S</kbd>
              </Button>

              {gameState.timeLeft === 0 && (
                <Button
                  onClick={handleEndRound}
                  variant="secondary"
                  size="lg"
                  className="min-w-32"
                >
                  ⏹ Ukončiť kolo
                </Button>
              )}

              {!gameState.isTimerRunning && gameState.timeLeft === settings.timePerRound && (
                <Button
                  onClick={handleNextRound}
                  size="lg"
                  className="btn-primary min-w-32"
                >
                  ➡️ Ďalší na rade
                  <kbd className="ml-2 px-1 bg-primary-foreground/20 rounded text-xs">Enter</kbd>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scoreboard Sidebar */}
      <div className="lg:col-span-1">
        <Scoreboard />
      </div>
    </div>
  )
}