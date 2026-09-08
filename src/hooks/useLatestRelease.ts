import { useEffect, useState } from 'react'

export type LatestRelease = {
  version: string
  fileName: string
  downloadUrl: string
  sha256: string | null
  loading: boolean
}

type GitHubAsset = {
  name: string
  browser_download_url: string
  digest?: string
}

type GitHubRelease = {
  tag_name: string
  assets: GitHubAsset[]
}

const FALLBACK: LatestRelease = {
  version: '0.99.0',
  fileName: 'Sacred Mod Loader',
  downloadUrl: 'https://github.com/ancaria-dev/launcher/releases/latest',
  sha256: null,
  loading: true,
}

/**
 * Reads the launcher's current release straight from the GitHub API on
 * mount. There is no backend here, so this is the only way the version,
 * download link, and hash stay correct without a manual edit every release.
 */
export function useLatestRelease(): LatestRelease {
  const [release, setRelease] = useState<LatestRelease>(FALLBACK)

  useEffect(() => {
    let cancelled = false

    fetch('https://api.github.com/repos/ancaria-dev/launcher/releases/latest')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API responded ${response.status}`)
        }
        return response.json() as Promise<GitHubRelease>
      })
      .then((data) => {
        if (cancelled) {
          return
        }
        const asset = data.assets.find((a) => a.name.endsWith('.exe')) ?? data.assets[0]
        setRelease({
          version: data.tag_name.replace(/^v/, ''),
          fileName: 'Sacred Mod Loader',
          downloadUrl: asset?.browser_download_url ?? FALLBACK.downloadUrl,
          sha256: asset?.digest?.replace(/^sha256:/, '') ?? null,
          loading: false,
        })
      })
      .catch(() => {
        if (!cancelled) {
          setRelease((current) => ({ ...current, loading: false }))
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return release
}
