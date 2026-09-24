import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { headTags, pageFor } from '../../data/pages.ts'

/**
 * Replaces the route's <head> tags after every navigation. It renders nothing:
 * the tags come from the same `headTags` that wrote the first ones into the
 * prerendered page, so there is one definition of what a page's head looks
 * like.
 */
export function RouteHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const template = document.createElement('template')
    template.innerHTML = headTags(pageFor(pathname))
    for (const stale of document.head.querySelectorAll('[data-route-head]')) {
      stale.remove()
    }
    document.head.append(template.content)
  }, [pathname])

  return null
}
