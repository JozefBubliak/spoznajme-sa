import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

type DbTask = {
  id: string;
  custom_id: string | null;
  level: number;
  action_type: string;
  description: string;
  prep_time: number | null;
  task_time: number | null;
  status: number | null;
  viewed: boolean | null;
  group: string | null;
};

export async function GET() {
  try {
    const supabase = supabaseAdmin();

    const { data, error } = await supabase
      .from('tasks')
      .select('id,custom_id,level,action_type,description,prep_time,task_time,status,viewed,group')
      .order('level', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      return NextResponse.json({ tasks: [], error: error.message }, { status: 500 });
    }

    const tasks = ((data ?? []) as DbTask[])
      .filter((task) => task.description && Number.isFinite(task.level))
      .map((task) => ({
        id: task.custom_id || task.id,
        level: task.level,
        action_type: task.action_type,
        prep_time: task.prep_time ?? 0,
        task_time: task.task_time ?? 60,
        description: task.description,
        status: task.status === 0 ? 'Nevhodná' : '',
        viewed: Boolean(task.viewed),
        group: task.group ?? '',
      }));

    return NextResponse.json({ tasks });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ tasks: [], error: message }, { status: 500 });
  }
}
