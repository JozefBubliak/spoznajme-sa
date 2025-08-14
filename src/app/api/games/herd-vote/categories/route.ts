import { NextResponse } from "next/server";
import data from "@/../content/sk/apps/herd-vote/kviz_questions.json";

export async function GET() {
  const all = (data as any[]).filter(Boolean);
  const map = new Map<string, number>();
  for (const q of all) {
    const theme = (q.theme || "Nezaradené") as string;
    map.set(theme, (map.get(theme) || 0) + 1);
  }
  const categories = Array.from(map.entries()).map(([name,count]) => ({ name, count }));
  return NextResponse.json({ categories });
}