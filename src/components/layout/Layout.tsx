import { Outlet } from 'react-router-dom'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import styles from './Layout.module.less'
import { RouteHead } from './RouteHead.tsx'

export function Layout() {
  return (
    <div className={styles.shell}>
      <RouteHead />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
