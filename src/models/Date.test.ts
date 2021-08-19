import { formatISO } from 'date-fns';
import Joi from 'joi';

describe('Joi date should validate', () => {
  test('basebankSchema works', () => {
    const dateSchema = Joi.object().keys({
      date1: Joi.date().iso().required(),
      date2: Joi.date().iso().required(),
      date3: Joi.date().iso().required()
    });

    // '2021-08-12T11:56:26.074Z'
    // '2021-08-12T11:56:26.082Z'
    // '2021-08-12T13:56:26+02:00'

    const bank = {
      date1: new Date().toISOString(),
      date2: new Date().toJSON(),
      date3: formatISO(new Date())
    };

    const report = dateSchema.validate(bank);
    expect(report.error).toBeUndefined();
  });
});
