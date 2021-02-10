import Ajv from 'ajv';
import schema from '../db/schema.json';
import data from './testData.json';

test('master.json is valid according to schema', () => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  expect(validate(data)).toBeTruthy();
  expect(validate.errors).toBeFalsy();
});

// for type-checing the master.json file
