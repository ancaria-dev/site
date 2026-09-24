// The build-time side of the site. tools/prerender.mjs imports the SSR bundle
// of this file and writes one HTML file per route, so a crawler or a link
// preview that runs no JavaScript still gets the page's text and its own head.

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { AppErrorBoundary } from './components/shared/AppErrorBoundary.tsx'
import { origin } from './data/pages.ts'
import './lib/prismLanguages.ts'
import { routes } from './routes.tsx'

export { headTags, notFoundPage, origin, pages } from './data/pages.ts'

export async function render(path: string): Promise<string> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`${origin}${path}`))
  if (context instanceof Response) {
    throw new Error(`${path} answered with a redirect, not a page`)
  }
  const router = createStaticRouter(handler.dataRoutes, context)
  // hydrate={false}: no route has a loader, so there is no data to hand over,
  // and the script it would add has no counterpart in the client's tree.
  return renderToString(
    <StrictMode>
      <AppErrorBoundary>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </AppErrorBoundary>
    </StrictMode>,
  )
}
