export type ModSource = {
  /** Display name for the section heading. */
  name: string
  /** "<owner>/<repo>" of a public GitHub repository laid out as SRML. */
  repo: string
}

// The loader itself will follow any repository shaped this way, added by
// the player from the launcher's source settings. This is only the short
// list the platform team maintains and vouches for.
export const modSources: ModSource[] = [{ name: 'Ancaria', repo: 'ancaria-dev/mods' }]
