export function validateName(name: string): string | null {
  if (!name) return 'Meno je povinné'
  if (name.length < 2) return 'Meno musí mať aspoň 2 znaky'
  if (name.length > 32) return 'Meno je príliš dlhé'
  return null
}
