import Joi from 'joi';

import CodeJoi from './Questions/CodeJoi';
import DateJoi from './Questions/DateJoi';
import SliderJoi from './Questions/SliderJoi';
import TextJoi from './Questions/TextJoi';
import TimeJoi from './Questions/TimeJoi';

const ScoreValidator = (joi: Joi.Root) => ({
  type: 'validateScore',
  messages: {
    'number.base': 'Poeng må være et gyldig tall',
    'number.max': 'Poeng må være maksimum 100',
    'number.min': 'Poeng må være minimum 0',
  },
  base: joi.number().min(0).max(100).required(),
});

const DiscountValidator = (joi: Joi.Root) => ({
  type: 'validateDiscount',
  messages: {
    'number.base': 'Fradrag må være et gyldig tall',
    'number.min': 'Fradrag må være minimum 0',
  },
  base: joi.number().min(0).required(),
});

const HighestDiscountValidator = (joi: Joi.Root) => ({
  type: 'validateHighestDiscount',
  messages: {
    'number.base': 'Fradrag må være et gyldig tall',
    'number.min': 'Fradrag må være minimum 0',
  },
  base: joi.number().min(0),
});

const QuestionJoi = [
  ScoreValidator,
  DiscountValidator,
  HighestDiscountValidator,
  ...CodeJoi,
  ...DateJoi,
  ...SliderJoi,
  ...TextJoi,
  ...TimeJoi,
];

export default QuestionJoi;
