import { Link } from 'react-router-dom'
import styles from './Footer.module.less'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>Ancaria</div>
          <p className={styles.tagline}>
            A proof-of-concept mod loader for Sacred Gold. Single-player only.
          </p>
        </div>

        <nav className={styles.column} aria-label="Site">
          <span className={styles.columnTitle}>Site</span>
          <Link to="/">Home</Link>
          <Link to="/players">For players</Link>
          <Link to="/mods">Mods</Link>
          <Link to="/developers">For developers</Link>
          <Link to="/how-it-works">How it works</Link>
        </nav>

        <nav className={styles.column} aria-label="Project">
          <span className={styles.columnTitle}>Project</span>
          <a href="https://github.com/ancaria-dev" target="_blank" rel="noreferrer">
            GitHub organisation
          </a>
          <a
            href="https://github.com/ancaria-dev/launcher/releases"
            target="_blank"
            rel="noreferrer"
          >
            Launcher releases
          </a>
          <a href="https://github.com/ancaria-dev/mods" target="_blank" rel="noreferrer">
            Mod repository
          </a>
        </nav>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Credits</span>
          <p className={styles.credits}>
            Built on reverse-engineering work from{' '}
            <a
              href="https://github.com/sonicmouse/SacredGameTools"
              target="_blank"
              rel="noreferrer"
            >
              SacredGameTools
            </a>{' '}
            and{' '}
            <a href="https://github.com/bssth/sacred-sdk" target="_blank" rel="noreferrer">
              sacred-sdk
            </a>
            , and on the modding community that keeps a 2004 game alive.
          </p>
        </div>
      </div>

      <div className={styles.legal}>
        <p>
          Ancaria is an independent, fan-made proof of concept. It isn’t affiliated with, endorsed
          by, or connected to Ascaron Entertainment, THQ Nordic, or any rights holder of Sacred or
          Sacred Gold. It requires a legally owned, installed copy of the game and ships no game
          files, executables, or DRM circumvention. It touches nothing on disk: hooks exist only in
          the running process and disappear when it exits. It targets single-player use only, with
          no multiplayer and no competitive advantage.
        </p>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} MairwunNx. Code under the{' '}
          <a
            href="https://github.com/ancaria-dev/site/blob/master/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            MIT License
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
