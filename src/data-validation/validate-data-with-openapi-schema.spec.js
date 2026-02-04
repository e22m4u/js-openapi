import {expect} from 'chai';
import {format} from '@e22m4u/js-format';
import {toPascalCase, toSpacedJson} from '../utils/index.js';
import {OAAccessMode, OADataType} from '../oa-specification.js';
import {validateDataWithOpenApiSchema} from './validate-data-with-openapi-schema.js';
import {inferOpenApiDataType} from '../data-type/infer-openapi-data-type.js';

describe('validateDataWithOpenApiSchema', function () {
  describe('arguments validation', function () {
    it('should require the parameter "schema" to be a Boolean or an Object', function () {
      const throwable = v => () => validateDataWithOpenApiSchema(undefined, v);
      const error = s =>
        format(
          'Parameter "schema" must be a Boolean ' +
            'or an Object, but %s was given.',
          s,
        );
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(undefined)).to.throw(error('undefined'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable({})();
    });

    it('should require the parameter "options" to be a Boolean or an Object', function () {
      const throwable = v => () => validateDataWithOpenApiSchema(10, true, v);
      const error = s =>
        format('Parameter "options" must be an Object, but %s was given.', s);
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
  });

  describe('options validation', function () {
    it('should require the option "rootDocument" to be an Object', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {rootDocument: v});
      const error = s =>
        format('Option "rootDocument" must be an Object, but %s was given.', s);
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

    it('should require the option "required" to be a Boolean', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {required: v});
      const error = s =>
        format('Option "required" must be a Boolean, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable(undefined)();
    });

    it('should require the option "coerceTypes" to be a Boolean', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {coerceTypes: v});
      const error = s =>
        format('Option "coerceTypes" must be a Boolean, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable(undefined)();
    });

    it('should require the option "applyDefaults" to be a Boolean', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {applyDefaults: v});
      const error = s =>
        format(
          'Option "applyDefaults" must be a Boolean, but %s was given.',
          s,
        );
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable(undefined)();
    });

    it('should require the option "stripUnknown" to be a Boolean', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {stripUnknown: v});
      const error = s =>
        format('Option "stripUnknown" must be a Boolean, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable(undefined)();
    });

    it('should require the option "dataSourceUri" to be a non-empty String', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {dataSourceUri: v});
      const error = s =>
        format(
          'Option "dataSourceUri" must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('str')();
      throwable(undefined)();
    });

    it('should require the option "schemaSourceUri" to be a String', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {schemaSourceUri: v});
      const error = s =>
        format(
          'Option "schemaSourceUri" must be a non-empty String, but %s was given.',
          s,
        );
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable('str')();
      throwable(undefined)();
    });

    it('should require the option "silent" to be a Boolean', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {silent: v});
      const error = s =>
        format('Option "silent" must be a Boolean, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable(undefined)();
    });

    it('should require the option "accessMode" to be the correct value', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {accessMode: v});
      const error = s => format('Access mode %s is not supported.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(OAAccessMode.READ)();
      throwable(OAAccessMode.WRITE)();
      throwable(undefined)();
    });

    it('should require the option "formatValidators" to be an Object', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {formatValidators: v});
      const error = s =>
        format(
          'Option "formatValidators" must be an Object, but %s was given.',
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
      throwable({format: () => true})();
      throwable(undefined)();
    });

    it('should require object values in the option "formatValidators" to be a Function', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {formatValidators: {x: v}});
      const error = s =>
        format('Format validator "x" must be a Function, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable(true)).to.throw(error('true'));
      expect(throwable(false)).to.throw(error('false'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(() => true)();
      throwable(undefined)();
    });

    it('should require the option "parseJson" to be a Boolean', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, true, {parseJson: v});
      const error = s =>
        format('Option "parseJson" must be a Boolean, but %s was given.', s);
      expect(throwable('str')).to.throw(error('"str"'));
      expect(throwable('')).to.throw(error('""'));
      expect(throwable(10)).to.throw(error('10'));
      expect(throwable(0)).to.throw(error('0'));
      expect(throwable({})).to.throw(error('Object'));
      expect(throwable([])).to.throw(error('Array'));
      expect(throwable(null)).to.throw(error('null'));
      throwable(true)();
      throwable(false)();
      throwable(undefined)();
    });
  });

  describe('the option "required"', function () {
    it('should throw an error for undefined value when the option "required" is true', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(undefined, true, {required: true});
      expect(throwable).to.throw(
        'Value at "" is required, but undefined was given.',
      );
    });

    it('should reject an undefined value when the option "required" is true', function () {
      const res = validateDataWithOpenApiSchema(undefined, true, {
        required: true,
        silent: true,
      });
      expect(res).to.be.eql({
        isValid: false,
        value: undefined,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" is required, but undefined was given.',
      });
    });

    it('should allow non-undefined value when the option "required" is true', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, true, {
          required: true,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should allow any value when the option "required" is true', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, undefined, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, true, {
          required: false,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value when the option "required" is false', function () {
      const res = validateDataWithOpenApiSchema(undefined, true, {
        required: false,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the boolean schema', function () {
    it('should allow any value when the schema is true', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, undefined, null];
      vals.forEach(val => {
        expect(validateDataWithOpenApiSchema(val, true)).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error for a non-undefined value when the schema is false', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const throwable = () => validateDataWithOpenApiSchema(val, false);
        expect(throwable).to.throw(
          'Value at "" is rejected by the boolean schema at "".',
        );
      });
    });

    it('should reject a non-undefined value when the schema is false', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, false, {silent: true});
        expect(res).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: 'Value at "" is rejected by the boolean schema at "".',
        });
      });
    });
  });

  describe('the option "applyDefaults"', function () {
    it('should ignore default values when the option "applyDefaults" is not specified', function () {
      const res = validateDataWithOpenApiSchema(undefined, {default: 10});
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore default values when the option "applyDefaults" is false', function () {
      const res = validateDataWithOpenApiSchema(
        undefined,
        {default: 10},
        {applyDefaults: false},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should set the default value when an undefined value is given', function () {
      const res = validateDataWithOpenApiSchema(
        undefined,
        {default: 10},
        {applyDefaults: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore the default value when the given value is non-undefined', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          val,
          {default: 'default value'},
          {applyDefaults: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });

  describe('the option "parseJson"', function () {
    it('should not parse the JSON string by default', function () {
      const jsonString = '123';
      const throwable = () =>
        validateDataWithOpenApiSchema(jsonString, {type: OADataType.INTEGER});
      expect(throwable).to.throw(
        format('Value at "" must be Integer, but String was given.'),
      );
    });

    it('should parse the JSON string with leading whitespaces', function () {
      const res = validateDataWithOpenApiSchema(
        '  123  ',
        {type: OADataType.INTEGER},
        {parseJson: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: 123,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should skip parsing when the JSON string is invalid', function () {
      const invalidJson = '~';
      const throwable = () =>
        validateDataWithOpenApiSchema(
          invalidJson,
          {type: OADataType.NUMBER},
          {parseJson: true},
        );
      expect(throwable).to.throw(
        format('Value at "" must be Number, but String was given.'),
      );
    });

    it('should skip parsing when the "type" keyword is not defined', function () {
      const jsonString = '123';
      const res = validateDataWithOpenApiSchema(
        jsonString,
        {},
        {parseJson: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: jsonString,
        valueUri: '',
        schemaUri: '',
      });
    });

    describe('when the "number" type is specified', function () {
      it('should parse an integer value from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          '123',
          {type: OADataType.NUMBER},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: 123,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse an integer value even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          '123',
          {type: [OADataType.BOOLEAN, OADataType.NUMBER]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: 123,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse a float number when the type specified', function () {
        const res = validateDataWithOpenApiSchema(
          '0.5',
          {type: OADataType.NUMBER},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: 0.5,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse a float number even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          '0.5',
          {type: [OADataType.BOOLEAN, OADataType.NUMBER]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: 0.5,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should skip parsing when no number value in the JSON string', function () {
        const jsonString = 'true';
        const throwable = () =>
          validateDataWithOpenApiSchema(
            jsonString,
            {type: OADataType.NUMBER},
            {parseJson: true},
          );
        expect(throwable).to.throw(
          format('Value at "" must be Number, but String was given.'),
        );
      });
    });

    describe('when the "integer" type is specified', function () {
      it('should parse an integer value from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          '123',
          {type: OADataType.INTEGER},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: 123,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse an integer value even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          '123',
          {type: [OADataType.BOOLEAN, OADataType.INTEGER]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: 123,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should skip parsing when no integer value in the JSON string', function () {
        const jsonString = '0.5';
        const throwable = () =>
          validateDataWithOpenApiSchema(
            jsonString,
            {type: OADataType.INTEGER},
            {parseJson: true},
          );
        expect(throwable).to.throw(
          format('Value at "" must be Integer, but String was given.'),
        );
      });
    });

    describe('when the "boolean" type is specified', function () {
      it('should parse a true value from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          'true',
          {type: OADataType.BOOLEAN},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: true,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse a true value even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          'true',
          {type: [OADataType.NUMBER, OADataType.BOOLEAN]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: true,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse a false value from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          'false',
          {type: OADataType.BOOLEAN},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: false,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse a false value even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          'false',
          {type: [OADataType.NUMBER, OADataType.BOOLEAN]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: false,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should skip parsing when no boolean value in the JSON string', function () {
        const jsonString = '123';
        const throwable = () =>
          validateDataWithOpenApiSchema(
            jsonString,
            {type: OADataType.BOOLEAN},
            {parseJson: true},
          );
        expect(throwable).to.throw(
          format('Value at "" must be Boolean, but String was given.'),
        );
      });
    });

    describe('when the "array" type is specified', function () {
      it('should parse an array structure from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          '[1, 2]',
          {type: OADataType.ARRAY},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse an array structure even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          '[1, 2]',
          {type: [OADataType.BOOLEAN, OADataType.ARRAY]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should skip parsing when no array value in the JSON string', function () {
        const jsonString = '123';
        const throwable = () =>
          validateDataWithOpenApiSchema(
            jsonString,
            {type: OADataType.ARRAY},
            {parseJson: true},
          );
        expect(throwable).to.throw(
          format('Value at "" must be Array, but String was given.'),
        );
      });
    });

    describe('when the "object" type is specified', function () {
      it('should parse an object structure from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          '{"foo":"bar"}',
          {type: OADataType.OBJECT},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: 'bar'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse an object structure even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          '{"foo":"bar"}',
          {type: [OADataType.BOOLEAN, OADataType.OBJECT]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: 'bar'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should skip parsing when no object value in the JSON string', function () {
        const jsonString = '123';
        const throwable = () =>
          validateDataWithOpenApiSchema(
            jsonString,
            {type: OADataType.OBJECT},
            {parseJson: true},
          );
        expect(throwable).to.throw(
          format('Value at "" must be Object, but String was given.'),
        );
      });
    });

    describe('when the "null" type is specified', function () {
      it('should parse a null value from the JSON string', function () {
        const res = validateDataWithOpenApiSchema(
          'null',
          {type: OADataType.NULL},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: null,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should parse a null value even when multiple types are specified', function () {
        const res = validateDataWithOpenApiSchema(
          'null',
          {type: [OADataType.BOOLEAN, OADataType.NULL]},
          {parseJson: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: null,
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should skip parsing when no null value in the JSON string', function () {
        const jsonString = '123';
        const throwable = () =>
          validateDataWithOpenApiSchema(
            jsonString,
            {type: OADataType.NULL},
            {parseJson: true},
          );
        expect(throwable).to.throw(
          format('Value at "" must be Null, but String was given.'),
        );
      });
    });
  });

  describe('the option "coerceTypes"', function () {
    it('should not convert the data when the option "coerceTypes" is not specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {type: OADataType.STRING});
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should not convert a value when the option "coerceTypes" is false', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          10,
          {type: OADataType.STRING},
          {coerceTypes: false},
        );
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should convert a number to a string', function () {
      const res1 = validateDataWithOpenApiSchema(
        -10,
        {type: OADataType.STRING},
        {coerceTypes: true},
      );
      expect(res1).to.be.eql({
        isValid: true,
        value: '-10',
        valueUri: '',
        schemaUri: '',
      });
      const res2 = validateDataWithOpenApiSchema(
        0.5,
        {type: OADataType.STRING},
        {coerceTypes: true},
      );
      expect(res2).to.be.to.be.eql({
        isValid: true,
        value: '0.5',
        valueUri: '',
        schemaUri: '',
      });
      const res3 = validateDataWithOpenApiSchema(
        10,
        {type: OADataType.STRING},
        {coerceTypes: true},
      );
      expect(res3).to.be.to.be.eql({
        isValid: true,
        value: '10',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should convert a boolean to a string', function () {
      const res1 = validateDataWithOpenApiSchema(
        true,
        {type: OADataType.STRING},
        {coerceTypes: true},
      );
      expect(res1).to.be.to.be.eql({
        isValid: true,
        value: 'true',
        valueUri: '',
        schemaUri: '',
      });
      const res2 = validateDataWithOpenApiSchema(
        false,
        {type: OADataType.STRING},
        {coerceTypes: true},
      );
      expect(res2).to.be.eql({
        isValid: true,
        value: 'false',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should convert an integer string to an integer', function () {
      const res1 = validateDataWithOpenApiSchema(
        '-10',
        {type: OADataType.INTEGER},
        {coerceTypes: true},
      );
      expect(res1).to.be.eql({
        isValid: true,
        value: -10,
        valueUri: '',
        schemaUri: '',
      });
      const res2 = validateDataWithOpenApiSchema(
        '10',
        {type: OADataType.INTEGER},
        {coerceTypes: true},
      );
      expect(res2).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should not convert a float string to an integer', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          '0.5',
          {type: OADataType.INTEGER},
          {coerceTypes: true},
        );
      expect(throwable).to.throw(
        'Value at "" must be Integer, but String was given.',
      );
    });

    it('should convert a number string to a number', function () {
      const res1 = validateDataWithOpenApiSchema(
        '-10',
        {type: OADataType.NUMBER},
        {coerceTypes: true},
      );
      expect(res1).to.be.eql({
        isValid: true,
        value: -10,
        valueUri: '',
        schemaUri: '',
      });
      const res2 = validateDataWithOpenApiSchema(
        '.5',
        {type: OADataType.NUMBER},
        {coerceTypes: true},
      );
      expect(res2).to.be.eql({
        isValid: true,
        value: 0.5,
        valueUri: '',
        schemaUri: '',
      });
      const res3 = validateDataWithOpenApiSchema(
        '10',
        {type: OADataType.NUMBER},
        {coerceTypes: true},
      );
      expect(res3).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should convert a boolean string to a boolean', function () {
      const res1 = validateDataWithOpenApiSchema(
        'true',
        {type: OADataType.BOOLEAN},
        {coerceTypes: true},
      );
      expect(res1).to.be.eql({
        isValid: true,
        value: true,
        valueUri: '',
        schemaUri: '',
      });
      const res2 = validateDataWithOpenApiSchema(
        'false',
        {type: OADataType.BOOLEAN},
        {coerceTypes: true},
      );
      expect(res2).to.be.eql({
        isValid: true,
        value: false,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore an undefined value for the type coercion', function () {
      const res = validateDataWithOpenApiSchema(
        undefined,
        {type: OADataType.STRING},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the option "stripUnknown"', function () {
    describe('when the data is an array', function () {
      it('should keep unknown items when the option is false', function () {
        const res = validateDataWithOpenApiSchema(
          [1, 2],
          {},
          {stripUnknown: false},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should keep unknown items when the option is true', function () {
        const res = validateDataWithOpenApiSchema(
          [1, 2],
          {},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should remove items not specified in the "prefixItems" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          [1, 2],
          {prefixItems: [{type: OADataType.NUMBER}]},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore items when the "items" keyword has the schema object', function () {
        const res = validateDataWithOpenApiSchema(
          [1, 2],
          {items: {type: OADataType.NUMBER}},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore items when the "unevaluatedItems" keyword is true', function () {
        const res = validateDataWithOpenApiSchema(
          [1, 2],
          {unevaluatedItems: true},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore items when the "unevaluatedItems" keyword has the schema object', function () {
        const res = validateDataWithOpenApiSchema(
          [1, 2],
          {unevaluatedItems: {type: OADataType.NUMBER}},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: [1, 2],
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the data is an object', function () {
      it('should keep unknown properties when the option is false', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {},
          {stripUnknown: false},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should keep unknown properties when the option is true', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should remove properties not specified in the "properties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {properties: {prop: {type: OADataType.STRING}}},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should remove properties not matched in the "patternProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {patternProperties: {'^prop': {type: OADataType.STRING}}},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties when the "additionalProperties" is true', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {additionalProperties: true},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties when the "additionalProperties" has the schema object', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {additionalProperties: {type: OADataType.STRING}},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties when the "unevaluatedProperties" is true', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {unevaluatedProperties: true},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties when the "unevaluatedProperties" has the schema object', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {unevaluatedProperties: {type: OADataType.STRING}},
          {stripUnknown: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });

  describe('the keyword "$ref"', function () {
    it('should resolve the reference uri to validate the given data', function () {
      const doc = {
        components: {
          schemas: {
            mySchema: {
              type: OADataType.STRING,
            },
          },
        },
      };
      const throwable = () =>
        validateDataWithOpenApiSchema(
          10,
          {$ref: '#/components/schemas/mySchema'},
          {rootDocument: doc},
        );
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should resolve the reference uri to coerce types', function () {
      const doc = {
        components: {
          schemas: {
            mySchema: {
              type: OADataType.STRING,
            },
          },
        },
      };
      const result = validateDataWithOpenApiSchema(
        10,
        {$ref: '#/components/schemas/mySchema'},
        {rootDocument: doc, coerceTypes: true},
      );
      expect(result).to.be.eql({
        isValid: true,
        value: '10',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should require the option "rootDocument" to resolve the document reference', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          $ref: '#/components/schemas/mySchema',
        });
      expect(throwable).to.throw(
        'Option "rootDocument" is required to resolve the same-document ' +
          'reference (URI starts with "#").',
      );
    });

    it('should throw an error when the json pointer is not resolved', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          10,
          {
            $ref: '#/components/schemas/mySchema',
          },
          {rootDocument: {}},
        );
      expect(throwable).to.throw(
        'Unable to resolve "/components" in the given document.',
      );
    });
  });

  describe('the keyword "$dynamicRef"', function () {
    it('should throw an error when the dynamic reference is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          $dynamicRef: '/someRef',
        });
      expect(throwable).to.throw(
        'Schema keyword "$dynamicRef" is not supported.',
      );
    });
  });

  describe('the keyword "discriminator"', function () {
    it('should throw an error when the keyword is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {discriminator: 'propName'});
      expect(throwable).to.throw(
        'Schema keyword "discriminator" is not supported.',
      );
    });
  });

  describe('the keyword "contentEncoding"', function () {
    it('should throw an error when the keyword is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {contentEncoding: 'value'});
      expect(throwable).to.throw(
        'Schema keyword "contentEncoding" is not supported.',
      );
    });
  });

  describe('the keyword "contentMediaType"', function () {
    it('should throw an error when the keyword is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {contentMediaType: 'value'});
      expect(throwable).to.throw(
        'Schema keyword "contentMediaType" is not supported.',
      );
    });
  });

  describe('the keyword "contentSchema"', function () {
    it('should throw an error when the keyword is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {contentSchema: 'value'});
      expect(throwable).to.throw(
        'Schema keyword "contentSchema" is not supported.',
      );
    });
  });

  describe('the keyword "readOnly"', function () {
    it('should throw an error for a non-undefined value in the write access', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            val,
            {readOnly: true},
            {accessMode: OAAccessMode.WRITE},
          );
        expect(throwable).to.throw(
          'Value at "" is read-only and cannot be sent in a write context.',
        );
      });
    });

    it('should reject a non-undefined value in the write access', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          val,
          {readOnly: true},
          {accessMode: OAAccessMode.WRITE, silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason:
            'Value at "" is read-only and cannot be sent in a write context.',
        });
      });
    });

    it('should ignore an undefined value in the read access', function () {
      const res = validateDataWithOpenApiSchema(
        undefined,
        {readOnly: true},
        {accessMode: OAAccessMode.READ},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should not throw an error when the keyword "readOnly" is false', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, undefined, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          val,
          {readOnly: false},
          {accessMode: OAAccessMode.WRITE},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });

  describe('the keyword "writeOnly"', function () {
    it('should throw an error for a non-undefined value in the read access', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            val,
            {writeOnly: true},
            {accessMode: OAAccessMode.READ},
          );
        expect(throwable).to.throw(
          'Value at "" is write-only and cannot be present in a read context.',
        );
      });
    });

    it('should reject a non-undefined value in the read access', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          val,
          {writeOnly: true},
          {accessMode: OAAccessMode.READ, silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason:
            'Value at "" is write-only and cannot be present in a read context.',
        });
      });
    });

    it('should ignore an undefined value in the write access', function () {
      const res = validateDataWithOpenApiSchema(
        undefined,
        {writeOnly: true},
        {accessMode: OAAccessMode.WRITE},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should not throw an error when the keyword "writeOnly" is false', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, undefined, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          val,
          {writeOnly: false},
          {accessMode: OAAccessMode.READ},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });

  describe('the keyword "allOf"', function () {
    it('should throw an error if the data does not match any of the schemas', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          allOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}],
        });
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should reject the data if the data does not match any of the schemas', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {allOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/allOf/0',
        reason: 'Value at "" must be String, but Integer was given.',
      });
    });

    it('should throw an error if the data does not match all of the schemas', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          allOf: [{type: OADataType.NUMBER}, {type: OADataType.STRING}],
        });
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should reject the data if the data does not match all of the schemas', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {allOf: [{type: OADataType.NUMBER}, {type: OADataType.STRING}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/allOf/1',
        reason: 'Value at "" must be String, but Integer was given.',
      });
    });

    it('should pass validation when the data matches each of the schemas', function () {
      const res = validateDataWithOpenApiSchema(10, {
        allOf: [{type: OADataType.NUMBER}, {type: OADataType.NUMBER}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the schema list is empty', function () {
      const res = validateDataWithOpenApiSchema(10, {allOf: []});
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should coerce types by the last matched schema', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {allOf: [{type: OADataType.NUMBER}, {type: OADataType.STRING}]},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: '10',
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "oneOf"', function () {
    it('should throw an error if the data does not match any one schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          oneOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}],
        });
      expect(throwable).to.throw(
        'Value at "" must match exactly one of schemas at "/oneOf", ' +
          'but 0 matched.',
      );
    });

    it('should reject the data when it does not match any one schema', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {oneOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/oneOf',
        reason:
          'Value at "" must match exactly one of schemas at "/oneOf", ' +
          'but 0 matched.',
      });
    });

    it('should pass validation when the data matches one of the schemas', function () {
      const res = validateDataWithOpenApiSchema(10, {
        oneOf: [{type: OADataType.STRING}, {type: OADataType.NUMBER}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error if the data matches more than one schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          oneOf: [
            {type: OADataType.NUMBER},
            {type: OADataType.STRING},
            {type: OADataType.NUMBER},
          ],
        });
      expect(throwable).to.throw(
        'Value at "" must match exactly one of schemas at "/oneOf", ' +
          'but 2 matched.',
      );
    });

    it('should reject the data when it matches more than one schema', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {
          oneOf: [
            {type: OADataType.NUMBER},
            {type: OADataType.STRING},
            {type: OADataType.NUMBER},
          ],
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/oneOf',
        reason:
          'Value at "" must match exactly one of schemas at "/oneOf", ' +
          'but 2 matched.',
      });
    });

    it('should coerce types to match one of the schemas', function () {
      const res = validateDataWithOpenApiSchema(
        'true',
        {oneOf: [{type: OADataType.BOOLEAN}, {type: OADataType.NUMBER}]},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: true,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should coerce types even if it causes to match more than one schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          true,
          {oneOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}]},
          {coerceTypes: true},
        );
      expect(throwable).to.throw(
        'Value at "" must match exactly one of schemas at "/oneOf", ' +
          'but 2 matched.',
      );
    });
  });

  describe('the keyword "anyOf"', function () {
    it('should throw an error if the data does not match any one schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          anyOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}],
        });
      expect(throwable).to.throw(
        'Value at "" must match at least one of schemas at "/anyOf", ' +
          'but 0 matched.',
      );
    });

    it('should reject the data when it does not match any one schema', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {anyOf: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/anyOf',
        reason:
          'Value at "" must match at least one of schemas at "/anyOf", ' +
          'but 0 matched.',
      });
    });

    it('should pass validation when the data matches one of the schemas', function () {
      const res = validateDataWithOpenApiSchema(10, {
        anyOf: [{type: OADataType.STRING}, {type: OADataType.NUMBER}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the data matches multiple schemas', function () {
      const res = validateDataWithOpenApiSchema(10, {
        anyOf: [{type: OADataType.NUMBER}, {type: OADataType.INTEGER}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should coerce types for the first matched schema', function () {
      const res = validateDataWithOpenApiSchema(
        'true',
        {anyOf: [{type: OADataType.BOOLEAN}, {type: OADataType.STRING}]},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: true,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "not"', function () {
    it('should throw an error if the data matches the schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {not: {type: OADataType.NUMBER}});
      expect(throwable).to.throw(
        'Value at "" must not match the "not" schema.',
      );
    });

    it('should reject the data when it matches the schema', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {not: {type: OADataType.NUMBER}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/not',
        reason: 'Value at "" must not match the "not" schema.',
      });
    });

    it('should pass validation when the data does not match the schema', function () {
      const res = validateDataWithOpenApiSchema(10, {
        not: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the schema properties "if" / "then" / "else"', function () {
    it('should pass validation when the "if" schema is not matched', function () {
      const res = validateDataWithOpenApiSchema(10, {
        if: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the "if" schema is matched', function () {
      const res = validateDataWithOpenApiSchema(10, {
        if: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should apply type coercion based on the "if" schema', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {if: {type: OADataType.STRING}},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: '10',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "if" schema is matched but the "then" schema is not', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          if: {type: OADataType.NUMBER},
          then: {type: OADataType.STRING},
        });
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should reject the data when the "if" schema is matched but the "then" schema is not', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {
          if: {type: OADataType.NUMBER},
          then: {type: OADataType.STRING},
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/then',
        reason: 'Value at "" must be String, but Integer was given.',
      });
    });

    it('should ignore the "then" schema when the "if" schema is not matched', function () {
      const res = validateDataWithOpenApiSchema(10, {
        if: {type: OADataType.STRING},
        then: {type: OADataType.BOOLEAN},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the data matched both "if" and "then" schemas', function () {
      const res = validateDataWithOpenApiSchema(10, {
        if: {type: OADataType.NUMBER},
        then: {type: OADataType.INTEGER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should coerce types with the "then" schema when the "if" schema is matched', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {
          if: {type: OADataType.NUMBER},
          then: {type: OADataType.STRING},
        },
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: '10',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error from the "else" schema when the "if" schema is not matched', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {
          if: {type: OADataType.STRING},
          else: {type: OADataType.BOOLEAN},
        });
      expect(throwable).to.throw(
        'Value at "" must be Boolean, but Integer was given.',
      );
    });

    it('should reject the data by the "else" schema when the "if" schema is not matched', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {
          if: {type: OADataType.STRING},
          else: {type: OADataType.BOOLEAN},
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '/else',
        reason: 'Value at "" must be Boolean, but Integer was given.',
      });
    });

    it('should pass validation when the "else" schema is matched but the "if" schema is not', function () {
      const res = validateDataWithOpenApiSchema(10, {
        if: {type: OADataType.STRING},
        else: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should coerce types by the "else" schema when the "if" schema is not matched', function () {
      const res = validateDataWithOpenApiSchema(
        10,
        {
          if: {type: OADataType.BOOLEAN},
          else: {type: OADataType.STRING},
        },
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: '10',
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "type"', function () {
    it('should throw an error when the "string" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.STRING});
      const error = v =>
        format(
          'Value at "" must be String, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = [10, 0.5, 0, true, false, [], {}, null];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "string" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.STRING},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be String, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = [10, 0.5, 0, true, false, [], {}, null];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "string" type is matched', function () {
      const vals = ['str', ''];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          type: OADataType.STRING,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value for the "string" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.STRING,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "number" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.NUMBER});
      const error = v =>
        format(
          'Value at "" must be Number, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', true, false, [], {}, null];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "number" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.NUMBER},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be Number, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', true, false, [], {}, null];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "number" type is matched', function () {
      const vals = [-10, -0.5, 0, 0.5, 10];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          type: OADataType.NUMBER,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value for the "number" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.NUMBER,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "integer" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.INTEGER});
      const error = v =>
        format(
          'Value at "" must be Integer, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', -0.5, 0.5, true, false, [], {}, null];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "integer" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.INTEGER},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be Integer, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', -0.5, 0.5, true, false, [], {}, null];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "integer" type is matched', function () {
      const vals = [-10, 0, 10];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          type: OADataType.INTEGER,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value for the "integer" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.INTEGER,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "boolean" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.BOOLEAN});
      const error = v =>
        format(
          'Value at "" must be Boolean, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, [], {}, null];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "boolean" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.BOOLEAN},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be Boolean, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, [], {}, null];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "boolean" type is matched', function () {
      const vals = [true, false];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          type: OADataType.BOOLEAN,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value for the "boolean" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.BOOLEAN,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "object" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.OBJECT});
      const error = v =>
        format(
          'Value at "" must be Object, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, true, false, [], null];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "object" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.OBJECT},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be Object, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, true, false, [], null];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "object" type is matched', function () {
      const vals = [{p: 1}, {}];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          type: OADataType.OBJECT,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value for the "object" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.OBJECT,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "array" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.ARRAY});
      const error = v =>
        format(
          'Value at "" must be Array, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, true, false, {}, null];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "array" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.ARRAY},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be Array, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, true, false, {}, null];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "array" type is matched', function () {
      const vals = [[1], []];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          type: OADataType.ARRAY,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should ignore an undefined value for the "array" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.ARRAY,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the "null" type is not matched', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(v, {type: OADataType.NULL});
      const error = v =>
        format(
          'Value at "" must be Null, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, true, false, [], {}];
      vals.forEach(val => expect(throwable(val)).to.throw(error(val)));
    });

    it('should reject the data when the "null" type is not matched', function () {
      const validate = v =>
        validateDataWithOpenApiSchema(
          v,
          {type: OADataType.NULL},
          {silent: true},
        );
      const reason = v =>
        format(
          'Value at "" must be Null, but %s was given.',
          toPascalCase(inferOpenApiDataType(v)),
        );
      const vals = ['str', '', 10, 0.5, 0, true, false, [], {}];
      vals.forEach(val => {
        expect(validate(val)).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: reason(val),
        });
      });
    });

    it('should pass validation when the "null" type is matched', function () {
      const res = validateDataWithOpenApiSchema(null, {
        type: OADataType.NULL,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: null,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore an undefined value for the "null" type validation', function () {
      const res = validateDataWithOpenApiSchema(undefined, {
        type: OADataType.NULL,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: undefined,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should skip type validation when the keyword "type" has an empty array', function () {
      const res = validateDataWithOpenApiSchema(10, {type: []});
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the data does not match the only type in the array', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(10, {type: [OADataType.STRING]});
      expect(throwable).to.throw(
        'Value at "" must be String, but Integer was given.',
      );
    });

    it('should pass validation when a some type in the array matches the data', function () {
      const res = validateDataWithOpenApiSchema(10, {
        type: [OADataType.INTEGER, OADataType.BOOLEAN],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "format"', function () {
    it('should ignore unknown format', function () {
      const res = validateDataWithOpenApiSchema(10, {format: 'unknown'});
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when a built-in format validator returns false', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('none', {format: 'email'});
      expect(throwable).to.throw(
        'Value at "" must match format "email", but "none" was given.',
      );
    });

    it('should reject the data when a built-in format validator returns false', function () {
      const res = validateDataWithOpenApiSchema(
        'none',
        {format: 'email'},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'none',
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must match format "email", but "none" was given.',
      });
    });

    it('should pass validation when a built-in format validator returns true', function () {
      const res = validateDataWithOpenApiSchema('mail@example.com', {
        format: 'email',
      });
      expect(res).to.be.eql({
        isValid: true,
        value: 'mail@example.com',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when a user-specified format validator returns false', function () {
      const value = 10;
      let invoked = 0;
      const validator = (...args) => {
        expect(args).to.be.eql([value]);
        invoked++;
        return false;
      };
      const throwable = () =>
        validateDataWithOpenApiSchema(
          10,
          {format: 'test'},
          {formatValidators: {test: validator}},
        );
      expect(throwable).to.throw(
        'Value at "" must match format "test", but 10 was given.',
      );
      expect(invoked).to.be.eq(1);
    });

    it('should reject the data when a user-specified format validator returns false', function () {
      const value = 10;
      let invoked = 0;
      const validator = (...args) => {
        expect(args).to.be.eql([value]);
        invoked++;
        return false;
      };
      const res = validateDataWithOpenApiSchema(
        10,
        {format: 'test'},
        {formatValidators: {test: validator}, silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must match format "test", but 10 was given.',
      });
      expect(invoked).to.be.eq(1);
    });

    it('should pass validation when a user-specified format validator returns true', function () {
      const value = 10;
      let invoked = 0;
      const validator = (...args) => {
        expect(args).to.be.eql([value]);
        invoked++;
        return true;
      };
      const res = validateDataWithOpenApiSchema(
        10,
        {format: 'test'},
        {formatValidators: {test: validator}},
      );
      expect(res).to.be.eql({
        isValid: true,
        value,
        valueUri: '',
        schemaUri: '',
      });
      expect(invoked).to.be.eq(1);
    });
  });

  describe('the keyword "const"', function () {
    it('should throw an error when data types are not the same', function () {
      const throwable = () => validateDataWithOpenApiSchema('10', {const: 10});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant 10, but "10" was given.',
      );
    });

    it('should reject the data when data types are not the same', function () {
      const res = validateDataWithOpenApiSchema(
        '10',
        {const: 10},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: '10',
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be equal to constant 10, but "10" was given.',
      });
    });

    it('should throw an error when string values are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('bar', {const: 'foo'});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant "foo", but "bar" was given.',
      );
    });

    it('should reject the data when string values are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        'bar',
        {const: 'foo'},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'bar',
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant "foo", but "bar" was given.',
      });
    });

    it('should throw an error when number values are not equal', function () {
      const throwable = () => validateDataWithOpenApiSchema(20, {const: 10});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant 10, but 20 was given.',
      );
    });

    it('should reject the data when number values are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        20,
        {const: 10},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 20,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be equal to constant 10, but 20 was given.',
      });
    });

    it('should throw an error when boolean values are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(false, {const: true});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant true, but false was given.',
      );
    });

    it('should reject the data when boolean values are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        false,
        {const: true},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: false,
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant true, but false was given.',
      });
    });

    it('should pass validation when the data is equal to the primitive constant', function () {
      const vals = ['str', 10, true, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {const: val});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when arrays order is not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema([2, 1], {const: [1, 2]});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant [1, 2], but [2, 1] was given.',
      );
    });

    it('should reject the data when the arrays order is not equal', function () {
      const res = validateDataWithOpenApiSchema(
        [2, 1],
        {const: [1, 2]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: [2, 1],
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant [1, 2], but [2, 1] was given.',
      });
    });

    it('should pass validation when the arrays order is equal', function () {
      const res = validateDataWithOpenApiSchema([1, 2], {const: [1, 2]});
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when object keys are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({b: 1}, {const: {a: 1}});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant {"a": 1}, ' +
          'but {"b": 1} was given.',
      );
    });

    it('should reject the data when object keys are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {b: 1},
        {const: {a: 1}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {b: 1},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant {"a": 1}, ' +
          'but {"b": 1} was given.',
      });
    });

    it('should throw an error when object values are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({a: 1}, {const: {a: 2}});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant {"a": 2}, ' +
          'but {"a": 1} was given.',
      );
    });

    it('should reject the data when object values are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: 1},
        {const: {a: 2}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {a: 1},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant {"a": 2}, ' +
          'but {"a": 1} was given.',
      });
    });

    it('should pass validation when object keys and values are equal', function () {
      const res = validateDataWithOpenApiSchema({p: 1}, {const: {p: 1}});
      expect(res).to.be.eql({
        isValid: true,
        value: {p: 1},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when object keys of nested objects are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({a: {b: 1}}, {const: {a: {c: 1}}});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant {"a": {"c": 1}}, ' +
          'but {"a": {"b": 1}} was given.',
      );
    });

    it('should reject the data when object keys of nested objects are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: {b: 1}},
        {const: {a: {c: 1}}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {a: {b: 1}},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant {"a": {"c": 1}}, ' +
          'but {"a": {"b": 1}} was given.',
      });
    });

    it('should throw an error when object values of nested objects are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({a: {b: 1}}, {const: {a: {b: 2}}});
      expect(throwable).to.throw(
        'Value at "" must be equal to constant {"a": {"b": 2}}, ' +
          'but {"a": {"b": 1}} was given.',
      );
    });

    it('should reject the data when object values of nested objects are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: {b: 1}},
        {const: {a: {b: 2}}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {a: {b: 1}},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be equal to constant {"a": {"b": 2}}, ' +
          'but {"a": {"b": 1}} was given.',
      });
    });

    it('should pass validation when object keys and values of nested objects are equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: {b: 1}},
        {const: {a: {b: 1}}},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {a: {b: 1}},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "enum"', function () {
    it('should throw an error when the enum array is empty', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null, undefined];
      const throwable = v => () => validateDataWithOpenApiSchema(v, {enum: []});
      const error = v =>
        format(
          'Value at "" must be one of [], but %s was given.',
          toSpacedJson(v),
        );
      vals.forEach(val => {
        expect(throwable(val)).to.throw(error(val));
      });
    });

    it('should reject the data when the enum array is empty', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null, undefined];
      const error = v =>
        format(
          'Value at "" must be one of [], but %s was given.',
          toSpacedJson(v),
        );
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          val,
          {enum: []},
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: val,
          valueUri: '',
          schemaUri: '',
          reason: error(val),
        });
      });
    });

    it('should throw an error when a string value is not matched', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('baz', {enum: ['foo', 'bar']});
      expect(throwable).to.throw(
        'Value at "" must be one of ["foo", "bar"], but "baz" was given.',
      );
    });

    it('should reject the data when a string value is not matched', function () {
      const res = validateDataWithOpenApiSchema(
        'baz',
        {enum: ['foo', 'bar']},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'baz',
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be one of ["foo", "bar"], but "baz" was given.',
      });
    });

    it('should pass validation when a string value is matched', function () {
      const res = validateDataWithOpenApiSchema('foo', {enum: ['foo', 'bar']});
      expect(res).to.be.eql({
        isValid: true,
        value: 'foo',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when a number value is not matched', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(30, {enum: [10, 20]});
      expect(throwable).to.throw(
        'Value at "" must be one of [10, 20], but 30 was given.',
      );
    });

    it('should reject the data when a number value is not matched', function () {
      const res = validateDataWithOpenApiSchema(
        30,
        {enum: [10, 20]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 30,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be one of [10, 20], but 30 was given.',
      });
    });

    it('should pass validation when a number value is matched', function () {
      const res = validateDataWithOpenApiSchema(10, {enum: [10, 20]});
      expect(res).to.be.eql({
        isValid: true,
        value: 10,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when a boolean value is not matched', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(true, {enum: [false]});
      expect(throwable).to.throw(
        'Value at "" must be one of [false], but true was given.',
      );
    });

    it('should reject the data when a boolean value is not matched', function () {
      const res = validateDataWithOpenApiSchema(
        true,
        {enum: [false]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: true,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be one of [false], but true was given.',
      });
    });

    it('should pass validation when a boolean value is matched', function () {
      const res = validateDataWithOpenApiSchema(true, {enum: [true, false]});
      expect(res).to.be.eql({
        isValid: true,
        value: true,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the arrays order is not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema([2, 1], {
          enum: [
            [1, 2],
            [3, 4],
          ],
        });
      expect(throwable).to.throw(
        'Value at "" must be one of [[1, 2], [3, 4]], but [2, 1] was given.',
      );
    });

    it('should reject the data when the arrays order is not equal', function () {
      const res = validateDataWithOpenApiSchema(
        [2, 1],
        {
          enum: [
            [1, 2],
            [3, 4],
          ],
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: [2, 1],
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be one of [[1, 2], [3, 4]], but [2, 1] was given.',
      });
    });

    it('should pass validation when the arrays order is equal', function () {
      const res = validateDataWithOpenApiSchema(
        [1, 2],
        {
          enum: [
            [1, 2],
            [3, 4],
          ],
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when object keys are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({c: 1}, {enum: [{a: 1}, {b: 1}]});
      expect(throwable).to.throw(
        'Value at "" must be one of [{"a": 1}, {"b": 1}], ' +
          'but {"c": 1} was given.',
      );
    });

    it('should reject the data when object keys are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {c: 1},
        {enum: [{a: 1}, {b: 1}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {c: 1},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be one of [{"a": 1}, {"b": 1}], ' +
          'but {"c": 1} was given.',
      });
    });

    it('should throw an error when object values are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({a: 3}, {enum: [{a: 1}, {a: 2}]});
      expect(throwable).to.throw(
        'Value at "" must be one of [{"a": 1}, {"a": 2}], ' +
          'but {"a": 3} was given.',
      );
    });

    it('should reject the data when object values are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: 3},
        {enum: [{a: 1}, {a: 2}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {a: 3},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be one of [{"a": 1}, {"a": 2}], ' +
          'but {"a": 3} was given.',
      });
    });

    it('should pass validation when object keys and values are equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: 1},
        {enum: [{a: 1}, {b: 2}]},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {a: 1},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when object keys of nested objects are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          {a: {d: 1}},
          {enum: [{a: {b: 1}}, {a: {c: 1}}]},
        );
      expect(throwable).to.throw(
        'Value at "" must be one of [{"a": {"b": 1}}, {"a": {"c": 1}}], ' +
          'but {"a": {"d": 1}} was given.',
      );
    });

    it('should reject the data when object keys of nested objects are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: {d: 1}},
        {enum: [{a: {b: 1}}, {a: {c: 1}}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {a: {d: 1}},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be one of [{"a": {"b": 1}}, {"a": {"c": 1}}], ' +
          'but {"a": {"d": 1}} was given.',
      });
    });

    it('should throw an error when object values of nested objects are not equal', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          {a: {b: 2}},
          {enum: [{a: {b: 1}}, {a: {c: 1}}]},
        );
      expect(throwable).to.throw(
        'Value at "" must be one of [{"a": {"b": 1}}, {"a": {"c": 1}}], ' +
          'but {"a": {"b": 2}} was given.',
      );
    });

    it('should reject the data when object values of nested objects are not equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: {b: 2}},
        {enum: [{a: {b: 1}}, {a: {c: 1}}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {a: {b: 2}},
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be one of [{"a": {"b": 1}}, {"a": {"c": 1}}], ' +
          'but {"a": {"b": 2}} was given.',
      });
    });

    it('should pass validation when object keys and values of nested objects are equal', function () {
      const res = validateDataWithOpenApiSchema(
        {a: {b: 1}},
        {enum: [{a: {b: 1}}, {a: {c: 1}}]},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {a: {b: 1}},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "minLength"', function () {
    it('should be ignored for a non-string values', function () {
      const vals = [10, 0, true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {minLength: 1});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the string length is less than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('a', {minLength: 2});
      expect(throwable).to.throw(
        'String at "" must be at least 2 characters long, but 1 was given.',
      );
    });

    it('should reject the data when the string length is less than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        'a',
        {minLength: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'a',
        valueUri: '',
        schemaUri: '',
        reason:
          'String at "" must be at least 2 characters long, ' +
          'but 1 was given.',
      });
    });

    it('should pass validation when the string length is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema('ab', {minLength: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 'ab',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the string length is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema('abc', {minLength: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 'abc',
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "maxLength"', function () {
    it('should be ignored for a non-string values', function () {
      const vals = [10, 0, true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {maxLength: 1});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the string length is greater than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('abc', {maxLength: 2});
      expect(throwable).to.throw(
        'String at "" must be at most 2 characters long, but 3 was given.',
      );
    });

    it('should reject the data when the string length is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        'abc',
        {maxLength: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'abc',
        valueUri: '',
        schemaUri: '',
        reason:
          'String at "" must be at most 2 characters long, ' +
          'but 3 was given.',
      });
    });

    it('should pass validation when the string length is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema('ab', {maxLength: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 'ab',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the string length is less than the limit', function () {
      const res = validateDataWithOpenApiSchema('a', {maxLength: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 'a',
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "pattern"', function () {
    it('should be ignored for a non-string values', function () {
      const vals = [10, 0, true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {pattern: '^\\d$'});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the string does not match the string pattern', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('abc', {pattern: '^\\d$'});
      expect(throwable).to.throw(
        'String at "" must match pattern "^\\d$", but "abc" was given.',
      );
    });

    it('should reject the data when the string does not match the string pattern', function () {
      const res = validateDataWithOpenApiSchema(
        'abc',
        {pattern: '^\\d$'},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'abc',
        valueUri: '',
        schemaUri: '',
        reason: 'String at "" must match pattern "^\\d$", but "abc" was given.',
      });
    });

    it('should pass validation when the string matches the string pattern', function () {
      const res = validateDataWithOpenApiSchema('5', {pattern: '^\\d$'});
      expect(res).to.be.eql({
        isValid: true,
        value: '5',
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the string does not match the RegExp pattern', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema('abc', {pattern: /^\d$/});
      expect(throwable).to.throw(
        'String at "" must match pattern "/^\\d$/", but "abc" was given.',
      );
    });

    it('should reject the data when the string does not match the RegExp pattern', function () {
      const res = validateDataWithOpenApiSchema(
        'abc',
        {pattern: /^\d$/},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'abc',
        valueUri: '',
        schemaUri: '',
        reason:
          'String at "" must match pattern "/^\\d$/", but "abc" was given.',
      });
    });

    it('should pass validation when the string matches the RegExp pattern', function () {
      const res = validateDataWithOpenApiSchema('5', {pattern: /^\d$/});
      expect(res).to.be.eql({
        isValid: true,
        value: '5',
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "minimum"', function () {
    it('should be ignored for a non-number values', function () {
      const vals = ['str', '', true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {minimum: 1});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the integer is less than the minimum', function () {
      const throwable = () => validateDataWithOpenApiSchema(1, {minimum: 2});
      expect(throwable).to.throw(
        'Value at "" must be greater than or equal to 2, but 1 was given.',
      );
    });

    it('should reject the data when the integer is less than the minimum', function () {
      const res = validateDataWithOpenApiSchema(
        1,
        {minimum: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 1,
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be greater than or equal to 2, but 1 was given.',
      });
    });

    it('should pass validation when the integer is equal to the minimum', function () {
      const res = validateDataWithOpenApiSchema(2, {minimum: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 2,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the integer is greater than the minimum', function () {
      const res = validateDataWithOpenApiSchema(3, {minimum: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 3,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the float is less than the minimum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(1.5, {minimum: 2.5});
      expect(throwable).to.throw(
        'Value at "" must be greater than or equal to 2.5, but 1.5 was given.',
      );
    });

    it('should reject the data when the float is less than the minimum', function () {
      const res = validateDataWithOpenApiSchema(
        1.5,
        {minimum: 2.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 1.5,
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be greater than or equal to 2.5, but 1.5 was given.',
      });
    });

    it('should pass validation when the float is equal to the minimum', function () {
      const res = validateDataWithOpenApiSchema(2.5, {minimum: 2.5});
      expect(res).to.be.eql({
        isValid: true,
        value: 2.5,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the float is greater than the minimum', function () {
      const res = validateDataWithOpenApiSchema(3.5, {minimum: 2.5});
      expect(res).to.be.eql({
        isValid: true,
        value: 3.5,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "maximum"', function () {
    it('should be ignored for a non-number values', function () {
      const vals = ['str', '', true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {maximum: 1});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the integer is greater than the maximum', function () {
      const throwable = () => validateDataWithOpenApiSchema(3, {maximum: 2});
      expect(throwable).to.throw(
        'Value at "" must be less than or equal to 2, but 3 was given.',
      );
    });

    it('should reject the data when the integer is less than the maximum', function () {
      const res = validateDataWithOpenApiSchema(
        3,
        {maximum: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 3,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be less than or equal to 2, but 3 was given.',
      });
    });

    it('should pass validation when the integer is equal to the maximum', function () {
      const res = validateDataWithOpenApiSchema(2, {maximum: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 2,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the integer is less than the maximum', function () {
      const res = validateDataWithOpenApiSchema(1, {maximum: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 1,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the float is greater than the maximum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(3.5, {maximum: 2.5});
      expect(throwable).to.throw(
        'Value at "" must be less than or equal to 2.5, but 3.5 was given.',
      );
    });

    it('should reject the data when the float is greater than the maximum', function () {
      const res = validateDataWithOpenApiSchema(
        3.5,
        {maximum: 2.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 3.5,
        valueUri: '',
        schemaUri: '',
        reason:
          'Value at "" must be less than or equal to 2.5, but 3.5 was given.',
      });
    });

    it('should pass validation when the float is equal to the maximum', function () {
      const res = validateDataWithOpenApiSchema(2.5, {maximum: 2.5});
      expect(res).to.be.eql({
        isValid: true,
        value: 2.5,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the float is less than the maximum', function () {
      const res = validateDataWithOpenApiSchema(1.5, {maximum: 2.5});
      expect(res).to.be.eql({
        isValid: true,
        value: 1.5,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "exclusiveMinimum"', function () {
    it('should be ignored for a non-number values', function () {
      const vals = ['str', '', true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {exclusiveMinimum: 1});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the integer is less than the exclusive minimum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(1, {exclusiveMinimum: 2});
      expect(throwable).to.throw(
        'Value at "" must be greater than 2, but 1 was given.',
      );
    });

    it('should reject the data when the integer is less than the exclusive minimum', function () {
      const res = validateDataWithOpenApiSchema(
        1,
        {exclusiveMinimum: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 1,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be greater than 2, but 1 was given.',
      });
    });

    it('should throw an error when the integer is equal to the exclusive minimum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(2, {exclusiveMinimum: 2});
      expect(throwable).to.throw(
        'Value at "" must be greater than 2, but 2 was given.',
      );
    });

    it('should reject the data when the integer is equal to the exclusive minimum', function () {
      const res = validateDataWithOpenApiSchema(
        2,
        {exclusiveMinimum: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 2,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be greater than 2, but 2 was given.',
      });
    });

    it('should pass validation when the integer is greater than the exclusive minimum', function () {
      const res = validateDataWithOpenApiSchema(3, {exclusiveMinimum: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 3,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the float is less than the exclusive minimum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(1.5, {exclusiveMinimum: 2.5});
      expect(throwable).to.throw(
        'Value at "" must be greater than 2.5, but 1.5 was given.',
      );
    });

    it('should reject the data when the float is less than the exclusive minimum', function () {
      const res = validateDataWithOpenApiSchema(
        1.5,
        {exclusiveMinimum: 2.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 1.5,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be greater than 2.5, but 1.5 was given.',
      });
    });

    it('should throw an error when the float is equal to the exclusive minimum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(2.5, {exclusiveMinimum: 2.5});
      expect(throwable).to.throw(
        'Value at "" must be greater than 2.5, but 2.5 was given.',
      );
    });

    it('should reject the data when the float is equal to the exclusive minimum', function () {
      const res = validateDataWithOpenApiSchema(
        2.5,
        {exclusiveMinimum: 2.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 2.5,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be greater than 2.5, but 2.5 was given.',
      });
    });

    it('should pass validation when the float is greater than the exclusive minimum', function () {
      const res = validateDataWithOpenApiSchema(3.5, {exclusiveMinimum: 2.5});
      expect(res).to.be.eql({
        isValid: true,
        value: 3.5,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "exclusiveMaximum"', function () {
    it('should be ignored for a non-number values', function () {
      const vals = ['str', '', true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {exclusiveMaximum: 1});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the integer is greater than the exclusive maximum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(3, {exclusiveMaximum: 2});
      expect(throwable).to.throw(
        'Value at "" must be less than 2, but 3 was given.',
      );
    });

    it('should reject the data when the integer is greater than the exclusive maximum', function () {
      const res = validateDataWithOpenApiSchema(
        3,
        {exclusiveMaximum: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 3,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be less than 2, but 3 was given.',
      });
    });

    it('should throw an error when the integer is equal to the exclusive maximum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(2, {exclusiveMaximum: 2});
      expect(throwable).to.throw(
        'Value at "" must be less than 2, but 2 was given.',
      );
    });

    it('should reject the data when the integer is equal to the exclusive maximum', function () {
      const res = validateDataWithOpenApiSchema(
        2,
        {exclusiveMaximum: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 2,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be less than 2, but 2 was given.',
      });
    });

    it('should pass validation when the integer is less than the exclusive maximum', function () {
      const res = validateDataWithOpenApiSchema(1, {exclusiveMaximum: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: 1,
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error when the float is greater than the exclusive maximum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(3.5, {exclusiveMaximum: 2.5});
      expect(throwable).to.throw(
        'Value at "" must be less than 2.5, but 3.5 was given.',
      );
    });

    it('should reject the data when the float is greater than the exclusive maximum', function () {
      const res = validateDataWithOpenApiSchema(
        3.5,
        {exclusiveMaximum: 2.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 3.5,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be less than 2.5, but 3.5 was given.',
      });
    });

    it('should throw an error when the float is equal to the exclusive maximum', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(2.5, {exclusiveMaximum: 2.5});
      expect(throwable).to.throw(
        'Value at "" must be less than 2.5, but 2.5 was given.',
      );
    });

    it('should reject the data when the float is equal to the exclusive maximum', function () {
      const res = validateDataWithOpenApiSchema(
        2.5,
        {exclusiveMaximum: 2.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 2.5,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be less than 2.5, but 2.5 was given.',
      });
    });

    it('should pass validation when the float is less than the exclusive maximum', function () {
      const res = validateDataWithOpenApiSchema(1.5, {exclusiveMaximum: 2.5});
      expect(res).to.be.eql({
        isValid: true,
        value: 1.5,
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "multipleOf"', function () {
    it('should be ignored for a non-number values', function () {
      const vals = ['str', '', true, false, [], {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {multipleOf: 10});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the option value is lower than or equal to zero', function () {
      const throwable = v => () =>
        validateDataWithOpenApiSchema(10, {multipleOf: v});
      const error = v =>
        format(
          'Schema keyword "multipleOf" must be a Number strictly ' +
            'greater than 0, but %v was given.',
          v,
        );
      [0, -0.5, -1].forEach(val => {
        expect(throwable(val)).to.throw(error(val));
      });
    });

    it('should throw an error when the integer is not multiple of the value', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(15, {multipleOf: 10});
      expect(throwable).to.throw(
        'Value at "" must be a multiple of 10, but 15 was given.',
      );
    });

    it('should reject the data when the integer is not multiple of the value', function () {
      const res = validateDataWithOpenApiSchema(
        15,
        {multipleOf: 10},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 15,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be a multiple of 10, but 15 was given.',
      });
    });

    it('should pass validation when the integer is not multiple of the value', function () {
      [-30, -20, -10, 10, 20, 30].forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {multipleOf: 10});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the float is not multiple of the value', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(15.5, {multipleOf: 10.5});
      expect(throwable).to.throw(
        'Value at "" must be a multiple of 10.5, but 15.5 was given.',
      );
    });

    it('should reject the data when the float is not multiple of the value', function () {
      const res = validateDataWithOpenApiSchema(
        15.5,
        {multipleOf: 10.5},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 15.5,
        valueUri: '',
        schemaUri: '',
        reason: 'Value at "" must be a multiple of 10.5, but 15.5 was given.',
      });
    });

    it('should pass validation when the float is not multiple of the value', function () {
      [-31.5, -21, -10.5, 10.5, 21, 31.5].forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {multipleOf: 10.5});
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });

  describe('the keyword "prefixItems"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          prefixItems: [{type: OADataType.STRING}],
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when one of the items does not match its schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema([1, 2], {
          prefixItems: [{type: OADataType.NUMBER}, {type: OADataType.STRING}],
        });
      expect(throwable).to.throw(
        'Value at "/1" must be String, but Integer was given.',
      );
    });

    it('should reject the data when one of the items does not match its schema', function () {
      const res = validateDataWithOpenApiSchema(
        [1, 2],
        {prefixItems: [{type: OADataType.NUMBER}, {type: OADataType.STRING}]},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 2,
        valueUri: '/1',
        schemaUri: '/prefixItems/1',
        reason: 'Value at "/1" must be String, but Integer was given.',
      });
    });

    it('should pass validation when all items are match its schemas', function () {
      const res = validateDataWithOpenApiSchema(['str', 10], {
        prefixItems: [{type: OADataType.STRING}, {type: OADataType.NUMBER}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the array length is less than the schemas number', function () {
      const res = validateDataWithOpenApiSchema([10], {
        prefixItems: [{type: OADataType.NUMBER}, {type: OADataType.STRING}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: [10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the array length is greater than the schemas number', function () {
      const res = validateDataWithOpenApiSchema(['str', 10, true], {
        prefixItems: [{type: OADataType.STRING}, {type: OADataType.NUMBER}],
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', 10, true],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should apply type coercion to array items by the schemas', function () {
      const res = validateDataWithOpenApiSchema(
        [10, 'true'],
        {prefixItems: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}]},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: ['10', true],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "items"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          items: {type: OADataType.STRING},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when one of the items does not match its schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['str', 10], {
          items: {type: OADataType.STRING},
        });
      expect(throwable).to.throw(
        'Value at "/1" must be String, but Integer was given.',
      );
    });

    it('should reject the data when one of the items does not match its schema', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10],
        {items: {type: OADataType.STRING}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/1',
        schemaUri: '/items',
        reason: 'Value at "/1" must be String, but Integer was given.',
      });
    });

    it('should pass validation when all items are match the schema', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar'], {
        items: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar'],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when an array is empty', function () {
      const res = validateDataWithOpenApiSchema([], {
        items: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: [],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items that validated with the "prefixItems" keyword', function () {
      const res = validateDataWithOpenApiSchema(['str', true, 10], {
        prefixItems: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}],
        items: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', true, 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error even when the "prefixItems" is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['str', 10], {
          prefixItems: [{type: OADataType.STRING}],
          items: {type: OADataType.BOOLEAN},
        });
      expect(throwable).to.throw(
        'Value at "/1" must be Boolean, but Integer was given.',
      );
    });

    it('should reject the data even when the "prefixItems" is specified', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10],
        {
          prefixItems: [{type: OADataType.STRING}],
          items: {type: OADataType.BOOLEAN},
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/1',
        schemaUri: '/items',
        reason: 'Value at "/1" must be Boolean, but Integer was given.',
      });
    });

    it('should apply type coercion to array items by the schema', function () {
      const res = validateDataWithOpenApiSchema(
        [10, true],
        {items: {type: OADataType.STRING}},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: ['10', 'true'],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should apply type coercion even when the "prefixItems" is specified', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10, true],
        {
          prefixItems: [{type: OADataType.STRING}],
          items: {type: OADataType.STRING},
        },
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', '10', 'true'],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "minItems"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          minItems: 1,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error even when the array length is less than the limit', function () {
      const throwable = () => validateDataWithOpenApiSchema([1], {minItems: 2});
      expect(throwable).to.throw(
        'Array at "" must contain at least 2 items, but 1 was given.',
      );
    });

    it('should reject the data even when the array length is less than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        [1],
        {minItems: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: [1],
        valueUri: '',
        schemaUri: '',
        reason: 'Array at "" must contain at least 2 items, but 1 was given.',
      });
    });

    it('should pass validation when the array length is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema([1, 2], {minItems: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the array length is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema([1, 2, 3], {minItems: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2, 3],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "maxItems"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          maxItems: 1,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error even when the array length is greater than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema([1, 2, 3], {maxItems: 2});
      expect(throwable).to.throw(
        'Array at "" must contain at most 2 items, but 3 was given.',
      );
    });

    it('should reject the data even when the array length is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        [1, 2, 3],
        {maxItems: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: [1, 2, 3],
        valueUri: '',
        schemaUri: '',
        reason: 'Array at "" must contain at most 2 items, but 3 was given.',
      });
    });

    it('should pass validation when the array length is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema([1, 2], {maxItems: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when the array length is less than the limit', function () {
      const res = validateDataWithOpenApiSchema([1], {maxItems: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: [1],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "uniqueItems"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          uniqueItems: true,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when array items is not unique', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema([1, 2, 1], {uniqueItems: true});
      expect(throwable).to.throw(
        'Array at "" must contain unique items, ' +
          'but items at index 0 and 2 are identical.',
      );
    });

    it('should reject the data even when array items is not unique', function () {
      const res = validateDataWithOpenApiSchema(
        [1, 2, 1],
        {uniqueItems: true},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: [1, 2, 1],
        valueUri: '',
        schemaUri: '',
        reason:
          'Array at "" must contain unique items, ' +
          'but items at index 0 and 2 are identical.',
      });
    });

    it('should pass validation when array items is unique', function () {
      const res = validateDataWithOpenApiSchema([1, 2, 3], {uniqueItems: true});
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2, 3],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation for non-unique array when the option is false', function () {
      const res = validateDataWithOpenApiSchema([1, 2, 1], {
        uniqueItems: false,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: [1, 2, 1],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "contains"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          contains: {type: OADataType.STRING},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when no one array item matches the schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema([1, 2], {
          contains: {type: OADataType.STRING},
        });
      expect(throwable).to.throw(
        'Array at "" must contain at least 1 item(s) matching ' +
          'the "contains" schema, but 0 was found.',
      );
    });

    it('should reject the data when no one array item matches the schema', function () {
      const res = validateDataWithOpenApiSchema(
        [1, 2],
        {contains: {type: OADataType.STRING}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: [1, 2],
        valueUri: '',
        schemaUri: '/contains',
        reason:
          'Array at "" must contain at least 1 item(s) matching ' +
          'the "contains" schema, but 0 was found.',
      });
    });

    it('should pass validation when at least one array item matches the schema', function () {
      const res = validateDataWithOpenApiSchema(['str', 10], {
        contains: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when at least two array items matches the schema', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar', 10], {
        contains: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar', 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when all array items match the schema', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar', 'baz'], {
        contains: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar', 'baz'],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "minContains"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          contains: {type: OADataType.STRING},
          minContains: 2,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when matched items number is less than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['str', 10], {
          contains: {type: OADataType.STRING},
          minContains: 2,
        });
      expect(throwable).to.throw(
        'Array at "" must contain at least 2 item(s) matching ' +
          'the "contains" schema, but 1 was found.',
      );
    });

    it('should reject the data when matched items number is less than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10],
        {contains: {type: OADataType.STRING}, minContains: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: ['str', 10],
        valueUri: '',
        schemaUri: '/contains',
        reason:
          'Array at "" must contain at least 2 item(s) matching ' +
          'the "contains" schema, but 1 was found.',
      });
    });

    it('should pass validation when matched items number is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar', 10], {
        contains: {type: OADataType.STRING},
        minContains: 2,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar', 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when matched items number is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar', 'baz', 10], {
        contains: {type: OADataType.STRING},
        minContains: 2,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar', 'baz', 10],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "maxContains"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          contains: {type: OADataType.STRING},
          maxContains: 2,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when matched items number is greater than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['foo', 'bar', 'baz', 10], {
          contains: {type: OADataType.STRING},
          maxContains: 2,
        });
      expect(throwable).to.throw(
        'Array at "" must contain at most 2 item(s) matching ' +
          'the "contains" schema, but 3 was found.',
      );
    });

    it('should reject the data when matched items number is less than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        ['foo', 'bar', 'baz', 10],
        {contains: {type: OADataType.STRING}, maxContains: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: ['foo', 'bar', 'baz', 10],
        valueUri: '',
        schemaUri: '/contains',
        reason:
          'Array at "" must contain at most 2 item(s) matching ' +
          'the "contains" schema, but 3 was found.',
      });
    });

    it('should pass validation when matched items number is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar', 10], {
        contains: {type: OADataType.STRING},
        maxContains: 2,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar', 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when matched items number is less than the limit', function () {
      const res = validateDataWithOpenApiSchema(['str', 10], {
        contains: {type: OADataType.STRING},
        maxContains: 2,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', 10],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "unevaluatedItems"', function () {
    it('should be ignored for a non-array values', function () {
      const vals = ['str', '', 10, 0, true, false, {}, null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          unevaluatedItems: {type: OADataType.STRING},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when one of the items does not match its schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['str', 10], {
          unevaluatedItems: {type: OADataType.STRING},
        });
      expect(throwable).to.throw(
        'Value at "/1" must be String, but Integer was given.',
      );
    });

    it('should reject the data when one of the items does not match its schema', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10],
        {unevaluatedItems: {type: OADataType.STRING}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/1',
        schemaUri: '/unevaluatedItems',
        reason: 'Value at "/1" must be String, but Integer was given.',
      });
    });

    it('should pass validation when all items are match the schema', function () {
      const res = validateDataWithOpenApiSchema(['foo', 'bar'], {
        unevaluatedItems: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['foo', 'bar'],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when an array is empty', function () {
      const res = validateDataWithOpenApiSchema([], {
        unevaluatedItems: {type: OADataType.STRING},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: [],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error for unevaluated items when the option value is false', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['str', 10, true], {
          prefixItems: [{type: OADataType.STRING}],
          unevaluatedItems: false,
        });
      expect(throwable).to.throw(
        'Array at "" has unevaluated item at index 1, which is not allowed.',
      );
    });

    it('should reject unevaluated items when the option value is false', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10, true],
        {
          prefixItems: [{type: OADataType.STRING}],
          unevaluatedItems: false,
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/1',
        schemaUri: '/unevaluatedItems',
        reason:
          'Array at "" has unevaluated item at index 1, ' +
          'which is not allowed.',
      });
    });

    it('should pass validation for unevaluated items when the option value is true', function () {
      const res = validateDataWithOpenApiSchema(['str', 10, true], {
        prefixItems: [{type: OADataType.STRING}],
        unevaluatedItems: true,
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', 10, true],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items validated by the referenced sub-schema', function () {
      const rootDocument = {
        subSchema: {
          type: OADataType.ARRAY,
          prefixItems: [{type: OADataType.STRING}],
        },
      };
      const res = validateDataWithOpenApiSchema(
        ['str', 10, 20],
        {
          $ref: '#/subSchema',
          unevaluatedItems: {type: OADataType.NUMBER},
        },
        {rootDocument},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', 10, 20],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items that validated with the "allOf" keyword', function () {
      const res = validateDataWithOpenApiSchema(['str', true, 10], {
        allOf: [
          {type: OADataType.ARRAY},
          {
            type: OADataType.ARRAY,
            prefixItems: [true, {type: OADataType.BOOLEAN}],
          },
        ],
        unevaluatedItems: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', true, 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items that validated with the "oneOf" keyword', function () {
      const res = validateDataWithOpenApiSchema(['str', true, 10], {
        oneOf: [
          {
            type: OADataType.ARRAY,
            prefixItems: [
              {type: OADataType.BOOLEAN},
              {type: OADataType.STRING},
            ],
          },
          {
            type: OADataType.ARRAY,
            prefixItems: [
              {type: OADataType.STRING},
              {type: OADataType.BOOLEAN},
            ],
          },
        ],
        unevaluatedItems: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', true, 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items that validated with the "anyOf" keyword', function () {
      const res = validateDataWithOpenApiSchema(['str', true, 10], {
        anyOf: [
          {type: OADataType.ARRAY},
          {
            type: OADataType.ARRAY,
            prefixItems: [
              {type: OADataType.STRING},
              {type: OADataType.BOOLEAN},
            ],
          },
        ],
        unevaluatedItems: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', true, 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items that validated with the "prefixItems" keyword', function () {
      const res = validateDataWithOpenApiSchema(['str', true, 10], {
        prefixItems: [{type: OADataType.STRING}, {type: OADataType.BOOLEAN}],
        unevaluatedItems: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: ['str', true, 10],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should ignore items that validated with the "contains" keyword', function () {
      const res = validateDataWithOpenApiSchema([10, 'str', 20], {
        contains: {type: OADataType.STRING},
        unevaluatedItems: {type: OADataType.NUMBER},
      });
      expect(res).to.be.eql({
        isValid: true,
        value: [10, 'str', 20],
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should throw an error even when the "prefixItems" is specified', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(['str', 10], {
          prefixItems: [{type: OADataType.STRING}],
          unevaluatedItems: {type: OADataType.BOOLEAN},
        });
      expect(throwable).to.throw(
        'Value at "/1" must be Boolean, but Integer was given.',
      );
    });

    it('should reject the data even when the "prefixItems" is specified', function () {
      const res = validateDataWithOpenApiSchema(
        ['str', 10],
        {
          prefixItems: [{type: OADataType.STRING}],
          unevaluatedItems: {type: OADataType.BOOLEAN},
        },
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/1',
        schemaUri: '/unevaluatedItems',
        reason: 'Value at "/1" must be Boolean, but Integer was given.',
      });
    });

    it('should apply type coercion to array items by the schema', function () {
      const res = validateDataWithOpenApiSchema(
        [10, true],
        {unevaluatedItems: {type: OADataType.STRING}},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: ['10', 'true'],
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "maxProperties"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          maxProperties: 1,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when properties number is greater than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          {p1: 1, p2: 2, p3: 3},
          {
            maxProperties: 2,
          },
        );
      expect(throwable).to.throw(
        'Object at "" must contain at most 2 properties, but 3 was given.',
      );
    });

    it('should reject the data when properties number is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        {p1: 1, p2: 2, p3: 3},
        {maxProperties: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {p1: 1, p2: 2, p3: 3},
        valueUri: '',
        schemaUri: '',
        reason:
          'Object at "" must contain at most 2 properties, ' +
          'but 3 was given.',
      });
    });

    it('should pass validation when properties number is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema(
        {p1: 1, p2: 2},
        {maxProperties: 2},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {p1: 1, p2: 2},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when properties number is less than the limit', function () {
      const res = validateDataWithOpenApiSchema({p1: 1}, {maxProperties: 2});
      expect(res).to.be.eql({
        isValid: true,
        value: {p1: 1},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "minProperties"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          minProperties: 1,
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when properties number is less than the limit', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({p1: 1}, {minProperties: 2});
      expect(throwable).to.throw(
        'Object at "" must contain at least 2 properties, but 1 was given.',
      );
    });

    it('should reject the data when properties number is less than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        {p1: 1},
        {minProperties: 2},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: {p1: 1},
        valueUri: '',
        schemaUri: '',
        reason:
          'Object at "" must contain at least 2 properties, ' +
          'but 1 was given.',
      });
    });

    it('should pass validation when properties number is equal to the limit', function () {
      const res = validateDataWithOpenApiSchema(
        {p1: 1, p2: 2},
        {minProperties: 2},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {p1: 1, p2: 2},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when properties number is greater than the limit', function () {
      const res = validateDataWithOpenApiSchema(
        {p1: 1, p2: 2, p3: 3},
        {minProperties: 2},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {p1: 1, p2: 2, p3: 3},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "required"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          required: ['prop'],
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the required property is not defined', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({}, {required: ['prop']});
      expect(throwable).to.throw(
        'Property "prop" at "" is required, but undefined was given.',
      );
    });

    it('should reject the data when the required property is not defined', function () {
      const res = validateDataWithOpenApiSchema(
        {},
        {required: ['prop']},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: undefined,
        valueUri: '/prop',
        schemaUri: '',
        reason: 'Property "prop" at "" is required, but undefined was given.',
      });
    });

    it('should throw an error when the required property is undefined', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema({prop: undefined}, {required: ['prop']});
      expect(throwable).to.throw(
        'Property "prop" at "" is required, but undefined was given.',
      );
    });

    it('should reject the data when the required property is undefined', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: undefined},
        {required: ['prop']},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: undefined,
        valueUri: '/prop',
        schemaUri: '',
        reason: 'Property "prop" at "" is required, but undefined was given.',
      });
    });

    it('should pass validation when the required property is non-undefined', function () {
      const vals = ['str', '', 10, 0, true, false, [], {}, null];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(
          {prop: val},
          {required: ['prop']},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: val},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should pass validation when the required option is an empty array', function () {
      const res = validateDataWithOpenApiSchema({}, {required: []});
      expect(res).to.be.eql({
        isValid: true,
        value: {},
        valueUri: '',
        schemaUri: '',
      });
    });

    describe('when the property is read-only', function () {
      it('should throw an error when the required property is not defined in the read mode', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {},
            {properties: {prop: {readOnly: true}}, required: ['prop']},
            {accessMode: OAAccessMode.READ},
          );
        expect(throwable).to.throw(
          'Property "prop" at "" is required, but undefined was given.',
        );
      });

      it('should reject the data when the required property is not defined in the read mode', function () {
        const res = validateDataWithOpenApiSchema(
          {},
          {properties: {prop: {readOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.READ, silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: undefined,
          valueUri: '/prop',
          schemaUri: '',
          reason: 'Property "prop" at "" is required, but undefined was given.',
        });
      });

      it('should throw an error when the required property is undefined in the read mode', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: undefined},
            {properties: {prop: {readOnly: true}}, required: ['prop']},
            {accessMode: OAAccessMode.READ},
          );
        expect(throwable).to.throw(
          'Property "prop" at "" is required, but undefined was given.',
        );
      });

      it('should reject the data when the required property is undefined in the read mode', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: undefined},
          {properties: {prop: {readOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.READ, silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: undefined,
          valueUri: '/prop',
          schemaUri: '',
          reason: 'Property "prop" at "" is required, but undefined was given.',
        });
      });

      it('should pass validation when the required property is non-undefined in the read mode', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {prop: val},
            {properties: {prop: {readOnly: true}}, required: ['prop']},
            {accessMode: OAAccessMode.READ},
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {prop: val},
            valueUri: '',
            schemaUri: '',
          });
        });
      });

      it('should pass validation when the required property is not defined in the write mode', function () {
        const res = validateDataWithOpenApiSchema(
          {},
          {properties: {prop: {readOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.WRITE},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the required property is undefined in the write mode', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: undefined},
          {properties: {prop: {readOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.WRITE},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: undefined},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the property is write-only', function () {
      it('should throw an error when the required property is not defined in the write mode', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {},
            {properties: {prop: {writeOnly: true}}, required: ['prop']},
            {accessMode: OAAccessMode.WRITE},
          );
        expect(throwable).to.throw(
          'Property "prop" at "" is required, but undefined was given.',
        );
      });

      it('should reject the data when the required property is not defined in the write mode', function () {
        const res = validateDataWithOpenApiSchema(
          {},
          {properties: {prop: {writeOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.WRITE, silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: undefined,
          valueUri: '/prop',
          schemaUri: '',
          reason: 'Property "prop" at "" is required, but undefined was given.',
        });
      });

      it('should throw an error when the required property is undefined in the write mode', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: undefined},
            {properties: {prop: {writeOnly: true}}, required: ['prop']},
            {accessMode: OAAccessMode.WRITE},
          );
        expect(throwable).to.throw(
          'Property "prop" at "" is required, but undefined was given.',
        );
      });

      it('should reject the data when the required property is undefined in the write mode', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: undefined},
          {properties: {prop: {writeOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.WRITE, silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: undefined,
          valueUri: '/prop',
          schemaUri: '',
          reason: 'Property "prop" at "" is required, but undefined was given.',
        });
      });

      it('should pass validation when the required property is non-undefined in the write mode', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {prop: val},
            {properties: {prop: {writeOnly: true}}, required: ['prop']},
            {accessMode: OAAccessMode.WRITE},
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {prop: val},
            valueUri: '',
            schemaUri: '',
          });
        });
      });

      it('should pass validation when the required property is not defined in the read mode', function () {
        const res = validateDataWithOpenApiSchema(
          {},
          {properties: {prop: {writeOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.READ},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the required property is undefined in the read mode', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: undefined},
          {properties: {prop: {writeOnly: true}}, required: ['prop']},
          {accessMode: OAAccessMode.READ},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: undefined},
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });

  describe('the keyword "dependentRequired"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          dependentRequired: {foo: ['bar']},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the trigger property is not defined', function () {
      it('should pass validation when the required property is not defined', function () {
        const res = validateDataWithOpenApiSchema(
          {},
          {dependentRequired: {foo: ['bar']}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the required property is undefined', function () {
        const res = validateDataWithOpenApiSchema(
          {bar: undefined},
          {dependentRequired: {foo: ['bar']}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {bar: undefined},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the required property is non-undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null, undefined];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {bar: val},
            {dependentRequired: {foo: ['bar']}},
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {bar: val},
            valueUri: '',
            schemaUri: '',
          });
        });
      });

      it('should pass validation when required properties is an empty array', function () {
        const res = validateDataWithOpenApiSchema(
          {},
          {dependentRequired: {foo: []}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the trigger property is undefined', function () {
      it('should pass validation when the required property is not defined', function () {
        const res = validateDataWithOpenApiSchema(
          {foo: undefined},
          {dependentRequired: {foo: ['bar']}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: undefined},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the required property is undefined', function () {
        const res = validateDataWithOpenApiSchema(
          {foo: undefined, bar: undefined},
          {dependentRequired: {foo: ['bar']}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: undefined, bar: undefined},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the required property is non-undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null, undefined];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: undefined, bar: val},
            {dependentRequired: {foo: ['bar']}},
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {foo: undefined, bar: val},
            valueUri: '',
            schemaUri: '',
          });
        });
      });

      it('should pass validation when required properties is an empty array', function () {
        const res = validateDataWithOpenApiSchema(
          {foo: undefined},
          {dependentRequired: {foo: []}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: undefined},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the trigger property is non-undefined', function () {
      it('should throw an error when the required property is not defined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(triggerVal => {
          const throwable = () =>
            validateDataWithOpenApiSchema(
              {foo: triggerVal},
              {dependentRequired: {foo: ['bar']}},
            );
          expect(throwable).to.throw(
            'Property "bar" at "" is required because ' +
              'the property "foo" is present.',
          );
        });
      });

      it('should reject the data when the required property is not defined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(triggerVal => {
          const res = validateDataWithOpenApiSchema(
            {foo: triggerVal},
            {dependentRequired: {foo: ['bar']}},
            {silent: true},
          );
          expect(res).to.be.eql({
            isValid: false,
            value: undefined,
            valueUri: '/bar',
            schemaUri: '',
            reason:
              'Property "bar" at "" is required because ' +
              'the property "foo" is present.',
          });
        });
      });

      it('should throw an error when the required property is undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(triggerVal => {
          const throwable = () =>
            validateDataWithOpenApiSchema(
              {foo: triggerVal, bar: undefined},
              {dependentRequired: {foo: ['bar']}},
            );
          expect(throwable).to.throw(
            'Property "bar" at "" is required because ' +
              'the property "foo" is present.',
          );
        });
      });

      it('should reject the data when the required property is undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(triggerVal => {
          const res = validateDataWithOpenApiSchema(
            {foo: triggerVal, bar: undefined},
            {dependentRequired: {foo: ['bar']}},
            {silent: true},
          );
          expect(res).to.be.eql({
            isValid: false,
            value: undefined,
            valueUri: '/bar',
            schemaUri: '',
            reason:
              'Property "bar" at "" is required because ' +
              'the property "foo" is present.',
          });
        });
      });

      it('should pass validation when the required property is non-undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(triggerVal => {
          vals.forEach(requiredVal => {
            const res = validateDataWithOpenApiSchema(
              {foo: triggerVal, bar: requiredVal},
              {dependentRequired: {foo: ['bar']}},
            );
            expect(res).to.be.eql({
              isValid: true,
              value: {foo: triggerVal, bar: requiredVal},
              valueUri: '',
              schemaUri: '',
            });
          });
        });
      });

      it('should pass validation when required properties is an empty array', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: val},
            {dependentRequired: {foo: []}},
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {foo: val},
            valueUri: '',
            schemaUri: '',
          });
        });
      });

      it('should throw an error when one of required properties is not defined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const throwable = () =>
            validateDataWithOpenApiSchema(
              {foo: val, bar: val},
              {dependentRequired: {foo: ['bar', 'baz']}},
            );
          expect(throwable).to.throw(
            'Property "baz" at "" is required because ' +
              'the property "foo" is present.',
          );
        });
      });

      it('should reject the data when one of required properties is not defined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: val, bar: val},
            {dependentRequired: {foo: ['bar', 'baz']}},
            {silent: true},
          );
          expect(res).to.be.eql({
            isValid: false,
            value: undefined,
            valueUri: '/baz',
            schemaUri: '',
            reason:
              'Property "baz" at "" is required because ' +
              'the property "foo" is present.',
          });
        });
      });

      it('should throw an error when one of required properties is undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const throwable = () =>
            validateDataWithOpenApiSchema(
              {foo: val, bar: val, baz: undefined},
              {dependentRequired: {foo: ['bar', 'baz']}},
            );
          expect(throwable).to.throw(
            'Property "baz" at "" is required because ' +
              'the property "foo" is present.',
          );
        });
      });

      it('should reject the data when one of required properties is undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: val, bar: val, baz: undefined},
            {dependentRequired: {foo: ['bar', 'baz']}},
            {silent: true},
          );
          expect(res).to.be.eql({
            isValid: false,
            value: undefined,
            valueUri: '/baz',
            schemaUri: '',
            reason:
              'Property "baz" at "" is required because ' +
              'the property "foo" is present.',
          });
        });
      });

      it('should pass validation when all required properties are non-undefined', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(triggerVal => {
          vals.forEach(requiredVal => {
            const res = validateDataWithOpenApiSchema(
              {foo: triggerVal, bar: requiredVal, baz: requiredVal},
              {dependentRequired: {foo: ['bar', 'baz']}},
            );
            expect(res).to.be.eql({
              isValid: true,
              value: {foo: triggerVal, bar: requiredVal, baz: requiredVal},
              valueUri: '',
              schemaUri: '',
            });
          });
        });
      });

      describe('when the property is read-only', function () {
        it('should throw an error when the required property is not defined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const throwable = () =>
              validateDataWithOpenApiSchema(
                {foo: val},
                {
                  properties: {bar: {readOnly: true}},
                  dependentRequired: {foo: ['bar']},
                },
                {accessMode: OAAccessMode.READ},
              );
            expect(throwable).to.throw(
              'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            );
          });
        });

        it('should reject the data when the required property is not defined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const res = validateDataWithOpenApiSchema(
              {foo: val},
              {
                properties: {bar: {readOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.READ, silent: true},
            );
            expect(res).to.be.eql({
              isValid: false,
              value: undefined,
              valueUri: '/bar',
              schemaUri: '',
              reason:
                'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            });
          });
        });

        it('should throw an error when the required property is undefined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const throwable = () =>
              validateDataWithOpenApiSchema(
                {foo: val, bar: undefined},
                {
                  properties: {bar: {readOnly: true}},
                  dependentRequired: {foo: ['bar']},
                },
                {accessMode: OAAccessMode.READ},
              );
            expect(throwable).to.throw(
              'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            );
          });
        });

        it('should reject the data when the required property is undefined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const res = validateDataWithOpenApiSchema(
              {foo: val, bar: undefined},
              {
                properties: {bar: {readOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.READ, silent: true},
            );
            expect(res).to.be.eql({
              isValid: false,
              value: undefined,
              valueUri: '/bar',
              schemaUri: '',
              reason:
                'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            });
          });
        });

        it('should pass validation when the required property is non-undefined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(triggerVal => {
            vals.forEach(requiredVal => {
              const res = validateDataWithOpenApiSchema(
                {foo: triggerVal, bar: requiredVal},
                {
                  properties: {bar: {readOnly: true}},
                  dependentRequired: {foo: ['bar']},
                },
                {accessMode: OAAccessMode.READ, silent: true},
              );
              expect(res).to.be.eql({
                isValid: true,
                value: {foo: triggerVal, bar: requiredVal},
                valueUri: '',
                schemaUri: '',
              });
            });
          });
        });

        it('should pass validation when the required property is not defined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(triggerVal => {
            const res = validateDataWithOpenApiSchema(
              {foo: triggerVal},
              {
                properties: {bar: {readOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.WRITE},
            );
            expect(res).to.be.eql({
              isValid: true,
              value: {foo: triggerVal},
              valueUri: '',
              schemaUri: '',
            });
          });
        });

        it('should pass validation when the required property is undefined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(triggerVal => {
            const res = validateDataWithOpenApiSchema(
              {foo: triggerVal, bar: undefined},
              {
                properties: {bar: {readOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.WRITE},
            );
            expect(res).to.be.eql({
              isValid: true,
              value: {foo: triggerVal, bar: undefined},
              valueUri: '',
              schemaUri: '',
            });
          });
        });
      });

      describe('when the property is write-only', function () {
        it('should throw an error when the required property is not defined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const throwable = () =>
              validateDataWithOpenApiSchema(
                {foo: val},
                {
                  properties: {bar: {writeOnly: true}},
                  dependentRequired: {foo: ['bar']},
                },
                {accessMode: OAAccessMode.WRITE},
              );
            expect(throwable).to.throw(
              'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            );
          });
        });

        it('should reject the data when the required property is not defined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const res = validateDataWithOpenApiSchema(
              {foo: val},
              {
                properties: {bar: {writeOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.WRITE, silent: true},
            );
            expect(res).to.be.eql({
              isValid: false,
              value: undefined,
              valueUri: '/bar',
              schemaUri: '',
              reason:
                'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            });
          });
        });

        it('should throw an error when the required property is undefined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const throwable = () =>
              validateDataWithOpenApiSchema(
                {foo: val, bar: undefined},
                {
                  properties: {bar: {writeOnly: true}},
                  dependentRequired: {foo: ['bar']},
                },
                {accessMode: OAAccessMode.WRITE},
              );
            expect(throwable).to.throw(
              'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            );
          });
        });

        it('should reject the data when the required property is undefined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(val => {
            const res = validateDataWithOpenApiSchema(
              {foo: val, bar: undefined},
              {
                properties: {bar: {writeOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.WRITE, silent: true},
            );
            expect(res).to.be.eql({
              isValid: false,
              value: undefined,
              valueUri: '/bar',
              schemaUri: '',
              reason:
                'Property "bar" at "" is required because ' +
                'the property "foo" is present.',
            });
          });
        });

        it('should pass validation when the required property is non-undefined in the write mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(triggerVal => {
            vals.forEach(requiredVal => {
              const res = validateDataWithOpenApiSchema(
                {foo: triggerVal, bar: requiredVal},
                {
                  properties: {bar: {writeOnly: true}},
                  dependentRequired: {foo: ['bar']},
                },
                {accessMode: OAAccessMode.WRITE, silent: true},
              );
              expect(res).to.be.eql({
                isValid: true,
                value: {foo: triggerVal, bar: requiredVal},
                valueUri: '',
                schemaUri: '',
              });
            });
          });
        });

        it('should pass validation when the required property is not defined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(triggerVal => {
            const res = validateDataWithOpenApiSchema(
              {foo: triggerVal, bar: undefined},
              {
                properties: {bar: {writeOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.READ},
            );
            expect(res).to.be.eql({
              isValid: true,
              value: {foo: triggerVal, bar: undefined},
              valueUri: '',
              schemaUri: '',
            });
          });
        });

        it('should pass validation when the required property is undefined in the read mode', function () {
          const vals = ['str', '', 10, 0, true, false, [], {}, null];
          vals.forEach(triggerVal => {
            const res = validateDataWithOpenApiSchema(
              {foo: triggerVal},
              {
                properties: {bar: {writeOnly: true}},
                dependentRequired: {foo: ['bar']},
              },
              {accessMode: OAAccessMode.READ},
            );
            expect(res).to.be.eql({
              isValid: true,
              value: {foo: triggerVal},
              valueUri: '',
              schemaUri: '',
            });
          });
        });
      });
    });
  });

  describe('the keyword "dependentSchemas"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          dependentSchemas: {
            foo: {properties: {bar: {type: OADataType.STRING}}},
          },
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the trigger property is not defined', function () {
      it('should pass validation when the data does not match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {bar: 10},
          {
            dependentSchemas: {
              foo: {properties: {bar: {type: OADataType.STRING}}},
            },
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {bar: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the data matches the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {bar: 'str'},
          {
            dependentSchemas: {
              foo: {properties: {bar: {type: OADataType.STRING}}},
            },
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {bar: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the trigger property is undefined', function () {
      it('should pass validation when the data does not match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {foo: undefined, bar: 10},
          {
            dependentSchemas: {
              foo: {properties: {bar: {type: OADataType.STRING}}},
            },
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: undefined, bar: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should pass validation when the data matches the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {foo: undefined, bar: 'str'},
          {
            dependentSchemas: {
              foo: {properties: {bar: {type: OADataType.STRING}}},
            },
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {foo: undefined, bar: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the trigger property is non-undefined', function () {
      it('should throw an error when the data does not match the schema', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const throwable = () =>
            validateDataWithOpenApiSchema(
              {foo: val, bar: 10},
              {
                dependentSchemas: {
                  foo: {properties: {bar: {type: OADataType.STRING}}},
                },
              },
            );
          expect(throwable).to.throw(
            'Value at "/bar" must be String, but Integer was given.',
          );
        });
      });

      it('should reject the data when it does not match the schema', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: val, bar: 10},
            {
              dependentSchemas: {
                foo: {properties: {bar: {type: OADataType.STRING}}},
              },
            },
            {silent: true},
          );
          expect(res).to.be.eql({
            isValid: false,
            value: 10,
            valueUri: '/bar',
            schemaUri: '/dependentSchemas/foo/properties/bar',
            reason: 'Value at "/bar" must be String, but Integer was given.',
          });
        });
      });

      it('should pass validation when the data does match the schema', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: val, bar: 'str'},
            {
              dependentSchemas: {
                foo: {properties: {bar: {type: OADataType.STRING}}},
              },
            },
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {foo: val, bar: 'str'},
            valueUri: '',
            schemaUri: '',
          });
        });
      });

      it('should apply type coercion before match the schema', function () {
        const vals = ['str', '', 10, 0, true, false, [], {}, null];
        vals.forEach(val => {
          const res = validateDataWithOpenApiSchema(
            {foo: val, bar: 10},
            {
              dependentSchemas: {
                foo: {properties: {bar: {type: OADataType.STRING}}},
              },
            },
            {coerceTypes: true},
          );
          expect(res).to.be.eql({
            isValid: true,
            value: {foo: val, bar: '10'},
            valueUri: '',
            schemaUri: '',
          });
        });
      });
    });
  });

  describe('the keyword "propertyNames"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          propertyNames: {maxLength: 1},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the property name does not match the schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          {foo: 'bar'},
          {propertyNames: {maxLength: 1}},
        );
      expect(throwable).to.throw(
        'String at "" must be at most 1 characters long, but 3 was given.',
      );
    });

    it('should reject the data when the property name does not match the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {foo: 'bar'},
        {propertyNames: {maxLength: 1}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 'foo',
        valueUri: '',
        schemaUri: '/propertyNames',
        reason:
          'String at "" must be at most 1 characters long, ' +
          'but 3 was given.',
      });
    });

    it('should pass validation when the property name match the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {p: 1},
        {propertyNames: {maxLength: 1}},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {p: 1},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should pass validation when property names match the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {p1: 1, p2: 2, p3: 3},
        {propertyNames: {maxLength: 2}},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {p1: 1, p2: 2, p3: 3},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "properties"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          properties: {foo: {type: OADataType.STRING}},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the property does not match the schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          {prop: 10},
          {properties: {prop: {type: OADataType.STRING}}},
        );
      expect(throwable).to.throw(
        'Value at "/prop" must be String, but Integer was given.',
      );
    });

    it('should reject the data when the property does not match the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: 10},
        {properties: {prop: {type: OADataType.STRING}}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/prop',
        schemaUri: '/properties/prop',
        reason: 'Value at "/prop" must be String, but Integer was given.',
      });
    });

    it('should pass validation when the property matches the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: 'str'},
        {properties: {prop: {type: OADataType.STRING}}},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {prop: 'str'},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should apply type coercion before match the property schema', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: 10},
        {properties: {prop: {type: OADataType.STRING}}},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {prop: '10'},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "patternProperties"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          patternProperties: {'^p': {type: OADataType.STRING}},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    it('should throw an error when the property does not match the schema', function () {
      const throwable = () =>
        validateDataWithOpenApiSchema(
          {prop: 10},
          {patternProperties: {'^prop': {type: OADataType.STRING}}},
        );
      expect(throwable).to.throw(
        'Value at "/prop" must be String, but Integer was given.',
      );
    });

    it('should reject the data when the property does not match the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: 10},
        {patternProperties: {'^prop': {type: OADataType.STRING}}},
        {silent: true},
      );
      expect(res).to.be.eql({
        isValid: false,
        value: 10,
        valueUri: '/prop',
        schemaUri: '/patternProperties/^prop',
        reason: 'Value at "/prop" must be String, but Integer was given.',
      });
    });

    it('should pass validation when the property matches the schema', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: 'str'},
        {patternProperties: {'^prop': {type: OADataType.STRING}}},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {prop: 'str'},
        valueUri: '',
        schemaUri: '',
      });
    });

    it('should apply type coercion before match the property schema', function () {
      const res = validateDataWithOpenApiSchema(
        {prop: 10},
        {patternProperties: {'^prop': {type: OADataType.STRING}}},
        {coerceTypes: true},
      );
      expect(res).to.be.eql({
        isValid: true,
        value: {prop: '10'},
        valueUri: '',
        schemaUri: '',
      });
    });
  });

  describe('the keyword "additionalProperties"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          additionalProperties: {type: OADataType.STRING},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the option has a logical value', function () {
      it('should throw an error when the property is provided but not allowed', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 10},
            {additionalProperties: false},
          );
        expect(throwable).to.throw('Property "prop" at "" is not allowed.');
      });

      it('should reject the data when the property is provided but not allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 10},
          {additionalProperties: false},
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 10,
          valueUri: '/prop',
          schemaUri: '/additionalProperties',
          reason: 'Property "prop" at "" is not allowed.',
        });
      });

      it('should pass validation when the property is provided and allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 10},
          {additionalProperties: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should throw an error when the additional property is provided but not allowed', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str', extra: 10},
            {
              properties: {prop: {type: OADataType.STRING}},
              additionalProperties: false,
            },
          );
        expect(throwable).to.throw('Property "extra" at "" is not allowed.');
      });

      it('should reject the data when the additional property is provided but not allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: false,
          },
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 10,
          valueUri: '/extra',
          schemaUri: '/additionalProperties',
          reason: 'Property "extra" at "" is not allowed.',
        });
      });

      it('should pass validation when the additional property is provided and allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: true,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "property" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "patternProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            patternProperties: {'^prop': {type: OADataType.STRING}},
            additionalProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluation annotations from the "allOf" keyword', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {
              allOf: [{properties: {prop: {type: OADataType.STRING}}}],
              additionalProperties: false,
            },
          );
        expect(throwable).to.throw('Property "prop" at "" is not allowed.');
      });

      it('should ignore evaluation annotations from the "oneOf" keyword', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {
              oneOf: [{properties: {prop: {type: OADataType.STRING}}}],
              additionalProperties: false,
            },
          );
        expect(throwable).to.throw('Property "prop" at "" is not allowed.');
      });

      it('should ignore evaluation annotations from the "anyOf" keyword', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {
              anyOf: [{properties: {prop: {type: OADataType.STRING}}}],
              additionalProperties: false,
            },
          );
        expect(throwable).to.throw('Property "prop" at "" is not allowed.');
      });
    });

    describe('when the option has the schema object', function () {
      it('should throw an error when the property does not match the schema', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {additionalProperties: {type: OADataType.NUMBER}},
          );
        expect(throwable).to.throw(
          'Value at "/prop" must be Number, but String was given.',
        );
      });

      it('should reject the data when the property does not match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {additionalProperties: {type: OADataType.NUMBER}},
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 'str',
          valueUri: '/prop',
          schemaUri: '/additionalProperties',
          reason: 'Value at "/prop" must be Number, but String was given.',
        });
      });

      it('should pass validation when the property match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 10},
          {additionalProperties: {type: OADataType.NUMBER}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should throw an error when the additional property does not match the schema', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'foo', extra: 'bar'},
            {
              properties: {prop: {type: OADataType.STRING}},
              additionalProperties: {type: OADataType.NUMBER},
            },
          );
        expect(throwable).to.throw(
          'Value at "/extra" must be Number, but String was given.',
        );
      });

      it('should reject the data when the additional property does not match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'foo', extra: 'bar'},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: {type: OADataType.NUMBER},
          },
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 'bar',
          valueUri: '/extra',
          schemaUri: '/additionalProperties',
          reason: 'Value at "/extra" must be Number, but String was given.',
        });
      });

      it('should pass validation when the additional property match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should apply type coercion to additional properties before match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra1: '10', extra2: '20'},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: {type: OADataType.NUMBER},
          },
          {coerceTypes: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra1: 10, extra2: 20},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "property" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            additionalProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "patternProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            patternProperties: {'^prop': {type: OADataType.STRING}},
            additionalProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluation annotations from the "allOf" keyword', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {
              allOf: [{properties: {prop: {type: OADataType.STRING}}}],
              additionalProperties: {type: OADataType.NUMBER},
            },
          );
        expect(throwable).to.throw(
          'Value at "/prop" must be Number, but String was given.',
        );
      });

      it('should ignore evaluation annotations from the "oneOf" keyword', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {
              oneOf: [{properties: {prop: {type: OADataType.STRING}}}],
              additionalProperties: {type: OADataType.NUMBER},
            },
          );
        expect(throwable).to.throw(
          'Value at "/prop" must be Number, but String was given.',
        );
      });

      it('should ignore evaluation annotations from the "anyOf" keyword', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {
              anyOf: [{properties: {prop: {type: OADataType.STRING}}}],
              additionalProperties: {type: OADataType.NUMBER},
            },
          );
        expect(throwable).to.throw(
          'Value at "/prop" must be Number, but String was given.',
        );
      });
    });
  });

  describe('the keyword "unevaluatedProperties"', function () {
    it('should be ignored for a non-object values', function () {
      const vals = ['str', '', 10, 0, true, false, [], null, undefined];
      vals.forEach(val => {
        const res = validateDataWithOpenApiSchema(val, {
          unevaluatedProperties: {type: OADataType.STRING},
        });
        expect(res).to.be.eql({
          isValid: true,
          value: val,
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the option has a logical value', function () {
      it('should throw an error when the property is provided but not allowed', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 10},
            {unevaluatedProperties: false},
          );
        expect(throwable).to.throw(
          'Property "prop" at "" is not evaluated and not allowed.',
        );
      });

      it('should reject the data when the property is provided but not allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 10},
          {unevaluatedProperties: false},
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 10,
          valueUri: '/prop',
          schemaUri: '/unevaluatedProperties',
          reason: 'Property "prop" at "" is not evaluated and not allowed.',
        });
      });

      it('should pass validation when the property is provided and allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 10},
          {unevaluatedProperties: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should throw an error when the unevaluated property is provided but not allowed', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str', extra: 10},
            {
              properties: {prop: {type: OADataType.STRING}},
              unevaluatedProperties: false,
            },
          );
        expect(throwable).to.throw(
          'Property "extra" at "" is not evaluated and not allowed.',
        );
      });

      it('should reject the data when the unevaluated property is provided but not allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: false,
          },
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 10,
          valueUri: '/extra',
          schemaUri: '/unevaluatedProperties',
          reason: 'Property "extra" at "" is not evaluated and not allowed.',
        });
      });

      it('should pass validation when the unevaluated property is provided and allowed', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: true,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "property" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "patternProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            patternProperties: {'^prop': {type: OADataType.STRING}},
            unevaluatedProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "additionalProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            additionalProperties: true,
            unevaluatedProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluated properties from the "allOf" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            allOf: [{properties: {prop: {type: OADataType.STRING}}}],
            unevaluatedProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluated properties from the "oneOf" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            oneOf: [{properties: {prop: {type: OADataType.STRING}}}],
            unevaluatedProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluated properties from the "anyOf" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            anyOf: [{properties: {prop: {type: OADataType.STRING}}}],
            unevaluatedProperties: false,
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });
    });

    describe('when the option has the schema object', function () {
      it('should throw an error when the property does not match the schema', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'str'},
            {unevaluatedProperties: {type: OADataType.NUMBER}},
          );
        expect(throwable).to.throw(
          'Value at "/prop" must be Number, but String was given.',
        );
      });

      it('should reject the data when the property does not match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {unevaluatedProperties: {type: OADataType.NUMBER}},
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 'str',
          valueUri: '/prop',
          schemaUri: '/unevaluatedProperties',
          reason: 'Value at "/prop" must be Number, but String was given.',
        });
      });

      it('should pass validation when the property match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 10},
          {unevaluatedProperties: {type: OADataType.NUMBER}},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should throw an error when the unevaluated property does not match the schema', function () {
        const throwable = () =>
          validateDataWithOpenApiSchema(
            {prop: 'foo', extra: 'bar'},
            {
              properties: {prop: {type: OADataType.STRING}},
              unevaluatedProperties: {type: OADataType.NUMBER},
            },
          );
        expect(throwable).to.throw(
          'Value at "/extra" must be Number, but String was given.',
        );
      });

      it('should reject the data when the unevaluated property does not match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'foo', extra: 'bar'},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: {type: OADataType.NUMBER},
          },
          {silent: true},
        );
        expect(res).to.be.eql({
          isValid: false,
          value: 'bar',
          valueUri: '/extra',
          schemaUri: '/unevaluatedProperties',
          reason: 'Value at "/extra" must be Number, but String was given.',
        });
      });

      it('should pass validation when the unevaluated property match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should apply type coercion to unevaluated properties before match the schema', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra1: '10', extra2: '20'},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: {type: OADataType.NUMBER},
          },
          {coerceTypes: true},
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra1: 10, extra2: 20},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "property" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            properties: {prop: {type: OADataType.STRING}},
            unevaluatedProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "patternProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            patternProperties: {'^prop': {type: OADataType.STRING}},
            unevaluatedProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore properties validated with the "additionalProperties" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str', extra: 10},
          {
            additionalProperties: true,
            unevaluatedProperties: {type: OADataType.NUMBER},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str', extra: 10},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluated properties from the "allOf" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            allOf: [{properties: {prop: {type: OADataType.STRING}}}],
            unevaluatedProperties: {prop: {type: OADataType.NUMBER}},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluated properties from the "oneOf" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            oneOf: [{properties: {prop: {type: OADataType.STRING}}}],
            unevaluatedProperties: {prop: {type: OADataType.NUMBER}},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });

      it('should ignore evaluated properties from the "anyOf" keyword', function () {
        const res = validateDataWithOpenApiSchema(
          {prop: 'str'},
          {
            anyOf: [{properties: {prop: {type: OADataType.STRING}}}],
            unevaluatedProperties: {prop: {type: OADataType.NUMBER}},
          },
        );
        expect(res).to.be.eql({
          isValid: true,
          value: {prop: 'str'},
          valueUri: '',
          schemaUri: '',
        });
      });
    });
  });
});
