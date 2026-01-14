import {
  OASchemaObject,
  OAContentObject,
  OAMediaTypeObject,
  OAReferenceObject,
} from '../document-specification.js';

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
 * @param schema
 * @param options
 */
export declare function oaJsonContent(
  schema: OASchemaObject | OAReferenceObject,
  options?: Omit<OAMediaTypeObject, 'schema'>
): OAContentObject;
