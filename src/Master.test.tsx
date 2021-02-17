import Ajv from 'ajv';
import schema from '../db/schema.json';
import data from './testData.json';

test('master.json is valid according to schema', () => {
  // TODO: remove strict = false when models are more mature
  const ajv = new Ajv({ strict: false });
  const validate = ajv.compile(schema);
  expect(validate(data)).toBeTruthy();
  expect(validate.errors).toBeFalsy();
});

// for type-checing the master.json file
