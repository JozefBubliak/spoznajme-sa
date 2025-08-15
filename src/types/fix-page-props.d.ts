// src/types/fix-page-props.d.ts
// Prebije zlú definíciu, kde bolo `params: Promise<any>`
// Správne: `params` je obyčajný objekt, NIE Promise.
declare global {
  // ak niekde máš iný export s týmto názvom, táto deklarácia ho prepíše
  type PageProps<P = unknown> = {
    params: P
  }
}

// musí tu byť aspoň 1 export, aby sa súbor bral ako modul
export {}
