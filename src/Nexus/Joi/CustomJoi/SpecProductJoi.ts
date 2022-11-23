import Joi from 'joi';

const AmountValidator = (joi: Joi.Root) => ({
  type: 'validateAmount',
  base: joi.number().integer().min(1).required(),
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et heltall',
    'number.min': 'Må være minimum 1',
  },
});

const SpecProductJoi = [AmountValidator];

export default SpecProductJoi;
