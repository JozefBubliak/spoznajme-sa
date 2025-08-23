// src/lib/logger.ts

/**
 * Development logger that no-ops in production.
 */
export const log = (...args: any[]): void => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args)
  }
}

