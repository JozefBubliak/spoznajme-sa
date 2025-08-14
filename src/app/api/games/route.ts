import { NextRequest, NextResponse } from 'next/server'
import { store } from '@/lib/herdvote/store'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(()=>({}))
  const game = store.createGame(body?.settings || {})
  const joinUrl = /play/\  // klientsky route pre hráčov
  return NextResponse.json({ gameCode: game.code, joinUrl })
}
