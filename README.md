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

Исходники **Ancaria for Developers** -- одностраничного сайта проекта.
Лендинг, страница для игроков и страница для разработчиков, собранные как
статическое приложение и опубликованные через Cloudflare Pages.

Это витрина proof of concept, а не отдельный продукт. Задача сайта --
объяснить, что такое Ancaria, показать это (пока плейсхолдерами вместо
скриншотов) и довести игрока до скачивания лаунчера, а разработчика -- до
репозитория, который ему нужен. Документация, которая уже есть в README
компонентных репозиториев, здесь не дублируется -- вместо этого стоит ссылка.

## Стек

React 19 и TypeScript, маршрутизация через `react-router-dom`, стили на LESS
в CSS-модулях, сборка на Vite, линт и форматирование только через Biome --
ни ESLint, ни Prettier здесь нет. Пакетный менеджер -- pnpm, версия закреплена
в `package.json` и разрешается через Corepack.

## Разработка

```text
corepack enable
pnpm install
pnpm dev       # локальный сервер разработки
pnpm build     # tsc -b && vite build, результат в dist/
pnpm preview   # проверить продакшн-сборку локально
pnpm lint       # biome check .
pnpm lint:fix   # biome check --write .
```

## Деплой

CI в `.github/workflows/build.yml` ставит зависимости, прогоняет линт,
собирает проект и на `master` публикует `dist/` в Cloudflare Pages прямой
загрузкой через `wrangler`. Собственный шаг сборки Cloudflare Pages не
используется: на проде оказывается ровно то, что уже собрал и проверил CI.
Для реальной публикации в репозитории должны быть настроены секреты
`CLOUDFLARE_API_TOKEN` и `CLOUDFLARE_ACCOUNT_ID`.

## Плейсхолдеры

Скриншоты в `src/assets/screenshots/` -- залитые цветом WebP-файлы,
названные по тому, что на них появится (`launcher.webp`, `ingame.webp` и
так далее). Подписи лежат в `src/data/screenshots.ts`. Данные о релизе
(версия, имя файла, SHA-256, ссылка на скачивание) в `src/data/release.ts`
заполнены вручную и не обновляются автоматически -- бэкенда у сайта нет.

## Дисклеймер

Ancaria рассчитана только на одиночную игру. Проект не обходит DRM, не даёт
преимуществ в мультиплеере -- потому что мультиплеера здесь нет -- и не
распространяет файлы самой игры. Хуки существуют только в работающем
процессе и исчезают вместе с ним. Сайт не связан с Ascaron Entertainment,
THQ Nordic и другими правообладателями Sacred, и не должен формулироваться
так, будто это связь подразумевается.

## Лицензия

Код распространяется по лицензии MIT. Полный текст находится в
[LICENSE](LICENSE).
