'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TimerRing } from '@/components/hadacka/TimerRing'
import type { GameSettings, GameState } from '@/types/hadacka'

interface DisplayState {
  settings: GameSettings
  gameState: GameState
}

export default function DisplayPage() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [data, setData] = useState<DisplayState | null>(null)

  useEffect(() => {
    const channel = new BroadcastChannel('hadacka-display')
    channel.onmessage = (event: MessageEvent<DisplayState>) => {
      setData(event.data)
    }
    return () => channel.close()
  }, [])

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullScreen(true)
    } else {
      document.exitFullscreen()
      setIsFullScreen(false)
    }
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
  }, [])

  const { settings, gameState } = data ?? {}

  const teams = settings?.gameMode === 'teams'
    ? settings.teams
    : settings?.players ?? []

  const currentEntityIndex = settings?.gameMode === 'teams'
    ? (gameState?.currentTeamIndex ?? 0)
    : (gameState?.currentPlayerIndex ?? 0)

  const currentTeamName = teams[currentEntityIndex]?.name ?? '—'
  const currentRound = gameState?.currentRound ?? 0
  const totalRounds = settings?.roundCount ?? 0
  const timeLeft = gameState?.timeLeft ?? 0
  const totalTime = settings?.timePerRound ?? 60
  const isRunning = gameState?.isTimerRunning ?? false
  const isActive = gameState?.isActive ?? false

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-glow p-4 text-white">
      <button
        onClick={toggleFullScreen}
        className="fixed top-4 right-4 z-50 px-3 py-2 bg-black/20 rounded-lg text-sm hover:bg-black/30 transition-colors"
      >
        {isFullScreen ? '📤 Ukončiť fullscreen' : '📺 Fullscreen'}
      </button>

      <div className="container mx-auto h-screen flex flex-col justify-center">
        {!data || !isActive ? (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center">🎮 Hádačka naživo</h1>
            <p className="text-xl text-white/70">
              {!data ? 'Čakám na moderátora…' : 'Hra ešte nezačala'}
            </p>
            <p className="text-sm text-white/50">
              Otvorte moderátorskú konzolu v druhej karte a spustite hru.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">🎮 Hádačka naživo</h1>
              <div className="flex justify-center items-center gap-4 text-xl">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Kolo {currentRound} / {totalRounds}
                </Badge>
                <span>•</span>
                <span>Na ťahu: <strong>{currentTeamName}</strong></span>
              </div>
            </div>

            {/* Main Display */}
            <div className="flex-1 grid md:grid-cols-3 gap-8 items-center">
              {/* Timer */}
              <div className="flex justify-center">
                <TimerRing
                  seconds={timeLeft}
                  totalSeconds={totalTime}
                  running={isRunning}
                  size={200}
                  className="text-white"
                />
              </div>

              {/* Scoreboard */}
              <div className="md:col-span-2">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">🏆 Skóre</h2>
                    <div className="space-y-4">
                      {[...teams]
                        .sort((a, b) => b.score - a.score)
                        .map((entity, index) => (
                          <div
                            key={entity.id}
                            className={`flex justify-between items-center p-4 rounded-lg ${
                              entity.name === currentTeamName
                                ? 'bg-yellow-400/20 border-2 border-yellow-400'
                                : 'bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {index === 0 && entity.score > 0 && (
                                <span className="text-2xl">👑</span>
                              )}
                              <span className="text-xl font-semibold text-white">
                                {entity.name}
                              </span>
                              {entity.name === currentTeamName && (
                                <Badge variant="secondary" className="ml-2">na ťahu</Badge>
                              )}
                            </div>
                            <Badge
                              variant={index === 0 ? 'default' : 'secondary'}
                              className="text-xl px-4 py-2"
                            >
                              {entity.score}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-white/80">
              <p className="text-lg">Moderátor ovláda hru • Žiadne telefóny potrebné</p>
              <p className="text-sm mt-2">DeepTalks.eu - Pomáhame ľuďom lepšie komunikovať</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
