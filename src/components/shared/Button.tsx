import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.less'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant
  icon?: ReactNode
}

export function Button({ variant = 'secondary', icon, className, children, ...rest }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  return (
    <a className={classes} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </a>
  )
}
