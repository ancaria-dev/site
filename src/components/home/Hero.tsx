import { Button } from '../shared/Button.tsx'
import { GitHubIcon } from '../shared/icons/GitHubIcon.tsx'
import styles from './Hero.module.less'

export function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Ancaria for Developers</p>
      <h1 className={styles.title}>Sacred Gold, twenty years later, modded again</h1>
      <p className={styles.lede}>
        A proof-of-concept mod-loading ecosystem for Sacred Gold. Write mods in Kotlin or Java
        against an event API, run them alongside the game, and never touch a single file on disk.
      </p>
      <div className={styles.actions}>
        <Button variant="primary" href="#download">
          Download the launcher
        </Button>
        <Button
          variant="ghost"
          href="https://github.com/ancaria-dev"
          target="_blank"
          rel="noreferrer"
          icon={<GitHubIcon />}
        >
          View the organisation
        </Button>
      </div>
    </section>
  )
}
