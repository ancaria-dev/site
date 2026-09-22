import { useState } from 'react'
import { CodeBlock, type CodeTab } from '../shared/CodeBlock.tsx'
import styles from './CodeShowcase.module.less'

const goldCode = `
package dev.ancaria.mod.goldrush

import dev.ancaria.coderpack.api.Context
import dev.ancaria.coderpack.api.event.Gold
import dev.ancaria.coderpack.ktx.SacredMod
import dev.ancaria.coderpack.ktx.mutate
import dev.ancaria.coderpack.ktx.on
import dev.ancaria.coderpack.ktx.value

class GoldRushMod : SacredMod() {

    override fun Context.load() {
        on<Gold> {
            if (it.value > 0) mutate { Gold.Mutation.change(it.value * 3 / 2) }
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
    public Experience.Mutation onExperience(Experience event) {
        long bonus = event.gain() * 20 / 100;
        return Experience.Mutation.change(event.value() + bonus);
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
    Damage.Mutation onDamage(Damage event) {
        event.kind() == 'damage' ? Damage.Mutation.veto() : Damage.Mutation.none()
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
      'Subscribe to an event, react to it, done. GoldRushMod tops up every gold gain by half again. The Kotlin module turns the event into a type argument, and mutate hands the new delta back to the game, so the whole decision is one line.',
  },
  {
    id: 'java',
    label: 'ExperienceBoostMod.java',
    heading: 'Java',
    language: 'java',
    code: experienceCode,
    description:
      'The same event bus from Java, no wrapper needed. ExperienceBoostMod adds a flat 20% on top of every experience gain by returning the new total as a mutation.',
  },
  {
    id: 'groovy',
    label: 'GodMod.groovy',
    heading: 'Groovy',
    language: 'groovy',
    code: damageCode,
    description:
      'Groovy reads the same annotation and the same event classes. GodMod vetoes every hit before it lands, single-player god mode in a handful of lines.',
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
