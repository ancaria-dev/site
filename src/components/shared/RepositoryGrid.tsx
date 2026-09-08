import type { RepositoryLink } from '../../data/repositories.ts'
import styles from './RepositoryGrid.module.less'

export function RepositoryGrid({ repositories }: { repositories: RepositoryLink[] }) {
  return (
    <div className={styles.grid}>
      {repositories.map((repo) => (
        <a key={repo.name} className={styles.card} href={repo.url} target="_blank" rel="noreferrer">
          <span className={styles.name}>{repo.name}</span>
          <span className={styles.description}>{repo.description}</span>
        </a>
      ))}
    </div>
  )
}
