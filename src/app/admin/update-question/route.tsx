// src/app/api/admin/update-question/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const body = await req.json()
  const { id, groups, status } = body

  const { error } = await supabase
    .from('questions')
    .update({
      ...groups,
      admin_status: status,
    })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
