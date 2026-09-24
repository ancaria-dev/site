import { useLatestRelease } from '../../hooks/useLatestRelease.ts'
import { Button } from '../shared/Button.tsx'
import { RevealValue } from '../shared/RevealValue.tsx'
import { Shimmer } from '../shared/Shimmer.tsx'
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
      body: 'It finds your game build and Java, fetches a JDK if needed, and lists the mods.',
    },
    {
      title: 'Press Play',
      body: 'Tick the mods you want on the Available tab and start the game as usual.',
    },
  ]

  return (
    <section id="download" className={styles.section}>
      <div className={styles.panel}>
        <h2 className={styles.title}>Get the mod loader</h2>
        <p className={styles.subtitle}>
          One file. No installer, and your game files stay as they are.
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
            {release.loading ? (
              <dd>
                <Shimmer width="4.5em" label="Loading the version" />
              </dd>
            ) : (
              <dd className={release.version ? undefined : styles.pending}>
                {release.version ?? 'Unavailable'}
              </dd>
            )}
          </div>
          <div>
            <dt>SHA-256</dt>
            {release.loading ? (
              <dd>
                <Shimmer width="12em" label="Loading the SHA-256" />
              </dd>
            ) : release.sha256 ? (
              <dd>
                <RevealValue value={release.sha256} />
              </dd>
            ) : (
              <dd className={styles.pending}>Unavailable</dd>
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
