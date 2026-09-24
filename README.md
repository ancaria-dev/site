<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=1C1410)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1C1410)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=1C1410)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=for-the-badge&logo=biome&logoColor=white&labelColor=1C1410)
![Sacred](https://img.shields.io/badge/Sacred-Community-8B1A1A?style=for-the-badge&labelColor=1C1410)
![License](https://img.shields.io/badge/License-MIT-C9A227?style=for-the-badge&labelColor=1C1410)

[English](README.EN.md) · [Deutsch](README.DE.md)

</div>

# Site

Исходники [ancaria.dev](https://ancaria.dev) — сайта, который приводит игрока
к лаунчеру, а разработчика к нужному репозиторию.

Сайт объясняет, что такое ancaria, и показывает её в деле. Подробную
документацию он не повторяет, а ссылается на README компонентов.

Бэкенда у сайта нет. Версию лаунчера и список модов страницы читают прямо с
GitHub при открытии.

## Как начать

```text
corepack enable
pnpm install
pnpm dev
```

`pnpm dev` запускает локальный сервер разработки.

## Стек

React 19 и TypeScript, маршруты на `react-router-dom`, стили на LESS в
CSS-модулях, сборка на Vite. Линтер и форматтер — только Biome. Пакетный
менеджер — pnpm, его версию задаёт `package.json`, а подключает Corepack.

## Правовая оговорка

ancaria работает только в одиночной игре. Проект не обходит DRM, не
распространяет файлы игры и не даёт преимуществ в мультиплеере: мультиплеера
в нём нет. Хуки живут только в запущенной игре и исчезают вместе с ней.

Сайт не связан с Ascaron Entertainment, THQ Nordic и другими правообладателями
Sacred. Не пишите тексты так, будто такая связь есть.

## Сборка

```text
pnpm build
pnpm lint
```

`pnpm build` проверяет типы и собирает сайт в `dist/`. `pnpm preview` отдаёт
эту сборку локально, а `pnpm lint:fix` исправляет замечания Biome.

## Релизы

Релизов у сайта нет. CI в `.github/workflows/build.yml` проверяет и собирает
каждый пул-реквест и пуш в `master`, а с `master` выкладывает `dist/` в Cloudflare Worker
`ancaria-site`. На прод попадает ровно то, что собрал CI. Для этого в
репозитории должны быть секреты `CLOUDFLARE_API_TOKEN` и
`CLOUDFLARE_ACCOUNT_ID`.

Тот же Worker отдаёт `/files/*` из бакета R2 `ancaria-files`. Там лежат
файлы, которым не место в git, например архив pureHD для лаунчера.

## Лицензия

MIT, см. [LICENSE](LICENSE).
