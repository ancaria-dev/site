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
        No installer, no changes to your game files, nothing left behind if you delete the launcher.
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
            <li>Place it in your Sacred Gold folder, next to the game executable.</li>
            <li>
              Run it. The launcher tries <code>pureHD.exe</code>, <code>Sacred.exe</code>, then{' '}
              <code>Game.exe</code>, and reports which build it found before you press Play.
            </li>
            <li>
              It looks for a JDK 21 or newer in <code>launcher\java</code>, then{' '}
              <code>JAVA_HOME</code>, then <code>PATH</code>. If none qualifies, use the built-in
              Get Java to download one: it’s written only inside the game folder, and nothing is
              added to your system <code>PATH</code> or registry.
            </li>
          </ol>
        </section>

        <section className={styles.section}>
          <h2>Managing mods</h2>
          <p>
            The <strong>Available</strong> tab lists mods from the default Sacred Rune Mod List
            (SRML) repository. Tick the ones you want, and the launcher stages them into{' '}
            <code>&lt;Sacred Gold&gt;\mods</code> for you.
          </p>
          <p>
            You can also add a mod from any other open source by hand: drop its <code>.jar</code>{' '}
            file straight into <code>&lt;Sacred Gold&gt;\mods</code>, and it shows up the next time
            the launcher scans the folder.
          </p>
          <p>
            To follow a mod source other than the default one, add its repository URL in the
            launcher’s source settings. It merges into the Available list next to the default one,
            so nothing you’ve already installed is affected. The full catalogue lives on the{' '}
            <Link to="/mods">Mods</Link> page too.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What you need</h2>
          <ul>
            <li>A legally owned, installed copy of Sacred Gold.</li>
            <li>No pre-installed Java: the launcher can fetch a suitable JDK for you.</li>
            <li>
              Administrator rights, only if your game shortcut is already set to run elevated. The
              launcher then needs to match it to see the game process.
            </li>
          </ul>
        </section>

        <Callout label="Read before you play" tone="crimson">
          <p>
            Ancaria is built for single-player only. It ships no multiplayer features, no DRM
            circumvention, and no copy of the game itself. Hooks live only in the running process.
            Close the game, and it’s as if the loader was never there.
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
