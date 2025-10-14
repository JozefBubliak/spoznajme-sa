'use client'

import { useState } from 'react'
import { useGameStore } from '@/lib/stores/gameStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit2, Plus, Users, User } from 'lucide-react'

export function TeamManager() {
  const { settings, addTeam, removeTeam, updateTeam, addPlayer, removePlayer, updatePlayer } = useGameStore()
  const [newTeamName, setNewTeamName] = useState('')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [editingTeam, setEditingTeam] = useState<string | null>(null)
  const [editingPlayer, setEditingPlayer] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      addTeam(newTeamName.trim())
      setNewTeamName('')
    }
  }

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim())
      setNewPlayerName('')
    }
  }

  const handleEditTeam = (id: string, name: string) => {
    setEditingTeam(id)
    setEditValue(name)
  }

  const handleEditPlayer = (id: string, name: string) => {
    setEditingPlayer(id)
    setEditValue(name)
  }

  const handleSaveTeamEdit = () => {
    if (editingTeam && editValue.trim()) {
      updateTeam(editingTeam, editValue.trim())
      setEditingTeam(null)
      setEditValue('')
    }
  }

  const handleSavePlayerEdit = () => {
    if (editingPlayer && editValue.trim()) {
      updatePlayer(editingPlayer, editValue.trim())
      setEditingPlayer(null)
      setEditValue('')
    }
  }

  const handleCancelEdit = () => {
    setEditingTeam(null)
    setEditingPlayer(null)
    setEditValue('')
  }

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {settings.gameMode === 'teams' ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
          {settings.gameMode === 'teams' ? 'Správa tímov' : 'Správa hráčov'}
        </CardTitle>
        <CardDescription>
          {settings.gameMode === 'teams' 
            ? 'Pridávajte a upravujte tímy pre hru'
            : 'Pridávajte a upravujte hráčov pre hru'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new team/player */}
        <div className="flex gap-2">
          <Input
            placeholder={settings.gameMode === 'teams' ? 'Názov tímu...' : 'Meno hráča...'}
            value={settings.gameMode === 'teams' ? newTeamName : newPlayerName}
            onChange={(e) => settings.gameMode === 'teams' 
              ? setNewTeamName(e.target.value)
              : setNewPlayerName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                settings.gameMode === 'teams' ? handleAddTeam() : handleAddPlayer()
              }
            }}
          />
          <Button
            onClick={settings.gameMode === 'teams' ? handleAddTeam : handleAddPlayer}
            disabled={settings.gameMode === 'teams' 
              ? !newTeamName.trim() 
              : !newPlayerName.trim()
            }
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Teams list */}
        {settings.gameMode === 'teams' && (
          <div className="space-y-2">
            {settings.teams.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Zatiaľ žiadne tímy. Pridajte prvý tím!
              </div>
            ) : (
              settings.teams.map((team) => (
                <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {editingTeam === team.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTeamEdit()
                            if (e.key === 'Escape') handleCancelEdit()
                          }}
                          className="w-48"
                          autoFocus
                        />
                        <Button size="sm" onClick={handleSaveTeamEdit}>
                          ✓
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="font-medium">{team.name}</span>
                        <Badge variant="secondary">{team.score} bodov</Badge>
                      </>
                    )}
                  </div>
                  {editingTeam !== team.id && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditTeam(team.id, team.name)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTeam(team.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Players list */}
        {settings.gameMode === 'individual' && (
          <div className="space-y-2">
            {settings.players.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                Zatiaľ žiadni hráči. Pridajte prvého hráča!
              </div>
            ) : (
              settings.players.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {editingPlayer === player.id ? (
                      <div className="flex gap-2">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSavePlayerEdit()
                            if (e.key === 'Escape') handleCancelEdit()
                          }}
                          className="w-48"
                          autoFocus
                        />
                        <Button size="sm" onClick={handleSavePlayerEdit}>
                          ✓
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="font-medium">{player.name}</span>
                        <Badge variant="secondary">{player.score} bodov</Badge>
                      </>
                    )}
                  </div>
                  {editingPlayer !== player.id && (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditPlayer(player.id, player.name)}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removePlayer(player.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Summary */}
        <div className="text-sm text-muted-foreground">
          {settings.gameMode === 'teams' 
            ? `Celkom ${settings.teams.length} ${settings.teams.length === 1 ? 'tím' : settings.teams.length < 5 ? 'tímy' : 'tímov'}`
            : `Celkom ${settings.players.length} ${settings.players.length === 1 ? 'hráč' : settings.players.length < 5 ? 'hráči' : 'hráčov'}`
          }
        </div>
      </CardContent>
    </Card>
  )
}