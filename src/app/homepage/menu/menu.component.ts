import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  @Input()
  isSidebarOpened = true;
  readonly items = [
    {
      title: 'Вступление',
      isOpened: false,
      path: '/',
    },
    {
      title: 'Обзор',
      isOpened: true,
      children: [
        { title: 'Первые шаги', path: '/first-steps' },
        { title: 'Контроллеры', path: '/controllers' },
        { title: 'Провайдеры', path: '/providers' },
        { title: 'Модули', path: '/modules' },
        { title: 'Мидлвары', path: '/middleware' },
        { title: 'Фильтры исключений', path: '/exception-filters' },
        { title: 'Пайпы', path: '/pipes' },
        { title: 'Гуарды', path: '/guards' },
        { title: 'Интерцепторы', path: '/interceptors' },
        { title: 'Пользовательские декораторы', path: '/custom-decorators' },
      ],
    },
    {
      title: 'Основы',
      isOpened: false,
      children: [
        { title: 'Пользовательские дектораторы', path: '/fundamentals/custom-providers' },
        {
          title: 'Асинхронные провайдеры',
          path: '/fundamentals/async-providers',
        },
        {
          title: 'Динамические модули',
          path: '/fundamentals/dynamic-modules',
        },
        {
          title: 'Injection scopes',
          path: '/fundamentals/injection-scopes',
        },
        {
          title: 'Циклические зависимости',
          path: '/fundamentals/circular-dependency',
        },
        {
          title: 'Module reference',
          path: '/fundamentals/module-ref',
        },
        {
          title: 'Контекст выполнения',
          path: '/fundamentals/execution-context',
        },
        {
          title: 'События жизненного цикла',
          path: '/fundamentals/lifecycle-events',
        },
        {
          title: 'Platform agnosticism (Независимость от платформы?)',
          path: '/fundamentals/platform-agnosticism',
        },
        { title: 'Тестирование', path: '/fundamentals/testing' },
      ],
    },
    {
      title: 'Техники',
      isOpened: false,
      children: [
        { title: 'Аутентификация', path: '/techniques/authentication' },
        { title: 'База данных', path: '/techniques/database' },
        { title: 'Mongo', path: '/techniques/mongodb' },
        { title: 'Конфигурирование', path: '/techniques/configuration' },
        { title: 'Валидация', path: '/techniques/validation' },
        { title: 'Кеширование', path: '/techniques/caching' },
        { title: 'Сериализация', path: '/techniques/serialization' },
        { title: 'Планирование задач', path: '/techniques/task-scheduling' },
        { title: 'Компрессия', path: '/techniques/compression' },
        { title: 'Безопасность', path: '/techniques/security' },
        { title: 'Очереди', path: '/techniques/queues' },
        { title: 'Логгер', path: '/techniques/logger' },
        { title: 'Загрузка файла', path: '/techniques/file-upload' },
        { title: 'HTTP модуль', path: '/techniques/http-module' },
        { title: 'Модель-представление-контроллер', path: '/techniques/mvc' },
        { title: 'Произовдительность (Fastify)', path: '/techniques/performance' },
      ],
    },
    {
      title: 'GraphQL',
      isOpened: false,
      children: [
        { title: 'Quick start', path: '/graphql/quick-start' },
        { title: 'Resolvers', path: '/graphql/resolvers-map' },
        { title: 'Mutations', path: '/graphql/mutations' },
        { title: 'Subscriptions', path: '/graphql/subscriptions' },
        { title: 'Scalars', path: '/graphql/scalars' },
        {
          title: 'Tooling',
          path: '/graphql/tooling',
        },
      ],
    },
    {
      title: 'WebSockets',
      isOpened: false,
      children: [
        { title: 'Gateways', path: '/websockets/gateways' },
        { title: 'Exception filters', path: '/websockets/exception-filters' },
        { title: 'Pipes', path: '/websockets/pipes' },
        { title: 'Guards', path: '/websockets/guards' },
        { title: 'Interceptors', path: '/websockets/interceptors' },
        { title: 'Adapters', path: '/websockets/adapter' },
      ],
    },
    {
      title: 'Microservices',
      isOpened: false,
      children: [
        { title: 'Overview', path: '/microservices/basics' },
        { title: 'Redis', path: '/microservices/redis' },
        { title: 'MQTT', path: '/microservices/mqtt' },
        { title: 'NATS', path: '/microservices/nats' },
        { title: 'RabbitMQ', path: '/microservices/rabbitmq' },
        { title: 'Kafka', path: '/microservices/kafka' },
        { title: 'gRPC', path: '/microservices/grpc' },
        {
          title: 'Exception filters',
          path: '/microservices/exception-filters',
        },
        { title: 'Pipes', path: '/microservices/pipes' },
        { title: 'Guards', path: '/microservices/guards' },
        { title: 'Interceptors', path: '/microservices/interceptors' },
      ],
    },
    {
      title: 'Application context',
      isOpened: false,
      path: '/application-context',
    },
    {
      title: 'CLI',
      isOpened: false,
      children: [
        { title: 'Overview', path: '/cli/overview' },
        { title: 'Workspaces', path: '/cli/monorepo' },
        { title: 'Libraries', path: '/cli/libraries' },
        { title: 'Usage', path: '/cli/usages' },
        { title: 'Scripts', path: '/cli/scripts' },
      ],
    },
    {
      title: 'Recipes',
      isOpened: false,
      children: [
        { title: 'TypeORM', path: '/recipes/sql-typeorm' },
        { title: 'Mongoose', path: '/recipes/mongodb' },
        { title: 'Sequelize', path: '/recipes/sql-sequelize' },
        { title: 'CQRS', path: '/recipes/cqrs' },
        { title: 'OpenAPI (Swagger)', path: '/recipes/swagger' },
        { title: 'Prisma', path: '/recipes/prisma' },
        { title: 'Health checks (Terminus)', path: '/recipes/terminus' },
        { title: 'Documentation', path: '/recipes/documentation' },
        { title: 'CRUD utilities', path: '/recipes/crud-utilities' },
        { title: 'Hot reload', path: '/recipes/hot-reload' },
        { title: 'Serve static', path: '/recipes/serve-static' },
      ],
    },
    {
      title: 'FAQ',
      isOpened: false,
      children: [
        { title: 'HTTP adapter', path: '/faq/http-adapter' },
        { title: 'Global path prefix', path: '/faq/global-prefix' },
        { title: 'Hybrid application', path: '/faq/hybrid-application' },
        { title: 'HTTPS & multiple servers', path: '/faq/multiple-servers' },
        { title: 'Request lifecycle', path: '/faq/request-lifecycle' },
        {
          title: 'Examples',
          externalUrl: 'https://github.com/nestjs/nest/tree/master/sample',
        },
      ],
    },
    {
      title: 'Migration guide',
      isOpened: false,
      path: '/migration-guide',
    },
    {
      title: 'Discover',
      isOpened: false,
      children: [{ title: 'Who is using Nest?', path: '/discover/companies' }],
    },
    {
      title: 'Support us',
      isOpened: false,
      path: '/support',
    },
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (!Array.isArray(this.router.events)) {
      return;
    }
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => this.toggleCategory());

    this.toggleCategory();
  }

  toggleCategory() {
    const { firstChild } = this.route.snapshot;
    if (
      (firstChild.url && firstChild.url[1]) ||
      (firstChild.url &&
        firstChild.routeConfig &&
        firstChild.routeConfig.loadChildren)
    ) {
      const { path } = firstChild.url[0];
      const index = this.items.findIndex(
        ({ title }) => title.toLowerCase() === path,
      );
      if (index < 0) {
        return;
      }
      this.items[index].isOpened = true;
      this.items[1].isOpened = false;
    }
  }
}
