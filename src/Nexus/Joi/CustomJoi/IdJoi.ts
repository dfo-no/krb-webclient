import Joi from 'joi';

const IdValidator = (joi: Joi.Root) => ({
  type: 'validateId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .required()
});

const EmptyIdValidator = (joi: Joi.Root) => ({
  type: 'validateEmptyId',
  base: joi.string().equal('').required()
});

const OptionalIdValidator = (joi: Joi.Root) => ({
  type: 'validateOptionalId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow(null)
    .required()
});

const ParentIdValidator = (joi: Joi.Root) => ({
  type: 'validateParentId',
  base: joi
    .string()
    .guid({ version: ['uuidv4'] })
    .allow('')
    .required()
});

const IdArrayValidator = (joi: Joi.Root) => ({
  type: 'validateIdArray',
  messages: {
    'array.unique':
      'Noe har gått galt med skjemaet. 2 like IDer er funnet i skjemaet'
  },
  base: joi
    .array()
    .items(joi.string().guid({ version: ['uuidv4'] }))
    .required()
    .unique()
});

const IdJoi = [
  IdValidator,
  EmptyIdValidator,
  OptionalIdValidator,
  ParentIdValidator,
  IdArrayValidator
];

export default IdJoi;
