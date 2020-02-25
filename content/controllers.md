### Контроллеры

Контроллеры ответственны за обработку входящий **запросов** и возврат **ответа** клиенту.

<figure><img src="/assets/Controllers_1.png" /></figure>

Цель контроллера - получение запросов. Механизм **маршрутизации** контроллирует какой контроллер получит запрос. Чаще всего контроллеры содержат более одного маршрута которые отвечают за разные действия.

Чтобы создать бызовый контроллер нужно использовать **декоратор** класса. Декоратоты добавляют в класс необходимые мета данные для того чтобы Nest смог построит карту маршрутов (привязать запросы к соответствующим контроллерам).

#### Маршрутизация

В следующем примерму используется декоратор `@Controller()` необходимый для определения базового контроллера. Мы передадим в декоратор необязательный префикс маршрута - `cats`. Передача префикса маршрута в декоратор `@Controller()` позволяет легко группировать связанные маршруты и избавиться от дублирования повторяющегося кода. К примеру мы можем сгруппировать набор маршрутов отвечающие за взаимодействие с сущностью клиента в контроллере с префиксом `/customers` что избавит нас от повторения этого префикса в каждом маршруте этого контроллера.

```typescript
@@filename(cats.controller)
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll() {
    return 'This action returns all cats';
  }
}
```

> info **Заметка** Для создания контроллера с помощью CLI просто выполните эту команду `$ nest g controller cats`.

Декоратор HTTP глагола `@Get()` перед методом `findAll()` говорит фреймворку создать обработчик для конкретного ендпоинта. Этот ендпоинт соответствует HTTP глаголу (в данном случаее - GET) и пути маршрута. Что же такое путь маршрута? Путь маршрута для обработчика определяется с помощью конкатенирования префикса заданного в декораторе `@Controller(<path_prefix>)` и пути заданном в декораторе запроса. Сейчас у нас задан префикс `cats` для каждого маршрута и не заданно никакого пути в `@Get()` декораторе, Nest сопоставит обработчик этого маршрута с `GET /cats` запросом. Как было уже упомянуто, путь маршрута содержит содержит необязательный префикс пути определенный в декораторе контроллера и строку определенную в декораторе метода запроса. Для примера, префикс пути `customers` совмещенный с декоратором `@Get('profile')` создаст маршрут сопоставленный с запросом `GET /customers/profile`.

В нашем примере выше, когда происходит GET запрос на этот ендпоинт, Nest направляет запрос в метод `findAll()`. Заметьте, что имя метода выбранно абсолютно произвольное. Очевидно, что мы должны определить метод для привязки к маршруту, но Nest не предает никакого значения выбранному имени метода.

Этот метод вернет ответ со статусом 200 и данными которые были возвращенны из метода, в текущем случае это просто строка. Почему так происходит? Для объяснения этого мы сначала познакомимся с концепцией того что Nest имеет 2 разных варианта для обработки запросов:

<table>
  <tr>
    <td>Стандартный (рекомендуется)</td>
    <td>
      Использование этого варианта когда обработчик запроса возвращает JavaScript объект либо массив, то этот объект или массив будет <strong>автоматически</strong> сериализован в JSON. А когда метод будет возвращать примитивный JavaScript тип (например <code>string</code>, <code>number</code>, <code>boolean</code>) Nest не станет пытаться сериализовать это значение а просто его отправит. Это делает обработку запросов очень простой: просто верните значение, а об остальном позаботится Nest.
      <br />
      <br /> Более того, <strong>status code</strong> ответа по умолчанию всегда 200, кроме POST запросов для которых по умолчанию используется 201. Мы очень просто можем изменить это поведение добавив <code>@HttpCode(...)</code> декоратор над обработчиком (смотри <a href='controllers#status-code'>Код статуса</a>)
    </td>
  </tr>
  <tr>
    <td>Библиотеко зависимый</td>
    <td>
      Мы можем использовать <a href="http://expressjs.com/en/api.html#res" rel="nofollow" target="_blank">объект ответа</a> конкретной библиотеки (например Express), который может быть внедрен в аргумент метода с помощью декоратора <code>@Res()</code> (пример: <code>findAll(@Res() response)</code>). С таким подходом у вас появляется возможность (а так же ответсвтенность) использовать собственные методы обработки запросов предоставляемые этим объектом. К примеру используя Express вы можете написать такой код для ответа возврата <code>response.status(200).send()</code>.
    </td>
  </tr>
</table>

> warning **Предупреждение** Вы можете использовать оба подхода сразу. Nest определит когда обработчик использует `@Res()` либо `@Next()` декораторы. Если оба подхода использовать сразу, то стандартный подход **автоматически выключится** для того этого обработчика и больше не будет работать как ожидалось.

#### Объект запроса

Обработчики часто нуждаются в деталях клиентского запроса. Nest предоставляет доступ к [объекту запроса](http://expressjs.com/en/api.html#req) платформы которая используется под капотом (по умолчанию Express). Мы можем получить доступ к объекту запроса проинструктировав Nest внедрить его добавив декоратор `@Req()` в сигнатуру обработчика.

```typescript
@@filename(cats.controller)
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Bind, Get, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  @Bind(Req())
  findAll(request) {
    return 'This action returns all cats';
  }
}
```

> info **Подсказка** Чтобы получить типы `express` (как в примере выше `request: Request`), установите пакет `@types/express`.

Объект запроса представляет собой HTTP-запрос и имеет свойства строки запроса, параметров, HTTP заголовков, и тела (узнать больше [здесь](http://expressjs.com/en/api.html#req)). В большенстве случаев нет необходимости получать эти свойства напрямую. Вместо этого мы можем использовать наши любимые декораторы, такие как `@Body()` или `@Query`, которые доступны из коробки. Ниже есть список декораторов и простых объектов платформы для которых они предназначенны.

<table>
  <tbody>
    <tr>
      <td><code>@Request()</code></td>
      <td><code>req</code></td></tr>
    <tr>
      <td><code>@Response(), @Res()</code><span class="table-code-asterisk">*</span></td>
      <td><code>res</code></td>
    </tr>
    <tr>
      <td><code>@Next()</code></td>
      <td><code>next</code></td>
    </tr>
    <tr>
      <td><code>@Session()</code></td>
      <td><code>req.session</code></td>
    </tr>
    <tr>
      <td><code>@Param(key?: string)</code></td>
      <td><code>req.params</code> / <code>req.params[key]</code></td>
    </tr>
    <tr>
      <td><code>@Body(key?: string)</code></td>
      <td><code>req.body</code> / <code>req.body[key]</code></td>
    </tr>
    <tr>
      <td><code>@Query(key?: string)</code></td>
      <td><code>req.query</code> / <code>req.query[key]</code></td>
    </tr>
    <tr>
      <td><code>@Headers(name?: string)</code></td>
      <td><code>req.headers</code> / <code>req.headers[name]</code></td>
    </tr>
    <tr>
      <td><code>@Ip()</code></td>
      <td><code>req.ip</code></td>
    </tr>
  </tbody>
</table>

<sup>\* </sup> Для совместимости с типами используемой платформы (Express или Fastify), Nest предоставляет декораторы `@Res()` и `@Response()`. `@Res()` это просто алиса для `@Response()`. Оба предоставляют базовый объект `response` используемой платформы. Во время их использования так же стоит импортировать типы для используеммой платформы (к примеру `@types/express`) для получения больших преимуществ. Обратите внимание, что когда вы используете `@Res()` или `@Response()` декораторы в обработчике, вы переключаете Nest в **Библиотеко зависимый режим** для этого обработчика, и теперь вы становитесь ответственным за отправку ответа. Когда вы так делаете, вы должны отправить какой-то запрос сделав вызов на `response` объекте (к примеру `res.json(...)` или `res.send(...)`), либо сервер должен это обрабатывать.

> info **Подсказка** Чтобы научиться создавать кастомные декораторы перейдите [к этой главе](/custom-decorators).

#### Ресурсы

Ранее, мы объявили эндпоинт для получения котов (**GET** route). Обычно мы также хотим предоставить эндпоинт для создания новых записей. Для этого давайте создадим **POST** обработчик:

```typescript
@@filename(cats.controller)
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
@@switch
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create() {
    return 'This action adds a new cat';
  }

  @Get()
  findAll() {
    return 'This action returns all cats';
  }
}
```

Это очень просто. Nest предоставляет декоратоты для стандартных HTTP глаголов `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, `@Head()`, and `@All()`.


#### Подстановочтные знаки маршрутов

Nest имеет хорошую поддержку шаблонных маршрутов. Например, звездочка используется в качестве подстановочного знака и будет соответствовать любой комбинации символов.

```typescript
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```

Путь маршрута `'ab*cd'` будет соответсвовать `abcd`, `ab_cd`, `abecd` и так далее. Символы `?`, `+`, `*`, and `()` могут быть использованны в пути маршрута и являются подмножествами их эквивалентов из регулярных выражений. Дефис (`-`) и точка (`.`) интерпретируются буквально путями на остове строк. (The hyphen ( `-`) and the dot (`.`) are interpreted literally by string-based paths.).

#### Статус код

Как уже упоминалось, статус код ответа по умолчанию всегда **200**, кроме POST запросов у которых он **201**. Мы можем изменить это поведение очень просто добавив `@HttpCode` декоратор на уровне обработчика.

```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

> info **Подсказка** Импортируйте `HttpCode` из пакета `@nestjs/common`.

Часто, статус код не статический, а зависит от каких либо факторов. В этом случае, вы моожете использовать **respnose** (применив декоратор `@Res()`) объект (либо, в случае если это ошибка, выбросить исключение).

#### Заголовки

Для установления заголовка ответа можно использовать декоратор `@Header()` либо объект `response` (и вызвать `res.header()` на прямую).

```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

> info **Подсказка** Импортируйте `Header` из пакета `@nestjs/common`.

#### Перенаправление

Для перенаправления ответа на конкретный URL, вы можете использвать декоратор `@Redirect()` либо `response` объект (вызвав `res.redirect()` напрямую).

`@Redirect()` принимает обязательный аргумент `url` и необязательный аргумент `statusCode`. Аргумент `statuCode` по умолчанию `302` (`Found`) если не указан

```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```

Иногда вы можете захотеть определить HTTP статус код или перенаправить на другой URL динамически. Делайте это возвращая из обработчика маршрута объект такой формы:

```json
{
  "url": string,
  "statusCode": number
}
```

Возвращаемые значения переопределят аргументы переденные в декоратор `@Redirect()`. К примеру:

```typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```

#### Параметры маршрута

Маршруты со стачическим путем не работают когда нужно принимать **динамические данные** как часть запроса (к примеру `GET /cats/` для получения кота с номером айди равным `1`). Для того чтобы определить маршрут с параметрами, мы можем добавить **токены** патаметров маршрута в путь маршрута для получения динамического значения для этой позиции URLa запроса. Токен параметра маршрута в декораторе `@Get()` в примере ниже демонстрирует как это использовать. Параметры маршрута определененные таким способом могуть быть получены с помощью декоратора `@Param()` который должен быть добавлен в сигнатуру метода.

Routes with static paths won't work when you need to accept **dynamic data** as part of the request (e.g., `GET /cats/1` to get cat with id `1`). In order to define routes with parameters, we can add route parameter **tokens** in the path of the route to capture the dynamic value at that position in the request URL. The route parameter token in the `@Get()` decorator example below demonstrates this usage. Route parameters declared in this way can be accessed using the `@Param()` decorator, which should be added to the method signature.

```typescript
@@filename()
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
@@switch
@Get(':id')
@Bind(Param())
findOne(params) {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```

`@Param()` используется для декорирования параметра метода (`params` в примере ниже), и делает параметры маршрута доступными как свойства декорированного параметра внутри тела метода. Как видно в коде ниже, мы можем получить параметр `id` ссылаясь на `params.id`. Вы также можете передать токен определенного параметра в декоратор, и затем обращаться параметру маршрута прямо по имени внутри тела метода.
`@Param()` is used to decorate a method parameter (`params` in the example above), and makes the **route** parameters available as properties of that decorated method parameter inside the body of the method. As seen in the code above, we can access the `id` parameter by referencing `params.id`. You can also pass in a particular parameter token to the decorator, and then reference the route parameter directly by name in the method body.

> info **Подсказака** Импортируйте декоратор `Param` из пакета `@nestjs/common`.

```typescript
@@filename()
@Get(':id')
findOne(@Param('id') id): string {
  return `This action returns a #${id} cat`;
}
@@switch
@Get(':id')
@Bind(Param('id'))
findOne(id) {
  return `This action returns a #${id} cat`;
}
```

#### Sub-Domain Routing

Декоратор `@Controller` может принимать опцию `host` для того чтобы тербовать чтобы HTTP host входящих запросов совпадал с каким-то конкретным значением.
The `@Controller` decorator can take a `host` option to require that the HTTP host of the incoming requests matches some specific value.

```typescript
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```

> **Предупреждение** Поскольку **Fastify** не поддерживает вложенные маршруты, при использовании субдоменной маршрутизации необходимо использовать Express адаптер.
> **Предупреждение** Since **Fastify** lacks support for nested routers, when using sub-domain routing, the (default) Express adapter should be used instead.

Так же как и `path` маршрута, опция `host` может использовать токены для получения динамического значения из имени хоста. Токен параметра хоста в декораторе `@Controller()` в примере ниже демонстрирует это использование. Параметры хоста определенные таким способом могут быть доступны с помощью декоратора `HostParam()`, который должен быть добавлен в сигнатуру метода.

Similar to a route `path`, the `hosts` option can use tokens to capture the dynamic value at that position in the host name.  The host parameter token in the `@Controller()` decorator example below demonstrates this usage.  Host parameters declared in this way can be accessed using the `@HostParam()` decorator, which should be added to the method signature.

```typescript
@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}
```

#### Область применения

Для людей имеющих бекграунд из других языков
Для людей из разных языков программирования может быть неожиданным узнать, что в Nest практически все распределяется между входящими запросами. У нас есть пул соединений с базой данных, синглтон сервисы с глобальным состоянием и т.д. Запомните, что Node.js не следует многопоточной модели запрос/ответ без сохранения состояния, в которой каждый запрос обрабатывается отдельным потоком. Следовательно, использование синглтон экземпляров полность безопасно для наших приложений.
For people coming from different programming language backgrounds, it might be unexpected to learn that in Nest, almost everything is shared across incoming requests. We have a connection pool to the database, singleton services with global state, etc. Remember that Node.js doesn't follow the request/response Multi-Threaded Stateless Model in which every request is processed by a separate thread. Hence, using singleton instances is fully **safe** for our applications.

Однако существуют пограничные случаи когда основанное на запросе время жизни контроллера может быть желательным поведением, к примеру кеширование на каждый запрос в GraphQL приложении, отслеживание запроса или multi-tenancy. Узнать как котролировать область применения можно [здесь](/fundamentals/injection-scopes).

#### Asynchronicity

Мы любим современный JavaScript и мы знаем что извлечение данных это в основном **асинхронные** операции. Это причина по которой Nest имеет поддержку и хорошо работает с `async` функциями.

> info **Подсказка** Узнай больше о `async / await` функциях [здесь](https://kamilmysliwiec.com/typescript-2-1-introduction-async-await)

Каждая асинхронная функция возвращает `Promise`. Это означает что вы можете вернуть отложенное значение которое Nest зарезолвит самостоятельно. Давайте посмотрим этот пример:
Every async function has to return a `Promise`. This means that you can return a deferred value that Nest will be able to resolve by itself. Let's see an example of this:

```typescript
@@filename(cats.controller)
@Get()
async findAll(): Promise<any[]> {
  return [];
}
@@switch
@Get()
async findAll() {
  return [];
}
```

Код выше полностью валидный. Более того, обработчики маршрутов в Nest еще более мощные, т.к. могут возвращать RxJS [observable streams](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html). Nest автоматически подпишется на источник собития в возьмет последнее эммитнутое событие (как только поток завершится).
The above code is fully valid. Furthermore, Nest route handlers are even more powerful by being able to return RxJS [observable streams](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html). Nest will automatically subscribe to the source underneath and take the last emitted value (once the stream is completed).

```typescript
@@filename(cats.controller)
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
@@switch
@Get()
findAll() {
  return of([]);
}
```

Оба из вышеперечисленных подходов работают и вы можете использовать все, что соотвутствует вашим требованиям.

#### Request payloads

Наш предыдущий пример POST обработчика не принимает никаких параметров от клиента. Давайте исправим это добавив `@Body()` декоратор.
Our previous example of the POST route handler didn't accept any client params. Let's fix this by adding the `@Body()` decorator here.

Но сперва (если вы используете TypeScript), нам нужно определить **DTO** (Data Transfer Object) схему. DTO это объект который определяет в каком виде данные будут отправленны по сети. Мы можем определить DTO схему используя **TypeScript** интерфейсы, либо простой класс. Что интересно, мы рекомендуем использовать **классы**. Почему? Классы это часть JavaScript ES6 стандарта, следовательно они сохраняются как настоящие сущности в скомпилированном JavaScript. С другой стороны, поскольку TypeScript интерфейсы удалаются во время транспиляции, Nest не может обращаться к ним во время выполнения программы. Это важно, потому что такой функционал как **Pipes** предоставляют дополнительные возможности когда они имеют доступ к мета-типу переменной во время выполнения.
But first (if you use TypeScript), we need to determine the **DTO** (Data Transfer Object) schema. A DTO is an object that defines how the data will be sent over the network. We could determine the DTO schema by using **TypeScript** interfaces, or by simple classes. Interestingly, we recommend using **classes** here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as **Pipes** enable additional possibilities when they have access to the metatype of the variable at runtime.

Давайте создадим `CreateCatDto` класс:

```typescript
@@filename(create-cat.dto)
export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
```

Он имеет только три базовых свойства. После чего мы можем использовать новосозданный DTO внутри `CatsController`;

```typescript
@@filename(cats.controller)
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
@@switch
@Post()
@Bind(Body())
async create(createCatDto) {
  return 'This action adds a new cat';
}
```

#### Обработка ошибок

Есть отдельная [глава об обработке ошибок](/exception-filters) (т.е. работа с исключениями).

#### Full resource sample

Ниже приведен пример, который использует несколько доступных декораторов для создания базового контроллера. Этот контроллер предоставляет набор методов для получения и манипулирования данными.

```typescript
@@filename(cats.controller)
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
@@switch
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Bind(Body())
  create(@Body() createCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  @Bind(Query())
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  @Bind(Param('id'))
  findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  @Bind(Param('id'), Body())
  update(@Param('id') id, @Body() updateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  @Bind(Param('id'))
  remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }
}
```

#### Getting up and running

Хоть вышеупомянутый контроллер определен и имеет набор методов, Nest все еще не знает о существовании `CatsController` и как результат Nest не будет создавать экземпляр этого класса.

Контроллеры всегда пренадлежат модулю, по этой причине мы указываем массив `controllers` в декораторе `@Module()`. Посколько мы еще не определили другие модули, кроме корневого `AppModule`, мы добавим в него `CatsController`:

```typescript
@@filename(app.module)
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

Мы добавили метаданные для класса модуля используя декоратор `@Module()`, и Nest c легкостью может понять какие контроллеры должны быть созданны.

#### Приложение: Библиотеко-зависимый подход

До сих пор мы обсуждали стандартный подход работы с ответами. Второй способ работы с ответами это использование [объекта response](http://expressjs.com/en/api.html#res). Чтобы внедрить объект response, нам нужно использовать декоратор `@Res()`. Чтобы показать различия, давайте перепишем `CatsController`:

```typescript
@@filename()
import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
@@switch
import { Controller, Get, Post, Bind, Res, Body, HttpStatus } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Bind(Res(), Body())
  create(res, createCatDto) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  @Bind(Res())
  findAll(res) {
     res.status(HttpStatus.OK).json([]);
  }
}
```

Хоть этот подход работает и дает больше гибкости в некоторых ситуация предоставляя полный контроль для объектом ответа (манипулирование заголовками, специфичные для библиотеки функции и т.д), все же его нужно использовать с осторожностью. В основном этот подход менее понятный и имеет некоторые недостатки. Главный недостаток это то что вы теряете совместимость c функциями Nest которые зависят от стандартной обработки запросов в Nest, такими как Интерцепторы и `@HttpCode()` декоратор. Также ваш код может стать зависимым от платформы (так как библиотеки разных платформ могут иметь разный API у объекта ответа), и сложнее в тестированнии (вам придется мокать объект запроса и т.д.).
<!-- Though this approach works, and does in fact allow for more flexibility in some ways by providing full control of the response object (headers manipulation, library-specific features, and so on), it should be used with care. In general, the approach is much less clear and does have some disadvantages. The main disadvantages are that you lose compatibility with Nest features that depend on Nest standard response handling, such as Interceptors and the `@HttpCode()` decorator. Also, your code can become platform-dependent (as underlying libraries may have different APIs on the response object), and harder to test (you'll have to mock the response object, etc.). -->

В результате стандартный подход всегда должен быть предпочтительнее, если это возможно.
