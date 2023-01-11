import Joi from 'joi';

import { ErrorMessage } from './ErrorMessage';

const MaxCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMaxCodes',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.integer': ErrorMessage.VAL_NUMBER_INT,
    'number.min': ErrorMessage.VAL_NUMBER_CODE_MIN,
  },
  base: joi.number().integer().min(1).required(),
});

const MinCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMinCodes',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.integer': ErrorMessage.VAL_NUMBER_INT,
    'number.min': ErrorMessage.VAL_NUMBER_INT,
  },
  base: joi.number().integer().min(0).required(),
});

const QuestionCodesValidator = (joi: Joi.Root) => ({
  type: 'validateQuestionCodes',
  messages: {
    'array.unique': ErrorMessage.VAL_NUMBER_CODE_UNIQUE,
  },
  base: joi.array().items(
    joi.object().keys({
      code: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
      mandatory: joi.boolean().required(),
      discount: joi.number().required().min(0).messages({
        'number.base': ErrorMessage.VAL_NUMBER_BASE,
        'number.min': ErrorMessage.VAL_NUMBER_CODE_DISCOUNT_MIN,
      }),
    })
  ),
});

const CodeJoi = [MaxCodeValidator, MinCodeValidator, QuestionCodesValidator];

export default CodeJoi;
