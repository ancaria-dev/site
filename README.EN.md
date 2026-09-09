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

Source for **Ancaria for Developers**, the project's single-page site. A
landing page, a page for players, and a page for developers, built as a
static application and published through Cloudflare Pages.

This is a proof-of-concept's shop window, not a separate product. Its job is
to explain what Ancaria is, show it (with placeholders standing in for
screenshots for now), and get a player to the launcher download or a
developer to the repository they actually need. Documentation that already
lives in a component repository's README is not duplicated here. It gets a
link instead.

## Stack

React 19 with TypeScript, routed with `react-router-dom`, styled with LESS in
CSS Modules, bundled with Vite, linted and formatted with Biome alone --
there is no ESLint and no Prettier config. The package manager is pnpm,
pinned in `package.json` and resolved through Corepack.

## Development

```text
corepack enable
pnpm install
pnpm dev       # local dev server
pnpm build     # tsc -b && vite build, output in dist/
pnpm preview   # serve the production build locally
pnpm lint       # biome check .
pnpm lint:fix   # biome check --write .
```

## Deployment

CI in `.github/workflows/build.yml` installs dependencies, lints, builds, and
on `master` publishes `dist/` to Cloudflare Pages by direct upload
with `wrangler`. Cloudflare Pages' own build step is not used, so what ships
is exactly what CI already built and linted. Actually deploying needs
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` configured as repository
secrets.

## Placeholders

The screenshots in `src/assets/screenshots/` are solid-color WebP files,
named for what they will eventually show (`launcher.webp`, `ingame.webp`,
and so on). Their captions live in `src/data/screenshots.ts`. Release
information (version, file name, SHA-256, download link) in
`src/data/release.ts` is filled in by hand and does not update itself --
the site has no backend.

## Disclaimer

Ancaria is built for single-player use only. The project does not circumvent
DRM, grants no multiplayer advantage (there is no multiplayer) and
distributes no files from the game itself. Hooks exist only in the running
process and disappear with it. The site is not affiliated with Ascaron
Entertainment, THQ Nordic, or any other rights holder of Sacred, and should
never be worded to suggest otherwise.

## License

The code is distributed under the MIT License. The full text is in
[LICENSE](LICENSE).
