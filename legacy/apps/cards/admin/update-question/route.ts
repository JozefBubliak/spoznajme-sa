
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseAdmin'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const ADMIN_EMAILS = ['rezvalia@gmail.com', 'jozef.bubliak@gmail.com']

export async function POST(req: NextRequest) {
  try {
    // Get the user's session with proper arguments
    const supabaseServer = createServerComponentClient({ cookies })
    const { data: { session }, error: sessionError } = await supabaseServer.auth.getSession()

    if (sessionError || !session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized: No valid session' }, { status: 401 })
    }

    // Verify admin access
    if (!ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const { id, groups, status } = body

    // Validate input data
    if (!id || typeof id !== 'number') {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 })
    }

    if (!status || ![1, 2, 3].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }

    // Update the question with proper validation
    const updateData = {
      partneri: Boolean(groups?.partneri),
      kamarati: Boolean(groups?.kamarati),
      rodina: Boolean(groups?.rodina),
      rodic_dieta: Boolean(groups?.rodic_dieta),
      admin_status: status,
    }

    const { error } = await supabase
      .from('questions')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Database update error:', error)
      return NextResponse.json({ error: 'Failed to update question' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
