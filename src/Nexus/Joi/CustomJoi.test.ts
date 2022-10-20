import CustomJoi from './CustomJoi';

describe('CustomJoi', () => {
  test('Joi validateVersion() should show error message on version value under 0', () => {
    const schema = CustomJoi.object().keys({
      version: CustomJoi.validateVersion(),
    });

    const reportError = schema.validate({
      version: -1,
    });
    const reportSuccess = schema.validate({
      version: 1,
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Versjonsnummer er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateOrgNr() should show error message on not invalid organization numbers', () => {
    const schema = CustomJoi.object().keys({
      number: CustomJoi.validateOrgNr(),
    });

    const reportError1 = schema.validate({
      number: '12345678',
    });
    const reportError2 = schema.validate({
      number: '123456789',
    });
    const reportSuccess = schema.validate({
      number: '986352325',
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Består av 9 siffre'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Ugyldig organisasjonsnummer'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
