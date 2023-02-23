import CustomJoi from '../../CustomJoi';

describe('SliderJoi', () => {
  test('Joi validateSliderMin() should show error message on value under 0', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
      step: CustomJoi.validateNumber(),
    });

    const reportError1 = schema.validate({
      min: -2,
      step: 2,
    });
    const reportError2 = schema.validate({
      min: 3,
      step: 2,
    });
    const reportSuccess = schema.validate({
      min: 4,
      step: 2,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være en verdi i hele 2'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderMax() should show error message on value under min', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
      max: CustomJoi.validateSliderMax(),
      step: CustomJoi.validateNumber(),
    });

    const reportError1 = schema.validate({
      min: 10,
      max: 4,
      step: 2,
    });
    const reportError2 = schema.validate({
      min: 2,
      max: 9,
      step: 2,
    });
    const reportSuccess = schema.validate({
      min: 2,
      max: 10,
      step: 2,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 10'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være en verdi i hele 2'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderValue() should show error message on value under min or larger than max', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
      max: CustomJoi.validateSliderMax(),
      step: CustomJoi.validateNumber(),
      values: CustomJoi.validateUniqueArray(
        CustomJoi.object().keys({
          value: CustomJoi.validateSliderValue(),
        })
      ),
    });

    const reportError1 = schema.validate({
      min: 2,
      max: 10,
      step: 2,
      values: [
        {
          value: 0,
        },
      ],
    });
    const reportError2 = schema.validate({
      min: 2,
      max: 10,
      step: 2,
      values: [
        {
          value: 12,
        },
      ],
    });
    const reportError3 = schema.validate({
      min: 2,
      max: 10,
      step: 2,
      values: [
        {
          value: 9,
        },
      ],
    });
    const reportSuccess = schema.validate({
      min: 2,
      max: 10,
      step: 2,
      values: [
        {
          value: 8,
        },
      ],
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 2'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Kan ikke være større enn 10'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Må være en verdi i hele 2'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderAnswer() should show error message on value under min or larger than max', () => {
    const schema = CustomJoi.object().keys({
      config: {
        min: CustomJoi.validateSliderMin(),
        max: CustomJoi.validateSliderMax(),
        step: CustomJoi.validateNumber(),
      },
      answer: {
        value: CustomJoi.validateSliderAnswer(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        min: 1,
        max: 10,
        step: 1,
      },
      answer: {
        value: 0,
      },
    });
    const reportError2 = schema.validate({
      config: {
        min: 1,
        max: 10,
        step: 1,
      },
      answer: {
        value: 12,
      },
    });
    const reportSuccess = schema.validate({
      config: {
        min: 1,
        max: 10,
        step: 1,
      },
      answer: {
        value: 5,
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Kan ikke være større enn 10'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
