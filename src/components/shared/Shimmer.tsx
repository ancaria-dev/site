import type { CSSProperties } from 'react'
import styles from './Shimmer.module.less'

type ShimmerProps = {
  /** Any CSS length. Defaults to the full width of the parent. */
  width?: string
  /** Any CSS length. Defaults to one line of the surrounding text. */
  height?: string
  /** Any CSS length. Defaults to the small radius. */
  radius?: string
  /**
   * Read to screen readers in place of the value that is still loading. Leave
   * it out when a sibling shimmer or the surrounding text already says so.
   */
  label?: string
  className?: string
}

/**
 * A rounded placeholder shown where a value is still loading. It stands in
 * for data the page does not know yet, so nothing made up is ever on screen.
 */
export function Shimmer({ width, height, radius, label, className }: ShimmerProps) {
  const style: CSSProperties = { width, height, borderRadius: radius }
  const classes = className ? `${styles.shimmer} ${className}` : styles.shimmer

  if (label) {
    return <span className={classes} style={style} role="status" aria-label={label} />
  }
  return <span className={classes} style={style} aria-hidden="true" />
}
