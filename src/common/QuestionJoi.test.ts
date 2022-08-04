import CustomJoi from './CustomJoi';

describe('QuestionJoi', () => {
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
      'Maksverdi må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Maksverdi må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateAnswerText() should show error message if text too large', () => {
    const schema = CustomJoi.object().keys({
      config: {
        max: CustomJoi.number()
      },
      text: CustomJoi.validateAnswerText()
    });

    const reportError = schema.validate({
      config: {
        max: 10
      },
      text: 'Dette er en alt for lang setning'
    });
    const reportSuccess = schema.validate({
      config: {
        max: 10
      },
      text: 'Kort setni'
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Lengde på tekst må være mindre enn 10 tegn'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateScore() should show error message if not between 0 and 100', () => {
    const schema = CustomJoi.object().keys({
      point: CustomJoi.validateScore()
    });

    const reportError1 = schema.validate({
      point: -1
    });
    const reportError2 = schema.validate({
      point: 101
    });
    const reportSuccess = schema.validate({
      point: 50
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Poeng må være 0 eller høyere'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Poeng må være 100 eller lavere'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateMaxCodes() should show error message if not a positive integer over 1', () => {
    const schema = CustomJoi.object().keys({
      max: CustomJoi.validateMaxCodes()
    });

    const reportError1 = schema.validate({
      max: 0
    });
    const reportError2 = schema.validate({
      max: 1.2
    });
    const reportSuccess = schema.validate({
      max: 10
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Maksverdi må være større eller lik 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Maksverdi må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateMinCodes() should show error message if not a positive integer over 1', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateMinCodes()
    });

    const reportError1 = schema.validate({
      min: -1
    });
    const reportError2 = schema.validate({
      min: 1.2
    });
    const reportSuccess = schema.validate({
      min: 10
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Minimumsverdi må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Minimumsverdi må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
