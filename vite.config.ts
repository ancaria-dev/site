import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { headTags, pageFor } from './src/data/pages.ts'

// index.html carries a <!--route-head--> marker instead of a title and
// description of its own, so src/data/pages.ts stays the only place those are
// written. This fills the marker with the front page's tags.
function routeHead(): Plugin {
  return {
    name: 'route-head',
    transformIndexHtml: (html) => html.replace('<!--route-head-->', headTags(pageFor('/'))),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeHead()],
  build: {
    target: 'es2023',
  },
})
