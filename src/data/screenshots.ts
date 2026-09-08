export type Screenshot = {
  id: string
  file: string
  caption: string
}

// Solid-color placeholders. Drop the real captures in
// src/assets/screenshots/ under the same file names to replace them --
// nothing else needs to change.
export const screenshots: Screenshot[] = [
  { id: 'launcher', file: 'launcher.webp', caption: 'The launcher, picking mods before Play' },
  { id: 'ingame', file: 'ingame.webp', caption: 'A mod reacting to an event, in the running game' },
  { id: 'idea', file: 'idea.webp', caption: 'The IntelliJ IDEA plugin, one green arrow to launch' },
  {
    id: 'console',
    file: 'console.webp',
    caption: 'The host console, routing frames between game and JVM',
  },
]
