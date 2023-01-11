import Joi from 'joi';

import { ErrorMessage } from './ErrorMessage';

const MaxTextValidator = (joi: Joi.Root) => ({
  type: 'validateMaxText',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.integer': ErrorMessage.VAL_NUMBER_INT,
    'number.min': ErrorMessage.VAL_NUMBER_INT,
  },
  base: joi.number().integer().min(0).required(),
});

const AnswerTextValidator = (joi: Joi.Root) => ({
  type: 'validateAnswerText',
  messages: {
    'string.max': ErrorMessage.VAL_STRING_MAX,
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
