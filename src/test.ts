import Ajv from 'ajv';
import schema from './schema.json';
import data from './testData.json';

const ajv = new Ajv();
const validate = ajv.compile(schema);
if (validate(data)) {
  // data is MyData here
  console.log(data.banks);
} else {
  console.log(validate.errors);
}

// for type-checing the master.json file
