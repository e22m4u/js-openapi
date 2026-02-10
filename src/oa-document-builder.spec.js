import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {ServiceContainer} from '@e22m4u/js-service';
import {OADocumentObjectValidationError} from './errors/index.js';
import {OAComponentType, OADocumentBuilder} from './oa-document-builder.js';

import {
  OADataType,
  OAMediaType,
  OPENAPI_VERSION,
  OAParameterLocation,
  OASecuritySchemeType,
} from './oa-specification.js';

describe('OADocumentBuilder', function () {
  describe('constructor', function () {
    it('should not require any parameters', function () {
      new OADocumentBuilder();
    });

    it('should pass the ServiceContainer to the super class', function () {
      const cont = new ServiceContainer();
      const S = new OADocumentBuilder(cont);
      expect(S.container).to.be.eq(cont);
    });

    it('should require the parameter "containerOrDocument" to be an Object', function () {
      const throwable = v => () => new OADocumentBuilder(v);
      const error = s =>
        format(
          'Parameter "containerOrDocument" must be an Object, ' +
            'but %s was given.',
          s,
        );
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
      throwable(undefined)();
    });

    it('should require the parameter "document" to be an Object', function () {
      const throwable = v => () => new OADocumentBuilder(undefined, v);
      const error = s =>
        format('Parameter "document" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
      throwable(undefined)();
    });

    it('should merge the document from the first parameter with the default document', function () {
      const doc = {
        openapi: '3.1.2',
        info: {
          title: 'My OpenAPI Doc',
          version: '1.0.0',
        },
      };
      const S = new OADocumentBuilder(doc);
      const res = S.getDocumentObjectRef();
      expect(res).to.be.eql({...doc, components: {}});
    });

    it('should merge the document from the second parameter with the default document', function () {
      const doc = {
        openapi: '3.1.2',
        info: {
          title: 'My OpenAPI Doc',
          version: '1.0.0',
        },
      };
      const S = new OADocumentBuilder(undefined, doc);
      const res = S.getDocumentObjectRef();
      expect(res).to.be.eql({...doc, components: {}});
    });

    it('should validate the given document object', function () {
      const doc = {openapi: 'abc'};
      const throwable = () => new OADocumentBuilder(doc);
      expect(throwable).to.throw(
        'Value at "#/openapi" must match pattern "^3\\.1\\.\\d+(-.+)?$".',
      );
    });
  });

  describe('getDocumentObjectRef', function () {
    it('should return the document object reference', function () {
      const S = new OADocumentBuilder();
      const ref1 = S.getDocumentObjectRef();
      const ref2 = S.getDocumentObjectRef();
      expect(ref1).to.be.eql({
        openapi: OPENAPI_VERSION,
        info: {
          title: 'API Documentation',
          version: '0.0.1',
        },
        components: {},
      });
      expect(ref1).to.be.eq(ref2);
    });
  });

  describe('defineComponent', function () {
    it('should require the parameter "type" to be a correct value', function () {
      const throwable = v => () => {
        const S = new OADocumentBuilder();
        S.defineComponent(v, 'comp', {});
      };
      const error = s => format('Components type %s is not supported.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(OAComponentType.SCHEMA)();
    });

    it('should require the parameter "name" to be a non-empty String', function () {
      const throwable = v => () => {
        const S = new OADocumentBuilder();
        S.defineComponent(OAComponentType.SCHEMA, v, {});
      };
      const error = s =>
        format(
          'Component name must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('comp')();
    });

    it('should require the parameter "name" to not contain invalid characters', function () {
      const throwable = v => () => {
        const S = new OADocumentBuilder();
        S.defineComponent(OAComponentType.SCHEMA, v, {});
      };
      const error = s =>
        format('Component name %s contains invalid characters.', s);
      expect(throwable('/')).to.throw(error('"/"'));
      expect(throwable('$')).to.throw(error('"$"'));
      expect(throwable('~')).to.throw(error('"~"'));
      throwable('comp')();
    });

    it('should require the parameter "component" to be an Object', function () {
      const throwable = v => () => {
        const S = new OADocumentBuilder();
        S.defineComponent(OAComponentType.SCHEMA, 'comp', v);
      };
      const error = s =>
        format('Component "comp" must be an Object, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable({})();
    });

    describe('when the type is "schema"', function () {
      it('should define the schema object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SCHEMA;
        const comp = {type: OADataType.STRING};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SCHEMA;
        const comp = {$ref: '#/components/schemes/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the schema object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SCHEMA;
        const invalidComp = {type: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "response"', function () {
      it('should define the response object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.RESPONSE;
        const comp = {description: 'Response'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.RESPONSE;
        const comp = {$ref: '#/components/responses/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the response object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.RESPONSE;
        const invalidComp = {description: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "parameter"', function () {
      it('should define the parameter object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PARAMETER;
        const comp = {
          name: 'param',
          in: OAParameterLocation.QUERY,
          schema: {type: OADataType.STRING},
        };
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PARAMETER;
        const comp = {$ref: '#/components/parameters/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the parameter object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PARAMETER;
        const invalidComp = {name: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "example"', function () {
      it('should define the example object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.EXAMPLE;
        const comp = {value: 10};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.EXAMPLE;
        const comp = {$ref: '#/components/examples/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the example object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.EXAMPLE;
        const invalidComp = {description: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "requestBody"', function () {
      it('should define the request body object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.REQUEST_BODY;
        const comp = {content: {[OAMediaType.TEXT_PLAIN]: {}}};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.REQUEST_BODY;
        const comp = {$ref: '#/components/requestBodies/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the request body object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.REQUEST_BODY;
        const invalidComp = {content: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "header"', function () {
      it('should define the header object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.HEADER;
        const comp = {schema: {type: OADataType.STRING}};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.HEADER;
        const comp = {$ref: '#/components/headers/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the header object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.HEADER;
        const invalidComp = {schema: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "securityScheme"', function () {
      it('should define the security scheme object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SECURITY_SCHEME;
        const comp = {type: OASecuritySchemeType.HTTP, scheme: 'basic'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SECURITY_SCHEME;
        const comp = {$ref: '#/components/securitySchemes/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the security scheme object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SECURITY_SCHEME;
        const invalidComp = {type: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "link"', function () {
      it('should define the link object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.LINK;
        const comp = {operationId: 'id'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.LINK;
        const comp = {$ref: '#/components/links/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the link object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.LINK;
        const invalidComp = {operationId: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "callback"', function () {
      it('should define the callback object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.CALLBACK;
        const comp = {
          '{$request.query.queryUrl}': {
            get: {
              parameters: [
                {
                  name: 'queryUrl',
                  in: OAParameterLocation.QUERY,
                  schema: {type: OADataType.STRING},
                },
              ],
            },
          },
        };
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.CALLBACK;
        const comp = {$ref: '#/components/callbacks/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the callback object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.CALLBACK;
        const invalidComp = {'{$request.query.queryUrl}': 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });

    describe('when the type is "pathItem"', function () {
      it('should define the path item object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PATH_ITEM;
        const comp = {get: {}};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should define the reference object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PATH_ITEM;
        const comp = {$ref: '#/components/pathItems/target'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should validate the path item object', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PATH_ITEM;
        const invalidComp = {get: 123};
        const throwable = () => {
          S.defineComponent(type, 'comp', invalidComp);
        };
        expect(throwable).to.throw(OADocumentObjectValidationError);
      });
    });
  });

  describe('hasComponent', function () {
    it('should require the parameter "type" to be a correct value', function () {
      const S = new OADocumentBuilder();
      const throwable = v => () => S.hasComponent(v, 'comp');
      const error = s => format('Components type %s is not supported.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      Object.values(OAComponentType).forEach(type => throwable(type)());
    });

    it('should require the parameter "name" to be a non-empty String', function () {
      const S = new OADocumentBuilder();
      const throwable = v => () => S.hasComponent(OAComponentType.SCHEMA, v);
      const error = s =>
        format(
          'Component name must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('comp')();
    });

    it('should require the parameter "name" to not contain invalid characters', function () {
      const S = new OADocumentBuilder();
      const throwable = v => () => S.hasComponent(OAComponentType.SCHEMA, v);
      const error = s =>
        format('Component name %s contains invalid characters.', s);
      expect(throwable('/')).to.throw(error('"/"'));
      expect(throwable('$')).to.throw(error('"$"'));
      expect(throwable('~')).to.throw(error('"~"'));
      throwable('comp')();
    });

    describe('when the type is "schema"', function () {
      it('should return true when the schema object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SCHEMA;
        const comp = {type: OADataType.STRING};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "response"', function () {
      it('should return true when the response object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.RESPONSE;
        const comp = {description: 'Response'};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "parameter"', function () {
      it('should return true when the parameter object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PARAMETER;
        const comp = {
          name: 'param',
          in: OAParameterLocation.QUERY,
          schema: {type: OADataType.STRING},
        };
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "example"', function () {
      it('should return true when the example object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.EXAMPLE;
        const comp = {value: 10};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "requestBody"', function () {
      it('should return true when the request body object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.REQUEST_BODY;
        const comp = {content: {[OAMediaType.TEXT_PLAIN]: {}}};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "header"', function () {
      it('should return true when the header object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.HEADER;
        const comp = {schema: {type: OADataType.STRING}};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "securityScheme"', function () {
      it('should return true when the security scheme object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SECURITY_SCHEME;
        const comp = {type: OASecuritySchemeType.HTTP, scheme: 'basic'};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "link"', function () {
      it('should return true when the link object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.LINK;
        const comp = {operationId: 'id'};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "callback"', function () {
      it('should return true when the callback object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.CALLBACK;
        const comp = {
          '{$request.query.queryUrl}': {
            get: {
              parameters: [
                {
                  name: 'queryUrl',
                  in: OAParameterLocation.QUERY,
                  schema: {type: OADataType.STRING},
                },
              ],
            },
          },
        };
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });

    describe('when the type is "pathItem"', function () {
      it('should return true when the path item object is registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PATH_ITEM;
        const comp = {get: {}};
        expect(S.hasComponent(type, 'comp')).to.be.false;
        S.defineComponent(type, 'comp', comp);
        expect(S.hasComponent(type, 'comp')).to.be.true;
      });
    });
  });

  describe('getComponent', function () {
    it('should require the parameter "type" to be a correct value', function () {
      const S = new OADocumentBuilder();
      S.defineComponent(OAComponentType.SCHEMA, 'comp', {
        type: OADataType.STRING,
      });
      const throwable = v => () => S.getComponent(v, 'comp');
      const error = s => format('Components type %s is not supported.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(OAComponentType.SCHEMA)();
    });

    it('should require the parameter "name" to be a non-empty String', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.SCHEMA;
      S.defineComponent(type, 'comp', {type: OADataType.STRING});
      const throwable = v => () => S.getComponent(type, v);
      const error = s =>
        format(
          'Component name must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('comp')();
    });

    it('should require the parameter "name" to not contain invalid characters', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.SCHEMA;
      S.defineComponent(type, 'comp', {type: OADataType.STRING});
      const throwable = v => () => S.getComponent(type, v);
      const error = s =>
        format('Component name %s contains invalid characters.', s);
      expect(throwable('/')).to.throw(error('"/"'));
      expect(throwable('$')).to.throw(error('"$"'));
      expect(throwable('~')).to.throw(error('"~"'));
      throwable('comp')();
    });

    describe('when the type is "schema"', function () {
      it('should return the schema object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SCHEMA;
        const comp = {type: OADataType.STRING};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SCHEMA;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/schemas/comp" does not exist.',
        );
      });
    });

    describe('when the type is "response"', function () {
      it('should return the response object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.RESPONSE;
        const comp = {description: 'Response'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.RESPONSE;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/responses/comp" does not exist.',
        );
      });
    });

    describe('when the type is "parameter"', function () {
      it('should return the parameter object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PARAMETER;
        const comp = {
          name: 'param',
          in: OAParameterLocation.QUERY,
          schema: {type: OADataType.STRING},
        };
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PARAMETER;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/parameters/comp" does not exist.',
        );
      });
    });

    describe('when the type is "example"', function () {
      it('should return the example object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.EXAMPLE;
        const comp = {value: 10};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.EXAMPLE;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/examples/comp" does not exist.',
        );
      });
    });

    describe('when the type is "requestBody"', function () {
      it('should return the request body object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.REQUEST_BODY;
        const comp = {content: {[OAMediaType.TEXT_PLAIN]: {}}};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.REQUEST_BODY;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/requestBodies/comp" does not exist.',
        );
      });
    });

    describe('when the type is "header"', function () {
      it('should return the header object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.HEADER;
        const comp = {schema: {type: OADataType.STRING}};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.HEADER;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/headers/comp" does not exist.',
        );
      });
    });

    describe('when the type is "securityScheme"', function () {
      it('should return the security scheme object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SECURITY_SCHEME;
        const comp = {type: OASecuritySchemeType.HTTP, scheme: 'basic'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.SECURITY_SCHEME;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/securitySchemes/comp" does not exist.',
        );
      });
    });

    describe('when the type is "link"', function () {
      it('should return the link object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.LINK;
        const comp = {operationId: 'id'};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.LINK;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/links/comp" does not exist.',
        );
      });
    });

    describe('when the type is "callback"', function () {
      it('should return the callback object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.CALLBACK;
        const comp = {
          '{$request.query.queryUrl}': {
            get: {
              parameters: [
                {
                  name: 'queryUrl',
                  in: OAParameterLocation.QUERY,
                  schema: {type: OADataType.STRING},
                },
              ],
            },
          },
        };
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.CALLBACK;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/callbacks/comp" does not exist.',
        );
      });
    });

    describe('when the type is "pathItem"', function () {
      it('should return the path item object for the registered name', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PATH_ITEM;
        const comp = {get: {}};
        S.defineComponent(type, 'comp', comp);
        const res = S.getComponent(type, 'comp');
        expect(res).to.be.eql(comp);
      });

      it('should throw an error when the component is not registered', function () {
        const S = new OADocumentBuilder();
        const type = OAComponentType.PATH_ITEM;
        const throwable = () => S.getComponent(type, 'comp');
        expect(throwable).to.throw(
          'Component "#/components/pathItems/comp" does not exist.',
        );
      });
    });
  });

  describe('defineSchemaComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.SCHEMA;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineSchemaComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineResponseComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.RESPONSE;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineResponseComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineParameterComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.PARAMETER;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineParameterComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineExampleComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.EXAMPLE;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineExampleComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineRequestBodyComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.REQUEST_BODY;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineRequestBodyComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineHeaderComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.HEADER;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineHeaderComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineSecuritySchemeComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.SECURITY_SCHEME;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineSecuritySchemeComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineLinkComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.LINK;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineLinkComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('defineCallbackComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.CALLBACK;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.defineCallbackComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });

  describe('definePathItemComponent', function () {
    it('should invoke the method "defineComponent" with correct arguments', function () {
      const S = new OADocumentBuilder();
      const type = OAComponentType.PATH_ITEM;
      const name = 'comp';
      const component = {};
      let invoked = 0;
      S.defineComponent = (...args) => {
        expect(args[0]).to.be.eq(type);
        expect(args[1]).to.be.eq(name);
        expect(args[2]).to.be.eq(component);
        invoked++;
        return 'OK';
      };
      const res = S.definePathItemComponent(name, component);
      expect(res).to.be.eq('OK');
      expect(invoked).to.be.eq(1);
    });
  });
});
