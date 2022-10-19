import CustomJoi from '../CustomJoi';

describe('SpecProductJoi', () => {
  test('Joi validateWeight() should show error message if not a positive integer under 101', () => {
    const schema = CustomJoi.object().keys({
      weight: CustomJoi.validateWeight(),
    });

    const reportError1 = schema.validate({
      weight: -1,
    });
    const reportError2 = schema.validate({
      weight: 1.2,
    });
    const reportError3 = schema.validate({
      weight: 120,
    });
    const reportSuccess = schema.validate({
      weight: 10,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være minimum 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et heltall'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Må være maksimum 100'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateAmount() should show error message if not a positive integer under 101', () => {
    const schema = CustomJoi.object().keys({
      amount: CustomJoi.validateAmount(),
    });

    const reportError1 = schema.validate({
      amount: -1,
    });
    const reportError2 = schema.validate({
      amount: 1.2,
    });
    const reportSuccess = schema.validate({
      amount: 10,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være minimum 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
