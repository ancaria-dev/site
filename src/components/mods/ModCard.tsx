import { useState } from 'react'
import sacredFallback from '../../assets/sacred-icon-fallback.webp'
import type { ModEntry } from '../../hooks/useModCatalog.ts'
import { Button } from '../shared/Button.tsx'
import { HashReveal } from '../shared/HashReveal.tsx'
import styles from './ModCard.module.less'

type ModCardProps = {
  mod: ModEntry
  rawBase: string
}

export function ModCard({ mod, rawBase }: ModCardProps) {
  const [iconSrc, setIconSrc] = useState(mod.icon ? `${rawBase}${mod.icon}` : sacredFallback)

  return (
    <article className={styles.card}>
      <img
        className={styles.icon}
        src={iconSrc}
        alt=""
        loading="lazy"
        onError={() => setIconSrc(sacredFallback)}
      />
      <div className={styles.body}>
        <div className={styles.heading}>
          <h3>{mod.name}</h3>
          <span className={styles.version}>v{mod.version}</span>
        </div>
        <p className={styles.description}>{mod.description}</p>
        {mod.authors && mod.authors.length > 0 && (
          <p className={styles.authors}>By {mod.authors.join(', ')}</p>
        )}
        <div className={styles.actions}>
          <Button variant="secondary" href={mod.url} target="_blank" rel="noreferrer">
            Download {mod.file}
          </Button>
          <HashReveal value={mod.sha256} />
        </div>
      </div>
    </article>
  )
}
