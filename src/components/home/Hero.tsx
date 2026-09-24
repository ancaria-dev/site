import { Button } from '../shared/Button.tsx'
import { GitHubIcon } from '../shared/icons/GitHubIcon.tsx'
import styles from './Hero.module.less'

export function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>A mod loader for Sacred Gold</p>
      <h1 className={styles.title}>Sacred Gold, twenty years later, modded again</h1>
      <p className={styles.lede}>
        Ancaria loads mods into Sacred Gold while the game runs. Pick mods in the launcher and
        press Play, or write your own in Java, Kotlin, or Groovy. Your game files stay untouched.
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
