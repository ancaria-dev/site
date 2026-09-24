import type { RouteObject } from 'react-router-dom'
import { Layout } from './components/layout/Layout.tsx'
import { DevelopersPage } from './pages/DevelopersPage.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { HowItWorksPage } from './pages/HowItWorksPage.tsx'
import { ModsPage } from './pages/ModsPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PlayersPage } from './pages/PlayersPage.tsx'

const pageRoutes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/players', element: <PlayersPage /> },
  { path: '/mods', element: <ModsPage /> },
  { path: '/developers', element: <DevelopersPage /> },
  { path: '/how-it-works', element: <HowItWorksPage /> },
  { path: '*', element: <NotFoundPage /> },
]

// Plain route objects, so the browser router (main.tsx) and the build-time
// prerender (entry-server.tsx) render exactly the same tree.
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    // Two levels on purpose. A page that throws is caught by its own boundary
    // and rendered inside the shell, so the header and footer stay usable. A
    // header or footer that throws escapes to the layout boundary, which
    // replaces the broken shell instead of trying to render it again.
    errorElement: <ErrorPage />,
    children: pageRoutes.map((page) => ({ ...page, errorElement: <ErrorPage /> })),
  },
]
