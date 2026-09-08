import type { ReactNode } from 'react'
import styles from './PageHeader.module.less'

type PageHeaderProps = {
  eyebrow: string
  title: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      {children && <p className={styles.lede}>{children}</p>}
    </header>
  )
}
