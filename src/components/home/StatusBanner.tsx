import { Callout } from '../shared/Callout.tsx'
import styles from './StatusBanner.module.less'

export function StatusBanner() {
  return (
    <section className={styles.wrap}>
      <Callout label="Proof of concept" tone="crimson">
        <p className={styles.text}>
          Ancaria is an experiment, not a finished product. It started as a personal question --
          whether a Forge-style mod loader was even possible for a 32-bit, twenty-year-old Windows
          game -- and grew into eight repositories covering address research, the in-process hooks,
          the host process, the Java API, and the tooling around it. Everything here works today, on
          one supported build of the game, and the project is still shaped by whoever shows up to
          use it. If you loved Sacred, this is an invitation to help find out whether that love can
          outlive the original release.
        </p>
      </Callout>
    </section>
  )
}
