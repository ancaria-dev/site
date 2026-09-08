import { latestRelease } from '../../data/release.ts'
import { Button } from '../shared/Button.tsx'
import styles from './DownloadSection.module.less'

const steps = [
  {
    title: 'Drop it in',
    body: `Place ${latestRelease.fileName} in your Sacred Gold folder, next to the game executable.`,
  },
  {
    title: 'Run the launcher',
    body: 'It detects your game build, finds or fetches a JDK, and lists available mods.',
  },
  {
    title: 'Press Play',
    body: 'Tick the mods you want from the Available tab, then start the game as usual.',
  },
]

export function DownloadSection() {
  return (
    <section id="download" className={styles.section}>
      <div className={styles.panel}>
        <h2 className={styles.title}>Get the mod loader</h2>
        <p className={styles.subtitle}>
          One executable. No install wizard, no changes to your game files.
        </p>

        <div className={styles.actions}>
          <Button
            variant="primary"
            href={latestRelease.downloadUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download {latestRelease.fileName}
          </Button>
          <Button
            variant="ghost"
            href="https://github.com/ancaria-dev/launcher"
            target="_blank"
            rel="noreferrer"
          >
            Launcher source
          </Button>
        </div>

        <dl className={styles.meta}>
          <div>
            <dt>Version</dt>
            <dd>{latestRelease.version}</dd>
          </div>
          <div>
            <dt>SHA-256</dt>
            <dd className={styles.hash}>{latestRelease.sha256}</dd>
          </div>
        </dl>

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
