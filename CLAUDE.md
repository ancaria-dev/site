# site

## Repository scope

This repository is the source for **Ancaria for Developers**, the marketing
and documentation front end for the project. It is a static single-page
React application: a landing page, a page for players, and a page for
developers. It contains no game code, no loader code, and no build tooling
that any other repository depends on.

The site is a proof-of-concept pitch for a proof-of-concept loader. Its job is
to explain what Ancaria is, show it (with placeholder screenshots until real
ones exist), and get a player to the launcher download or a developer to the
component repositories. It is not the place to duplicate documentation that
already lives in a component repository's README -- link to it instead.

## Stack

React 19 with TypeScript, routed with `react-router-dom`, styled with LESS
CSS Modules (one `*.module.less` per component, no global class names except
in `src/styles/global.less`), bundled with Vite, linted and formatted with
Biome (no ESLint, no Prettier). Package manager is pnpm, pinned via
`packageManager` in `package.json` and driven through Corepack.

## Repository layout

    src/
      components/
        layout/     Header, Footer, and the route Layout that wraps them
        home/        Sections used only on the landing page
        shared/      Button, Callout, CodeBlock, PageHeader, RepositoryGrid,
                      icons -- anything used by more than one page
      pages/         One component per route: Home, Players, Developers, 404
      data/          Plain data consumed by components: release info,
                      screenshot captions, component repository links
      styles/        tokens.less (design tokens) and global.less (reset and
                      base typography); everything else is a CSS module
      assets/screenshots/  Placeholder images; see below
    public/          Static files served as-is: favicon, robots.txt,
                      _redirects (Cloudflare Pages SPA fallback), og-image

## Setup and commands

```text
corepack enable
pnpm install
pnpm dev       # local dev server
pnpm build     # tsc -b && vite build, output in dist/
pnpm preview   # serve the production build locally
pnpm lint      # biome check .
pnpm lint:fix  # biome check --write .
```

CI (`.github/workflows/build.yml`) installs, lints, builds, and -- on
`master` only -- deploys `dist/` to Cloudflare Pages by direct upload with
`wrangler`. Cloudflare Pages' own build step is not used; what ships is
exactly what CI built and linted. This needs `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` configured as repository secrets before it can
actually deploy.

## Content rules

- Keep the palette in `src/styles/tokens.less` as the single source of the
  brand colors. They are lifted from the badges in the other repositories'
  READMEs (crimson `#8b1a1a`, gold `#c9a227`, dark label `#1c1410`) on
  purpose, so this site reads as the same project rather than a fresh guess.
- The screenshots in `src/assets/screenshots/` are solid-color WebP
  placeholders, named for what they will eventually show
  (`launcher.webp`, `ingame.webp`, `idea.webp`, `console.webp`). Replace a
  file in place with a real capture of the same name; nothing else needs to
  change. `src/data/screenshots.ts` holds the captions.
- `src/data/release.ts` is hand-maintained placeholder data (version,
  file name, SHA-256, download URL) for the download section. There is no
  build-time or runtime fetch from GitHub -- this is a static site with no
  backend. Update it by hand when `launcher` publishes a release worth
  pointing at.
- Never state or imply that this project is affiliated with, endorsed by, or
  produced by Ascaron Entertainment, THQ Nordic, or any other rights holder
  of Sacred. The footer's disclaimer paragraph carries this; do not weaken it
  when editing the footer.
- Keep the single-player-only, no-DRM-circumvention, no-multiplayer framing
  intact anywhere the project is described. This mirrors the root workspace
  CLAUDE.md and is a hard project boundary, not house style.
- Do not invent a production domain for the site in copy or metadata. Link to
  GitHub (`github.com/ancaria-dev/...`) for anything that needs a concrete
  URL until a real Cloudflare Pages domain exists.

## Gotchas

- This is the one repository in the workspace with no sibling checkout
  dependency and no generated address table or API jar to keep in sync.
  Nothing here reads `../mappings`, `../coderpack`, or any other sibling.
- `*.module.less` files import `tokens.less` with `@import (reference)`, not
  a plain `@import`. A plain import would emit the token file's own rules
  (there are none, but keep the pattern) into every module that imports it.
- `public/_redirects` is what makes client-side routing work on Cloudflare
  Pages. Deleting it turns every route but `/` into a 404 from the edge
  before React Router ever runs.
