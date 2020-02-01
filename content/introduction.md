### Вступление

Nest (NestJS) это фреймворк для построения эффективных, масштабируемых сервер-сайд приложений. В нем используется прогрессивный JavaScript, он разработан на [TypeScript](http://www.typescriptlang.org/) и полностью его поддерживает (тем не менее позволяет разработчикам писать код на чистом JavaScript) и комбинирует в себе элементы ООП (Объектно ориентированное программирование), ФП (Функциональное программирование) и ФРП (Функционально-реактивное программирование).

Под капотом использует надежные HTTP фреймворки такие как [Express](https://expressjs.com/) (по умолчанию) и по желанию может быть сконфигурирован на использвание [Fastify](https://github.com/fastify/fastify).

Nest предоставляет уровень абстракции над этими Node.js фреймворками (Express/Fastify), но так же предоставляет их API для разработчика. Это позволяет разработчикам свободно использвать большое множество сторонних модулей которые доступны для базовой платформы.

#### Philosophy

In recent years, thanks to Node.js, JavaScript has become the “lingua franca” of the web for both front and backend applications. This has given rise to awesome projects like [Angular](https://angular.io/), [React](https://github.com/facebook/react) and [Vue](https://github.com/vuejs/vue), which improve developer productivity and enable the creation of fast, testable, and extensible frontend applications. However, while plenty of superb libraries, helpers, and tools exist for Node (and server-side JavaScript), none of them effectively solve the main problem of - **Architecture**.

Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled, and easily maintainable applications.

#### Installation

To get started, you can either scaffold the project with the [Nest CLI](/cli/overview), or clone a starter project (both will produce the same outcome).

To scaffold the project with the Nest CLI, run the following commands. This will create a new project directory, and populate the directory with the initial core Nest files and supporting modules, creating a conventional base structure for your project. Creating a new project with the **Nest CLI** is recommended for first-time users. We'll continue with this approach in [First Steps](first-steps).

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

Alternatively, to install the TypeScript starter project with **Git**:

```bash
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

Open your browser and navigate to `http://localhost:3000/`.

To install the JavaScript flavor of the starter project, use `javascript-starter.git` in the command sequence above.

You can also manually create a new project from scratch by installing the core and supporting files with **npm** (or **yarn**). In this case, of course, you'll be responsible for creating the project boilerplate files yourself.

```bash
$ npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```

#### Stay in touch

- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
