import Joi from 'joi';

const MaxTextValidator = (joi: Joi.Root) => ({
  type: 'validateMaxText',
  messages: {
    'number.base': 'Må være et gyldig tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall',
  },
  base: joi.number().integer().min(0).required(),
});

const AnswerTextValidator = (joi: Joi.Root) => ({
  type: 'validateAnswerText',
  messages: {
    'string.max': 'Lengde på tekst må være mindre enn {{#limit}} tegn',
  },
  base: joi.string().allow('').required(),
  validate(value: string, helpers: Joi.CustomHelpers) {
    const max = helpers.state.ancestors[1].config.max;
    if (max && max < value.length) {
      return {
        value,
        errors: helpers.error('string.max', {
          limit: max,
        }),
      };
    }
    return { value };
  },
});

const TextJoi = [MaxTextValidator, AnswerTextValidator];

export default TextJoi;
