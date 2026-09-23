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
        Write a mod against a stable API, scaffold one from a terminal, or help build the loader
        underneath both.
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
            from the JetBrains Marketplace, or find it by name under Settings → Plugins.
          </p>
          <p>
            The fastest way in: File → New → Project → Sacred Mod. The wizard asks for a name, a
            description, a template (a bare entrypoint, or one with a working listener already wired
            up), which of Java, Kotlin, or Groovy to write the mod in, and whether the build script
            itself should be Kotlin DSL or Groovy DSL. Those two choices are independent, so a
            Groovy mod can sit behind a Kotlin build script or the other way around. It can also run{' '}
            <code>git init</code> and lay down an SRML repository, so the project is installable
            from a launcher the moment it exists.
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
            A green Run Sacred configuration shows up the moment the plugin sees{' '}
            <code>dev.ancaria.coderpack</code> in your build script. It builds the mod, installs it
            into the Sacred Gold folder from Settings, downloads and SHA-256-verifies the loader
            release if it isn’t cached yet, then starts the game with your mod already in it.
          </p>
          <figure className={styles.shotWide}>
            <img src={ideaRun} alt="Run Sacred button in the IDE toolbar" />
            <figcaption>Run Sacred, one click from an open project</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>With the command line</h2>
          <p>
            <code>coderpack new</code> writes the same project the wizard does, for a terminal
            instead of an IDE. <code>--language</code> picks Java, Kotlin, or Groovy;{' '}
            <code>--dsl</code> picks the build script syntax; the two never have to match. Only Java
            ships with no extra runtime: a generated Kotlin jar carries its standard library at
            around 1.8 MB, Groovy’s runtime pushes that to about 7.8 MB, and a Java mod stays close
            to 1.8 KB.
          </p>
          <p>
            A Kotlin project also gets <code>dev.ancaria.coderpack:api-kotlin</code>, the same
            loader API said in Kotlin. The event becomes a type argument instead of a class literal,
            and one <code>on</code> covers both watching and deciding: a listener that wants to
            change what the game is about to store says so with <code>mutate</code>, which only
            compiles for an event that can be decided. It adds nothing the Java API cannot do —
            every declaration in it forwards to one — so a Kotlin mod can drop the dependency and
            call the Java API directly. The Kotlin tab on the <Link to="/">front page</Link> is
            written with it.
          </p>
          <CodeBlock code={scaffoldSample} language="bash" title="terminal" />
          <p>Either build script fills in the same descriptor:</p>
          <CodeBlock tabs={gradleTabs} />
          <RepositoryGrid repositories={modAuthorRepositories} />
        </section>

        <section className={styles.section}>
          <h2>Covered Events</h2>
          <p>
            Every event a mod can subscribe to in API 3. A mutable event is asked before the game
            commits the write, so a listener can return that event’s <code>Mutation</code> to veto
            it or change what gets stored. Everything else reports what already happened.
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
            A wire event no class covers yet arrives as <code>Unknown</code>, with its wire name and
            raw fields, so a tracer that subscribes to <code>Event</code> still sees it. The full
            contract is in{' '}
            <a
              href="https://github.com/ancaria-dev/coderpack/blob/master/docs/EVENTS.md"
              target="_blank"
              rel="noreferrer"
            >
              coderpack’s EVENTS.md
            </a>
            . For anything that is not an event, <code>getContext().getGame()</code> acts on the
            game directly: <code>getWorld().getEntityRegistry().getPlayer()</code> is the hero, and{' '}
            <code>getConsole().print("...")</code> writes a line to the in-game console.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Working on the platform</h2>
          <p>
            The loader itself is three processes talking to each other: a Frida agent hooking
            instructions inside the 32-bit game, a Rust host carrying frames between the game and
            the JVM, and the JVM dispatching events to mods. None of it patches the game on disk;
            every hook exists only in the running process. The full mechanics of how an event
            crosses that boundary and back are on the <Link to="/how-it-works">How it works</Link>{' '}
            page.
          </p>
          <p>
            Every hook and address is validated evidence before it ships. Contributors researching{' '}
            <code>pureHD.exe</code> lean on three tools: <strong>Cheat Engine</strong> to watch
            memory live and locate candidate writers, a <strong>PE analysis kit</strong> (pefile and
            Capstone) for offline disassembly and string cataloguing, and <strong>Ghidra</strong>{' '}
            for deeper static analysis and cross-referencing call graphs. A confirmed result moves
            from <code>research</code> into <code>mappings</code> as a VA, an RVA, and a confidence
            level: shipping code never hard-codes an address directly.
          </p>
          <RepositoryGrid repositories={platformRepositories} />
        </section>
      </div>
    </>
  )
}
