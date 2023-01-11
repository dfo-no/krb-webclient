import Joi, { Schema } from 'joi';

import { ErrorMessage } from './ErrorMessage';

const SliderMinValidator = (joi: Joi.Root) => ({
  type: 'validateSliderMin',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_INT,
  },
  base: joi.number().min(0).required(),
});

const SliderMaxValidator = (joi: Joi.Root) => ({
  type: 'validateSliderMax',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_MIN,
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[0].min;
    if (value && min) {
      if (min > value) {
        return {
          value,
          errors: helpers.error('number.min', {
            limit: min,
          }),
        };
      }
    }
    return { value };
  },
});

const SliderStepValidator = (joi: Joi.Root) => ({
  type: 'validateSliderStep',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_INT,
    'number.max': ErrorMessage.VAL_NUMBER_SLIDER_MAX,
  },
  base: joi.number().min(0).required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[0].min;
    const max = helpers.state.ancestors[0].max;
    if (value && min && max) {
      const difference = Math.abs(max - min);
      if (difference < value) {
        return {
          value,
          errors: helpers.error('number.max', {
            limit: difference,
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
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[2].min;
    const max = helpers.state.ancestors[2].max;
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
  SliderStepValidator,
  SliderValueValidator,
  SliderAnswerValidator,
  SliderValuesValidator,
];

export default SliderJoi;
