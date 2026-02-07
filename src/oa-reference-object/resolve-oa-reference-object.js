import {InvalidArgumentError} from '@e22m4u/js-format';
import {resolveJsonPointer} from '../json-pointer/index.js';

/**
 * Разрешает объект ссылки (Reference Object) и возвращает целевое значение.
 * Функция реализует навигацию по JSON Pointer (RFC 6901) внутри корневого
 * документа `options.rootDocument`. Утилита находит и возвращает узел, на который
 * указывает `$ref`.
 *
 * Поддерживает только локальные ссылки, начинающиеся с `#`.
 *
 * @param {object} referenceObj
 * @param {object} [options]
 * @returns {*}
 */
export function resolveOAReferenceObject(referenceObj, options = {}) {
  if (
    !referenceObj ||
    typeof referenceObj !== 'object' ||
    Array.isArray(referenceObj)
  ) {
    throw new InvalidArgumentError(
      'Parameter "referenceObj" must be an Object, but %v was given.',
      referenceObj,
    );
  }
  // options
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options,
    );
  }
  // options.rootDocument
  if (options.rootDocument !== undefined) {
    if (!options.rootDocument || typeof options.rootDocument !== 'object') {
      throw new InvalidArgumentError(
        'Option "rootDocument" must be an Object or an Array, but %v was given.',
        options.rootDocument,
      );
    }
  }
  // $ref
  if (referenceObj.$ref !== undefined) {
    if (!referenceObj.$ref || typeof referenceObj.$ref !== 'string') {
      throw new InvalidArgumentError(
        'Schema keyword "$ref" must be a non-empty String, ' +
          'but %v was given.',
        referenceObj.$ref,
      );
    }
    const refUri = referenceObj.$ref;
    // если ссылка начинается с корня документа,
    // то выполняется поиск указанного узла
    if (refUri.startsWith('#')) {
      if (!options.rootDocument) {
        throw new InvalidArgumentError(
          'Option "rootDocument" is required to resolve the same-document ' +
            'reference (URI starts with "#").',
        );
      }
      // если URI ссылается на корень документа (символ "#"),
      // то возвращается корневой узел без поиска сегмента
      if (refUri === '#') {
        return options.rootDocument;
      }
      // если URI является JSON Pointer (прим. "#/path/to/element")
      // то выполняется поиск узла согласно сегментам указателя
      else if (refUri.startsWith('#/')) {
        return resolveJsonPointer(options.rootDocument, refUri.substring(1));
      }
      // так как якорь (прим. "#SomeAnchor") требует обхода всего
      // документа, в целях улучшения производительности данный
      // функционал не будет реализован в утилитарной функции
      throw new InvalidArgumentError(
        'Anchor reference is not supported, but %v was given.',
        refUri,
      );
    }
    // удаленный ресурс (прим. "http://example.com/schema")
    if (refUri.startsWith('http://') || refUri.startsWith('https://')) {
      // так как разрешение внешних ссылок требует накладных расходов
      // на производительность и кэширование, данный функционал
      // не будет реализован в утилитарной функции
      throw new InvalidArgumentError(
        'External resource is not supported, but %v was given.',
        refUri,
      );
    }
    // так как для создания карты идентификаторов требуется обход
    // всего документа, в целях повышения производительности данный
    // функционал не будет реализован в утилитарной функции
    throw new InvalidArgumentError(
      'Relative reference is not supported, but %v was given.',
      refUri,
    );
  }
  // если объект ссылки не имеет свойств
  // указателей, то выбрасывается ошибка
  throw new InvalidArgumentError(
    'Reference object does not have reference properties.',
  );
}
