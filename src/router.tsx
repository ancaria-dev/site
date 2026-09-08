import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/layout/Layout.tsx'
import { DevelopersPage } from './pages/DevelopersPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PlayersPage } from './pages/PlayersPage.tsx'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/players', element: <PlayersPage /> },
      { path: '/developers', element: <DevelopersPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
