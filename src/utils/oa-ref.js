/**
 * Create Reference Object.
 *
 * Example 1:
 * 
 * ```js
 * oaRef('User');
 * // {"$ref": "#/components/schemas/User"}
 * ```
 * 
 * Example 2:
 * 
 * ```js
 * oaRef('Error', 'responses');
 * // {"$ref": "#/components/responses/Error"}
 * ```
 * 
 * Example 3:
 * 
 * ```js
 * builder.defineOperation({
 *   path: '/users',
 *   method: 'get',
 *   operation: {
 *     responses: {
 *       200: {
 *         description: 'List of users',
 *         content: {
 *           'application/json': {
 *             schema: {
 *               type: 'array',
 *               items: oaRef('User'), // <=
 *             },
 *           },
 *         },
 *       },
 *     },
 *   },
 * });
 * ```
 *
 * @param {string} name
 * @param {string} [type]
 * @returns {object}
 */
export function oaRef(name, type = 'schemas') {
  return {$ref: `#/components/${type}/${name}`};
}
