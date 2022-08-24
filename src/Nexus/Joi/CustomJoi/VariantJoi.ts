import Joi from 'joi';

import { VariantType } from '../../enums';

const VariantTypeValidator = (joi: Joi.Root) => ({
  type: 'validateVariantType',
  base: joi.string().required(),
  messages: {
    'array.max': 'For mange spørsmål for variant av typen Info'
  },
  validate(value: string, helpers: Joi.CustomHelpers) {
    if (value === VariantType.info) {
      if (helpers.state.ancestors[0].questions.length > 1) {
        return { value, errors: helpers.error('array.max') };
      }
    } else {
      if (value !== VariantType.requirement) {
        return { value, errors: helpers.error('any.only') };
      }
    }
    return { value };
  }
});

const VariantProductsValidator = (joi: Joi.Root) => ({
  type: 'validateVariantProducts',
  base: joi
    .array()
    .items(joi.string().guid({ version: ['uuidv4'] }))
    .required(),
  messages: {
    'array.empty': 'Det må velges produkter for varianten',
    'array.filled': 'Produkter er lagt til, men ikke valgt for varianten'
  },
  validate(value: string, helpers: Joi.CustomHelpers) {
    if (helpers.state.ancestors[0].useProduct) {
      if (value.length === 0) {
        return { value, errors: helpers.error('array.empty') };
      }
    } else {
      if (value.length > 0) {
        return { value, errors: helpers.error('array.filled') };
      }
    }
    return { value };
  }
});

const VariantJoi = [VariantTypeValidator, VariantProductsValidator];

export default VariantJoi;
