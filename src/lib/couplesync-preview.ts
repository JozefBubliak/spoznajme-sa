export const COUPLESYNC_PREVIEW_COOKIE = 'cs_preview'
export const COUPLESYNC_PREVIEW_MAX_AGE = 60 * 60 * 24 * 7

export function isCoupleSyncPreviewUnlocked(cookieValue: string | undefined): boolean {
  const expectedToken = process.env.COUPLESYNC_PREVIEW_TOKEN
  return Boolean(expectedToken && cookieValue === expectedToken)
}
