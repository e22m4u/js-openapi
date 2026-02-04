import {InvalidArgumentError} from '@e22m4u/js-format';
import {unescapeJsonPointer} from '../json-pointer/index.js';

/**
 * Регулярное выражение для индексов массива.
 * RFC 6901: A token that is a decimal number (0, 1, 2...)
 */
const ARRAY_INDEX_PATTERN = /^(0|[1-9][0-9]*)$/;

/**
 * Resolve json pointer.
 *
 * @param {object|*[]} document
 * @param {object} pointer
 * @returns {*}
 */
export function resolveJsonPointer(document, pointer) {
  if (!document || typeof document !== 'object') {
    throw new InvalidArgumentError(
      'Parameter "document" must be an Object or an Array, but %v was given.',
      document,
    );
  }
  if (typeof pointer !== 'string') {
    throw new InvalidArgumentError(
      'JSON pointer must be a String, but %v was given.',
      pointer,
    );
  }
  // так как пустая строка является указателем
  // корня документа, то в этом случае возвращается
  // сам документ без поиска сегмента
  if (pointer === '') {
    return document;
  }
  // указатель должен начинаться с символа "/",
  // в противном случае выбрасывается ошибка
  if (!pointer.startsWith('/')) {
    throw new InvalidArgumentError(
      'JSON pointer must start with a forward slash "/", but %v was given.',
      pointer,
    );
  }
  // если указатель содержит сегменты,
  // то выполняется их извлечение
  const pathParts = pointer.substring(1).split('/');
  let current = document;
  for (let i = 0, l = pathParts.length; i < l; i++) {
    const part = pathParts[i];
    const segment = unescapeJsonPointer(part);
    // если предыдущий узел является объектом,
    // то проверяется наличие данного ключа
    if (
      current &&
      typeof current === 'object' &&
      !Array.isArray(current) &&
      Object.hasOwn(current, segment) &&
      current[segment] !== undefined
    ) {
      current = current[segment];
    }
    // элементы массива должны извлекаться только
    // по числовым индексам, но исключая индексы
    // начинающиеся с нуля (но сам ноль допустим)
    else if (
      Array.isArray(current) &&
      ARRAY_INDEX_PATTERN.test(segment) &&
      current[segment] !== undefined
    ) {
      current = current[segment];
    }
    // если узел не содержит значения,
    // то выбрасывается ошибка
    else {
      const currentPointer = '/' + pathParts.slice(0, i + 1).join('/');
      throw new InvalidArgumentError(
        'Unable to resolve %v in the given document.',
        currentPointer,
      );
    }
  }
  return current;
}
