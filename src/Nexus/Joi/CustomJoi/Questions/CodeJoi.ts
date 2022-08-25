import Joi from 'joi';

const MaxCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMaxCodes',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være minimum 1'
  },
  base: joi.number().integer().min(1).required()
});

const MinCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMinCodes',
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et positivt heltall',
    'number.min': 'Må være et positivt heltall'
  },
  base: joi.number().integer().min(0).required()
});

const QuestionCodesValidator = (joi: Joi.Root) => ({
  type: 'validateQuestionCodes',
  messages: {
    'array.unique':
      'Noe har gått galt med skjemaet. 2 like koder er funnet i skjemaet'
  },
  base: joi.array().items(
    joi.object().keys({
      code: joi
        .string()
        .guid({ version: ['uuidv4'] })
        .required(),
      mandatory: joi.boolean().required(),
      score: joi.number().required().min(0).max(100).messages({
        'number.base': 'Må være et gyldig tall',
        'number.min': 'Må være minimum 0',
        'number.max': 'Må være maksimum 100'
      })
    })
  )
});

const CodeJoi = [MaxCodeValidator, MinCodeValidator, QuestionCodesValidator];

export default CodeJoi;
