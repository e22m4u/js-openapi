import addFormats from 'ajv-formats';
import Ajv2020 from 'ajv/dist/2020.js';
import schema from '../schema/openapi-3-1/schema.js';
import schemaBase from '../schema/openapi-3-1/schema-base.js';
import vocabularySchema from '../schema/openapi-3-1/meta/base.js';
import dialectSchema from '../schema/openapi-3-1/dialect/base.js';

export const ajv = new Ajv2020({
  strictTypes: false,
  validateFormats: true,
  allowUnionTypes: true,
  allowMatchingProperties: true,
});
addFormats(ajv);

ajv.addFormat('media-range', {
  type: 'string',
  validate: value => {
    return /^[a-z]+\/([a-z0-9\-+.]+|\*)$/i.test(value);
  },
});

ajv.addSchema(vocabularySchema, 'https://spec.openapis.org/oas/3.1/meta/base');
ajv.addSchema(dialectSchema, 'https://spec.openapis.org/oas/3.1/dialect/base');
ajv.addSchema(schemaBase, 'https://spec.openapis.org/oas/3.1/schema-base');
ajv.addSchema(schema, 'https://spec.openapis.org/oas/3.1/schema');

export const OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI =
  'https://spec.openapis.org/oas/3.1/schema';

// pre-compilation (170ms)
ajv.getSchema(OA_DOCUMENT_OBJECT_JSON_SCHEMA_URI);
