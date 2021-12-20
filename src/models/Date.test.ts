import { format, formatISO } from 'date-fns';
import Joi from 'joi';
import { DATETIME_ISO8601UTC } from '../common/Constants';

describe('Joi date should validate', () => {
  const now = new Date();
  test('Date formats works', () => {
    const dateSchema = Joi.object().keys({
      date1: Joi.date().iso().raw().required(),
      date2: Joi.date().iso().raw().required(),
      date3: Joi.date().iso().raw().required()
    });
    const bank = {
      date1: now.toISOString(),
      date2: now.toJSON(),
      date3: formatISO(now)
    };

    const report = dateSchema.validate(bank);
    expect(report.error).toBeUndefined();
  });

  test('Min date validation should trigger message', () => {
    const dateSchema = Joi.object().keys({
      date1: Joi.date().iso().raw().max('11-25-2021').required()
    });
    const bank = {
      date1: new Date().toISOString()
    };

    const report = dateSchema.validate(bank);
    // "date1" must be less than or equal to "2021-11-24T23:00:00.000Z"
    expect(report?.error?.details[0].message).toContain('must be less than');
  });

  test('Format should be OK', () => {
    const dateSchema = Joi.object().keys({
      date1: Joi.date().iso().raw().max('11-25-2021').required()
    });
    const bank = {
      date1: '2021-11-24T10:20:53.000Z'
    };

    const report = dateSchema.validate(bank);
    expect(report.error).toBeUndefined();
  });

  test('Empty string date should validate', () => {
    const dateSchema = Joi.object().keys({
      publishedDate: Joi.alternatives([
        Joi.date().iso().raw(),
        Joi.string().valid('')
      ]).required()
    });

    const entity = {
      publishedDate: ''
    };

    const report = dateSchema.validate(entity);
    expect(report.error).toBeUndefined();
  });

  test('Null date should validate', () => {
    const dateSchema = Joi.object().keys({
      publishedDate: Joi.alternatives([
        Joi.date().iso().raw(),
        Joi.string().valid(null)
      ]).required()
    });

    const entity = {
      publishedDate: null
    };

    const report = dateSchema.validate(entity);
    expect(report.error).toBeUndefined();
  });

  test('Date.toJSON() string should validate', () => {
    const dateSchema = Joi.object().keys({
      publishedDate: Joi.alternatives([
        Joi.date().iso().raw(),
        Joi.string().valid('')
      ]).required()
    });

    const entity = {
      publishedDate: new Date().toJSON()
    };

    const report = dateSchema.validate(entity);
    expect(report.error).toBeUndefined();
  });

  test('Date format for day-fns should validate', () => {
    const dateSchema = Joi.object().keys({
      publishedDate: Joi.date().iso().raw().required()
    });
    // target : 2021-09-23T05:11:53.747Z
    const post = {
      publishedDate: format(now, DATETIME_ISO8601UTC)
    };
    const report = dateSchema.validate(post);
    expect(report.error).toBeUndefined();
  });
});
