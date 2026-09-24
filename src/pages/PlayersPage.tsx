import { Link } from 'react-router-dom'
import { Button } from '../components/shared/Button.tsx'
import { Callout } from '../components/shared/Callout.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { useLatestRelease } from '../hooks/useLatestRelease.ts'
import styles from './PlayersPage.module.less'

export function PlayersPage() {
  const release = useLatestRelease()

  return (
    <>
      <PageHeader eyebrow="For players" title="Install it, then pick your mods">
        No installer, and your game files stay untouched. Everything the launcher adds lives inside
        the game folder.
      </PageHeader>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Install</h2>
          <ol className={styles.steps}>
            <li>
              Download <code>{release.fileName}</code> from the{' '}
              <a href={release.downloadUrl} target="_blank" rel="noreferrer">
                launcher releases
              </a>
              .
            </li>
            <li>Put it in your Sacred Gold folder, next to the game’s executable.</li>
            <li>
              Run it. The launcher looks for <code>pureHD.exe</code>, <code>Sacred.exe</code>, or{' '}
              <code>Game.exe</code> and shows which build it found before you press Play.
            </li>
            <li>
              Mods need Java 21 or newer. The launcher checks <code>launcher\java</code>, then{' '}
              <code>JAVA_HOME</code>, then <code>PATH</code>. If nothing fits, Get Java downloads a
              JDK into the game folder. Your system <code>PATH</code> and registry stay untouched.
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Managing mods</h2>
          <p>
            The <strong>Available</strong> tab lists mods from the default mod repository. Tick the
            ones you want, and the launcher installs them into <code>&lt;Sacred Gold&gt;\mods</code>
            .
          </p>
          <p>
            Got a mod as a <code>.jar</code> file? Drop it into{' '}
            <code>&lt;Sacred Gold&gt;\mods</code>, and it appears on the <strong>Installed</strong>{' '}
            tab.
          </p>
          <p>
            To follow another mod repository, add its link in the launcher. Its mods join the
            Available list next to the default ones, and nothing you’ve installed changes. The{' '}
            <Link to="/mods">Mods</Link> page lists the whole catalogue as well.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What you need</h2>
          <ul>
            <li>Your own legally owned, installed copy of Sacred Gold.</li>
            <li>No Java up front: the launcher can fetch a suitable JDK for you.</li>
            <li>
              Administrator rights, but only if your game already runs elevated. The launcher has to
              match it to see the game process.
            </li>
          </ul>
        </section>

        <Callout label="Read before you play" tone="crimson">
          <p>
            Ancaria is for single-player only. It has no multiplayer features, no DRM circumvention,
            and no copy of the game. Its hooks live only in the running game. Close the game, and
            it’s as if the loader was never there.
          </p>
        </Callout>

        <div className={styles.cta}>
          <Button variant="primary" href={release.downloadUrl} target="_blank" rel="noreferrer">
            Download {release.fileName}
          </Button>
        </div>
      </div>
    </>
  )
}
