import CustomJoi from '../CustomJoi';

describe('QuestionJoi', () => {
  test('Joi validateScore() should show error message if not between 0 and 100', () => {
    const schema = CustomJoi.object().keys({
      discount: CustomJoi.validateScore(),
    });

    const reportError1 = schema.validate({
      discount: -1,
    });
    const reportError2 = schema.validate({
      discount: 101,
    });
    const reportSuccess = schema.validate({
      discount: 50,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Poeng må være minimum 0'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Poeng må være maksimum 100'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
