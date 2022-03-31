/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';

const i18nJoi = Joi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    messages: {
      // Add all keys here and translate them as needed: https://joi.dev/api/?v=17.6.0#list-of-errors
      'string.max': '{{#label}} må være mindre eller lik {{#limit}} karakterer'
    }
  })
);

const millionValidator = (joi: Joi.Root) => ({
  type: 'million',
  base: joi.number(),
  messages: {
    'million.base': 'Må være en million'
  },
  validate(value: any, helpers: Joi.CustomHelpers<any>) {
    if (value < 1000000) {
      return { value, errors: helpers.error('million.base') };
    }
  }
});

const assertEmptyRequirements = (joi: Joi.Root) => ({
  type: 'assertEmptyRequirements',
  base: joi.array(),
  messages: {
    'array:assertEmptyRequirements':
      'Kan ikke slette et behov som inneholder Krav. Slett kravene først'
  },
  validate(value: any, helpers: Joi.CustomHelpers<any>) {
    // Base validation regardless of the rules applied
    if (value && value.length > 0) {
      return { value, errors: helpers.error('array:assertEmptyRequirements') };
    }
  }
});

/* const assertNoSubNeeds = (joi: Joi.Root) => ({
  type: 'assertNoSubNeeds',
  base: joi.array(),
  messages: {
    'context:needList': 'Missing context "needList". Validation aborted',
    'array:assertNoSubNeeds':
      'Kan ikke slette et behov som har et under-Behov. Slett underbehovet først'
  },
  validate(value: any, helpers: Joi.CustomHelpers<any>) {
    // console.log(helpers.prefs.context);
    // console.log(value);
    const needList = helpers.prefs.context?.needList;
    // console.log(value);
    if (!needList) {
      // throw Error('context does not provide "needList"');
      return { value, errors: helpers.error('context:needList') };
    }
    if (needList.length > 0) {
      if (Utils.checkIfParent(needList, value.id)) {
        return { value, errors: helpers.error('array:assertNoSubNeeds') };
      }
    }
  }
}); */

const CustomJoi = i18nJoi.extend(
  millionValidator,
  assertEmptyRequirements
  /* assertNoSubNeeds */
);

export default CustomJoi;
