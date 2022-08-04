/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi, { Schema } from 'joi';
import VariantType from '../Nexus/entities/VariantType';
import QuestionJoi from './QuestionJoi';

const i18nJoi = Joi.defaults((schema) =>
  schema.options({
    abortEarly: false
  })
);

/*
 * Joi Extensions
 * https://joi.dev/api/?v=17.6.0#extensions
 */

const textValidator = (joi: Joi.Root) => ({
  type: 'validateText',
  args(value: any, type: string) {
    return joi
      .string()
      .messages({
        'string.empty': `${type} kan ikke være tom`,
        'string.base': `Noe har gått galt med skjemaet. ${type} er ikke en tekststreng`,
        'any.required': `Noe har gått galt med skjemaet. Kan ikke finne ${type}`
      })
      .required();
  }
});

const longTextValidator = (joi: Joi.Root) => ({
  type: 'validateLongText',
  args(value: any, type: string) {
    return joi
      .string()
      .min(3)
      .messages({
        'string.empty': `${type} kan ikke være tom`,
        'string.min': `${type} må ha minimum 3 karakterer`,
        'string.base': `Noe har gått galt med skjemaet. ${type} er ikke en tekststreng`,
        'any.required': `Noe har gått galt med skjemaet. Kan ikke finne ${type}`
      })
      .required();
  }
});

const idValidator = (joi: Joi.Root) => ({
  type: 'validateId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Id er ikke en tekststreng`,
    'string.guid': 'Noe har gått galt med skjemaet. Id til objektet er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne id'
  }
});

const emptyIdValidator = (joi: Joi.Root) => ({
  type: 'validateEmptyId',
  base: joi.string().equal('').required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Id er ikke en tekststreng`,
    'any.only': 'Noe har gått galt med skjemaet. Id til objektet er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne id'
  }
});

const optionalTextValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalText',
  base: joi.string().allow('').required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. {{label}} er ikke en tekststreng`,
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne {{label}}'
  }
});

const booleanValidator = (joi: Joi.Root) => ({
  type: 'validateBoolean',
  base: joi.boolean().required(),
  messages: {
    'boolean.base':
      'Noe har gått galt med skjemaet. {{label}} er ikke en boolsk verdi',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne {{label}}'
  }
});

const typeValidator = (joi: Joi.Root) => ({
  type: 'validateType',
  base: joi.string().required(),
  args(value: any, type: string) {
    return value.equal(type);
  },
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Type er ikke en tekststreng`,
    'any.only': 'Noe har gått galt med skjemaet. Typen til objektet er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne type'
  }
});

const typeVariantValidator = (joi: Joi.Root) => ({
  type: 'validateVariantType',
  base: joi.string().required(),
  messages: {
    'array.max': 'For mange spørsmål for variant av typen Info',
    'string.base': `Noe har gått galt med skjemaet. Type er ikke en tekststreng`,
    'any.invalid':
      'Noe har gått galt med skjemaet. Typen til objektet er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne type'
  },
  validate(value: string, helpers: Joi.CustomHelpers) {
    if (value === VariantType.info) {
      if (helpers.state.ancestors[0].questions.length > 1) {
        return { value, errors: helpers.error('array.max') };
      }
    } else {
      if (value !== VariantType.requirement) {
        return { value, errors: helpers.error('any.invalid') };
      }
    }
    return { value };
  }
});

const parentValidator = (joi: Joi.Root) => ({
  type: 'validateParent',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow('')
    .required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Forelder id er ikke en tekststreng`,
    'string.guid':
      'Noe har gått galt med skjemaet. Forelder id til objektet er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne forelder'
  }
});

const sourceValidator = (joi: Joi.Root) => ({
  type: 'validateSource',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow(null)
    .required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Kilde er ikke en tekststreng`,
    'string.guid':
      'Noe har gått galt med skjemaet. Kilden til objektet er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne kilde'
  }
});

const versionValidator = (joi: Joi.Root) => ({
  type: 'validateVersion',
  base: joi.number().min(0).required(),
  messages: {
    'number.base': 'Noe har gått galt med skjemaet. Versjonsnummer er ugyldig',
    'number.min': 'Noe har gått galt med skjemaet. Versjonsnummer er ugyldig',
    'any.required':
      'Noe har gått galt med skjemaet. Kan ikke finne versjonsnummer'
  }
});

const dateValidator = (joi: Joi.Root) => ({
  type: 'validateDate',
  base: joi.date().iso().raw().required(),
  messages: {
    'date.base': 'Noe har gått galt med skjemaet. Dato er på et ugyldig format',
    'date.isoDate':
      'Noe har gått galt med skjemaet. Dato er på et ugyldig format',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne dato'
  }
});

const emptyDateValidator = (joi: Joi.Root) => ({
  type: 'validateEmptyDate',
  base: joi.string().equal(null).required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Dato er ikke en tekststreng`,
    'any.only': 'Noe har gått galt med skjemaet. Dato er på et ugyldig format',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne dato'
  }
});

const deletedDateValidator = (joi: Joi.Root) => ({
  type: 'validateDeletedDate',
  base: joi.date().iso().raw().allow(null).required(),
  messages: {
    'string.base':
      'Noe har gått galt med skjemaet. Slettet dato er på et ugyldig format',
    'date.format':
      'Noe har gått galt med skjemaet. Slettet dato er på et ugyldig format',
    'any.required':
      'Noe har gått galt med skjemaet. Kan ikke finne slettet dato'
  }
});

const publishedDateValidator = (joi: Joi.Root) => ({
  type: 'validatePublishedDate',
  base: joi.date().iso().raw().allow(null).required(),
  messages: {
    'string.base':
      'Noe har gått galt med skjemaet. Publisert dato er på et ugyldig format',
    'date.format':
      'Noe har gått galt med skjemaet. Publisert dato er på et ugyldig format',
    'any.required':
      'Noe har gått galt med skjemaet. Kan ikke finne publisert dato'
  }
});

const itemsValidator = (joi: Joi.Root) => ({
  type: 'validateItems',
  args(value: any, type: Schema, name: string) {
    return joi
      .array()
      .items(type)
      .messages({
        'array.base': `Noe har gått galt med skjemaet. ${name} er ikke en liste`,
        'any.required': `Noe har gått galt med skjemaet. ${name} har et ugyldig element`
      })
      .required();
  }
});

const projectIdValidator = (joi: Joi.Root) => ({
  type: 'validateProjectId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow(null)
    .required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Prosjektets id er ikke en tekststreng`,
    'string.guid': 'Noe har gått galt med skjemaet. Prosjektets id er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne prosjekt id'
  }
});

const bankIdValidator = (joi: Joi.Root) => ({
  type: 'validateBankId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Bankens id er ikke en tekststreng`,
    'string.guid': 'Noe har gått galt med skjemaet. Bankens id er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne bank id'
  }
});

const needIdValidator = (joi: Joi.Root) => ({
  type: 'validateNeedId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Behovets id er ikke en tekststreng`,
    'string.guid': 'Noe har gått galt med skjemaet. Behovets id er ugyldig',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne behov id'
  }
});

const organizationNumberValidator = (joi: Joi.Root) => ({
  type: 'validateOrgNr',
  base: joi.string().required(),
  messages: {
    'string.base': `Noe har gått galt med skjemaet. Organisasjonsnummer er ikke en tekststreng`,
    'string.length': 'Organisasjonsnummer består av 9 siffre',
    'string.void': 'Ugyldig organisasjonsnummer',
    'any.required':
      'Noe har gått galt med skjemaet. Kan ikke finne organisasjonsnummer'
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
    .messages({
      'string.base': `Noe har gått galt med skjemaet. Et av produktene har feilformatert id`,
      'string.guid':
        'Noe har gått galt med skjemaet. Et av produktene har ugyldig id'
    })
    .required(),
  messages: {
    'array.base':
      'Noe har gått galt med skjemaet. Produkter er ikke formatert som en liste',
    'array.empty': 'Det må velges produkter for varianten',
    'array.filled': 'Produkter er lagt til, men ikke valgt for varianten',
    'any.required': 'Noe har gått galt med skjemaet. Kan ikke finne produkter'
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

const CustomJoi = i18nJoi.extend(
  textValidator,
  longTextValidator,
  idValidator,
  emptyIdValidator,
  optionalTextValidator,
  booleanValidator,
  typeValidator,
  typeVariantValidator,
  parentValidator,
  sourceValidator,
  versionValidator,
  dateValidator,
  emptyDateValidator,
  deletedDateValidator,
  publishedDateValidator,
  itemsValidator,
  projectIdValidator,
  bankIdValidator,
  needIdValidator,
  organizationNumberValidator,
  variantProductsValidator,
  ...QuestionJoi
);

export default CustomJoi;
