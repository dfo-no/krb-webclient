import Joi, { Schema } from 'joi';

import DateUtils from '../../../../common/DateUtils';

const PeriodMinutesValidator = (joi: Joi.Root) => ({
  type: 'validatePeriodMinutes',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
    'number.max': 'Må være mindre enn 60',
  },
  base: joi.number().integer().min(0).max(59).required(),
});

const PeriodHoursValidator = (joi: Joi.Root) => ({
  type: 'validatePeriodHours',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
    'number.max': 'Må være mindre enn 24',
  },
  base: joi.number().integer().min(0).max(23).required(),
});

const FromBoundaryTimeValidator = (joi: Joi.Root) => ({
  type: 'validateFromBoundaryTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const toBoundary = helpers.state.ancestors[0].toBoundary;
    const fromTimeAnswer = helpers.state.ancestors[1]?.answer?.fromTime;
    if (!value && (toBoundary || !fromTimeAnswer)) {
      return { value, errors: helpers.error('date.only') };
    }
    return { value };
  },
});

const ToBoundaryTimeValidator = (joi: Joi.Root) => ({
  type: 'validateToBoundaryTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Til må være senere enn fra',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const fromBoundary = helpers.state.ancestors[0].fromBoundary;
    const fromTimeAnswer = helpers.state.ancestors[1]?.answer?.fromTime;
    if (!value && (fromBoundary || !fromTimeAnswer)) {
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

const TimeDiscountValidator = (joi: Joi.Root) => ({
  type: 'validateTimeDiscount',
  base: joi.date().iso().raw().required().messages({
    'date.base': 'Tidspunkt må ha en verdi',
  }),
  messages: {
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}',
  },
  validate(value: string, helpers: Joi.CustomHelpers) {
    const fromBoundary = helpers.state.ancestors[2].fromBoundary;
    const toBoundary = helpers.state.ancestors[2].toBoundary;
    const time = new Date(value).getTime();
    if (time) {
      if (time < new Date(fromBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.min', {
            limit: DateUtils.prettyFormatTime(fromBoundary),
          }),
        };
      }
      if (time > new Date(toBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatTime(toBoundary),
          }),
        };
      }
    }
    return { value };
  },
});

const FromTimeValidator = (joi: Joi.Root) => ({
  type: 'validateFromTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const fromBoundary = helpers.state.ancestors[1].config.fromBoundary;
    const toBoundary = helpers.state.ancestors[1].config.toBoundary;
    if (value && fromBoundary) {
      if (new Date(value).getTime() < new Date(fromBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.min', {
            limit: DateUtils.prettyFormatTime(fromBoundary),
          }),
        };
      }
      if (new Date(value).getTime() > new Date(toBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatTime(toBoundary),
          }),
        };
      }
    }
    return { value };
  },
});

const ToTimeValidator = (joi: Joi.Root) => ({
  type: 'validateToTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const isPeriod = helpers.state.ancestors[1].config.isPeriod;
    const toBoundary = helpers.state.ancestors[1].config.toBoundary;
    const fromTime = helpers.state.ancestors[0].fromTime;
    if (isPeriod && value) {
      if (toBoundary) {
        if (new Date(value).getTime() > new Date(toBoundary).getTime()) {
          return {
            value,
            errors: helpers.error('date.max', {
              limit: DateUtils.prettyFormatTime(toBoundary),
            }),
          };
        }
      }
      if (fromTime) {
        if (new Date(value).getTime() < new Date(fromTime).getTime()) {
          return {
            value,
            errors: helpers.error('date.min', {
              limit: DateUtils.prettyFormatTime(fromTime),
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

const TimePeriodValidator = (joi: Joi.Root) => ({
  type: 'validateTimePeriod',
  messages: {
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}',
  },
  base: joi.date().iso().raw().messages({
    'date.base': 'Tidspunkt må ha en verdi',
  }),
  validate(value: string, helpers: Joi.CustomHelpers) {
    const minTimePeriod = helpers.state.ancestors[2].timePeriodMin;
    const maxTimePeriod = helpers.state.ancestors[2].timePeriodMax;
    const time = new Date(value).getTime();
    if (time) {
      if (time < new Date(minTimePeriod).getTime()) {
        return {
          value,
          errors: helpers.error('date.min', {
            limit: DateUtils.prettyFormatTime(minTimePeriod),
          }),
        };
      }
      if (time > new Date(maxTimePeriod).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatTime(maxTimePeriod),
          }),
        };
      }
    }
    return { value };
  },
});

const MinTimePeriodValidator = (joi: Joi.Root) => ({
  type: 'validateMinTimePeriod',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const timePeriodMin = helpers.state.ancestors[1].config.timePeriodMin;
    const timePeriodMax = helpers.state.ancestors[1].config.timePeriodMax;
    if (value && timePeriodMin) {
      if (new Date(value).getTime() < new Date(timePeriodMin).getTime()) {
        return {
          value,
          errors: helpers.error('date.min', {
            limit: DateUtils.prettyFormatTime(timePeriodMin),
          }),
        };
      }
      if (new Date(value).getTime() > new Date(timePeriodMax).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatTime(timePeriodMax),
          }),
        };
      }
    }
    return { value };
  },
});

const MaxTimePeriodValidator = (joi: Joi.Root) => ({
  type: 'validateMaxTimePeriod',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}',
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const isPeriod = helpers.state.ancestors[1].config.isPeriod;
    const timePeriodMax = helpers.state.ancestors[1].config.timePeriodMax;
    const minTimePeriod = helpers.state.ancestors[0].minTimePeriod;
    if (isPeriod && value) {
      if (timePeriodMax) {
        if (new Date(value).getTime() > new Date(timePeriodMax).getTime()) {
          return {
            value,
            errors: helpers.error('date.max', {
              limit: DateUtils.prettyFormatTime(timePeriodMax),
            }),
          };
        }
      }
      if (minTimePeriod) {
        if (new Date(value).getTime() < new Date(minTimePeriod).getTime()) {
          return {
            value,
            errors: helpers.error('date.min', {
              limit: DateUtils.prettyFormatTime(minTimePeriod),
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

const TimeDiscountValuesValidator = (joi: Joi.Root) => ({
  type: 'validateTimeDiscountValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('time').messages({
      'array.unique': 'Tidspunkt kan ikke være like',
    });
  },
});

const TimePeriodDiscountValuesValidator = (joi: Joi.Root) => ({
  type: 'validateTimePeriodDiscountValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('timePeriod').messages({
      'array.unique': 'Tidspunkt kan ikke være like',
    });
  },
});

const TimeJoi = [
  PeriodMinutesValidator,
  PeriodHoursValidator,
  FromBoundaryTimeValidator,
  ToBoundaryTimeValidator,
  TimeDiscountValidator,
  FromTimeValidator,
  ToTimeValidator,
  TimePeriodValidator,
  MinTimePeriodValidator,
  MaxTimePeriodValidator,
  TimeDiscountValuesValidator,
  TimePeriodDiscountValuesValidator,
];

export default TimeJoi;
