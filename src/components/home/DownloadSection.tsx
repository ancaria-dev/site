import { useLatestRelease } from '../../hooks/useLatestRelease.ts'
import { Button } from '../shared/Button.tsx'
import { RevealValue } from '../shared/RevealValue.tsx'
import styles from './DownloadSection.module.less'

export function DownloadSection() {
  const release = useLatestRelease()

  const steps = [
    {
      title: 'Drop it in',
      body: `Place ${release.fileName} in your Sacred Gold folder, next to the game executable.`,
    },
    {
      title: 'Run the launcher',
      body: 'It detects your game build, finds or fetches a JDK, and lists available mods.',
    },
    {
      title: 'Press play',
      body: 'Tick the mods you want from the Available tab, then start the game as usual.',
    },
  ]

  return (
    <section id="download" className={styles.section}>
      <div className={styles.panel}>
        <h2 className={styles.title}>Get the mod loader</h2>
        <p className={styles.subtitle}>
          One executable. No install wizard, no changes to your game files.
        </p>

        <div className={styles.actions}>
          <Button variant="primary" href={release.downloadUrl} target="_blank" rel="noreferrer">
            Download {release.fileName}
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
            <dd>{release.version}</dd>
          </div>
          <div>
            <dt>SHA-256</dt>
            {release.sha256 ? (
              <dd>
                <RevealValue value={release.sha256} />
              </dd>
            ) : (
              <dd className={styles.hashPending}>{release.loading ? 'Reading…' : 'Unavailable'}</dd>
            )}
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
