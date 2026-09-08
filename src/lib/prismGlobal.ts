import { Prism } from 'prism-react-renderer'

// prismjs' own language component files are plain scripts written against
// a bare global `Prism`, not an import -- this is what they patch.
// biome-ignore lint/suspicious/noExplicitAny: matches prismjs' own untyped global
;(globalThis as any).Prism = Prism
