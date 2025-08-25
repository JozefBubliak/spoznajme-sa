import { supabase } from '@/lib/supabase/client'
import type { WordVM } from '@/types/hadacka'

export class WordService {
  static async getWordsByCategories(categories: string[]): Promise<WordVM[]> {
    const query = supabase
      .from('had_words')
      .select('id, word, category_code, difficulty_level, mode_code')
    if (categories && categories.length > 0) {
      query.in('category_code', categories)
    }
    const { data, error } = await query
    if (error || !data) return []
    return data.map(w => ({
      id: String(w.id),
      word: w.word as string,
      categoryCode: w.category_code as string,
      difficultyLevel: w.difficulty_level as number,
      modeCode: w.mode_code as string,
    }))
  }

  static async getAvailableCategories(): Promise<Array<{ code: string; name: string }>> {
    const { data, error } = await supabase
      .from('had_categories')
      .select('code,name')
      .order('name')
    if (error || !data) return []
    return data.map(c => ({ code: c.code as string, name: c.name as string }))
  }

  static async getPacks(): Promise<Array<{ code: string; name: string; isPremium: boolean }>> {
    const { data, error } = await supabase
      .from('had_packs')
      .select('code,name,is_premium')
      .order('name')
    if (error || !data) return []
    return data.map(p => ({
      code: p.code as string,
      name: p.name as string,
      isPremium: !!p.is_premium,
    }))
  }
}

