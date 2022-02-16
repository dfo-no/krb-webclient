import Joi from 'joi';

const i18nJoi = Joi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    messages: {
      // Add all keys here and translate them of needed https://joi.dev/api/?v=17.6.0#list-of-errors
      'string.max': '{{#label}} må være mindre eller lik {{#limit}} karakterer'
    }
  })
);

const CustomJoi = i18nJoi.extend((joi) => {
  return {
    type: 'million',
    base: joi.number(),
    messages: {
      'million.base': 'Må være en million'
    },
    validate(value, helpers) {
      if (value < 1000000) {
        return { value, errors: helpers.error('million.base') };
      }
    }
  };
});

export default CustomJoi;
