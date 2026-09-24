import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { headTags, pageFor } from './src/data/pages.ts'

// index.html carries a <!--route-head--> marker instead of a title and
// description of its own, so src/data/pages.ts stays the only place those are
// written. On the dev server this fills the marker with the front page's tags.
// A build leaves it in place for tools/prerender.mjs, which fills it per route.
function routeHead(): Plugin {
  return {
    name: 'route-head',
    apply: 'serve',
    transformIndexHtml: (html) => html.replace('<!--route-head-->', headTags(pageFor('/'))),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeHead()],
  build: {
    target: 'es2023',
  },
  ssr: {
    // prismjs' grammar files are scripts that patch a global Prism, which
    // lib/prismGlobal.ts sets first. Left external, Node would load them
    // before any bundled code ran, and they would find no Prism at all.
    noExternal: ['prismjs'],
  },
})
