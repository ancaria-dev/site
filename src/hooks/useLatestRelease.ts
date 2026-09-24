import { useEffect, useState } from 'react'

export type LatestRelease = {
  /** Null while loading, and when GitHub could not be reached. */
  version: string | null
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

// Nothing here is a guess. Until GitHub answers, the version and hash are
// unknown, and the download link goes to the releases page, which always
// lists the current build.
const INITIAL: LatestRelease = {
  version: null,
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
  const [release, setRelease] = useState<LatestRelease>(INITIAL)

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
          downloadUrl: asset?.browser_download_url ?? INITIAL.downloadUrl,
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
