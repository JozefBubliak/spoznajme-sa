'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/stores/gameStore'
import { WordService } from '@/lib/services/wordService'
import { SoundService } from '@/lib/services/soundService'
import { TimerService } from '@/lib/services/timerService'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useAuth } from '@/hooks/useAuth'

import { ModeratorShell } from '@/components/hadacka/ModeratorShell'
import { SettingsPanel } from '@/components/hadacka/SettingsPanel'
import { GameView } from '@/components/hadacka/GameView'

export default function ModeratorPage() {
  const { gameState, settings, startGame, soundSettings } = useGameStore()
  const [isInitialized, setIsInitialized] = useState(false)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [user, loading, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Na spustenie hry sa prihláste ako moderátor.</p>
      </div>
    )
  }

  // Initialize services and load words
  useEffect(() => {
    const initializeApp = async () => {
      try {
        SoundService.setEnabled(soundSettings.enabled)
        SoundService.setVolume(soundSettings.volume)
        
        // Load words based on selected categories
        const words = await WordService.getWordsByCategories(settings.categories)
        useGameStore.getState().setWordPool(words)
        
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        setIsInitialized(true) // Still show UI even if loading failed
      }
    }

    initializeApp()
  }, [settings.categories, soundSettings])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      TimerService.destroyAll()
    }
  }, [])

  const handleStartGame = () => {
    if (settings.gameMode === 'teams' && settings.teams.length === 0) {
      alert('Pridajte aspoň jeden tím!')
      return
    }
    if (settings.gameMode === 'individual' && settings.players.length === 0) {
      alert('Pridajte aspoň jedného hráča!')
      return
    }
    if (settings.categories.length === 0) {
      alert('Vyberte aspoň jednu kategóriu!')
      return
    }

    startGame()
    SoundService.playGameStart()
  }

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    onKeyR: () => {
      if (!gameState.isActive) {
        handleStartGame()
      }
    },
    onEscape: () => {
      if (gameState.isTimerRunning) {
        useGameStore.getState().pauseTimer()
      }
    }
  })

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Načítavam hru...</p>
        </div>
      </div>
    )
  }

  return (
    <ModeratorShell>
      {!gameState.isActive ? (
        <SettingsPanel onStartGame={handleStartGame} />
      ) : (
        <GameView />
      )}
    </ModeratorShell>
  )
}