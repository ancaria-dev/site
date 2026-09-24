# site

Workspace rules, project boundaries, and typography: see `../CLAUDE.md`.

## Scope

- This is the ancaria.dev front end: React routes prerendered to static HTML. It reads no sibling checkout.
- Link to component READMEs; never duplicate their documentation.
- Use pnpm through Corepack (`corepack enable`), as pinned in `packageManager`. Scripts are in `package.json`.
- Use Biome for lint and format. Never add ESLint or Prettier.
- Style with one `*.module.less` per component. Global class names only in `src/styles/global.less`. Import `tokens.less` with `@import (reference)`.

## Deployment

- CI runs `wrangler deploy` on `master` only. Cloudflare builds nothing; what ships is what CI built.
- The site is a Worker with static assets, not a Pages project. Keep the name in `wrangler.jsonc` as `ancaria-site`; another name deploys a second Worker no domain points at.
- The Worker script answers only `/files/*`, from R2 bucket `ancaria-files` bound as `FILES`. Keys are flat names. Upload by hand: `npx wrangler r2 object put ancaria-files/<name> --file <name> --content-type <type> --remote`.
- Never replace `sacred.purehd.zip` under the same name. Released launchers pin its SHA-256 and size; a new archive needs a launcher release (see `../launcher/CLAUDE.md`).
- `not_found_handling: "404-page"` serves `dist/404.html` with status 404. `vite preview` still falls back to the front page, so check 404 behaviour with `wrangler dev`.

## Content

- Never state or imply affiliation with Ascaron Entertainment, THQ Nordic, or another Sacred rights holder. Never weaken the footer disclaimer.
- Keep the single-player, no-DRM-circumvention, no-multiplayer framing wherever the project is described.
- The origin is `https://ancaria.dev`. Never invent another domain.
- `src/styles/tokens.less` is the only source of brand colors, which match the other READMEs' badges.
- Screenshots in `src/assets/screenshots/` are placeholders. Replace a file in place with a real capture of the same name; captions are in `src/data/screenshots.ts`.
- `public/og-image.png` is generated: edit `tools/og.html` and run `pwsh tools/og.ps1`. Never retouch the PNG. Keep it PNG (crawlers skip WebP) and keep `og:image` an absolute URL.
- `public/favicon.png` and `public/favicon.ico` copy the launcher icon from `launcher/tools/rsrc/icon.py`. Replace them from its output, never by resizing.
- Show `Shimmer` placeholders for anything fetched at run time, never a guessed value. If the latest-release lookup fails, show "Unavailable" and link to the releases page. There is no backend.
- Never add ratings or reviews to the JSON-LD in `src/data/structuredData.ts`.

## Prerendering

- Add a new route to both `src/routes.tsx` and `src/data/pages.ts`. Without the second it gets no head, prerendered file, or sitemap entry.
- `index.html` has only a `<!--route-head-->` marker. The prerender, the `route-head` Vite plugin, and `RouteHead.tsx` fill it.
- Never read `window`, storage, or the clock while rendering; the first render must match the prerendered HTML. Fetch in an effect.
- Keep `prismjs` in `ssr.noExternal`. Its grammars patch a global `Prism` and must run after `lib/prismGlobal.ts`.

## Errors

- Keep all three error levels: an `errorElement` on every page route, one on the layout route, and `AppErrorBoundary` above `RouterProvider`.
- `shared/ErrorScreen` must use no router hooks and only plain `<a>` links; it has to survive a broken router.
