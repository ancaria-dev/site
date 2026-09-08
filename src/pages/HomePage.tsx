import { CodeShowcase } from '../components/home/CodeShowcase.tsx'
import { DownloadSection } from '../components/home/DownloadSection.tsx'
import { Hero } from '../components/home/Hero.tsx'
import { ScreenshotGallery } from '../components/home/ScreenshotGallery.tsx'
import { StatusBanner } from '../components/home/StatusBanner.tsx'

export function HomePage() {
  return (
    <>
      <Hero />
      <StatusBanner />
      <ScreenshotGallery />
      <DownloadSection />
      <CodeShowcase />
    </>
  )
}
