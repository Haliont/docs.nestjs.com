<p align="center">
  Русская документация по Nest.js
</p>

<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

<p align="center">Прогрессивный <a href="http://nodejs.org" target="_blank">Node.js</a> фреймворк для разработки эффективных и масштабируемых серверных приложений, вдохновленный фреймворком <a href="https://angular.io" target="_blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#6" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://dev.to/nestjs"><img src="https://img.shields.io/badge/blog-dev.to-green"/></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Описание

Этот проект разработан с помощью [Angular CLI](https://github.com/angular/angular-cli). В нем используется [генератор документации Dgeni](https://github.com/angular/dgeni) для компилирования исходников докуметации из формата markdown в формат для пуликации. Этот репозиторий содержит исходники перевод официальной документации Nest на русский язык.

## Установка

Установите зависимости и запустите локальный сервер выполнив следующие команды:

```bash
$ npm install
$ npm run start
```

Перейдите по адресу [`http://localhost:4200/`](http://localhost:4200/).

Все страницы написаны на [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) и расположенны в директории `content`.

## Сборка

Выполните команду `npm run build` для сборки проекта. Результат сборки будет находится в директрии `dist/`.

Для сборки в _режиме наблюдения_, выполните команду `npm run build:watch`. При любом изменении содержимого будет происходить пересборка, так же будет запущен сервер по адресу [`http://localhost:4200/`](http://localhost:4200/).

Используйте команду `npm run build:prod` для продакшен сборки.

## Стать спонсором

Nest это open source проект с лицензией MIT. Он может развиваться благодаря поддержке спонсоров. Если вы хотите им стать посетите [эту страницу](https://opencollective.com/nest).

## Контакты

- Автор - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Вебсайт - [https://nestjs.com](https://nestjs.com/)
- Твиттер - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
