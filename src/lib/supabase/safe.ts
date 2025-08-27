export function asArray<T>(data: T[] | null | undefined): T[] {
  return Array.isArray(data) ? data : [];
}

export function must<T>(data: T | null | undefined, msg = 'Not found'): T {
  if (data == null) throw new Error(msg);
  return data;
}
