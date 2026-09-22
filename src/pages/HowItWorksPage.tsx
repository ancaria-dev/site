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
            and passes what it sees to the host, and the host hands it on to the JVM as short text
            frames over a pair of named pipes reserved for that. The agent never talks to the JVM
            directly.
          </p>
          <p>
            Because the frames have a channel of their own, a mod can’t break it by printing.{' '}
            <code>System.out</code> still works and ends up in the host console, but{' '}
            <code>context.log()</code> is the better habit: it tags every line with the mod’s id.
          </p>
          <p>
            The instinct behind all this, reach into a running program instead of touching its
            files, owes something to{' '}
            <a href="https://github.com/SpongePowered/Mixin" target="_blank" rel="noreferrer">
              SpongePowered’s Mixin
            </a>
            , which rewrites JVM bytecode as classes load. Sacred Gold gives no such luxury: there’s
            no JVM to weave into, so the same instinct lands on Frida patching x86 instructions in a
            native process instead.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What crosses the wire</h2>
          <p>
            Seven frame types cover everything. <code>EVT</code> reports something that already
            happened and expects no reply: a level-up, a death, gold changing hands.{' '}
            <code>ASK</code> comes from a hook placed before the game commits a write, and it means
            the game thread is paused, waiting. <code>END</code> is the answer to an{' '}
            <code>ASK</code>: let the write through, cancel it, or replace one of its fields.{' '}
            <code>CMD</code> and <code>RES</code> let a mod ask the game a question instead of only
            reacting to one. <code>LOG</code> and <code>BYE</code> round out the set.
          </p>
          <CodeBlock code={frameSample} language="bash" title="a gold pickup, boosted" />
          <p>
            That one rewritten field is a mod at work: the <code>ASK</code> carries the pickup, an{' '}
            <code>END</code> raises the delta from 40 to 60, and the game computes the new total
            itself. This is what a <code>Gold</code> listener asks for when it returns{' '}
            <code>Gold.Mutation.change(60)</code>, shown on the <Link to="/">home page</Link>.
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
          <h2>Priority and vetoes</h2>
          <p>
            An event is read-only. A listener that wants to change the outcome returns a mutation: a
            new value, a veto, a reset back to the game’s own number, or nothing. The loader folds
            each answer in before the next listener runs, so <code>value()</code> always reads the
            result so far, and two mods that double the same gain compose into four times.
          </p>
          <p>
            Listeners run in a fixed order: <code>FIRST</code>, then <code>NORMAL</code>, then{' '}
            <code>LAST</code>, then <code>MONITOR</code>. A veto doesn’t stop the dispatch. Later
            listeners still see the event and can lift the veto with a reset, and one with nothing
            to add once it’s vetoed can opt out with <code>@Subscribe(ignoreVetoed = true)</code>. A
            mutation marked <code>last()</code> ends the deciding early. <code>MONITOR</code> is the
            odd one out: it always runs, sees whatever the earlier listeners decided, and can’t
            change any of it. A monitor returns nothing, and one that returns a mutation fails the
            build’s lint check, which is exactly right for something like a tracer mod that only
            ever wants to watch.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why a total can’t be rewritten</h2>
          <p>
            Gold and level are fields the game checks against itself. It keeps an XOR-encoded mirror
            of each one and periodically compares it to the live value. Rewrite the total directly,
            and the checker notices the mismatch and resets the field to 1. That’s why the number a{' '}
            <code>Gold</code> listener decides is the delta, never the total, and why{' '}
            <code>LevelUp</code> can only be watched: change the amount about to be added, and let
            the game commit its own total and refresh its own mirror. It’s a narrow rule with a
            specific reason behind it, and it’s usually the first thing that trips up a new hook.
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
