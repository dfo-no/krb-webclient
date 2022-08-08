/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi, { Schema } from 'joi';
import VariantType from '../Nexus/entities/VariantType';
import QuestionJoi from './QuestionJoi';

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
        'Noe har gått galt med skjemaet. {{#label}} er ikke en liste'
    }
  })
);

/*
 * Joi Extensions
 * https://joi.dev/api/?v=17.6.0#extensions
 */

const idValidator = (joi: Joi.Root) => ({
  type: 'validateId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
});

const idItemsValidator = (joi: Joi.Root) => ({
  type: 'validateIdItems',
  base: joi.string().guid({ version: ['uuidv4'] })
});

const emptyIdValidator = (joi: Joi.Root) => ({
  type: 'validateEmptyId',
  base: joi.string().equal('').required()
});

const optionalIdValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow(null)
    .required()
});

const parentIdValidator = (joi: Joi.Root) => ({
  type: 'validateParentId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow('')
    .required()
});

const textValidator = (joi: Joi.Root) => ({
  type: 'validateText',
  base: joi.string().required(),
  messages: {
    'string.empty': `Kan ikke være tom`
  }
});

const longTextValidator = (joi: Joi.Root) => ({
  type: 'validateLongText',
  base: joi.string().min(3).required(),
  messages: {
    'string.empty': `Kan ikke være tom`,
    'string.min': `Må ha minimum 3 karakterer`
  }
});

const optionalTextValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalText',
  base: joi.string().allow('').required()
});

const booleanValidator = (joi: Joi.Root) => ({
  type: 'validateBoolean',
  base: joi.boolean().required()
});

const typeValidator = (joi: Joi.Root) => ({
  type: 'validateType',
  base: joi.string().required(),
  args(value: Schema, type: string) {
    return value.equal(type);
  }
});

const typesValidator = (joi: Joi.Root) => ({
  type: 'validateTypes',
  base: joi.string().required(),
  args(value: Schema, types: Record<string, string>) {
    return value.valid(...Object.values(types));
  }
});

const typeVariantValidator = (joi: Joi.Root) => ({
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

const versionValidator = (joi: Joi.Root) => ({
  type: 'validateVersion',
  base: joi.number().min(0).required(),
  messages: {
    'number.base':
      'Noe har gått galt med skjemaet. Versjonsnummer er ikke et tall',
    'number.min': 'Noe har gått galt med skjemaet. Versjonsnummer er ugyldig'
  }
});

const dateValidator = (joi: Joi.Root) => ({
  type: 'validateDate',
  base: joi.date().iso().raw().required()
});

const emptyDateValidator = (joi: Joi.Root) => ({
  type: 'validateEmptyDate',
  base: joi.string().equal(null).required()
});

const optionalDateValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalDate',
  base: joi.date().iso().raw().allow(null).required()
});

const itemsValidator = (joi: Joi.Root) => ({
  type: 'validateItems',
  args(value: any, type: Schema) {
    return joi.array().items(type).required();
  }
});

const organizationNumberValidator = (joi: Joi.Root) => ({
  type: 'validateOrgNr',
  base: joi.string().required(),
  messages: {
    'string.empty': 'Kan ikke være tom',
    'string.length': 'Består av 9 siffre',
    'string.void': 'Ugyldig organisasjonsnummer'
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
  }
});

const variantProductsValidator = (joi: Joi.Root) => ({
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

const weightValidator = (joi: Joi.Root) => ({
  type: 'validateWeight',
  base: joi.number().integer().min(1).max(100).required(),
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et heltall',
    'number.min': 'Må være minimum 1',
    'number.max': 'Må være maksimum 100'
  }
});

const amountValidator = (joi: Joi.Root) => ({
  type: 'validateAmount',
  base: joi.number().integer().min(1).required(),
  messages: {
    'number.base': 'Må være et tall',
    'number.integer': 'Må være et heltall',
    'number.min': 'Må være minimum 1'
  }
});

const CustomJoi = i18nJoi.extend(
  idValidator,
  emptyIdValidator,
  optionalIdValidator,
  parentIdValidator,
  idItemsValidator,
  textValidator,
  longTextValidator,
  optionalTextValidator,
  booleanValidator,
  typeValidator,
  typesValidator,
  typeVariantValidator,
  versionValidator,
  dateValidator,
  emptyDateValidator,
  optionalDateValidator,
  itemsValidator,
  organizationNumberValidator,
  variantProductsValidator,
  weightValidator,
  amountValidator,
  ...QuestionJoi
);

export default CustomJoi;
