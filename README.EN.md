<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=1C1410)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1C1410)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=1C1410)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=for-the-badge&logo=biome&logoColor=white&labelColor=1C1410)
![Sacred](https://img.shields.io/badge/Sacred-Community-8B1A1A?style=for-the-badge&labelColor=1C1410)
![License](https://img.shields.io/badge/License-MIT-C9A227?style=for-the-badge&labelColor=1C1410)

[Русский](README.md) · [Deutsch](README.DE.md)

</div>

# Site

The source of [ancaria.dev](https://ancaria.dev), the site that gets players to
the launcher and developers to the repository they need.

The site explains what ancaria is and shows it at work. It doesn't repeat the
detailed docs. It links to the component READMEs instead.

There's no backend. The pages read the launcher version and the mod list
straight from GitHub when they open.

## Getting started

```text
corepack enable
pnpm install
pnpm dev
```

`pnpm dev` starts a local development server.

## Stack

React 19 and TypeScript, routing with `react-router-dom`, styles in LESS CSS
Modules, bundling with Vite. Biome is the only linter and formatter. The
package manager is pnpm, pinned in `package.json` and provided by Corepack.

## Placeholders

The screenshots in `src/assets/screenshots/` are solid-color stand-ins for
now. Each file is named for what it will show: `launcher.webp`, `ingame.webp`,
and so on. To add a real capture, replace the file under the same name. The
captions live in `src/data/screenshots.ts`.

## Disclaimer

ancaria is for single-player use only. The project doesn't circumvent DRM,
doesn't distribute game files, and gives no multiplayer advantage, because it
has no multiplayer. Its hooks live only in the running game and vanish with
it.

The site isn't affiliated with Ascaron Entertainment, THQ Nordic, or any other
rights holder of Sacred. Never word the copy as if it were.

## Building

```text
pnpm build
pnpm lint
```

`pnpm build` checks types and builds the site into `dist/`. `pnpm preview`
serves that build locally, and `pnpm lint:fix` fixes what Biome reports.

## Releases

The site has no releases. CI in `.github/workflows/build.yml` checks and
builds every pull request and push to `master`, and from `master` it deploys `dist/` to the Cloudflare
Worker `ancaria-site`. What ships is exactly what CI built. This needs the
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

The same Worker serves `/files/*` from the R2 bucket `ancaria-files`. That's
where files live that don't belong in git, such as the pureHD archive the
launcher downloads.

## License

MIT, see [LICENSE](LICENSE).
