import { NavLink } from 'react-router-dom'
import { GitHubIcon } from '../shared/icons/GitHubIcon.tsx'
import styles from './Header.module.less'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.linkActive}` : styles.link

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandRune} aria-hidden="true" />
          <span className={styles.brandName}>Ancaria</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/players" className={navLinkClassName}>
            For Players
          </NavLink>
          <NavLink to="/developers" className={navLinkClassName}>
            For Developers
          </NavLink>
        </nav>

        <a
          className={styles.github}
          href="https://github.com/ancaria-dev"
          target="_blank"
          rel="noreferrer"
          aria-label="ancaria-dev on GitHub"
        >
          <GitHubIcon />
        </a>
      </div>
    </header>
  )
}
