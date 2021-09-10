import { formatISO } from 'date-fns';
import Joi from 'joi';

describe('Joi date should validate', () => {
  test('Date formats works', () => {
    const dateSchema = Joi.object().keys({
      date1: Joi.date().iso().required(),
      date2: Joi.date().iso().required(),
      date3: Joi.date().iso().required()
    });

    const bank = {
      date1: new Date().toISOString(),
      date2: new Date().toJSON(),
      date3: formatISO(new Date())
    };

    const report = dateSchema.validate(bank);
    expect(report.error).toBeUndefined();
  });

  test('Empty string date should validate', () => {
    const dateSchema = Joi.object().keys({
      publishedDate: Joi.alternatives([
        Joi.date().iso(),
        Joi.string().valid('')
      ]).required()
    });

    const entity = {
      publishedDate: ''
    };

    const report = dateSchema.validate(entity);
    expect(report.error).toBeUndefined();
  });

  test('Date.toJSON() string should validate', () => {
    const dateSchema = Joi.object().keys({
      publishedDate: Joi.alternatives([
        Joi.date().iso(),
        Joi.string().valid('')
      ]).required()
    });

    const entity = {
      publishedDate: new Date().toJSON()
    };

    const report = dateSchema.validate(entity);
    expect(report.error).toBeUndefined();
  });
});
