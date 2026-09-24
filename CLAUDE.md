# site

## Repository scope

This repository is the source for **Ancaria for Developers**, the marketing
and documentation front end for the project. It is a React application whose
routes are prerendered to static HTML at build time: a landing page, pages for
players, mods, and developers, and a page on how the loader works. It contains no game code, no loader code, and no build tooling
that any other repository depends on.

The site is a proof-of-concept pitch for a proof-of-concept loader. Its job is
to explain what Ancaria is, show it (with placeholder screenshots until real
ones exist), and get a player to the launcher download or a developer to the
component repositories. It is not the place to duplicate documentation that
already lives in a component repository's README, so link to it instead.

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
                      icons, anything used by more than one page
      pages/         One component per route: Home, Players, Developers, 404,
                      and ErrorPage, the router error element
      data/          Plain data consumed by components: pages.ts (every
                      route's title, description, and canonical URL),
                      structured data, screenshot captions, repository links
      routes.tsx     The route tree, shared by main.tsx and entry-server.tsx
      entry-server.tsx  Renders one route to HTML for the prerender
      styles/        tokens.less (design tokens) and global.less (reset and
                      base typography); everything else is a CSS module
      assets/screenshots/  Placeholder images; see below
    public/          Static files served as-is: the favicons, robots.txt,
                      og-image.png
    tools/           og.html and og.ps1, which render the social card, and
                      prerender.mjs, the last step of the build

## Setup and commands

```text
corepack enable
pnpm install
pnpm dev       # local dev server
pnpm build     # tsc, client and SSR builds, prerender; output in dist/
pnpm preview   # serve the production build locally
pnpm lint      # biome check .
pnpm lint:fix  # biome check --write .
```

CI (`.github/workflows/build.yml`) installs, lints, builds, and on
`master` only runs `wrangler deploy`, which uploads `dist/` and the small
script in `worker/` to the Worker declared in `wrangler.jsonc`. Cloudflare runs no build
step of its own; what ships is exactly what CI built and linted. This needs
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` configured as repository
secrets before it can actually deploy.

The site is a Worker with static assets, not a Pages project. The Worker is
named `ancaria-site` and owns the `ancaria.dev` route; the name in
`wrangler.jsonc` has to keep matching it, because a different name deploys a
second Worker that no domain points at.

The script answers `/files/*` and nothing else (`run_worker_first`), out of
the R2 bucket `ancaria-files` bound as `FILES`. That is where downloads live
that must not be committed to git, starting with `sacred.purehd.zip`, which
the launcher fetches and pins by SHA-256. Keys are flat names only. Nothing in
CI uploads to the bucket; a file goes in by hand:

```
npx wrangler r2 object put ancaria-files/sacred.purehd.zip --file sacred.purehd.zip --content-type application/zip --remote
```

Replacing that archive under the same name breaks every released launcher,
because its digest no longer matches. A new archive needs a launcher release
that raises `purehd.Checksum` and `purehd.Size`.

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
- `public/og-image.png` is generated, not drawn. `pwsh tools/og.ps1` screenshots
  `tools/og.html` in headless Chrome at 1200x630, so the card carries the real
  fonts and gradients. Edit the HTML and rerun the script; do not retouch the
  PNG. The card is PNG rather than WebP because several social crawlers skip a
  WebP image without reporting anything, and `og:image` in `index.html` is an
  absolute URL for the same kind of reason: a crawler resolves a relative one
  against its own host.
- `public/favicon.png` and `public/favicon.ico` are copies of the launcher's
  icon (`launcher/ui/web/icon.png` and `launcher/tools/rsrc/sacred.ico`), which
  `launcher/tools/rsrc/icon.py` cuts from one source image. Replace them from
  that script's output rather than resizing these by hand.
- `src/hooks/useLatestRelease.ts` reads the latest `launcher` release from
  the GitHub API in the browser (version, file name, SHA-256, download URL)
  for the header and the download section. Until it answers, the version
  and hash show as `Shimmer` placeholders, never a guessed value. If it
  fails, they read “Unavailable” and the download links go to the releases
  page. There is no backend. Anything else fetched at run time, such as the
  mod catalogue, also shows `Shimmer` placeholders while it loads.
- Never state or imply that this project is affiliated with, endorsed by, or
  produced by Ascaron Entertainment, THQ Nordic, or any other rights holder
  of Sacred. The footer's disclaimer paragraph carries this; do not weaken it
  when editing the footer.
- Keep the single-player-only, no-DRM-circumvention, no-multiplayer framing
  intact anywhere the project is described. This mirrors the root workspace
  CLAUDE.md and is a hard project boundary, not house style.
- The production origin is `https://ancaria.dev`. Canonical URLs, the
  sitemap, and structured data use it. Do not invent other domains.

## Prerendering and metadata

`pnpm build` runs two Vite builds: the client bundle into `dist/`, then
`src/entry-server.tsx` as an SSR bundle into `dist-ssr/`. `tools/prerender.mjs`
then renders every route in `src/data/pages.ts` into the client's
`index.html` and writes `dist/index.html`, `dist/<route>.html`, `dist/404.html`,
and `dist/sitemap.xml`, and deletes `dist-ssr/`. Crawlers and link previews that
run no JavaScript therefore see each page's text, title, description, and
canonical URL. In the browser, `main.tsx` hydrates that markup.

- A new route goes into both `src/routes.tsx` and `src/data/pages.ts`. The
  second gives it a head, a prerendered file, and a sitemap entry. A route
  missing there renders, but as the 404 page's head.
- `index.html` has no title or description of its own, only a
  `<!--route-head-->` marker. The prerender fills it per route, the dev server
  fills it with the front page's tags (the `route-head` plugin in
  `vite.config.ts`), and `components/layout/RouteHead.tsx` replaces every
  `data-route-head` tag after each client navigation.
- The first render in the browser has to match the prerendered HTML, so a
  component must not read `window`, storage, or the clock while rendering.
  Fetch in an effect and show a `Shimmer` until the data arrives, which is
  also what the prerender captures.
- The front page head carries schema.org JSON-LD from
  `src/data/structuredData.ts`. Never add ratings or reviews to it.
- `prismjs` is bundled into the SSR build (`ssr.noExternal`): its grammar
  files patch a global `Prism`, and loaded as external modules they would run
  before `lib/prismGlobal.ts` sets it.

## Gotchas

- Errors are caught at three levels, and each one exists because the level
  below it cannot help. Every page route has an `errorElement`, so a page that
  throws is replaced while the header and footer keep working. The layout route
  has one too, for the case where the header or footer is what threw and
  rendering the shell again would only throw again. `AppErrorBoundary` in
  `main.tsx` sits above `RouterProvider` for a failure in the router itself.
  All three render `shared/ErrorScreen`, which uses no router hooks and plain
  `<a>` links on purpose: it has to survive a broken router.
- This is the one repository in the workspace with no sibling checkout
  dependency and no generated address table or API jar to keep in sync.
  Nothing here reads `../mappings`, `../coderpack`, or any other sibling.
- `*.module.less` files import `tokens.less` with `@import (reference)`, not
  a plain `@import`. A plain import would emit the token file's own rules
  (there are none, but keep the pattern) into every module that imports it.
- `not_found_handling: "404-page"` in `wrangler.jsonc` answers any path
  without a built file with `dist/404.html` and a 404 status. Every real route
  is a file (`/players` is `players.html`, served without a trailing slash by
  the default `html_handling`), so nothing needs the old single-page fallback,
  which answered unknown paths with the front page and a 200. `vite preview`
  still has that fallback, so check 404 behaviour with `wrangler dev`.
