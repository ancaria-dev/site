import { useState } from 'react'
import styles from './RevealValue.module.less'

type RevealValueProps = {
  value: string
  label?: string
  // The short form to show while collapsed. The default keeps the head, which
  // is what a hash is recognised by.
  collapsed?: string
  // Collapse in CSS instead: show the whole value on one line and let the
  // ellipsis fall wherever the column runs out. A file name has no length
  // worth guessing at, and a guess that is too generous simply wraps.
  clamp?: boolean
}

export function RevealValue({ value, label = '', collapsed, clamp = false }: RevealValueProps) {
  const [expanded, setExpanded] = useState(false)
  const short = collapsed ?? (clamp ? value : `${value.slice(0, 12)}…`)
  const truncated = clamp || short !== value

  // A value short enough to show in full is not a button: nothing would happen
  // on a click, so it should not invite one.
  if (!truncated) {
    return (
      <span className={styles.reveal}>
        {label && <span className={styles.label}>{label}</span>}
        <span className={styles.value}>{value}</span>
      </span>
    )
  }

  return (
    <button
      type="button"
      className={`${styles.reveal} ${styles.button}`}
      onClick={() => setExpanded((current) => !current)}
      title={expanded ? 'Click to collapse' : `Click to see the full ${label || 'value'}`}
    >
      {label && <span className={styles.label}>{label}</span>}
      {/* Collapsed is a single line by definition, so it must not wrap; the
          expanded value is meant to be read in full and may. */}
      <span className={`${styles.value} ${styles.truncated} ${expanded ? '' : styles.oneLine}`}>
        {expanded ? value : short}
      </span>
    </button>
  )
}
