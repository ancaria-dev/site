import { origin } from './pages.ts'

// schema.org data for the front page: what the software is, who publishes it,
// and that it is free. There are no ratings or reviews here, because there are
// none to cite, and search engines penalise invented ones.
//
// A function rather than a constant: pages.ts imports this file and this file
// imports `origin` from pages.ts, so the value has to be built on first use.
export function structuredData(): object[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Ancaria',
      alternateName: 'Sacred Mod Loader',
      description:
        'A mod loader for Sacred Gold. Mods are written in Java or Kotlin and loaded into the running game without changing game files.',
      applicationCategory: 'GameApplication',
      operatingSystem: 'Windows',
      url: `${origin}/`,
      downloadUrl: 'https://github.com/ancaria-dev/launcher/releases/latest',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${origin}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ancaria',
      url: `${origin}/`,
      publisher: { '@id': `${origin}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'Ancaria',
      url: `${origin}/`,
      logo: `${origin}/favicon.png`,
      sameAs: [
        'https://github.com/ancaria-dev',
        'https://plugins.jetbrains.com/plugin/34165-sacred-mod-development',
      ],
    },
  ]
}
