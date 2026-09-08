import { ModCard } from '../components/mods/ModCard.tsx'
import { Button } from '../components/shared/Button.tsx'
import { Callout } from '../components/shared/Callout.tsx'
import { CopyButton } from '../components/shared/CopyButton.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { modSubmissionUrl } from '../data/modSubmission.ts'
import { useModCatalog } from '../hooks/useModCatalog.ts'
import styles from './ModsPage.module.less'

export function ModsPage() {
  const catalog = useModCatalog()

  return (
    <>
      <PageHeader eyebrow="Mods" title="Every mod the platform team has confirmed">
        Pulled live from a short, built-in list of SRML repositories, the same layout the launcher
        itself reads.
      </PageHeader>

      <div className={styles.container}>
        <Callout label="Submission" tone="gold">
          <p>
            This list isn’t curated by hand here. It’s generated from{' '}
            <code>sacred.mods.repository.json</code> in each source repository below, the exact file
            the launcher’s Available tab reads, so this page and the launcher never disagree. Have a
            mod worth adding? Send it in below.
          </p>
        </Callout>

        {catalog.loading && <p className={styles.status}>Reading the mod catalogue…</p>}
        {!catalog.loading && catalog.error && (
          <p className={styles.status}>
            Couldn’t reach GitHub for the mod catalogue just now. Try again shortly, or browse{' '}
            <a href="https://github.com/ancaria-dev/mods" target="_blank" rel="noreferrer">
              the repository
            </a>{' '}
            directly.
          </p>
        )}

        {catalog.repositories.map((repository) => (
          <section key={repository.repo} className={styles.repository}>
            <div className={styles.repositoryHeading}>
              <h2>{repository.name}</h2>
              <a href={repository.url} target="_blank" rel="noreferrer">
                {repository.repo}
              </a>
            </div>
            <p className={styles.repositoryDescription}>{repository.description}</p>

            <div className={styles.grid}>
              {repository.mods.map((mod) => (
                <ModCard key={mod.id} mod={mod} rawBase={repository.rawBase} />
              ))}
            </div>

            <CopyButton value={`https://github.com/${repository.repo}.git`}>
              Copy this repository’s link to add it in the launcher
            </CopyButton>
          </section>
        ))}

        <section className={styles.submit}>
          <h2>Publish your own</h2>
          <p>
            Any Git repository with <code>sacred.mods.repository.json</code> at its root works in
            the launcher, whether or not it’s listed here. To ask for a place on this page, open a
            submission and the team will take a look.
          </p>
          <Button variant="primary" href={modSubmissionUrl} target="_blank" rel="noreferrer">
            Submit your mod
          </Button>
        </section>
      </div>
    </>
  )
}
