import Joi, { Schema } from 'joi';

const SliderMinValidator = (joi: Joi.Root) => ({
  type: 'validateSliderMin',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være et positivt tall'
  },
  base: joi.number().min(0).required()
});

const SliderMaxValidator = (joi: Joi.Root) => ({
  type: 'validateSliderMax',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være større enn {{#limit}}'
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[0].min;
    if (value && min) {
      if (min > value) {
        return {
          value,
          errors: helpers.error('number.min', {
            limit: min
          })
        };
      }
    }
    return { value };
  }
});

const SliderStepValidator = (joi: Joi.Root) => ({
  type: 'validateSliderStep',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være et positivt tall',
    'number.max': 'Overskrider forksjell mellom maks og min ({{#limit}})'
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
            limit: difference
          })
        };
      }
    }
    return { value };
  }
});

const SliderValueValidator = (joi: Joi.Root) => ({
  type: 'validateSliderValue',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være større enn {{#limit}}',
    'number.max': 'Må være mindre enn {{#limit}}'
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[2].min;
    const max = helpers.state.ancestors[2].max;
    if (min && min > value) {
      return {
        value,
        errors: helpers.error('number.min', {
          limit: min
        })
      };
    }
    if (max && max < value) {
      return {
        value,
        errors: helpers.error('number.max', {
          limit: max
        })
      };
    }
    return { value };
  }
});

const SliderAnswerValidator = (joi: Joi.Root) => ({
  type: 'validateSliderAnswer',
  messages: {
    'number.base': 'Må være et tall',
    'number.min': 'Må være større enn {{#limit}}',
    'number.max': 'Må være mindre enn {{#limit}}'
  },
  base: joi.number().required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const min = helpers.state.ancestors[1].config.min;
    const max = helpers.state.ancestors[1].config.max;
    if (min && min > value) {
      return {
        value,
        errors: helpers.error('number.min', {
          limit: min
        })
      };
    }
    if (max && max < value) {
      return {
        value,
        errors: helpers.error('number.max', {
          limit: max
        })
      };
    }
    return { value };
  }
});

const SliderValuesValidator = (joi: Joi.Root) => ({
  type: 'validateSliderValues',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('value').messages({
      'array.unique': 'Verdiscore kan ikke være like'
    });
  }
});

const SliderJoi = [
  SliderMinValidator,
  SliderMaxValidator,
  SliderStepValidator,
  SliderValueValidator,
  SliderAnswerValidator,
  SliderValuesValidator
];

export default SliderJoi;
