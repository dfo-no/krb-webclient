/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
import QuestionJoi from './CustomJoi/QuestionJoi';
import IdJoi from './CustomJoi/IdJoi';
import GeneralJoi from './CustomJoi/GeneralJoi';
import VariantJoi from './CustomJoi/VariantJoi';
import SpecProductJoi from './CustomJoi/SpecProductJoi';

const i18nJoi = Joi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    messages: {
      'any.required':
        'Noe har gått galt med skjemaet. Kan ikke finne {{#label}}',
      'any.only': 'Noe har gått galt med skjemaet. {{#label}} er ugyldig',
      'string.base': `Noe har gått galt med skjemaet. {{#label}} er ikke en tekststreng`,
      'string.guid':
        'Noe har gått galt med skjemaet. {{#label}} er ikke en gyldig guid',
      'boolean.base':
        'Noe har gått galt med skjemaet. {{#label}} er ikke en boolsk verdi',
      'date.base': 'Noe har gått galt med skjemaet. {{#label}} er ikke en dato',
      'date.format':
        'Noe har gått galt med skjemaet. {{#label}} er på et ugyldig format',
      'date.isoDate':
        'Noe har gått galt med skjemaet. {{#label}} er ikke på ISO format',
      'array.base':
        'Noe har gått galt med skjemaet. {{#label}} er ikke en liste',
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
    'number.base':
      'Noe har gått galt med skjemaet. Versjonsnummer er ikke et tall',
    'number.min': 'Noe har gått galt med skjemaet. Versjonsnummer er ugyldig',
  },
});

const OrganizationNumberValidator = (joi: Joi.Root) => ({
  type: 'validateOrgNr',
  base: joi.string().required(),
  messages: {
    'string.empty': 'Kan ikke være tom',
    'string.length': 'Består av 9 siffre',
    'string.void': 'Ugyldig organisasjonsnummer',
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
