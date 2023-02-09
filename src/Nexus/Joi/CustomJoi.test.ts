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

  const schema = CustomJoi.object().keys({
    number: CustomJoi.validateOrgNr(),
  });

  test('Joi validateOrgNr() should show error message on not invalid organization numbers', () => {
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

  const randomGeneratedOrgNumbersThatShouldBeValid = [
    '120701185',
    '339270112',
    '852947454',
    '613245782',
    '340724992',
    '907691411',
    '324759964',
    '404959018',
    '932739186',
    '243040930',
    '799884380',
    '808497158',
    '665123987',
    '543726826',
    '544312669',
    '530134806',
    '879396980',
    '444498099',
    '351885785',
    '688018560',
    '568822366',
    '279284887',
    '783358271',
    '176530111',
    '953711125',
    '123606043',
    '437669252',
    '831407409',
    '474265846',
    '712639458',
    '468530260',
    '567905705',
    '857952685',
    '697150943',
    '841327772',
    '305628654',
    '690261995',
    '345937617',
    '188241522',
    '293071845',
    '000440035',
    '398742192',
    '648679777',
    '916736592',
    '462125607',
    '254690562',
    '913374754',
    '690670380',
    '031079667',
    '261458616',
  ];

  test.each(randomGeneratedOrgNumbersThatShouldBeValid)(
    'checks that org number %s is valid',
    (orgNumber) => {
      const reportSuccess = schema.validate({
        number: orgNumber,
      });
      expect(reportSuccess?.error?.details[0].message).toBeUndefined();
    }
  );

  const randomGeneratedOrgNumbersThatShouldBeInvalid = [
    '120701186',
    '339270110',
    '852147454',
    '613745782',
    '320724992',
    '107691411',
    '324754964',
    '404959718',
    '932739196',
  ];

  test.each(randomGeneratedOrgNumbersThatShouldBeInvalid)(
    'checks that org number %s is invalid',
    (orgNumber) => {
      const reportError = schema.validate({
        number: orgNumber,
      });
      expect(reportError?.error?.details[0].message).toEqual(
        'Ugyldig organisasjonsnummer'
      );
    }
  );
});
