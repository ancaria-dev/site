import { useState } from 'react'
import styles from './HashReveal.module.less'

type HashRevealProps = {
  value: string
  label?: string
}

export function HashReveal({ value, label = 'SHA-256' }: HashRevealProps) {
  const [expanded, setExpanded] = useState(false)
  const short = `${value.slice(0, 12)}…`

  return (
    <button
      type="button"
      className={styles.hash}
      onClick={() => setExpanded((current) => !current)}
      title={expanded ? 'Click to collapse' : `Click to see the full ${label}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      <span className={styles.value}>{expanded ? value : short}</span>
    </button>
  )
}
