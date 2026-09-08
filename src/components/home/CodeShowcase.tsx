import { useState } from 'react'
import { CodeBlock, type CodeTab } from '../shared/CodeBlock.tsx'
import styles from './CodeShowcase.module.less'

const goldCode = `
package dev.ancaria.mod.goldrush

import dev.ancaria.coderpack.api.Context
import dev.ancaria.coderpack.api.SacredMod
import dev.ancaria.coderpack.api.Subscribe
import dev.ancaria.coderpack.api.event.Gold

class GoldRushMod : SacredMod {

    override fun onLoad(context: Context) {
        context.events().register(this)
    }

    @Subscribe
    fun onGold(event: Gold) {
        if (event.delta() > 0) {
            event.delta(event.delta() * 3 / 2)
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
package dev.ancaria.mod.softlanding

import dev.ancaria.coderpack.api.Context
import dev.ancaria.coderpack.api.SacredMod
import dev.ancaria.coderpack.api.Subscribe
import dev.ancaria.coderpack.api.event.Damage

class SoftLandingMod implements SacredMod {

    @Override
    void onLoad(Context context) {
        context.events().register(this)
    }

    @Subscribe
    void onDamage(Damage event) {
        if (event.kind() == 'damage' && event.next() <= 0 && event.hp() > 1) {
            event.next(1)
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
      'Subscribe to an event, react to it, done. GoldRushMod listens for gold changing hands and tops up every gain by half again.',
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
    label: 'SoftLandingMod.groovy',
    heading: 'Groovy',
    language: 'java',
    code: damageCode,
    description:
      'Groovy reads the same annotation and the same event classes. SoftLandingMod keeps a killing blow from dropping you below 1 HP.',
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
