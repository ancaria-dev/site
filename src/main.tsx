import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppErrorBoundary } from './components/shared/AppErrorBoundary.tsx'
import './lib/prismLanguages.ts'
import { routes } from './routes.tsx'
import './styles/global.less'

const container = document.getElementById('root')
if (!container) {
  throw new Error('#root element is missing from index.html')
}

const app = (
  <StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AppErrorBoundary>
  </StrictMode>
)

// A built page arrives already rendered by tools/prerender.mjs, so React takes
// over that markup instead of drawing it again. The dev server sends an empty
// root, which is rendered from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
