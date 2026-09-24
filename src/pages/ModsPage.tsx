import { ModCard, ModCardPlaceholder } from '../components/mods/ModCard.tsx'
import { Button } from '../components/shared/Button.tsx'
import { Callout } from '../components/shared/Callout.tsx'
import { CopyButton } from '../components/shared/CopyButton.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { Shimmer } from '../components/shared/Shimmer.tsx'
import { modSubmissionUrl } from '../data/modSubmission.ts'
import { useModCatalog } from '../hooks/useModCatalog.ts'
import styles from './ModsPage.module.less'

// The default repository ships four mods, so four placeholders fill the grid
// about as much as the real cards will.
const placeholderKeys = ['a', 'b', 'c', 'd']

export function ModsPage() {
  const catalog = useModCatalog()

  return (
    <>
      <PageHeader eyebrow="Mods" title="Mods you can install">
        Read live from the same repository index the launcher uses.
      </PageHeader>

      <div className={styles.container}>
        <Callout label="Submission" tone="gold">
          <p>
            I don’t edit this list by hand. The page reads <code>sacred.mods.repository.json</code>{' '}
            from each repository below, the same file the launcher’s Available tab reads, so the two
            always agree. Have a mod worth adding? Submit it below.
          </p>
        </Callout>

        {catalog.loading && (
          <section
            className={styles.repository}
            role="status"
            aria-label="Loading the mod catalogue"
          >
            <Shimmer width="12em" height="1.3em" />
            <Shimmer width="70%" />
            <div className={styles.grid}>
              {placeholderKeys.map((key) => (
                <ModCardPlaceholder key={key} />
              ))}
            </div>
          </section>
        )}
        {!catalog.loading && catalog.error && (
          <p className={styles.status}>
            Couldn’t reach GitHub for the mod catalogue. Try again in a moment, or browse{' '}
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
            the launcher, listed here or not. To get your repository on this page, open a
            submission, and I’ll take a look.
          </p>
          <Button variant="primary" href={modSubmissionUrl} target="_blank" rel="noreferrer">
            Submit your mod
          </Button>
        </section>
      </div>
    </>
  )
}
