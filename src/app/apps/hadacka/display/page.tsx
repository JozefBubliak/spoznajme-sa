'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TimerRing } from '@/components/hadacka/TimerRing'

export default function DisplayPage() {
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Mock data for display
  const mockData = {
    currentTeam: 'Tím 1',
    timeLeft: 45,
    totalTime: 60,
    teams: [
      { name: 'Tím 1', score: 8 },
      { name: 'Tím 2', score: 5 },
      { name: 'Tím 3', score: 3 },
    ],
    currentRound: 2,
    totalRounds: 5,
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-glow p-4 text-white">
      {/* Fullscreen toggle */}
      <button
        onClick={toggleFullScreen}
        className="fixed top-4 right-4 z-50 px-3 py-2 bg-black/20 rounded-lg text-sm hover:bg-black/30 transition-colors"
      >
        {isFullScreen ? '📤 Ukončiť fullscreen' : '📺 Fullscreen'}
      </button>

      <div className="container mx-auto h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🎮 Hádačka naživo
          </h1>
          <div className="flex justify-center items-center gap-4 text-xl">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Kolo {mockData.currentRound} / {mockData.totalRounds}
            </Badge>
            <span>•</span>
            <span>Na ťahu: <strong>{mockData.currentTeam}</strong></span>
          </div>
        </div>

        {/* Main Display */}
        <div className="flex-1 grid md:grid-cols-3 gap-8 items-center">
          {/* Timer */}
          <div className="flex justify-center">
            <TimerRing
              seconds={mockData.timeLeft}
              totalSeconds={mockData.totalTime}
              running={true}
              size={200}
              className="text-white"
            />
          </div>

          {/* Scoreboard */}
          <div className="md:col-span-2">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6 text-white">
                  🏆 Skóre
                </h2>
                <div className="space-y-4">
                  {mockData.teams
                    .sort((a, b) => b.score - a.score)
                    .map((team, index) => (
                      <div
                        key={team.name}
                        className={`flex justify-between items-center p-4 rounded-lg ${
                          team.name === mockData.currentTeam
                            ? 'bg-yellow-400/20 border-2 border-yellow-400'
                            : 'bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {index === 0 && team.score > 0 && (
                            <span className="text-2xl">👑</span>
                          )}
                          <span className="text-xl font-semibold text-white">
                            {team.name}
                          </span>
                          {team.name === mockData.currentTeam && (
                            <Badge variant="secondary" className="ml-2">
                              na ťahu
                            </Badge>
                          )}
                        </div>
                        <Badge 
                          variant={index === 0 ? 'default' : 'secondary'}
                          className="text-xl px-4 py-2"
                        >
                          {team.score}
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
          <p className="text-lg">
            Moderátor ovláda hru • Žiadne telefóny potrebné
          </p>
          <p className="text-sm mt-2">
            DeepTalks.eu - Pomáhame ľuďom lepšie komunikovať
          </p>
        </div>
      </div>
    </div>
  )
}