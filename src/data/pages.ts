// The one source for every route's <head>: title, description, and canonical
// URL. tools/prerender.mjs writes them into each built page, and
// components/layout/RouteHead.tsx swaps them on every client navigation, so a
// crawler with or without JavaScript sees each route as its own page.
//
// Keep a title under about 60 characters and a description near 150, or search
// results cut them off.

import { structuredData } from './structuredData.ts'

export const origin = 'https://ancaria.dev'

export type PageMeta = {
  /** The route, exactly as the router and the canonical URL spell it. */
  path: string
  title: string
  description: string
  /** Only the 404 page: kept out of search results and the sitemap. */
  noindex?: boolean
}

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Ancaria – Sacred Gold mod loader',
    description:
      'Play Sacred Gold with mods, or write your own in Java or Kotlin. Ancaria loads them into the running game and never touches your game files.',
  },
  {
    path: '/players',
    title: 'Install Sacred Gold mods – Ancaria',
    description:
      'Put one file in your Sacred Gold folder, pick your mods, and press Play. The launcher can fetch Java for you, and your game files stay untouched.',
  },
  {
    path: '/mods',
    title: 'Sacred Gold mods you can install – Ancaria',
    description:
      'Browse the Sacred Gold mods the launcher can install today, read live from the same repository index the launcher uses.',
  },
  {
    path: '/developers',
    title: 'Write Sacred Gold mods in Java or Kotlin – Ancaria',
    description:
      'Create a Sacred Gold mod with the IntelliJ IDEA plugin or one terminal command, subscribe to game events, and test it in the running game.',
  },
  {
    path: '/how-it-works',
    title: 'How the Sacred Gold mod loader works – Ancaria',
    description:
      'How a 32-bit game from 2004 talks to mods in a 64-bit JVM: the in-game agent, the Rust host, the wire between them, and vetoable events.',
  },
]

export const notFoundPage: PageMeta = {
  path: '/404',
  title: 'Page not found – Ancaria',
  description: 'This page doesn’t exist. Ancaria is a mod loader for Sacred Gold.',
  noindex: true,
}

export function pageFor(pathname: string): PageMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return pages.find((page) => page.path === path) ?? notFoundPage
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

/**
 * The route-specific head tags as HTML. Every tag carries `data-route-head`,
 * which is how the client finds and replaces them on the next navigation.
 */
export function headTags(page: PageMeta): string {
  const url = `${origin}${page.path}`
  const title = escapeAttribute(page.title)
  const description = escapeAttribute(page.description)
  const tags = [
    `<title data-route-head>${escapeText(page.title)}</title>`,
    `<meta data-route-head name="description" content="${description}" />`,
    `<meta data-route-head property="og:title" content="${title}" />`,
    `<meta data-route-head property="og:description" content="${description}" />`,
  ]
  if (page.noindex) {
    tags.push('<meta data-route-head name="robots" content="noindex" />')
  } else {
    tags.push(
      `<link data-route-head rel="canonical" href="${url}" />`,
      `<meta data-route-head property="og:url" content="${url}" />`,
    )
  }
  if (page.path === '/') {
    // `<` is escaped so no string in the data can close the script element.
    const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c')
    tags.push(`<script data-route-head type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}
