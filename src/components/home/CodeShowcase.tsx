import { useState } from 'react'
import { CodeBlock, type CodeTab } from '../shared/CodeBlock.tsx'
import styles from './CodeShowcase.module.less'

const goldCode = `
package dev.ancaria.mod.goldrush

import dev.ancaria.coderpack.api.Context
import dev.ancaria.coderpack.api.event.Gold
import dev.ancaria.coderpack.ktx.SacredMod
import dev.ancaria.coderpack.ktx.delta
import dev.ancaria.coderpack.ktx.on

class GoldRushMod : SacredMod() {

    override fun Context.load() {
        on<Gold> {
            if (it.delta > 0) it.delta = it.delta * 3 / 2
        }
    }
}
`.trim()

const experienceCode = `
package dev.ancaria.mod.expboost;

import dev.ancaria.coderpack.api.Context;
import dev.ancaria.coderpack.api.SacredMod;
import dev.ancaria.coderpack.api.Subscribe;
import dev.ancaria.coderpack.api.event.Experience;

public final class ExperienceBoostMod implements SacredMod {

    @Override
    public void onLoad(Context context) {
        context.events().register(this);
    }

    @Subscribe
    public void onExperience(Experience event) {
        long bonus = event.gain() * 20 / 100;
        event.next(event.next() + bonus);
    }
}
`.trim()

const damageCode = `
package dev.ancaria.mod.godmod

import dev.ancaria.coderpack.api.Context
import dev.ancaria.coderpack.api.SacredMod
import dev.ancaria.coderpack.api.Subscribe
import dev.ancaria.coderpack.api.event.Damage

class GodMod implements SacredMod {

    @Override
    void onLoad(Context context) {
        context.events().register(this)
    }

    @Subscribe
    void onDamage(Damage event) {
        if (event.kind() == 'damage') {
            event.cancel()
        }
    }
}
`.trim()

const TABS: (CodeTab & { heading: string; description: string })[] = [
  {
    id: 'kotlin',
    label: 'GoldRushMod.kt',
    heading: 'Kotlin',
    language: 'kotlin',
    code: goldCode,
    description:
      'Subscribe to an event, react to it, done. GoldRushMod tops up every gold gain by half again. The Kotlin module turns the event into a type argument and the field the game is about to write into a var, so the whole rewrite is one assignment.',
  },
  {
    id: 'java',
    label: 'ExperienceBoostMod.java',
    heading: 'Java',
    language: 'java',
    code: experienceCode,
    description:
      'The same event bus from Java, no wrapper needed. ExperienceBoostMod adds a flat 20% on top of every experience gain.',
  },
  {
    id: 'groovy',
    label: 'GodMod.groovy',
    heading: 'Groovy',
    language: 'groovy',
    code: damageCode,
    description:
      'Groovy reads the same annotation and the same event classes. GodMod cancels every hit before it lands, single-player god mode in six lines.',
  },
]

export function CodeShowcase() {
  const [activeId, setActiveId] = useState(TABS[0].id)
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0]

  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <h2 className={styles.title}>
          Write mods in{' '}
          <span className={styles.wordSwap}>
            <span key={active.id} className={styles.wordSwapInner}>
              {active.heading}
            </span>
          </span>
        </h2>
        <p>{active.description}</p>
      </div>
      <CodeBlock tabs={TABS} activeTabId={activeId} onTabChange={setActiveId} />
    </section>
  )
}
