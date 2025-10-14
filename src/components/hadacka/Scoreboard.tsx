'use client'

import { useGameStore } from '@/lib/stores/gameStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus, Users, User } from 'lucide-react'

export function Scoreboard() {
  const { settings, gameState, adjustScore } = useGameStore()

  const entities = settings.gameMode === 'teams' ? settings.teams : settings.players
  const sortedEntities = [...entities].sort((a, b) => b.score - a.score)

  const currentEntity = settings.gameMode === 'teams'
    ? settings.teams[gameState.currentTeamIndex]
    : settings.players[gameState.currentPlayerIndex]

  return (
    <Card className="card-elegant h-fit sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {settings.gameMode === 'teams' ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
          Skóre
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedEntities.map((entity, index) => {
          const isCurrent = entity.id === currentEntity?.id
          const isWinning = index === 0 && entity.score > 0

          return (
            <div
              key={entity.id}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                isCurrent 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-border hover:border-muted-foreground/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isWinning && <span className="text-lg">👑</span>}
                  <span className={`font-medium ${isCurrent ? 'text-primary font-semibold' : ''}`}>
                    {entity.name}
                  </span>
                  {isCurrent && (
                    <Badge variant="secondary" className="text-xs">
                      na ťahu
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant={isWinning ? 'default' : 'secondary'}
                  className="text-lg px-2 py-1"
                >
                  {entity.score}
                </Badge>
              </div>

              {/* Manual score adjustment */}
              {gameState.isActive && (
                <div className="flex gap-1 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => adjustScore(entity.id, -1, settings.gameMode === 'teams')}
                    disabled={entity.score <= 0}
                    className="h-6 w-6 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => adjustScore(entity.id, 1, settings.gameMode === 'teams')}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          )
        })}

        {entities.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {settings.gameMode === 'teams' ? 'Žiadne tímy' : 'Žiadni hráči'}
          </div>
        )}

        {/* Round progress */}
        {gameState.isActive && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">
              Toto kolo:
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Uhadnuté:</span>
                <span className="font-semibold">{gameState.roundWords.guessed.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Preskočené:</span>
                <span className="font-semibold">{gameState.roundWords.skipped.length}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}