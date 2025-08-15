// src/types/fix-page-props.d.ts
// Prebije zlú definíciu, kde bolo \params: Promise<any>\.
// Správne: params je obyčajný objekt, NIE Promise.
declare global {
  type PageProps<P = unknown> = {
    params: P
  }
}
export {}