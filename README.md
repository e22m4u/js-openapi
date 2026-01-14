## @e22m4u/js-openapi

JavaScript модуль для создания
[OpenAPI Документа 3.1.0](https://spec.openapis.org/oas/v3.1.0)

## Содержание

- [Установка](#установка)
- [Базовый пример](#базовый-пример)
- [Работа с компонентами](#работа-с-компонентами)
- [Содержимое запросов и ответов](#содержимое-запросов-и-ответов)
- [Группировка маршрутов](#группировка-маршрутов)
- [Тесты](#тесты)
- [Лицензия](#лицензия)

## Установка

```bash
npm install @e22m4u/js-openapi
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {OADocumentBuilder} from '@e22m4u/js-openapi';
```

*CommonJS*

```js
const {OADocumentBuilder} = require('@e22m4u/js-openapi');
```

## Базовый пример

Создание экземпляра сборщика.

```js
import {OADocumentBuilder} from '@e22m4u/js-openapi';

const builder = new OADocumentBuilder({
  info: {
    title: 'My Simple API',
    version: '0.0.1',
  },
});
```

Определение операции.

```js
import {OAOperationMethod} from '@e22m4u/js-openapi';

builder.defineOperation({
  path: '/status',
  method: OAOperationMethod.GET,
  operation: {
    summary: 'Get server status',
    responses: {
      200: {
        description: 'Server works fine',
      },
    },
  },
});
```

Сборка документа.

```js
const document = builder.build();

console.log(JSON.stringify(document, null, 2));
// {
//   "openapi": "3.1.0",
//   "info": {
//     "title": "My Simple API",
//     "version": "0.0.1"
//   },
//   "paths": {
//     "/status": {
//       "get": {
//         "summary": "Get server status",
//         "responses": {
//           "200": {
//             "description": "Server works fine"
//           }
//         }
//       }
//     }
//   }
// }
```

## Работа с компонентами

Регистрация компонента схемы.

```js
import {OADataType, OAOperationMethod} from '@e22m4u/js-openapi';

builder.defineSchemaComponent({
  name: 'User',
  schema: {
    type: OADataType.OBJECT,
    properties: {
      id: {
        type: OADataType.STRING,
        format: 'uuid',
      },
      email: {
        type: OADataType.STRING,
        format: 'email',
      },
    },
    required: ['id', 'email'],
  },
});
```

Использование зарегистрированного имени схемы.

```js
import {oaRef, OAOperationMethod} from '@e22m4u/js-openapi';

builder.defineOperation({
  path: '/users/{id}',
  method: OAOperationMethod.GET,
  operation: {
    responses: {
      200: {
        description: 'User found',
        content: {
          'application/json': {
            schema: oaRef('User'),
            // утилита "oaRef" создаст объект
            // {"$ref": "#/components/schemas/User"}
          },
        },
      },
    },
  },
});
```

## Содержимое запросов и ответов

Определение тела ответа операции.

```js
import {
  OADataType,
  oaJsonContent,
  OAOperationMethod,
} from '@e22m4u/js-openapi';

builder.defineOperation({
  path: '/status',
  method: OAOperationMethod.GET,
  operation: {
    summary: 'Get server status',
    responses: {
      200: {
        description: 'Server works fine',
        content: oaJsonContent({
          // утилита "oaJsonContent" оборачивает схему
          // в стандартную структуру "application/json"
          type: OADataType.OBJECT,
          properties: {
            status: {
              type: OADataType.STRING,
              example: 'ok',
            },
          },
        }),
      },
    },
  },
});
```

Определение компонента схемы для использования в следующем примере.

```js
import {OADataType} from '@e22m4u/js-openapi';

builder.defineSchemaComponent({
  name: 'UserInput',
  schema: {
    type: OADataType.OBJECT,
    properties: {
      email: {
        type: OADataType.STRING,
        format: 'email',
      },
      password: {
        type: OADataType.STRING,
      },
    },
    required: ['email', 'password'],
  },
});
```

Определение тела запроса и тела ответа с использованием ссылок.

```js
import {oaRef, oaJsonContent, OAOperationMethod} from '@e22m4u/js-openapi';

builder.defineOperation({
  path: '/users',
  method: OAOperationMethod.POST,
  operation: {
    summary: 'Create a new user',
    requestBody: {
      description: 'Data for the new user',
      required: true,
      content: oaJsonContent(oaRef('UserInput')),
      // "content": {
      //   "application/json": {
      //     "schema": {
      //       "$ref": "#/components/schemas/UserInput"
      //     }
      //   }
      // }
    },
    responses: {
      201: {
        description: 'User created',
        content: oaJsonContent(oaRef('User')),
        // "content": {
        //   "application/json": {
        //     "schema": {
        //       "$ref": "#/components/schemas/User"
        //     }
        //   }
        // }
      },
    },
  },
});
```

## Группировка маршрутов

Создание области с общим префиксом пути и тегом.

```js
import {OAOperationMethod} from '@e22m4u/js-openapi';

// создание области /users
const usersScope = builder.createScope({
  pathPrefix: '/users',
  tags: ['User'], // опционально
});

// маршрут GET /users/{id}
usersScope.defineOperation({
  path: '/{id}',
  method: OAOperationMethod.GET,
  operation: {
    summary: 'Find user',
    responses: {
      200: {
        description: 'User found',
      },
    },
  },
});

// маршрут DELETE /users/{id}
usersScope.defineOperation({
  path: '/{id}',
  method: OAOperationMethod.DELETE,
  operation: {
    summary: 'Delete user',
    responses: {
      200: {
        description: 'User deleted',
      },
    },
  },
});
```

Создание вложенных областей для комбинирования маршрутов.

```js
import {OAOperationMethod} from '@e22m4u/js-openapi';

// область "/api/v1"
const v1Scope = builder.createScope({
  pathPrefix: '/api/v1',
});

// область "/api/v1/admin"
const adminScope = v1Scope.createScope({
  pathPrefix: '/admin',
});

// DELETE /api/v1/admin/users/{id}
adminScope.defineOperation({
  path: '/users/{id}',
  method: OAOperationMethod.DELETE,
  operation: {
    summary: 'Delete user',
    responses: {
      200: {
        description: 'User deleted',
      },
    },
  },
});
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
