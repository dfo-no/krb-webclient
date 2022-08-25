import Joi from 'joi';

const WeightValidator = (joi: Joi.Root) => ({
  type: 'validateWeight',
  base: joi.number().integer().min(1).max(100).required(),
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et heltall',
    'number.min': 'Må være minimum 1',
    'number.max': 'Må være maksimum 100'
  }
});

const AmountValidator = (joi: Joi.Root) => ({
  type: 'validateAmount',
  base: joi.number().integer().min(1).required(),
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et heltall',
    'number.min': 'Må være minimum 1'
  }
});

const SpecProductJoi = [WeightValidator, AmountValidator];

export default SpecProductJoi;
