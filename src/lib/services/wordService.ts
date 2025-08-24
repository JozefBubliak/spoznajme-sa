import { supabase } from '@/lib/supabase/client'
import type { WordVM } from '@/types/hadacka'

// Fallback local data for development/offline use
const FALLBACK_WORDS: WordVM[] = [
  { id: '1', word: 'Pes', categoryCode: 'zvierata', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '2', word: 'Telefón', categoryCode: 'technologie', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '3', word: 'Pizza', categoryCode: 'jedlo', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '4', word: 'Auto', categoryCode: 'doprava', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '5', word: 'Kniha', categoryCode: 'vzdelanie', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '6', word: 'Futbal', categoryCode: 'sport', difficultyLevel: 1, modeCode: 'pantomima' },
  { id: '7', word: 'Kvetina', categoryCode: 'priroda', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '8', word: 'Počítač', categoryCode: 'technologie', difficultyLevel: 2, modeCode: 'opis-tabu' },
  { id: '9', word: 'Vlak', categoryCode: 'doprava', difficultyLevel: 1, modeCode: 'pantomima' },
  { id: '10', word: 'Syr', categoryCode: 'jedlo', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '11', word: 'Lietadlo', categoryCode: 'doprava', difficultyLevel: 2, modeCode: 'opis-tabu' },
  { id: '12', word: 'Gitara', categoryCode: 'hudba', difficultyLevel: 1, modeCode: 'pantomima' },
  { id: '13', word: 'Čokoláda', categoryCode: 'jedlo', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '14', word: 'Kino', categoryCode: 'zábava', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '15', word: 'Hokej', categoryCode: 'sport', difficultyLevel: 1, modeCode: 'pantomima' },
  { id: '16', word: 'Slnko', categoryCode: 'priroda', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '17', word: 'Škola', categoryCode: 'vzdelanie', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '18', word: 'Káva', categoryCode: 'nápoje', difficultyLevel: 1, modeCode: 'opis-tabu' },
  { id: '19', word: 'Tanec', categoryCode: 'zábava', difficultyLevel: 1, modeCode: 'pantomima' },
  { id: '20', word: 'Mobil', categoryCode: 'technologie', difficultyLevel: 1, modeCode: 'opis-tabu' },
]

export class WordService {
  static async getWordsByCategories(categories: string[]): Promise<WordVM[]> {
    try {
      // Since the database doesn't have the expected tables yet, use fallback data
      console.info('Using fallback words data (database tables not available)')
      return this.getFallbackWords(categories)
    } catch (error) {
      console.error('Error fetching words from Supabase:', error)
      return this.getFallbackWords(categories)
    }
  }

  static getFallbackWords(categories?: string[]): WordVM[] {
    if (!categories || categories.length === 0) {
      return FALLBACK_WORDS
    }

    return FALLBACK_WORDS.filter(word => 
      categories.includes(word.categoryCode) || 
      categories.includes('všeobecné')
    )
  }

  static async getAvailableCategories(): Promise<Array<{ code: string; name: string }>> {
    try {
      // Since the database doesn't have the expected tables yet, use fallback data
      console.info('Using fallback categories data (database tables not available)')
      return this.getFallbackCategories()
    } catch (error) {
      console.error('Error fetching categories:', error)
      return this.getFallbackCategories()
    }
  }

  static getFallbackCategories(): Array<{ code: string; name: string }> {
    return [
      { code: 'všeobecné', name: 'Všeobecné' },
      { code: 'zvierata', name: 'Zvieratá' },
      { code: 'jedlo', name: 'Jedlo a nápoje' },
      { code: 'sport', name: 'Šport' },
      { code: 'technologie', name: 'Technológie' },
      { code: 'zábava', name: 'Zábava' },
      { code: 'priroda', name: 'Príroda' },
      { code: 'doprava', name: 'Doprava' },
      { code: 'hudba', name: 'Hudba' },
      { code: 'vzdelanie', name: 'Vzdelávanie' },
    ]
  }

  static async getPacks(): Promise<Array<{ code: string; name: string; isPremium: boolean }>> {
    try {
      // Since the database doesn't have the expected tables yet, use fallback data
      console.info('Using fallback packs data (database tables not available)')
      return this.getFallbackPacks()
    } catch (error) {
      console.error('Error fetching packs:', error)
      return this.getFallbackPacks()
    }
  }

  static getFallbackPacks(): Array<{ code: string; name: string; isPremium: boolean }> {
    return [
      { code: 'starter', name: 'Základný balíček', isPremium: false },
      { code: 'family', name: 'Rodinný balíček', isPremium: true },
      { code: 'party', name: 'Party balíček', isPremium: true },
    ]
  }
}