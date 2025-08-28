export function validateRounds(count: number): string | null {
  if (count < 1) return 'Musí byť aspoň 1 kolo'
  if (count > 10) return 'Maximálne 10 kôl'
  return null
}
