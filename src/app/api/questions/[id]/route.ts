// src/app/api/questions/[id]/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseAdmin' // server-side client (service role)

export async function GET(_req: Request, context: any) {
  try {
    // bezpečne vytiahneme id aj keď TS/Next mení tvar 2. argumentu
    const idRaw = context?.params?.id as string | undefined

    const questionId = idRaw ? parseInt(idRaw, 10) : NaN
    if (!Number.isFinite(questionId) || questionId <= 0) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('questions')
      .select('id, text, partneri, kamarati, rodina, rodic_dieta, admin_status')
      .eq('id', questionId)
      .maybeSingle()

    if (error) {
      console.error('Database query error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    // ak nechceš vracať neschválené otázky, môžeš to odfiltrovať:
    // if (data.admin_status !== 3) {
    //   return NextResponse.json({ error: 'Not approved' }, { status: 404 })
    // }

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error('Server error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
