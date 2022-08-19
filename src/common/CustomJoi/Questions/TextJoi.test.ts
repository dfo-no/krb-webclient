import CustomJoi from '../../CustomJoi';

describe('TextJoi', () => {
  test('Joi validateMaxText() should show error message if not a positive integer', () => {
    const schema = CustomJoi.object().keys({
      max: CustomJoi.validateMaxText()
    });

    const reportError1 = schema.validate({
      max: -1
    });
    const reportError2 = schema.validate({
      max: 1.2
    });
    const reportSuccess = schema.validate({
      max: 10
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateAnswerText() should show error message if text too large', () => {
    const schema = CustomJoi.object().keys({
      config: {
        max: CustomJoi.number()
      },
      answer: {
        text: CustomJoi.validateAnswerText()
      }
    });

    const reportError = schema.validate({
      config: {
        max: 10
      },
      answer: {
        text: 'Dette er en alt for lang setning'
      }
    });
    const reportSuccess = schema.validate({
      config: {
        max: 10
      },
      answer: {
        text: 'Kort setni'
      }
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Lengde på tekst må være mindre enn 10 tegn'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
