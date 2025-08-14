// src/app/api/db-ping/route.ts

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET() {
  const db = supabaseServer();
  const { data, error } = await db.from('herd_games').select('id, code').limit(1);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, sample: data });
}