/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';

import QuestionJoi from './CustomJoi/QuestionJoi';
import IdJoi from './CustomJoi/IdJoi';
import GeneralJoi from './CustomJoi/GeneralJoi';
import VariantJoi from './CustomJoi/VariantJoi';
import SpecProductJoi from './CustomJoi/SpecProductJoi';
import { ErrorMessage } from './CustomJoi/Questions/ErrorMessage';

const i18nJoi = Joi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    messages: {
      'any.required': ErrorMessage.ANY_REQUIRED,
      'any.only': ErrorMessage.ANY_ONLY,
      'string.base': ErrorMessage.STRING_BASE,
      'string.guid': ErrorMessage.STRING_GUID,
      'boolean.base': ErrorMessage.BOOLEAN_BASE,
      'date.base': ErrorMessage.DATE_BASE,
      'date.format': ErrorMessage.DATE_FORMAT,
      'date.isoDate': ErrorMessage.DATE_ISO_DATE,
      'array.base': ErrorMessage.ARRAY_BASE,
      'array.check': ErrorMessage.VAL_ARRAY_CODE_DISCOUNT_CHECK,
    },
  })
);

/*
 * Joi Extensions
 * https://joi.dev/api/?v=17.6.0#extensions
 */

const VersionValidator = (joi: Joi.Root) => ({
  type: 'validateVersion',
  base: joi.number().min(0).required(),
  messages: {
    'number.base': ErrorMessage.VERSION_NUMBER_BASE,
    'number.min': ErrorMessage.VERSION_NUMBER_MIN,
  },
});

const OrganizationNumberValidator = (joi: Joi.Root) => ({
  type: 'validateOrgNr',
  base: joi.string().required(),
  messages: {
    'string.empty': ErrorMessage.STRING_EMPTY,
    'string.length': ErrorMessage.ORG_STRING_LENGTH,
    'string.void': ErrorMessage.ORG_STRING_VOID,
  },
  validate(value: string, helpers: Joi.CustomHelpers) {
    const weights = [3, 2, 7, 6, 5, 4, 3, 2];
    if (value.length !== 9) {
      return { value, errors: helpers.error('string.length') };
    }
    if (+value) {
      const sum = weights.reduce((partSum, weight, index) => {
        return partSum + weight * +value.charAt(index);
      }, 0);
      if (11 - (sum % 11) === +value.charAt(8)) {
        return { value };
      } else if (11 - (sum % 11) === 11 && +value.charAt(8) === 0) {
        return { value };
      }
    }
    return { value, errors: helpers.error('string.void') };
  },
});

const CustomJoi = i18nJoi.extend(
  VersionValidator,
  OrganizationNumberValidator,
  ...IdJoi,
  ...GeneralJoi,
  ...VariantJoi,
  ...SpecProductJoi,
  ...QuestionJoi
);

export default CustomJoi;
