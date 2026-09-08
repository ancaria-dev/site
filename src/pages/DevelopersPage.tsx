import { CodeBlock } from '../components/shared/CodeBlock.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { RepositoryGrid } from '../components/shared/RepositoryGrid.tsx'
import { modAuthorRepositories, platformRepositories } from '../data/repositories.ts'
import styles from './DevelopersPage.module.less'

const scaffoldSample = `
$ coderpack new gold-rush --template kotlin

$ cat gold-rush/build.gradle.kts
plugins {
    id("dev.ancaria.build") version "0.99.0"
}

sacredMod {
    id.set("gold-rush")
    displayName.set("Gold Rush")
}
`.trim()

export function DevelopersPage() {
  return (
    <>
      <PageHeader eyebrow="For Developers" title="Two ways to get involved">
        Write a mod against a stable API, or help build the loader that runs it.
      </PageHeader>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Writing mods</h2>
          <p>
            Mods are Kotlin or Java compiled against <code>coderpack</code>'s event API and run
            inside a JVM the launcher starts alongside the game. There is no bytecode weaving and no
            manual memory offsets in your code -- you annotate a method, the loader calls it when
            the matching event fires.
          </p>
          <p>
            Scaffold a project with the <code>coderpack</code> command line, or with the New Project
            wizard in the <code>idea</code> IntelliJ plugin, which wires up the same template. The{' '}
            <code>build</code> Gradle plugin then compiles, lints, and packages the jar into the
            shape the launcher expects.
          </p>
          <CodeBlock code={scaffoldSample} language="bash" title="terminal" />
          <RepositoryGrid repositories={modAuthorRepositories} />
        </section>

        <section className={styles.section}>
          <h2>Working on the platform</h2>
          <p>
            The loader itself is three processes talking to each other: a Frida agent hooking
            instructions inside the 32-bit game, a Rust host carrying frames between the game and
            the JVM, and the JVM dispatching events to mods. None of it patches the game on disk --
            every hook exists only in the running process.
          </p>
          <p>
            Every hook and address is validated evidence before it ships. Contributors researching
            <code> pureHD.exe</code> lean on three tools: <strong>Cheat Engine</strong> to watch
            memory live and locate candidate writers, a <strong>PE analysis kit</strong> (pefile and
            Capstone) for offline disassembly and string cataloguing, and <strong>Ghidra</strong>{' '}
            for deeper static analysis and cross-referencing call graphs. A confirmed result moves
            from <code>research</code> into <code>mappings</code> as a VA, an RVA, and a confidence
            level -- shipping code never hard-codes an address directly.
          </p>
          <RepositoryGrid repositories={platformRepositories} />
        </section>
      </div>
    </>
  )
}
