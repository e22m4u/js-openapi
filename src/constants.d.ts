/**
 * OpenAPI version.
 */
export declare const OPENAPI_VERSION: '3.1.0';

/**
 * Components segment.
 *
 * "#/components/{segment}/{name}"
 *                  ^^^
 */
export declare const OAComponentsSegment: {
  SCHEMAS: 'schemas';
  RESPONSES: 'responses';
  PARAMETERS: 'parameters';
  EXAMPLES: 'examples';
  REQUEST_BODIES: 'requestBodies';
  HEADERS: 'headers';
  SECURITY_SCHEMES: 'securitySchemes';
  LINKS: 'links';
  CALLBACKS: 'callbacks';
  PATH_ITEMS: 'pathItems';
};

export type OAComponentsSegment =
  (typeof OAComponentsSegment)[keyof typeof OAComponentsSegment];
