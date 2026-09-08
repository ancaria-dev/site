// prism-react-renderer only bundles a curated subset of Prism's grammars,
// and it has no Java, Groovy, or Bash. Point prismjs' own component files at
// prism-react-renderer's Prism instance (./prismGlobal.ts) and load the
// missing grammars from prismjs itself, which registers them onto the same
// `Prism.languages` object `<Highlight>` reads from.
import './prismGlobal.ts'
import 'prismjs/components/prism-clike.js'
import 'prismjs/components/prism-java.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-groovy.js'
