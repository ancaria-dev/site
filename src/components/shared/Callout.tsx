import type { ReactNode } from 'react'
import styles from './Callout.module.less'

type CalloutProps = {
  label: string
  tone?: 'gold' | 'crimson'
  children: ReactNode
}

export function Callout({ label, tone = 'crimson', children }: CalloutProps) {
  const classes = [styles.panel, styles[tone]].join(' ')

  return (
    <div className={classes}>
      <span className={styles.badge}>{label}</span>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
