'use client'

import { useEffect, useState } from 'react'
import { useGameStore } from '@/lib/stores/gameStore'
import { WordService } from '@/lib/services/wordService'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { TeamManager } from './TeamManager'

interface SettingsPanelProps {
  onStartGame: () => void
}

export function SettingsPanel({ onStartGame }: SettingsPanelProps) {
  const { settings, updateSettings } = useGameStore()
  const [availableCategories, setAvailableCategories] = useState<Array<{ code: string; name: string }>>([])

  useEffect(() => {
    WordService.getAvailableCategories().then(setAvailableCategories)
  }, [])

  const handleCategoryToggle = (categoryCode: string) => {
    const newCategories = settings.categories.includes(categoryCode)
      ? settings.categories.filter(c => c !== categoryCode)
      : [...settings.categories, categoryCode]
    
    updateSettings({ categories: newCategories })
  }

  const canStart = () => {
    if (settings.gameMode === 'teams' && settings.teams.length === 0) return false
    if (settings.gameMode === 'individual' && settings.players.length === 0) return false
    if (settings.categories.length === 0) return false
    return true
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Game Mode */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>🎯 Herný režim</CardTitle>
          <CardDescription>Ako sa bude hrať</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              variant={settings.gameMode === 'teams' ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => updateSettings({ gameMode: 'teams' })}
            >
              👥 Tímy vs Tímy
            </Button>
            <Button
              variant={settings.gameMode === 'individual' ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => updateSettings({ gameMode: 'individual' })}
            >
              👤 Každý sám za seba
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Settings */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>⚙️ Nastavenia hry</CardTitle>
          <CardDescription>Pravidlá a časové limity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Počet kôl</label>
            <Select
              value={settings.roundCount.toString()}
              onValueChange={(value) => updateSettings({ roundCount: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 kolá</SelectItem>
                <SelectItem value="5">5 kôl</SelectItem>
                <SelectItem value="7">7 kôl</SelectItem>
                <SelectItem value="10">10 kôl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Herný mód</label>
            <Select
              value={settings.playMode}
              onValueChange={(value: any) => updateSettings({ playMode: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opis-tabu">💬 Opis/TABU</SelectItem>
                <SelectItem value="pantomima">🎭 Pantomíma</SelectItem>
                <SelectItem value="jedno-slovo">☝️ Jedno slovo</SelectItem>
                <SelectItem value="mix">🔀 Mix módov</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Čas na kolo (sekundy)</label>
            <Select
              value={settings.timePerRound.toString()}
              onValueChange={(value) => updateSettings({ timePerRound: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 sekúnd</SelectItem>
                <SelectItem value="60">60 sekúnd</SelectItem>
                <SelectItem value="90">90 sekúnd</SelectItem>
                <SelectItem value="120">2 minúty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Penalizácia za preskočenie</label>
            <Button
              variant={settings.skipPenalty ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => updateSettings({ skipPenalty: !settings.skipPenalty })}
            >
              {settings.skipPenalty ? 'Zapnuté' : 'Vypnuté'}
            </Button>
          </div>

          {settings.skipPenalty && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Penalizácia (body)</label>
              <Input
                type="number"
                min="0"
                max="5"
                value={settings.skipPenaltyValue}
                onChange={(e) => updateSettings({ skipPenaltyValue: parseInt(e.target.value) || 0 })}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>📚 Kategórie slov</CardTitle>
          <CardDescription>Vyber kategórie pre hru</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <Button
                  key={category.code}
                  variant={settings.categories.includes(category.code) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryToggle(category.code)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              Vybraté: {settings.categories.length} kategórií
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teams/Players Manager */}
      <div className="lg:col-span-2">
        <TeamManager />
      </div>

      {/* Start Game */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>🚀 Spustiť hru</CardTitle>
          <CardDescription>
            {canStart() 
              ? 'Všetko je pripravené!' 
              : 'Dokončite nastavenia na spustenie'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onStartGame}
            disabled={!canStart()}
            size="lg"
            className="w-full btn-primary"
          >
            {canStart() ? '🎮 Spustiť hru!' : '⚠️ Dokončite nastavenia'}
          </Button>
          {!canStart() && (
            <div className="mt-2 text-xs text-muted-foreground">
              {settings.gameMode === 'teams' && settings.teams.length === 0 && (
                <div>• Pridajte aspoň jeden tím</div>
              )}
              {settings.gameMode === 'individual' && settings.players.length === 0 && (
                <div>• Pridajte aspoň jedného hráča</div>
              )}
              {settings.categories.length === 0 && (
                <div>• Vyberte aspoň jednu kategóriu</div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}