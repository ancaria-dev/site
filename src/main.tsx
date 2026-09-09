import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppErrorBoundary } from './components/shared/AppErrorBoundary.tsx'
import './lib/prismLanguages.ts'
import { router } from './router.tsx'
import './styles/global.less'

const container = document.getElementById('root')
if (!container) {
  throw new Error('#root element is missing from index.html')
}

createRoot(container).render(
  <StrictMode>
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  </StrictMode>,
)
