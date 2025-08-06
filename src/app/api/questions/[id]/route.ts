// src/app/api/questions/[id]/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  const { data, error } = await supabase
    .from('questions')
    .select('id, text')
    .eq('id', parseInt(id))
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(data)
}
