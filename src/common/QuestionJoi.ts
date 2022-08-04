import Joi from 'joi';

const scoreValidator = (joi: Joi.Root) => ({
  type: 'validateScore',
  messages: {
    'number.base': 'Poeng må være et gyldig tall',
    'number.max': 'Poeng må være 100 eller lavere',
    'number.min': 'Poeng må være 0 eller høyere'
  },
  base: joi.number().min(0).max(100).required()
});

const maxTextValidator = (joi: Joi.Root) => ({
  type: 'validateMaxText',
  messages: {
    'number.base': 'Maksverdi må være et gyldig tall',
    'number.integer': 'Maksverdi må være et positivt heltall',
    'number.min': 'Maksverdi må være et positivt heltall'
  },
  base: joi.number().integer().min(0).required()
});

const answerTextValidator = (joi: Joi.Root) => ({
  type: 'validateAnswerText',
  messages: {
    'string.max': 'Lengde på tekst må være mindre enn {{#limit}} tegn'
  },
  base: joi.string().allow('').required(),
  validate(value: string, helpers: Joi.CustomHelpers) {
    if (helpers.state.ancestors[0].config.max < value.length) {
      return {
        value,
        errors: helpers.error('string.max', {
          limit: helpers.state.ancestors[0].config.max
        })
      };
    }
    return { value };
  }
});

const maxCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMaxCodes',
  messages: {
    'number.base': 'Maksverdi må være et gyldig tall',
    'number.integer': 'Maksverdi må være et positivt heltall',
    'number.min': 'Maksverdi må være større eller lik 1'
  },
  base: joi.number().integer().min(1).required()
});

const minCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMinCodes',
  messages: {
    'number.base': 'Minimumsverdi må være et gyldig tall',
    'number.integer': 'Minimumsverdi må være et positivt heltall',
    'number.min': 'Minimumsverdi må være et positivt heltall'
  },
  base: joi.number().integer().min(0).required()
});

const QuestionCodesValidator = (joi: Joi.Root) => ({
  type: 'validateQuestionCodes',
  base: joi.array().items(
    joi.object().keys({
      code: joi.string().required(),
      mandatory: joi.boolean().required(),
      score: joi.number().required().min(0).max(100)
    })
  ),
  messages: {
    'number.base': 'Poeng må være et gyldig tall',
    'number.min': 'Poeng må være større eller lik 0',
    'number.max': 'Poeng må være mindre eller lik 100'
  }
});

const QuestionJoi = [
  scoreValidator,
  maxTextValidator,
  answerTextValidator,
  maxCodeValidator,
  minCodeValidator,
  QuestionCodesValidator
];

export default QuestionJoi;
