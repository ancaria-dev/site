import { Link } from 'react-router-dom'
import ideaGutter from '../assets/screenshots/idea-gutter.webp'
import ideaRun from '../assets/screenshots/idea-run.webp'
import ideaSettings from '../assets/screenshots/idea-settings.webp'
import ideaWizard from '../assets/screenshots/idea-wizard.webp'
import { CodeBlock, type CodeTab } from '../components/shared/CodeBlock.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { RepositoryGrid } from '../components/shared/RepositoryGrid.tsx'
import { coveredEvents } from '../data/events.ts'
import { modAuthorRepositories, platformRepositories } from '../data/repositories.ts'
import styles from './DevelopersPage.module.less'

const scaffoldSample = `
$ coderpack new gold-rush --language kotlin
# writes build.gradle.kts, settings.gradle.kts, registry.toml,
# and src/main/kotlin/mods/goldrush/GoldRush.kt

$ cd gold-rush
$ ./gradlew assembleSacredMod
`.trim()

const gradleTabs: CodeTab[] = [
  {
    id: 'kotlin-dsl',
    label: 'build.gradle.kts',
    language: 'kotlin',
    code: `
plugins {
    id("dev.ancaria.coderpack") version "0.200.0"
}

version = "1.0.0"

sacred {
    id = "gold-rush"
    displayName = "Gold Rush"
    description = "Tops up every gold pickup by half again"
    entrypoint = "dev.ancaria.mod.goldrush.GoldRushMod"
    author("MairwunNx (Pavel Erokhin)")
    website = "https://ancaria.dev"
    repository = "https://github.com/me/gold-rush"
    apiVersion = "0.200.0"
    installTo = layout.dir(providers.gradleProperty("sacredDir").map { file("$it/mods") })
}
`.trim(),
  },
  {
    id: 'groovy-dsl',
    label: 'build.gradle',
    language: 'groovy',
    code: `
plugins {
    id 'dev.ancaria.coderpack' version '0.200.0'
}

version = '1.0.0'

sacred {
    id = 'gold-rush'
    displayName = 'Gold Rush'
    description = 'Tops up every gold pickup by half again'
    entrypoint = 'dev.ancaria.mod.goldrush.GoldRushMod'
    author('MairwunNx (Pavel Erokhin)')
    website = 'https://ancaria.dev'
    repository = 'https://github.com/me/gold-rush'
    apiVersion = '0.200.0'
    installTo = layout.dir(providers.gradleProperty('sacredDir').map { file("$it/mods") })
}
`.trim(),
  },
]

export function DevelopersPage() {
  return (
    <>
      <PageHeader eyebrow="For developers" title="Three ways to get involved">
        Write a mod in the IDE, create one from the terminal, or help build the loader itself.
      </PageHeader>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>With the IntelliJ IDEA plugin</h2>
          <p>
            Install{' '}
            <a
              href="https://plugins.jetbrains.com/plugin/34165-sacred-mod-development"
              target="_blank"
              rel="noreferrer"
            >
              Sacred Mod Development
            </a>{' '}
            from the JetBrains Marketplace, or search for it under Settings → Plugins.
          </p>
          <p>
            Then choose File → New → Project → Sacred Mod. The wizard asks for a name, a
            description, and a template: a bare entrypoint or one with a working listener. You also
            pick the mod’s language (Java, Kotlin, or Groovy) and the build script’s DSL (Kotlin or
            Groovy).
          </p>
          <p>
            The two choices are independent, so a Groovy mod can sit behind a Kotlin build script.
            The wizard can also run <code>git init</code> and set up an SRML repository, so a
            launcher can install the mod from day one.
          </p>
          <div className={styles.shots}>
            <figure className={styles.shot}>
              <img src={ideaWizard} alt="New Project wizard for a Sacred mod" />
              <figcaption>New Project wizard</figcaption>
            </figure>
            <figure className={styles.shot}>
              <img
                src={ideaGutter}
                alt="Gutter icons beside a SacredMod class and an @Subscribe method"
              />
              <figcaption>Gutter icons on the entrypoint and its listeners</figcaption>
            </figure>
            <figure className={styles.shot}>
              <img src={ideaSettings} alt="Sacred Mod Development settings page" />
              <figcaption>Settings → Tools → Sacred Mod Development</figcaption>
            </figure>
          </div>
          <p>
            A green Run Sacred configuration appears as soon as the plugin sees{' '}
            <code>dev.ancaria.coderpack</code> in your build script. It builds the mod and installs
            it into the Sacred Gold folder set in Settings. If the loader release isn’t cached yet,
            it downloads it and checks its SHA-256. Then it starts the game with your mod loaded.
          </p>
          <figure className={styles.shotWide}>
            <img src={ideaRun} alt="Run Sacred button in the IDE toolbar" />
            <figcaption>Run Sacred, one click from an open project</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>With the command line</h2>
          <p>
            <code>coderpack new</code> creates the same project from a terminal.{' '}
            <code>--language</code> picks Java, Kotlin, or Groovy, and <code>--dsl</code> picks the
            build script syntax. The two don’t have to match.
          </p>
          <p>
            Only Java adds no runtime. A Java mod stays around 1.8 KB, a Kotlin jar carries its
            standard library at about 1.8 MB, and Groovy’s runtime brings it to about 7.8 MB.
          </p>
          <p>
            A Kotlin project also gets <code>dev.ancaria.coderpack:api-kotlin</code>, the same API
            in Kotlin style. The event becomes a type argument instead of a class literal, and one{' '}
            <code>on</code> covers both watching and deciding. To change what the game is about to
            store, a listener calls <code>mutate</code>, which compiles only for events that can be
            decided.
          </p>
          <p>
            The module adds nothing the Java API can’t do—every declaration forwards to it—so a
            Kotlin mod can drop it and call the Java API directly. The Kotlin tab on the{' '}
            <Link to="/">front page</Link> uses it.
          </p>
          <CodeBlock code={scaffoldSample} language="bash" title="terminal" />
          <p>Both build scripts produce the same descriptor:</p>
          <CodeBlock tabs={gradleTabs} />
          <RepositoryGrid repositories={modAuthorRepositories} />
        </section>

        <section className={styles.section}>
          <h2>Covered events</h2>
          <p>
            These are all the events a mod can subscribe to in API 3. A mutable event arrives before
            the game commits the write, so a listener can return the event’s <code>Mutation</code>{' '}
            to veto it or change what gets stored. The rest report what already happened.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.events}>
              <thead>
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Game action</th>
                  <th scope="col">Mutable</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {coveredEvents.map((event) => (
                  <tr key={event.name}>
                    <th scope="row">
                      <code>{event.name}</code>
                    </th>
                    <td>{event.action}</td>
                    <td className={event.decides ? styles.mutable : styles.readOnly}>
                      {event.decides ? `Yes: ${event.decides}` : 'No'}
                    </td>
                    <td>{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            An event that no class covers yet arrives as <code>Unknown</code>, with its wire name
            and raw fields, so a tracer subscribed to <code>Event</code> still sees it. The full
            contract is in{' '}
            <a
              href="https://github.com/ancaria-dev/coderpack/blob/master/docs/EVENTS.md"
              target="_blank"
              rel="noreferrer"
            >
              coderpack’s EVENTS.md
            </a>
            .
          </p>
          <p>
            For anything that isn’t an event, <code>getContext().getGame()</code> acts on the game
            directly. <code>getWorld().getEntityRegistry().getPlayer()</code> returns the hero, and{' '}
            <code>getConsole().print("...")</code> writes a line to the in-game console.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Working on the platform</h2>
          <p>
            The loader has three parts: a Frida agent that hooks instructions inside the 32-bit
            game, a Rust host that carries frames between the game and the JVM, and the JVM that
            dispatches events to mods. Nothing patches the game on disk. How an event crosses that
            boundary and back is on the <Link to="/how-it-works">How it works</Link> page.
          </p>
          <p>
            Every hook and address needs evidence before it ships. Research on{' '}
            <code>pureHD.exe</code> relies on three tools: <strong>Cheat Engine</strong> to watch
            memory live and find candidate writers, a <strong>PE analysis kit</strong> (pefile and
            Capstone) for offline disassembly and string catalogues, and <strong>Ghidra</strong> for
            deeper static analysis and call graphs.
          </p>
          <p>
            A confirmed result moves from <code>research</code> into <code>mappings</code> as a VA,
            an RVA, and a confidence level. Shipping code never hard-codes an address.
          </p>
          <p>
            Why <code>pureHD.exe</code> 2.0.2.118 and not the stock <code>Sacred.exe</code>? The
            community pureHD mod fixes a long list of the original’s bugs, keeps Sacred’s balance
            and feel, and adds only what’s genuinely useful. That makes it the one build worth
            pinning every address to.
          </p>
          <p>
            If your folder has another build, the launcher tells you. It can fetch pureHD from{' '}
            <code>ancaria.dev/files/sacred.purehd.zip</code> and place <code>pureHD.exe</code> and{' '}
            <code>pHD.dll</code> next to the game, leaving the original executable alone.
          </p>
          <RepositoryGrid repositories={platformRepositories} />
        </section>
      </div>
    </>
  )
}
