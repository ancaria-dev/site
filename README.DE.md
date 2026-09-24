<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=1C1410)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1C1410)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=1C1410)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=for-the-badge&logo=biome&logoColor=white&labelColor=1C1410)
![Sacred](https://img.shields.io/badge/Sacred-Community-8B1A1A?style=for-the-badge&labelColor=1C1410)
![License](https://img.shields.io/badge/License-MIT-C9A227?style=for-the-badge&labelColor=1C1410)

[Русский](README.md) · [English](README.EN.md)

</div>

# Site

Die Quellen von [ancaria.dev](https://ancaria.dev), der Seite, die Spieler zum
Launcher und Entwickler zum passenden Repository bringt.

Die Seite erklärt, was ancaria ist, und zeigt es in Aktion. Die ausführliche
Doku wiederholt sie nicht, sondern verlinkt die READMEs der Komponenten.

Ein Backend gibt es nicht. Die Seiten lesen die Launcher-Version und die
Mod-Liste beim Öffnen direkt von GitHub.

## Erste Schritte

```text
corepack enable
pnpm install
pnpm dev
```

`pnpm dev` startet einen lokalen Entwicklungsserver.

## Stack

React 19 und TypeScript, Routing mit `react-router-dom`, Styles in
LESS-CSS-Modulen, Build mit Vite. Biome ist der einzige Linter und Formatierer.
Paketmanager ist pnpm, festgelegt in `package.json` und bereitgestellt von
Corepack.

## Platzhalter

Die Screenshots in `src/assets/screenshots/` sind vorerst einfarbige
Platzhalter. Jede Datei heißt nach dem, was sie einmal zeigen wird:
`launcher.webp`, `ingame.webp` und so weiter. Für einen echten Screenshot
ersetzt du einfach die Datei unter demselben Namen. Die Bildunterschriften
stehen in `src/data/screenshots.ts`.

## Haftungsausschluss

ancaria ist nur für den Einzelspielermodus gedacht. Das Projekt umgeht kein
DRM, verbreitet keine Spieldateien und verschafft keinen Vorteil im
Mehrspielermodus, denn den gibt es hier nicht. Die Hooks leben nur im
laufenden Spiel und verschwinden mit ihm.

Die Seite steht in keiner Verbindung zu Ascaron Entertainment, THQ Nordic oder
anderen Rechteinhabern von Sacred. Formulier Texte nie so, als gäbe es eine.

## Bauen

```text
pnpm build
pnpm lint
```

`pnpm build` prüft die Typen und baut die Seite nach `dist/`. `pnpm preview`
liefert diesen Build lokal aus, und `pnpm lint:fix` behebt, was Biome meldet.

## Releases

Releases hat die Seite keine. Die CI in `.github/workflows/build.yml` prüft und
baut jeden Pull Request und Push auf `master` und veröffentlicht `dist/` von `master` aus im
Cloudflare-Worker `ancaria-site`. Live geht genau das, was die CI gebaut hat.
Dafür braucht das Repository die Secrets `CLOUDFLARE_API_TOKEN` und
`CLOUDFLARE_ACCOUNT_ID`.

Derselbe Worker liefert `/files/*` aus dem R2-Bucket `ancaria-files`. Dort
liegen Dateien, die nicht ins Git gehören, etwa das pureHD-Archiv für den
Launcher.

## Lizenz

MIT, siehe [LICENSE](LICENSE).
