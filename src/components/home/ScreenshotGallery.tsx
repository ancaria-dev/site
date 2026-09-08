import console from '../../assets/screenshots/console.webp'
import idea from '../../assets/screenshots/idea.webp'
import ingame from '../../assets/screenshots/ingame.webp'
import launcher from '../../assets/screenshots/launcher.webp'
import { screenshots } from '../../data/screenshots.ts'
import styles from './ScreenshotGallery.module.less'

const images: Record<string, string> = {
  'launcher.webp': launcher,
  'ingame.webp': ingame,
  'idea.webp': idea,
  'console.webp': console,
}

export function ScreenshotGallery() {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>See it running</h2>
      <p className={styles.subtitle}>
        Placeholders for now -- real captures land here as the loader gets used.
      </p>
      <div className={styles.grid}>
        {screenshots.map((shot) => (
          <figure key={shot.id} className={styles.card}>
            <img src={images[shot.file]} alt={shot.caption} loading="lazy" />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
