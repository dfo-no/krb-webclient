import Joi, { Schema } from 'joi';

import { ErrorMessage } from './ErrorMessage';

const SliderMinValidator = (joi: Joi.Root) => ({
  type: 'validateSliderMin',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_INT,
    'number.check': ErrorMessage.VAL_NUMBER_STEP,
  },
  base: joi.number().min(0).required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const step = helpers.state.ancestors[0].step;
    if (value && step) {
      if ((value * 1000) % (step * 1000) !== 0) {
        return {
          value,
          errors: helpers.error('number.check', {
            step: step,
          }),
        };
      }
    }
    return { value };
  },
});

const SliderMaxValidator = (joi: Joi.Root) => ({
  type: 'validateSliderMax',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_MIN,
    'number.check': ErrorMessage.VAL_NUMBER_STEP,
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[0].min;
    const step = helpers.state.ancestors[0].step;
    if (value && min) {
      if (min > value) {
        return {
          value,
          errors: helpers.error('number.min', {
            limit: min,
          }),
        };
      }
      if ((value * 1000) % (step * 1000) !== 0) {
        return {
          value,
          errors: helpers.error('number.check', {
            step: step,
          }),
        };
      }
    }
    return { value };
  },
});

const SliderValueValidator = (joi: Joi.Root) => ({
  type: 'validateSliderValue',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_MIN,
    'number.max': ErrorMessage.VAL_NUMBER_MAX,
    'number.check': ErrorMessage.VAL_NUMBER_STEP,
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[2].min;
    const max = helpers.state.ancestors[2].max;
    const step = helpers.state.ancestors[2].step;
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
    if ((value * 1000) % (step * 1000) !== 0) {
      return {
        value,
        errors: helpers.error('number.check', {
          step: step,
        }),
      };
    }
    return { value };
  },
});

const SliderAnswerValidator = (joi: Joi.Root) => ({
  type: 'validateSliderAnswer',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_MIN,
    'number.max': ErrorMessage.VAL_NUMBER_MAX,
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[1].config.min;
    const max = helpers.state.ancestors[1].config.max;
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
    return { value };
  },
});

const SliderValuesValidator = (joi: Joi.Root) => ({
  type: 'validateSliderValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).unique('value').messages({
      'array.unique': ErrorMessage.VAL_VALUE_UNIQUE,
    });
  },
});

const SliderJoi = [
  SliderMinValidator,
  SliderMaxValidator,
  SliderValueValidator,
  SliderAnswerValidator,
  SliderValuesValidator,
];

export default SliderJoi;
