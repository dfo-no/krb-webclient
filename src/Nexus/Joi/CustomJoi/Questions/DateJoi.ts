import Joi, { Schema } from 'joi';

import DateUtils from '../../../../common/DateUtils';

const PeriodMinValidator = (joi: Joi.Root) => ({
  type: 'validatePeriodMin',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
  },
  base: joi.number().integer().min(0).required(),
});

const PeriodMaxValidator = (joi: Joi.Root) => ({
  type: 'validatePeriodMax',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være større enn {{#limit}}',
  },
  base: joi.number().integer().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const periodMin = helpers.state.ancestors[0].periodMin;
    if (periodMin > value) {
      return {
        value,
        errors: helpers.error('number.min', {
          limit: helpers.state.ancestors[0].periodMin,
        }),
      };
    }
    return { value };
  },
});

const FromBoundaryDateValidator = (joi: Joi.Root) => ({
  type: 'validateFromBoundaryDate',
  messages: {
    'date.only': 'Dato må være fylt ut',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const toBoundary = helpers.state.ancestors[0].toBoundary;
    const fromDateAnswer = helpers.state.ancestors[1]?.answer?.fromDate;
    if (!value && (toBoundary || !fromDateAnswer)) {
      return { value, errors: helpers.error('date.only') };
    }
    return { value };
  },
});

const ToBoundaryDateValidator = (joi: Joi.Root) => ({
  type: 'validateToBoundaryDate',
  messages: {
    'date.only': 'Dato må være fylt ut',
    'date.min': 'Til må være senere enn fra',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const fromBoundary = helpers.state.ancestors[0].fromBoundary;
    const fromDateAnswer = helpers.state.ancestors[1]?.answer?.fromDate;
    if (!value && (fromBoundary || !fromDateAnswer)) {
      return { value, errors: helpers.error('date.only') };
    }
    if (value && fromBoundary) {
      if (new Date(value).getTime() < new Date(fromBoundary).getTime()) {
        return { value, errors: helpers.error('date.min') };
      }
    }
    return { value };
  },
});

const DurationValidator = (joi: Joi.Root) => ({
  type: 'validateDuration',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
  },
  base: joi.number().integer().min(0),
});

const DateDiscountValidator = (joi: Joi.Root) => ({
  type: 'validateDateDiscount',
  base: joi.date().iso().raw().messages({
    'date.base': 'Dato må ha en verdi',
  }),
  messages: {
    'date.min': 'Dato kan ikke være før {{#limit}}',
    'date.max': 'Dato kan ikke være etter {{#limit}}',
  },
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const fromBoundary = helpers.state.ancestors[2].fromBoundary;
    const toBoundary = helpers.state.ancestors[2].toBoundary;
    if (value && fromBoundary && toBoundary) {
      const date = new Date(value).getTime();
      if (date < new Date(fromBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.min', {
            limit: DateUtils.prettyFormatDateError(fromBoundary),
          }),
        };
      }
      if (date > new Date(toBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatDateError(toBoundary),
          }),
        };
      }
    }
    return { value };
  },
});

const FromDateValidator = (joi: Joi.Root) => ({
  type: 'validateFromDate',
  messages: {
    'date.only': 'Dato må være fylt ut',
    'date.min': 'Dato kan ikke være før {{#limit}}',
    'date.max': 'Dato kan ikke være etter {{#limit}}',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const fromBoundary = helpers.state.ancestors[1].config.fromBoundary;
    const toBoundary = helpers.state.ancestors[1].config.toBoundary;
    if (value && fromBoundary && toBoundary) {
      if (new Date(value).getTime() < new Date(fromBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.min', {
            limit: DateUtils.prettyFormatDateError(fromBoundary),
          }),
        };
      }
      if (new Date(value).getTime() > new Date(toBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatDateError(toBoundary),
          }),
        };
      }
    }
    if (!value && !fromBoundary && !toBoundary) {
      return {
        value,
        errors: helpers.error('date.only'),
      };
    }
    return { value };
  },
});

const ToDateValidator = (joi: Joi.Root) => ({
  type: 'validateToDate',
  messages: {
    'date.only': 'Dato må være fylt ut',
    'date.min': 'Dato kan ikke være før {{#limit}}',
    'date.max': 'Dato kan ikke være etter {{#limit}}',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const isPeriod = helpers.state.ancestors[1].config.isPeriod;
    const toBoundary = helpers.state.ancestors[1].config.toBoundary;
    const fromDate = helpers.state.ancestors[0].fromDate;
    if (isPeriod && value) {
      if (toBoundary) {
        if (new Date(value).getTime() > new Date(toBoundary).getTime()) {
          return {
            value,
            errors: helpers.error('date.max', {
              limit: DateUtils.prettyFormatDateError(toBoundary),
            }),
          };
        }
      }
      if (fromDate) {
        if (new Date(value).getTime() < new Date(fromDate).getTime()) {
          return {
            value,
            errors: helpers.error('date.min', {
              limit: DateUtils.prettyFormatDateError(fromDate),
            }),
          };
        }
      }
    }
    if (isPeriod && !value) {
      return { value, errors: helpers.error('date.only') };
    }
    return { value };
  },
});

const DaysValidator = (joi: Joi.Root) => ({
  type: 'validateDays',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være større enn {{#limit}}',
    'number.max': 'Må være mindre enn {{#limit}}',
  },
  base: joi.number(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const minDay = helpers.state.ancestors[2].periodMin;
    const maxDay = helpers.state.ancestors[2].periodMax;
    if (minDay && minDay > value) {
      return {
        value,
        errors: helpers.error('number.min', {
          limit: minDay - 1,
        }),
      };
    }
    if (maxDay && maxDay < value) {
      return {
        value,
        errors: helpers.error('number.max', {
          limit: maxDay + 1,
        }),
      };
    }
    return { value };
  },
});

const MinDaysValidator = (joi: Joi.Root) => ({
  type: 'validateMinDays',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være større enn {{#limit}}',
    'number.max': 'Må være mindre enn {{#limit}}',
  },
  base: joi.alternatives(joi.number(), null),
  validate(value: number | null, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[1].config.periodMin;
    const max = helpers.state.ancestors[1].config.periodMax;
    if (value && min && max) {
      if (min && min > value) {
        return {
          value,
          errors: helpers.error('number.min', {
            limit: min,
          }),
        };
      }
      if (max && max < value) {
        return {
          value,
          errors: helpers.error('number.max', {
            limit: max,
          }),
        };
      }
    }
    return { value };
  },
});

const MaxDaysValidator = (joi: Joi.Root) => ({
  type: 'validateMaxDays',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være større enn {{#limit}}',
    'number.max': 'Må være mindre enn {{#limit}}',
  },
  base: joi.alternatives(joi.number(), null),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const isPeriod = helpers.state.ancestors[1].config.isPeriod;
    const min = helpers.state.ancestors[0].minDays;
    const max = helpers.state.ancestors[1].config.periodMax;
    if (isPeriod && value) {
      if (min && min > value) {
        return {
          value,
          errors: helpers.error('number.min', {
            limit: min,
          }),
        };
      }
      if (max && max < value) {
        return {
          value,
          errors: helpers.error('number.max', {
            limit: max,
          }),
        };
      }
    }
    return { value };
  },
});

const DateDiscountValuesValidator = (joi: Joi.Root) => ({
  type: 'validateDateDiscountValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('date').messages({
      'array.unique': 'Dato kan ikke være like',
    });
  },
});

const DaysValuesValidator = (joi: Joi.Root) => ({
  type: 'validateDaysValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('numberDays').messages({
      'array.unique': 'Antall dager kan ikke være like',
    });
  },
});

const DateJoi = [
  PeriodMinValidator,
  PeriodMaxValidator,
  FromBoundaryDateValidator,
  ToBoundaryDateValidator,
  DurationValidator,
  DateDiscountValidator,
  FromDateValidator,
  ToDateValidator,
  DaysValidator,
  MinDaysValidator,
  MaxDaysValidator,
  DateDiscountValuesValidator,
  DaysValuesValidator,
];

export default DateJoi;
