import { CodeBlock } from '../shared/CodeBlock.tsx'
import styles from './CodeShowcase.module.less'

const sample = `
package dev.ancaria.mod.goldrush

import dev.ancaria.coderpack.api.SacredMod
import dev.ancaria.coderpack.api.event.GoldChangedEvent
import dev.ancaria.coderpack.api.event.OnEvent

class GoldRushMod : SacredMod {

    @OnEvent
    fun onGoldChanged(event: GoldChangedEvent) {
        if (event.delta <= 0) return

        val bonus = (event.delta * MULTIPLIER).toInt()
        event.player.gold += bonus

        log.info("+\${event.delta} gold, +$bonus bonus")
    }

    companion object {
        private const val MULTIPLIER = 0.5
    }
}
`.trim()

export function CodeShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <h2 className={styles.title}>Write mods in Kotlin</h2>
        <p>
          Subscribe to a game event, react to it, done. This mod listens for gold changing hands and
          tops it up by half again -- no bytecode weaving, no manual memory offsets, just an
          annotated method against a typed event.
        </p>
      </div>
      <CodeBlock code={sample} language="kotlin" title="GoldRushMod.kt" />
    </section>
  )
}
