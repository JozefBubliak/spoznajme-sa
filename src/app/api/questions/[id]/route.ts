
import { NextResponse } from 'next/server'
import { supabase } from '@/integrations/supabase/client'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Validate ID parameter
    const questionId = parseInt(id)
    if (isNaN(questionId) || questionId <= 0) {
      return NextResponse.json({ error: 'Invalid question ID' }, { status: 400 })
    }

    // Query using RLS-enabled client - only approved questions will be returned to non-admins
    const { data, error } = await supabase
      .from('questions')
      .select('id, text, partneri, kamarati, rodina, rodic_dieta')
      .eq('id', questionId)
      .maybeSingle()

    if (error) {
      console.error('Database query error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Question not found or not approved' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
