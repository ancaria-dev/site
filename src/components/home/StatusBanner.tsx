import { Callout } from '../shared/Callout.tsx'
import styles from './StatusBanner.module.less'

export function StatusBanner() {
  return (
    <section className={styles.wrap}>
      <Callout label="Proof of concept" tone="crimson">
        <p className={styles.text}>
          Ancaria is an experiment, not a finished product. It started as a question that wouldn’t
          leave me alone: could a Forge-style mod loader work on a 32-bit, twenty-year-old Windows
          game? It could, and answering that grew into eight repositories: address research,
          in-process hooks, the host process, the Java API, and the tooling around all of it.
          Everything here runs today, on one supported build of the game. Where it goes next depends
          on whoever shows up to use it. If you loved Sacred, come help find out whether that love
          outlives the original release.
        </p>
      </Callout>
    </section>
  )
}
