import { supabase } from '@/lib/supabase/client'
import { asArray } from '@/lib/supabase/safe'
import type { WordVM } from '@/types/hadacka'
import { sampleWords } from '@/data/hadacka/sampleWords'
import { sampleCategories } from '@/data/hadacka/sampleCategories'

export class WordService {
  static async getWordsByCategories(categories: string[]): Promise<WordVM[]> {
    try {
        const query = supabase
          .from('had_words')
          .select('id, word, category_code, difficulty_level, mode_code, category:had_categories(name)')
        if (categories.length > 0) {
          query.in('category_code', categories)
        }
      const { data, error } = await query
      if (error) throw error
        const words = asArray(data).map(w => {
          const catName = (w as { category?: { name?: string } }).category?.name
          return {
            id: String(w.id),
            word: w.word as string,
            categoryCode: w.category_code as string,
            ...(typeof catName === 'string' ? { categoryName: catName } : {}),
            difficultyLevel: w.difficulty_level as number,
            modeCode: w.mode_code as string,
          }
        })
      if (words.length > 0) return words
      // fallthrough to sample data if no words returned
      throw new Error('No words returned from supabase')
    } catch (error) {
      console.warn('Using sample words due to fetch error:', error)
      return sampleWords.filter(w =>
        categories.length === 0 || categories.includes(w.categoryCode)
      )
    }
  }

  static async getAvailableCategories(): Promise<Array<{ code: string; name: string }>> {
    try {
      const { data, error } = await supabase
        .from('had_categories')
        .select('code,name')
        .order('name')
      if (error) throw error
      const categories = asArray(data).map(c => ({ code: c.code as string, name: c.name as string }))
      if (categories.length > 0) return categories
      throw new Error('No categories returned from supabase')
    } catch (error) {
      console.warn('Using sample categories due to fetch error:', error)
      return sampleCategories
    }
  }

  static async getPacks(): Promise<Array<{ code: string; name: string; isPremium: boolean }>> {
      const { data, error } = await supabase
        .from('had_packs')
        .select('code,name,is_premium')
        .order('name')
      if (error) throw error
      return asArray(data).map(p => ({
      code: p.code as string,
      name: p.name as string,
      isPremium: !!p.is_premium,
    }))
  }
}

