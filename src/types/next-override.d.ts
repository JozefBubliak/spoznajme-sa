import 'next'
declare module 'next' {
  export type PageProps<P = unknown> = { params: P }
}
