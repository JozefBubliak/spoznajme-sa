import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const SELECT = 'id,custom_id,level,action_type,description,prep_time,task_time,status,viewed,group';

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

function mapTask(task: DbTask) {
  return {
    id: task.custom_id || task.id,
    level: task.level,
    action_type: task.action_type,
    prep_time: task.prep_time ?? 0,
    task_time: task.task_time ?? 60,
    description: task.description,
    status: task.status === 0 ? 'Nevhodná' : '',
    viewed: Boolean(task.viewed),
    group: task.group ?? '',
  };
}

export async function GET() {
  try {
    const supabase = supabaseAdmin();

    // Fetch each level in a separate query to bypass the Supabase 1000-row default limit.
    // Each level is expected to have at most a few thousand tasks; we cap at 3000 per level.
    const levels = [1, 2, 3, 4, 5, 6];

    const results = await Promise.all(
      levels.map((lvl) =>
        supabase
          .from('tasks')
          .select(SELECT)
          .eq('level', lvl)
          .order('created_at', { ascending: true })
          .range(0, 2999)
      )
    );

    const errors = results.map((r) => r.error).filter(Boolean);
    if (errors.length === levels.length) {
      // All queries failed
      return NextResponse.json({ tasks: [], error: errors[0]?.message }, { status: 500 });
    }

    const tasks = results
      .flatMap((r) => (r.data ?? []) as DbTask[])
      .filter((task) => task.description && Number.isFinite(task.level))
      .map(mapTask);

    return NextResponse.json({ tasks });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ tasks: [], error: message }, { status: 500 });
  }
}
