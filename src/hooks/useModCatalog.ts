import { useEffect, useState } from 'react'
import { modSources } from '../data/modSources.ts'

export type ModEntry = {
  id: string
  name: string
  version: string
  description: string
  api: string
  authors?: string[]
  website?: string
  icon?: string
  file: string
  size: number
  sha256: string
  url: string
}

export type ModRepository = {
  name: string
  description: string
  url: string
  icon?: string
  repo: string
  rawBase: string
  mods: ModEntry[]
}

type SrmlIndex = {
  srml: number
  name: string
  description: string
  url: string
  icon?: string
  mods: ModEntry[]
}

type CatalogState = {
  loading: boolean
  error: boolean
  repositories: ModRepository[]
}

export function useModCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({
    loading: true,
    error: false,
    repositories: [],
  })

  useEffect(() => {
    let cancelled = false

    Promise.allSettled(
      modSources.map(async (source) => {
        const rawBase = `https://raw.githubusercontent.com/${source.repo}/HEAD/`
        const response = await fetch(`${rawBase}sacred.mods.repository.json`)
        if (!response.ok) {
          throw new Error(`${source.repo} responded ${response.status}`)
        }
        const index = (await response.json()) as SrmlIndex
        const repository: ModRepository = {
          name: index.name,
          description: index.description,
          url: index.url,
          icon: index.icon,
          repo: source.repo,
          rawBase,
          mods: index.mods,
        }
        return repository
      }),
    ).then((results) => {
      if (cancelled) {
        return
      }
      const repositories = results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
      setState({ loading: false, error: repositories.length === 0, repositories })
    })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
