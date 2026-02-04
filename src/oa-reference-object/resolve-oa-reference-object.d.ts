import {OAReferenceObject} from '../oa-specification.js';

/**
 * Разрешает объект ссылки (Reference Object) и возвращает целевое значение.
 * Функция реализует навигацию по JSON Pointer (RFC 6901) внутри корневого
 * документа `options.rootDocument`. Утилита находит и возвращает узел, на который
 * указывает `$ref`.
 *
 * - Поддерживает только локальные ссылки, начинающиеся с `#`.
 * - Нет поддержки $dynamicRef, $anchor и $id.
 *
 * @param referenceObj
 * @param options
 */
export function resolveOAReferenceObject<T = any>(
  referenceObj: OAReferenceObject,
  options?: {rootDocument?: object | unknown[]},
): T;
