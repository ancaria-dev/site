import type { ReactNode } from 'react'
import { useState } from 'react'
import styles from './CopyButton.module.less'
import { CopyIcon } from './icons/CopyIcon.tsx'

type CopyButtonProps = {
  value: string
  children: ReactNode
}

export function CopyButton({ value, children }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard access can be denied by the browser. The value is still
      // visible in the button for a manual copy.
    }
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      <CopyIcon />
      <span className={styles.label}>{copied ? 'Copied' : children}</span>
      <code className={styles.value}>{value}</code>
    </button>
  )
}
