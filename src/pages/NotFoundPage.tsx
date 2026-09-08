import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.less'

export function NotFoundPage() {
  return (
    <div className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1>This rune leads nowhere</h1>
      <p>The page you followed doesn’t exist here.</p>
      <Link to="/">Back to the front page</Link>
    </div>
  )
}
