## @e22m4u/js-openapi

JavaScript модуль для создания
[OpenAPI Документа 3.1.2](https://spec.openapis.org/oas/v3.1.2)

Модуль автоматически проверяет структуру документа при определении компонентов
и операций. В случае передачи некорректного или неизвестного ключевого слова
генерируется исключение с указанием точного пути к ошибке.

## Содержание

- [Установка](#установка)
- [Базовый пример](#базовый-пример)
- [Работа с компонентами](#работа-с-компонентами)
- [Содержимое запросов и ответов](#содержимое-запросов-и-ответов)
- [Группировка операций](#группировка-операций)
- [Константы](#константы)
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

Сборка документа в виде JavaScript объекта.

```js
const oaDocumentObject = builder.build();

console.log(oaDocumentObject);
// {
//   openapi: '3.1.2',
//   info: {
//     title: 'My Simple API',
//     version: '0.0.1'
//   },
//   paths: {
//     '/status': {
//       get: {
//         summary: 'Get server status',
//         responses: {
//           '200': {
//             description: 'Server works fine'
//           }
//         }
//       }
//     }
//   }
// }
```

Формирование JSON документа (сериализация).

```js
const jsonDoc = builder.buildJson(2);
// первый аргумент указывает количество пробелов
// для каждого уровня вложенности, и может быть
// опущен в целях экономии размера документа

console.log(jsonDoc);
// {
//   "openapi": "3.1.2",
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

builder.defineSchemaComponent('User', {
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
});
```

Регистрация компонента параметра.

```js
import {OADataType, OAParameterLocation} from '@e22m4u/js-openapi';

builder.defineParameterComponent('idParam', {
  // фактическое имя параметра может
  // отличаться от имени компонента
  name: 'id',
  in: OAParameterLocation.PATH,
  description: 'Identifier',
  required: true,
});
```

Использование зарегистрированного имени компонента.

```js
import {
  oaSchemaRef,
  OAMediaType,
  oaParameterRef,
  OAOperationMethod,
} from '@e22m4u/js-openapi';

// GET /users/{id}
builder.defineOperation({
  path: '/users/{id}',
  method: OAOperationMethod.GET,
  operation: {
    parameters: [
      oaParameterRef('idParam'), // <= ссылка на параметр
      // утилита "oaParameterRef" создаст объект-ссылку:
      // {"$ref": "#/components/parameters/idParam"}
    ],
    responses: {
      200: {
        description: 'User found',
        content: {
          [OAMediaType.APPLICATION_JSON]: {
            schema: oaSchemaRef('User'), // <= ссылка на схему
            // утилита "oaSchemaRef" создаст объект-ссылку:
            // {"$ref": "#/components/schemas/User"}
          },
        },
      },
    },
  },
});
```

## Содержимое запросов и ответов

Определение тела запроса операции.

```js
import {OADataType, OAMediaType, OAOperationMethod} from '@e22m4u/js-openapi';

// POST /users
builder.defineOperation({
  path: '/users',
  method: OAOperationMethod.POST,
  operation: {
    summary: 'Create a new user',
    // тело запроса
    requestBody: {
      description: 'Data for the new user',
      required: true,
      content: {
        [OAMediaType.APPLICATION_JSON]: {
          // схема тела
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
        },
      },
    },
  },
});
```

Определение тела ответа операции.

```js
import {OADataType, OAMediaType, OAOperationMethod} from '@e22m4u/js-openapi';

// GET /status
builder.defineOperation({
  path: '/status',
  method: OAOperationMethod.GET,
  operation: {
    summary: 'Get server status',
    responses: {
      // успешный ответ
      200: {
        description: 'Server works fine',
        content: {
          [OAMediaType.APPLICATION_JSON]: {
            // схема ответа
            schema: {
              type: OADataType.OBJECT,
              properties: {
                status: {
                  type: OADataType.STRING,
                  example: 'ok',
                },
              },
            },
          },
        },
      },
    },
  },
});
```

Определение компонента схемы для следующего примера.

```js
import {OADataType} from '@e22m4u/js-openapi';

// структура начальных данных пользователя
builder.defineSchemaComponent('UserInput', {
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
});
```

Определение содержания запроса и ответа с использованием ссылок.

```js
import {oaSchemaRef, OAMediaType, OAOperationMethod} from '@e22m4u/js-openapi';

// POST /users
builder.defineOperation({
  path: '/users',
  method: OAOperationMethod.POST,
  operation: {
    summary: 'Create a new user',
    // тело запроса
    requestBody: {
      description: 'Data for the new user',
      required: true,
      content: {
        [OAMediaType.APPLICATION_JSON]: {
          schema: oaSchemaRef('UserInput'), // <= ссылка на схему
        },
      },
    },
    responses: {
      // успешный ответ
      201: {
        description: 'User created',
        content: {
          [OAMediaType.APPLICATION_JSON]: {
            schema: oaSchemaRef('User'), // <= ссылка на схему
          },
        },
      },
    },
  },
});
```

## Группировка операций

Создание группы операций с общим префиксом пути и тегом.

```js
import {OAOperationMethod} from '@e22m4u/js-openapi';

// создание группы /users
const usersOps = builder.createOperationGroup({
  pathPrefix: '/users',
  tags: ['User'], // опционально
});

// операция GET /users/{id}
usersOps.defineOperation({
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

// операция DELETE /users/{id}
usersOps.defineOperation({
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

Создание вложенных групп для комбинирования операций.

```js
import {OAOperationMethod} from '@e22m4u/js-openapi';

// группа "/api/v1"
const v1Ops = builder.createOperationGroup({
  pathPrefix: '/api/v1',
});

// группа "/api/v1/admin"
const adminOps = v1Ops.createOperationGroup({
  pathPrefix: '/admin',
});

// DELETE /api/v1/admin/users/{id}
adminOps.defineOperation({
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

## Константы

Operation Method

```js
/**
 * Operation Method.
 * https://spec.openapis.org/oas/v3.1.2#path-item-object
 */
export const OAOperationMethod = {
  GET: 'get',
  PUT: 'put',
  POST: 'post',
  DELETE: 'delete',
  OPTIONS: 'options',
  HEAD: 'head',
  PATCH: 'patch',
  TRACE: 'trace',
};
```

Parameter Location

```js
/**
 * Parameter Location.
 * https://spec.openapis.org/oas/v3.1.2#parameter-locations
 */
export const OAParameterLocation = {
  QUERY: 'query',
  HEADER: 'header',
  PATH: 'path',
  COOKIE: 'cookie',
};
```

Parameter Style

```js
/**
 * Parameter Style.
 * https://spec.openapis.org/oas/v3.1.2#style-values
 */
export const OAParameterStyle = {
  MATRIX: 'matrix',
  LABEL: 'label',
  FORM: 'form',
  SIMPLE: 'simple',
  SPACE_DELIMITED: 'spaceDelimited',
  PIPE_DELIMITED: 'pipeDelimited',
  DEEP_OBJECT: 'deepObject',
};
```

Data type

```js
/**
 * Data type.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
export const OADataType = {
  STRING: 'string',
  NUMBER: 'number',
  INTEGER: 'integer',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  ARRAY: 'array',
  NULL: 'null',
};
```

Data format

```js
/**
 * Data format.
 * https://spec.openapis.org/oas/v3.1.2#dataTypeFormat
 */
export const OADataFormat = {
  // number
  INT32: 'int32',
  INT64: 'int64',
  FLOAT: 'float',
  DOUBLE: 'double',
  // date and time
  DATE: 'date',
  DATE_TIME: 'date-time',
  TIME: 'time',
  DURATION: 'duration',
  // binary
  BYTE: 'byte',
  BINARY: 'binary',
  // identifiers and network
  EMAIL: 'email',
  IDN_EMAIL: 'idn-email',
  UUID: 'uuid',
  HOSTNAME: 'hostname',
  IDN_HOSTNAME: 'idn-hostname',
  IPV4: 'ipv4',
  IPV6: 'ipv6',
  URI: 'uri',
  URI_REFERENCE: 'uri-reference',
  IRI: 'iri',
  IRI_REFERENCE: 'iri-reference',
  // extra
  PASSWORD: 'password',
  REGEX: 'regex',
  JSON_POINTER: 'json-pointer',
  RELATIVE_JSON_POINTER: 'relative-json-pointer',
};
```

Media type

```js
/**
 * Media type.
 * https://spec.openapis.org/oas/v3.1.2#media-types
 */
export const OAMediaType = {
  TEXT_PLAIN: 'text/plain',
  TEXT_HTML: 'text/html',
  APPLICATION_XML: 'application/xml',
  APPLICATION_JSON: 'application/json',
  MULTIPART_FORM_DATA: 'multipart/form-data',
};
```

Security Scheme Type

```js
/**
 * Security Scheme Type.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export const OASecuritySchemeType = {
  API_KEY: 'apiKey',
  HTTP: 'http',
  MUTUAL_TLS: 'mutualTLS',
  OAUTH_2: 'oauth2',
  OPEN_ID_CONNECT: 'openIdConnect',
};
```

Api Key Location

```js
/**
 * Api Key Location.
 * https://spec.openapis.org/oas/v3.1.2#security-scheme-object
 */
export const OAApiKeyLocation = {
  QUERY: 'query',
  HEADER: 'header',
  COOKIE: 'cookie',
};
```

Access mode

```js
/**
 * Access mode.
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-01#name-readonly-and-writeonly
 */
export const OAAccessMode = {
  READ: 'read',
  WRITE: 'write',
};
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT
