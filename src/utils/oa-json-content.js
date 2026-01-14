import {InvalidArgumentError} from '@e22m4u/js-format';

/**
 * Create "application/json" content.
 * 
 * Example:
 * 
 * ```js
 * builder.defineOperation({
 *   path: '/users',
 *   method: 'get',
 *   operation: {
 *     responses: {
 *       200: {
 *         description: 'List of users',
 *         content: oaJsonContent({ // <=
 *           type: 'array',
 *           items: {
 *             $ref: '#/components/schemas/User',
 *           },
 *         }),
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * @param {object} schema
 * @param {object} [options]
 * @returns {object}
 */
export function oaJsonContent(schema, options = {}) {
  if (!schema || typeof schema !== 'object' || Array.isArray(schema)) {
    throw new InvalidArgumentError(
      'Parameter "schema" must be an Object, but %v was given.',
      schema,
    );
  }
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new InvalidArgumentError(
      'Parameter "options" must be an Object, but %v was given.',
      options,
    );
  }
  return {
    'application/json': {
      schema,
      ...options,
    },
  };
}
