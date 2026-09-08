import { Link } from 'react-router-dom'
import { Callout } from '../components/shared/Callout.tsx'
import { CodeBlock } from '../components/shared/CodeBlock.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import styles from './HowItWorksPage.module.less'

const frameSample = `
ASK 7 gold.change delta=40 current=1180 dir=loot
END 7 delta=60
`.trim()

export function HowItWorksPage() {
  return (
    <>
      <PageHeader eyebrow="How it works" title="How an event reaches a mod, and travels back">
        Sacred Gold is a 32-bit game from 2004. The loader runs a 64-bit JVM next to it, and
        everything on this page exists to bridge that gap.
      </PageHeader>

      <div className={styles.container}>
        <section className={styles.section}>
          <h2>Two processes, one wire</h2>
          <p>
            A 64-bit JVM can’t load into a 32-bit process, so mods never run inside the game at all.
            A Rust host starts a JVM beside Sacred Gold and injects a Frida agent into the game
            itself. From there, three pieces talk in a strict line: the agent hooks x86 instructions
            and exchanges Frida messages with the host, while the host and the JVM exchange
            newline-terminated UTF-8 frames over the JVM’s own stdin and stdout. The agent never
            talks to the JVM directly.
          </p>
          <p>
            stdout carries only protocol frames on that pipe. A mod that prints with{' '}
            <code>System.out</code> corrupts the stream, which is why <code>context.log()</code>{' '}
            exists instead of the usual habit.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What crosses the wire</h2>
          <p>
            Six frame types cover everything. <code>EVT</code> reports something that already
            happened and expects no reply: a level-up, a death, gold changing hands.{' '}
            <code>ASK</code> comes from a hook placed before the game commits a write, and it means
            the game thread is paused, waiting. <code>END</code> is the answer to an{' '}
            <code>ASK</code>: let the write through, cancel it, or replace one of its fields.{' '}
            <code>CMD</code> and <code>RES</code> let a mod ask the game a question instead of only
            reacting to one. <code>LOG</code> and <code>BYE</code> round out the set.
          </p>
          <CodeBlock code={frameSample} language="bash" title="a gold pickup, vetoed" />
          <p>
            That one rewritten field is a mod at work: the <code>ASK</code> carries the pickup, an{' '}
            <code>END</code> raises the delta from 40 to 60, and the game computes the new total
            itself. This is the same rewrite a <code>Gold</code> listener makes through{' '}
            <code>event.delta(value)</code>, shown on the <Link to="/">home page</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <Callout label="Timing" tone="gold">
            <p>
              An <code>ASK</code> stops the game thread, so it can’t wait forever. The host gives
              every <code>ASK</code> 250 milliseconds, checked by a watchdog that wakes every 125
              milliseconds, so an unanswered veto is typically resolved 250 to 375 milliseconds
              after it was asked, plus whatever scheduling and posting add on top. Miss that window
              and the host answers on the mod’s behalf, and the original value goes through
              untouched. Treat 250 ms as a target, never as a guarantee, and keep a vetoable handler
              short enough that it never gets close.
            </p>
          </Callout>
        </section>

        <section className={styles.section}>
          <h2>Priority and cancellation</h2>
          <p>
            Listeners run in a fixed order: <code>FIRST</code>, then <code>NORMAL</code>, then{' '}
            <code>LAST</code>, then <code>MONITOR</code>. A cancellation doesn’t stop the dispatch.
            Later listeners still see the event, and one with nothing to add once it’s cancelled can
            opt out with <code>@Subscribe(ignoreCancelled = true)</code>. <code>MONITOR</code> is
            the odd one out: it always runs last, sees whatever the earlier listeners decided, and
            can’t change any of it. Its own cancellations and rewrites are silently discarded, which
            is exactly right for something like a tracer mod that only ever wants to watch.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why a total can’t be rewritten</h2>
          <p>
            Gold, experience, and level are fields the game checks against itself. It keeps an
            XOR-encoded mirror of each one and periodically compares it to the live value. Rewrite
            the total directly, and the checker notices the mismatch and resets the field to 1.
            That’s why <code>Gold</code> exposes <code>delta()</code> and <code>Experience</code>{' '}
            exposes <code>next()</code> instead of a plain setter on the total: boost the amount
            about to be added, and let the game commit its own total and refresh its own mirror.
            It’s a narrow rule with a specific reason behind it, and it’s usually the first thing
            that trips up a new hook.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why this shape at all</h2>
          <p>
            None of it touches the game on disk. Hooks live only in the running process and
            disappear the moment it exits, which is also why nothing here works without the game
            running first. The two-process split exists purely because a 32-bit game and a 64-bit
            JVM cannot share one address space; everything else, the frame format, the deadline, the
            priority order, follows from keeping that boundary honest under a game thread that can’t
            be kept waiting for long. Read the wire format in full in{' '}
            <a
              href="https://github.com/ancaria-dev/protocol/blob/master/docs/PROTOCOL.md"
              target="_blank"
              rel="noreferrer"
            >
              protocol’s docs
            </a>
            , or the event model in{' '}
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
