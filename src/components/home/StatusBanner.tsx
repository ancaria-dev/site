import { Callout } from '../shared/Callout.tsx'
import styles from './StatusBanner.module.less'

export function StatusBanner() {
  return (
    <section className={styles.wrap}>
      <Callout label="Proof of concept" tone="crimson">
        <p className={styles.text}>
          Ancaria is an experiment, not a finished product. It started with a question I couldn’t
          shake: could a 32-bit game from 2004 get a Forge-style mod loader? It could, and it runs
          today on one supported build of the game. Where it goes next depends on who shows up. If
          you loved Sacred, come and help.
        </p>
      </Callout>
    </section>
  )
}
