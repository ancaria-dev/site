import { NavLink } from 'react-router-dom'
import sacredLogo from '../../assets/sacred-logo.webp'
import { GitHubIcon } from '../shared/icons/GitHubIcon.tsx'
import styles from './Header.module.less'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.linkActive}` : styles.link

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <NavLink to="/" className={styles.brand}>
          <img className={styles.brandMark} src={sacredLogo} alt="" />
          <span className={styles.brandName}>Ancaria</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Primary">
          <NavLink to="/" end className={navLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/players" className={navLinkClassName}>
            For players
          </NavLink>
          <NavLink to="/mods" className={navLinkClassName}>
            Mods
          </NavLink>
          <NavLink to="/developers" className={navLinkClassName}>
            For developers
          </NavLink>
          <NavLink to="/how-it-works" className={navLinkClassName}>
            How it works
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
