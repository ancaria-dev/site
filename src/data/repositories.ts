export type RepositoryLink = {
  name: string
  description: string
  url: string
}

export const platformRepositories: RepositoryLink[] = [
  {
    name: 'mappings',
    description:
      'The address registry for pureHD.exe 2.0.2.118, with each VA, RVA, and confidence level.',
    url: 'https://github.com/ancaria-dev/mappings',
  },
  {
    name: 'research',
    description: 'Disassembly scripts, live probes, and the notes behind each entry in mappings.',
    url: 'https://github.com/ancaria-dev/research',
  },
  {
    name: 'coderpack',
    description: 'The Frida agent, the Java event API, and the JVM-side loader that runs mods.',
    url: 'https://github.com/ancaria-dev/coderpack',
  },
  {
    name: 'protocol',
    description:
      'The wire protocol and the Rust host that carries frames between the game and the JVM.',
    url: 'https://github.com/ancaria-dev/protocol',
  },
]

export const modAuthorRepositories: RepositoryLink[] = [
  {
    name: 'build',
    description: 'The Gradle plugin, linter, and project scaffolder for Sacred mods.',
    url: 'https://github.com/ancaria-dev/build',
  },
  {
    name: 'idea',
    description: 'The IntelliJ IDEA plugin: New Project wizard, one-click run, gutter icons.',
    url: 'https://github.com/ancaria-dev/idea',
  },
  {
    name: 'mods',
    description: 'The default SRML mod repository, its index, and four example mods to read.',
    url: 'https://github.com/ancaria-dev/mods',
  },
  {
    name: 'launcher',
    description: 'The Go executable players run. Read it to see how mods get loaded.',
    url: 'https://github.com/ancaria-dev/launcher',
  },
]
