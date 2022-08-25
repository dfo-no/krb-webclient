import Joi, { Schema } from 'joi';
import DateUtils from '../../../../common/DateUtils';

const PeriodMinutesValidator = (joi: Joi.Root) => ({
  type: 'validatePeriodMinutes',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
    'number.max': 'Må være mindre enn 60'
  },
  base: joi.number().integer().min(0).max(59).required()
});

const PeriodHoursValidator = (joi: Joi.Root) => ({
  type: 'validatePeriodHours',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
    'number.max': 'Må være mindre enn 24'
  },
  base: joi.number().integer().min(0).max(23).required()
});

const FromBoundaryTimeValidator = (joi: Joi.Root) => ({
  type: 'validateFromBoundaryTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut'
  },
  base: joi.alternatives(joi.date().iso().raw(), null).required(),
  validate(value: string | null, helpers: Joi.CustomHelpers) {
    const toBoundary = helpers.state.ancestors[0].toBoundary;
    const fromTimeAnswer = helpers.state.ancestors[1]?.answer?.fromTime;
    if (!value && (toBoundary || !fromTimeAnswer)) {
      return { value, errors: helpers.error('date.only') };
    }
    return { value };
  }
});

const ToBoundaryTimeValidator = (joi: Joi.Root) => ({
  type: 'validateToBoundaryTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Til må være senere enn fra'
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
  }
});

const TimeScoreValidator = (joi: Joi.Root) => ({
  type: 'validateTimeScore',
  base: joi.date().iso().raw().required().messages({
    'date.base': 'Tidspunkt må ha en verdi'
  }),
  messages: {
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}'
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
            limit: DateUtils.prettyFormatTime(fromBoundary)
          })
        };
      }
      if (time > new Date(toBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatTime(toBoundary)
          })
        };
      }
    }
    return { value };
  }
});

const FromTimeValidator = (joi: Joi.Root) => ({
  type: 'validateFromTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}'
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
            limit: DateUtils.prettyFormatTime(fromBoundary)
          })
        };
      }
      if (new Date(value).getTime() > new Date(toBoundary).getTime()) {
        return {
          value,
          errors: helpers.error('date.max', {
            limit: DateUtils.prettyFormatTime(toBoundary)
          })
        };
      }
    }
    return { value };
  }
});

const ToTimeValidator = (joi: Joi.Root) => ({
  type: 'validateToTime',
  messages: {
    'date.only': 'Tidspunkt må være fylt ut',
    'date.min': 'Tidspunkt kan ikke være før {{#limit}}',
    'date.max': 'Tidspunkt kan ikke være etter {{#limit}}'
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
              limit: DateUtils.prettyFormatTime(toBoundary)
            })
          };
        }
      }
      if (fromTime) {
        if (new Date(value).getTime() < new Date(fromTime).getTime()) {
          return {
            value,
            errors: helpers.error('date.min', {
              limit: DateUtils.prettyFormatTime(fromTime)
            })
          };
        }
      }
    }
    if (isPeriod && !value) {
      return { value, errors: helpers.error('date.only') };
    }
    return { value };
  }
});

const TimeScoreValuesValidator = (joi: Joi.Root) => ({
  type: 'validateTimeScoreValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('time').messages({
      'array.unique': 'Tidspunkt kan ikke være like'
    });
  }
});

const TimeJoi = [
  PeriodMinutesValidator,
  PeriodHoursValidator,
  FromBoundaryTimeValidator,
  ToBoundaryTimeValidator,
  TimeScoreValidator,
  FromTimeValidator,
  ToTimeValidator,
  TimeScoreValuesValidator
];

export default TimeJoi;
