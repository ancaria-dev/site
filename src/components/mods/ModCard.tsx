import { useState } from 'react'
import sacredFallback from '../../assets/sacred-icon-fallback.webp'
import type { ModEntry } from '../../hooks/useModCatalog.ts'
import { Button } from '../shared/Button.tsx'
import { RevealValue } from '../shared/RevealValue.tsx'
import styles from './ModCard.module.less'

type ModCardProps = {
  mod: ModEntry
  rawBase: string
}

// Keep the head and the extension. Mod file names share a prefix as often as a
// suffix, so trimming one end alone can leave two cards showing the same text.
function collapseFileName(file: string) {
  return file.length <= 28 ? file : `${file.slice(0, 14)}…${file.slice(-10)}`
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
        {/* Both lines are clamped in CSS, so the full text stays reachable on
            hover rather than being lost with the overflow. */}
        <p className={styles.description} title={mod.description}>
          {mod.description}
        </p>
        {mod.authors && mod.authors.length > 0 && (
          <p className={styles.authors} title={mod.authors.join(', ')}>
            By {mod.authors.join(', ')}
          </p>
        )}
        <div className={styles.actions}>
          <Button
            variant="secondary"
            href={mod.url}
            target="_blank"
            rel="noreferrer"
            // Every card carries the same visible label, so the file name goes
            // to screen readers here instead.
            aria-label={`Download ${mod.file}`}
          >
            Download
          </Button>
          <div className={styles.meta}>
            <RevealValue
              label="File name"
              value={mod.file}
              collapsed={collapseFileName(mod.file)}
            />
            <RevealValue label="SHA-256" value={mod.sha256} />
          </div>
        </div>
      </div>
    </article>
  )
}
