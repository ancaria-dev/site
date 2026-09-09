import { useState } from 'react'
import styles from './RevealValue.module.less'

type RevealValueProps = {
  value: string
  label?: string
  // The short form to show while collapsed. The default keeps the head, which
  // is what a hash is recognised by; a file name passes its own.
  collapsed?: string
}

export function RevealValue({
  value,
  label = '',
  collapsed = `${value.slice(0, 12)}…`,
}: RevealValueProps) {
  const [expanded, setExpanded] = useState(false)
  const truncated = collapsed !== value

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
      <span className={`${styles.value} ${styles.truncated}`}>{expanded ? value : collapsed}</span>
    </button>
  )
}
