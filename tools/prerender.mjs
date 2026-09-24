// Runs after both Vite builds (see "build" in package.json). It renders every
// route from the SSR bundle in dist-ssr/ into the client's dist/index.html and
// writes the result where Cloudflare's asset handling will look for it:
//
//   /             dist/index.html
//   /players      dist/players.html   (served at /players, no trailing slash)
//   anything else dist/404.html       (served with a 404 status)
//
// Pages that fetch at run time, the release and the mod catalogue, render their
// loading shimmers here. The browser fills them in after hydration.

import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist/`
const bundle = `${root}dist-ssr/`

const { render, headTags, pages, notFoundPage } = await import(
  new URL('../dist-ssr/entry-server.js', import.meta.url).href
)

const template = await readFile(`${dist}index.html`, 'utf8')
for (const marker of ['<!--route-head-->', '<div id="root"></div>']) {
  if (!template.includes(marker)) {
    throw new Error(`dist/index.html has no ${marker}`)
  }
}

async function write(page, renderPath, file) {
  const body = await render(renderPath)
  const html = template
    .replace('<!--route-head-->', headTags(page))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  await writeFile(`${dist}${file}`, html)
  console.log(`prerendered ${renderPath} -> dist/${file}`)
}

for (const page of pages) {
  await write(page, page.path, page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`)
}
// Any path the router does not know renders the catch-all route.
await write(notFoundPage, '/this-page-does-not-exist', '404.html')

await rm(bundle, { recursive: true, force: true })
