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

Quellcode von **Ancaria for Developers**, der einseitigen Projektseite. Eine
Startseite, eine Seite für Spieler und eine Seite für Entwickler, gebaut als
statische Anwendung und über Cloudflare Pages veröffentlicht.

Das ist das Schaufenster eines Proof of Concept, kein eigenständiges Produkt.
Die Seite soll erklären, was Ancaria ist, es zeigen (vorerst mit
Platzhaltern statt Screenshots) und einen Spieler zum Launcher-Download oder
einen Entwickler zum passenden Repository führen. Dokumentation, die bereits
im README eines Komponenten-Repositories steht, wird hier nicht dupliziert --
stattdessen gibt es einen Link.

## Stack

React 19 mit TypeScript, Routing über `react-router-dom`, Styling mit LESS in
CSS-Modulen, Build mit Vite, Linting und Formatierung ausschließlich mit
Biome -- weder ESLint noch Prettier sind konfiguriert. Paketmanager ist
pnpm, dessen Version in `package.json` festgelegt und über Corepack
aufgelöst wird.

## Entwicklung

```text
corepack enable
pnpm install
pnpm dev       # lokaler Entwicklungsserver
pnpm build     # tsc -b && vite build, Ausgabe in dist/
pnpm preview   # Produktions-Build lokal testen
pnpm lint       # biome check .
pnpm lint:fix   # biome check --write .
```

## Deployment

Die CI in `.github/workflows/build.yml` installiert Abhängigkeiten, prüft
den Lint, baut das Projekt und veröffentlicht auf `master` `dist/` per
Direct Upload mit `wrangler` auf Cloudflare Pages. Der eigene Build-Schritt
von Cloudflare Pages wird nicht verwendet -- live landet genau das, was die
CI zuvor gebaut und geprüft hat. Für eine tatsächliche Veröffentlichung
müssen `CLOUDFLARE_API_TOKEN` und `CLOUDFLARE_ACCOUNT_ID` als
Repository-Secrets hinterlegt sein.

## Platzhalter

Die Screenshots in `src/assets/screenshots/` sind einfarbige WebP-Dateien,
benannt nach dem, was später darauf zu sehen sein wird (`launcher.webp`,
`ingame.webp` und so weiter). Die Bildunterschriften liegen in
`src/data/screenshots.ts`. Die Release-Daten (Version, Dateiname, SHA-256,
Download-Link) in `src/data/release.ts` sind von Hand gepflegt und
aktualisieren sich nicht selbst -- die Seite hat kein Backend.

## Haftungsausschluss

Ancaria ist ausschließlich für den Einzelspielermodus gedacht. Das Projekt
umgeht kein DRM, verschafft keinen Mehrspieler-Vorteil -- einen Mehrspieler-
modus gibt es nicht -- und verbreitet keine Dateien des Spiels selbst. Hooks
existieren nur im laufenden Prozess und verschwinden mit ihm. Die Seite steht
in keiner Verbindung zu Ascaron Entertainment, THQ Nordic oder anderen
Rechteinhabern von Sacred und darf nie so formuliert werden, dass eine
solche Verbindung nahegelegt wird.

## Lizenz

Der Code steht unter der MIT-Lizenz. Der vollständige Text befindet sich in
[LICENSE](LICENSE).
