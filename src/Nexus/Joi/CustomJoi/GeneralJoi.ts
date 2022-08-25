import Joi, { Schema } from 'joi';

const TextValidator = (joi: Joi.Root) => ({
  type: 'validateText',
  base: joi.string().required(),
  messages: {
    'string.empty': `Kan ikke være tom`
  }
});

const LongTextValidator = (joi: Joi.Root) => ({
  type: 'validateLongText',
  base: joi.string().min(3).required(),
  messages: {
    'string.empty': `Kan ikke være tom`,
    'string.min': `Må ha minimum 3 karakterer`
  }
});

const OptionalTextValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalText',
  base: joi.string().allow('').required()
});

const BooleanValidator = (joi: Joi.Root) => ({
  type: 'validateBoolean',
  base: joi.boolean().required()
});

const NumberValidator = (joi: Joi.Root) => ({
  type: 'validateNumber',
  base: joi.number().required()
});

const TypeValidator = (joi: Joi.Root) => ({
  type: 'validateType',
  base: joi.string().required(),
  args(value: Schema, type: string) {
    return value.equal(type);
  }
});

const TypesValidator = (joi: Joi.Root) => ({
  type: 'validateTypes',
  base: joi.string().required(),
  args(value: Schema, types: Record<string, string>) {
    return value.valid(...Object.values(types));
  }
});

const DateValidator = (joi: Joi.Root) => ({
  type: 'validateDate',
  base: joi.date().iso().raw().required()
});

const EmptyDateValidator = (joi: Joi.Root) => ({
  type: 'validateEmptyDate',
  base: joi.string().equal(null).required()
});

const OptionalDateValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalDate',
  base: joi.date().iso().raw().allow(null).required()
});

const ArrayValidator = (joi: Joi.Root) => ({
  type: 'validateArray',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required();
  }
});

const UniqueArrayValidator = (joi: Joi.Root) => ({
  type: 'validateUniqueArray',
  args(value: Schema, type: Schema) {
    return joi.array().items(type).required().unique('id').messages({
      'array.unique':
        'Noe har gått galt med skjemaet. 2 like IDer er funnet i skjemaet'
    });
  }
});

const GeneralJoi = [
  TextValidator,
  LongTextValidator,
  OptionalTextValidator,
  BooleanValidator,
  NumberValidator,
  TypeValidator,
  TypesValidator,
  DateValidator,
  EmptyDateValidator,
  OptionalDateValidator,
  ArrayValidator,
  UniqueArrayValidator
];

export default GeneralJoi;
