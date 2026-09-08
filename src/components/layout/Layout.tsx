import { Outlet } from 'react-router-dom'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import styles from './Layout.module.less'

export function Layout() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
