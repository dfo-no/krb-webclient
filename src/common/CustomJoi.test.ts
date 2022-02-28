import { INeed } from '../Nexus/entities/INeed';
import CustomJoi from './CustomJoi';

describe('CustomJoi', () => {
  test('Joi string().max() should show translated error message', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.string().max(36).required()
    });
    const obj = {
      id: 'abea4419-3e99-4040-b667-9d1191b1d87aTTT'
    };

    const report = schema.validate(obj);
    expect(report?.error?.details[0].message).toContain('må være mindre');
  });

  test('million should show errormessage"', () => {
    const schema = CustomJoi.object().keys({
      aNumber: CustomJoi.million()
    });

    const obj = {
      aNumber: 999999
    };
    const report = schema.validate(obj);
    expect(report?.error?.details[0].message).toContain('Må være en million');
  });

  test('assertEmptyRequirements should validate', () => {
    const schema = CustomJoi.object().keys({
      requirements: CustomJoi.assertEmptyRequirements()
    });
    const obj = {
      requirements: []
    };
    const report = schema.validate(obj);

    expect(report.error).toBeUndefined();
  });

  /* test('assertEmptyRequirements should validate on empty needList', () => {
    const schema = CustomJoi.object().keys({
      requirements: CustomJoi.assertEmptyRequirements()
    });
    const obj = {
      requirements: [
        { id: 'foo', children: null },
        { id: 'bar', children: null }
      ]
    };
    const report = schema.validate(obj, {
      context: { needList: [] }
    });

    expect(report.error).toBeUndefined();
  }); */

  /* test('assertNoSubNeeds should invalidate if Need has subneeds', () => {
    const schema = CustomJoi.object().keys({
      requirements: CustomJoi.assertNoSubNeeds()
    });

    const obj = {
      requirements: [
        { id: 'foo1', children: [] },
        { id: 'bar', children: [] }
      ]
    };

    const report = schema.validate(obj, {
      context: {
        needList: [
          {
            id: 'foo2',
            children: [{ id: 'baz', children: [] }]
          }
        ]
      }
    });

    expect(report?.error?.details[0].message).toContain(
      'Kan ikke slette et behov som inneholder Krav'
    );
  }); */
});
