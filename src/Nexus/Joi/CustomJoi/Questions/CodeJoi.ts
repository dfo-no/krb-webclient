import Joi, { Schema } from 'joi';

import { ErrorMessage } from './ErrorMessage';
import { ICodeSelection } from '../../../entities/ICodelistQuestion';

const MaxCodeValidator = (joi: Joi.Root) => ({
  type: 'validateMaxCodes',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.integer': ErrorMessage.VAL_NUMBER_INT,
    'number.min': ErrorMessage.VAL_NUMBER_MIN_1,
    'number.check': ErrorMessage.VAL_NUMBER_MIN,
  },
  base: joi.number().integer().min(1).required(),
  validate(value: number, helpers: Joi.CustomHelpers) {
    const index =
      'path' in helpers.state && helpers.state.path
        ? helpers.state.path.indexOf('optionalCodeMaxAmount')
        : null;
    const optionalCodeMinAmount =
      index && 'question' in helpers.state.ancestors[index]
        ? helpers.state.ancestors[index].question.config.optionalCodeMinAmount
        : null;
    const optionalCodeMaxAmount =
      index && 'question' in helpers.state.ancestors[index]
        ? helpers.state.ancestors[index].question.config.optionalCodeMaxAmount
        : null;
    if (
      value &&
      optionalCodeMinAmount &&
      optionalCodeMaxAmount &&
      parseInt(optionalCodeMinAmount) > parseInt(optionalCodeMaxAmount)
    ) {
      return {
        value,
        errors: helpers.error('number.check', {
          limit: optionalCodeMinAmount,
        }),
      };
    }
    return { value };
  },
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

const CodeDiscountValidator = (joi: Joi.Root) => ({
  type: 'validateCodeDiscount',
  messages: {
    'number.base': ErrorMessage.VAL_NUMBER_BASE,
    'number.min': ErrorMessage.VAL_NUMBER_CODE_DISCOUNT_MIN,
  },
  base: joi.number().integer().min(0).required(),
});

const QuestionCodesValidator = (joi: Joi.Root) => ({
  type: 'validateQuestionCodes',
  messages: {
    'array.unique': ErrorMessage.VAL_NUMBER_CODE_UNIQUE,
    'array.check': ErrorMessage.VAL_ARRAY_CODE_DISCOUNT_CHECK,
  },
  args(value: Schema, type: Schema) {
    return joi
      .array()
      .items(type)
      .custom((valueNew, helpers) => {
        const discountSumMax = helpers.state?.ancestors[0].discountSumMax;
        const codes = helpers.state?.ancestors[0].codes;
        const discounts = codes
          ?.map((code: ICodeSelection) => code.discount)
          .reduce(function (a: number, b: number) {
            return +a + +b;
          }, []);

        if (discounts > discountSumMax) {
          return helpers.error('array.check');
        }
        return valueNew;
      })
      .required();
  },
});

const HighestDiscountValidator = (joi: Joi.Root) => ({
  type: 'validateHighestDiscount',
  messages: {
    'number.base': 'Fradrag må være et gyldig tall',
    'number.min': 'Fradrag må være minimum 0',
  },
  base: joi.number().min(0),
});

const CodeJoi = [
  MaxCodeValidator,
  MinCodeValidator,
  CodeDiscountValidator,
  QuestionCodesValidator,
  QuestionCodesValidator,
  HighestDiscountValidator,
];

export default CodeJoi;
