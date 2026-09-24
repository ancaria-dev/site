import { Link } from 'react-router-dom'
import { Callout } from '../components/shared/Callout.tsx'
import { CodeBlock } from '../components/shared/CodeBlock.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import styles from './HowItWorksPage.module.less'

const frameSample = `
ASK 7 gold.delta delta=40 current=1180 dir=gain
END 7 set.delta=60
`.trim()

export function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="How it works" title="How an event reaches a mod, and travels back">
        Sacred Gold is a 32-bit game from 2004, and mods run in a 64-bit JVM. Everything on this
        page bridges that gap.
      </PageHeader>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Two processes, one wire</h2>
          <p>
            A 64-bit JVM can’t load into a 32-bit process, so mods never run inside the game. A Rust
            host starts a JVM next to Sacred Gold and injects a Frida agent into the game.
          </p>
          <p>
            The three pieces talk in a strict line. The agent hooks x86 instructions and reports
            what it sees to the host. The host passes it to the JVM as short text frames over a pair
            of named pipes. The agent never talks to the JVM directly.
          </p>
          <p>
            Frames have a channel of their own, so a mod can’t break it by printing.{' '}
            <code>System.out</code> still ends up in the host console, but{' '}
            <code>getContext().log()</code> is the better habit: it tags each line with the mod’s id
            and appends it to <code>logs/mods.log</code> in the game folder.
          </p>
          <p>
            The idea of reaching into a running program instead of its files owes something to{' '}
            <a href="https://github.com/SpongePowered/Mixin" target="_blank" rel="noreferrer">
              SpongePowered’s Mixin
            </a>
            , which rewrites JVM bytecode as classes load. Sacred Gold has no JVM to weave into, so
            Frida patches x86 instructions in the native process instead.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What crosses the wire</h2>
          <p>
            Seven frame types cover everything. <code>EVT</code> reports something that already
            happened and expects no reply: a level-up, a death, gold changing hands.{' '}
            <code>ASK</code> comes from a hook placed before the game commits a write, and the game
            thread waits for the answer.
          </p>
          <p>
            <code>END</code> answers an <code>ASK</code>: let the write through, cancel it, or
            replace one of its fields. <code>CMD</code> and <code>RES</code> let a mod ask the game
            a question instead of only reacting. <code>LOG</code> and <code>BYE</code> complete the
            set.
          </p>
          <CodeBlock code={frameSample} language="bash" title="a gold pickup, boosted" />
          <p>
            Here a mod rewrites one field. The <code>ASK</code> carries the pickup, the{' '}
            <code>END</code> raises the delta from 40 to 60, and the game computes the new total
            itself. A <code>Gold</code> listener asks for exactly this when it returns{' '}
            <code>Gold.Mutation.change(60)</code>, like the Kotlin example on the{' '}
            <Link to="/">home page</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <Callout label="Timing" tone="gold">
            <p>
              An <code>ASK</code> stops the game thread, so it can’t wait forever. The host gives
              each <code>ASK</code> 250 ms, and a watchdog checks every 125 ms. An unanswered ask
              therefore resolves 250 to 375 ms after it was sent, plus scheduling delay. After that,
              the host answers for the mod, and the original value goes through unchanged. Treat 250
              ms as a target, not a guarantee, and keep vetoable handlers well under it.
            </p>
          </Callout>
        </section>

        <section className={styles.section}>
          <h2>Priority and vetoes</h2>
          <p>
            Events are read-only. A listener that wants a different outcome returns a mutation: a
            new value, a veto, a reset to the game’s own number, or nothing. The loader applies each
            answer before the next listener runs, so <code>getValue()</code> always shows the result
            so far. Two mods that double the same gain make it four times as large.
          </p>
          <p>
            Listeners run in a fixed order: <code>FIRST</code>, <code>NORMAL</code>,{' '}
            <code>LAST</code>, then <code>MONITOR</code>. A veto doesn’t stop the dispatch. Later
            listeners still see the event and can lift the veto with a reset. A listener with
            nothing to add after a veto can opt out with{' '}
            <code>@Subscribe(ignoreVetoed = true)</code>, and a mutation marked <code>last()</code>{' '}
            ends the deciding early.
          </p>
          <p>
            <code>MONITOR</code> is the odd one out. It always runs, sees what the earlier listeners
            decided, and can’t change any of it. A monitor returns nothing, and one that returns a
            mutation fails the build’s lint check. That suits a tracer mod that only wants to watch.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why a total can’t be rewritten</h2>
          <p>
            Gold and level are fields the game checks against itself. It keeps an XOR-encoded mirror
            of each and compares it with the live value from time to time. Rewrite the total
            directly, and the checker spots the mismatch and resets the field to 1.
          </p>
          <p>
            That’s why a <code>Gold</code> listener decides the delta, never the total, and why{' '}
            <code>LevelUp</code> can only be watched. Change the amount about to be added, and let
            the game commit its own total and refresh its own mirror. This rule is usually the first
            thing that trips up a new hook.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why this shape at all</h2>
          <p>
            Nothing here touches the game on disk. Hooks live only in the running process and vanish
            when it exits, so nothing works until the game runs.
          </p>
          <p>
            The two-process split exists only because a 32-bit game and a 64-bit JVM can’t share an
            address space. The frame format, the deadline, and the priority order all follow from
            one constraint: the game thread can’t wait long. Read the full wire format in{' '}
            <a
              href="https://github.com/ancaria-dev/protocol/blob/master/docs/PROTOCOL.md"
              target="_blank"
              rel="noreferrer"
            >
              protocol’s docs
            </a>
            , and the event model in{' '}
            <a href="https://github.com/ancaria-dev/coderpack" target="_blank" rel="noreferrer">
              coderpack
            </a>
            .
          </p>
        </section>
      </div>
    </>
  )
}
