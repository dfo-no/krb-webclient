import DfoJoi from './CustomJoi';

describe('Joi Customization', () => {
  test('Joi string max should show i18n error message', () => {
    const schema = DfoJoi.object().keys({
      id: DfoJoi.string().max(36).required()
    });
    const obj = {
      id: 'abea4419-3e99-4040-b667-9d1191b1d87aTTT'
    };

    const report = schema.validate(obj);
    expect(report?.error?.details[0].message).toContain('må være mindre');
  });

  test('Joi can use custom validation method "million"', () => {
    const schema = DfoJoi.object().keys({
      aNumber: DfoJoi.million()
    });

    const obj = {
      aNumber: 999999
    };
    const report = schema.validate(obj);
    expect(report?.error?.details[0].message).toContain('Må være en million');
  });
});
