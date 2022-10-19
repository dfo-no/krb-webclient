import CustomJoi from '../../CustomJoi';

describe('SliderJoi', () => {
  test('Joi validateSliderMin() should show error message on value under 0', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
    });

    const reportError = schema.validate({
      min: -1,
    });
    const reportSuccess = schema.validate({
      min: 1,
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Må være et positivt tall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderMax() should show error message on value under min', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
      max: CustomJoi.validateSliderMax(),
    });

    const reportError = schema.validate({
      min: 10,
      max: 1,
    });
    const reportSuccess = schema.validate({
      min: 1,
      max: 10,
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Må være større enn 10'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderStep() should show error message on value under 0 or larger than min/max gap', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
      max: CustomJoi.validateSliderMax(),
      step: CustomJoi.validateSliderStep(),
    });

    const reportError1 = schema.validate({
      min: 1,
      max: 10,
      step: -1,
    });
    const reportError2 = schema.validate({
      min: 1,
      max: 10,
      step: 10,
    });
    const reportSuccess = schema.validate({
      min: 1,
      max: 10,
      step: 1,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt tall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Overskrider forksjell mellom maks og min (9)'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderValue() should show error message on value under min or larger than max', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateSliderMin(),
      max: CustomJoi.validateSliderMax(),
      values: CustomJoi.validateUniqueArray(
        CustomJoi.object().keys({
          value: CustomJoi.validateSliderValue(),
        })
      ),
    });

    const reportError1 = schema.validate({
      min: 1,
      max: 10,
      values: [
        {
          value: 0,
        },
      ],
    });
    const reportError2 = schema.validate({
      min: 1,
      max: 10,
      values: [
        {
          value: 12,
        },
      ],
    });
    const reportSuccess = schema.validate({
      min: 1,
      max: 10,
      values: [
        {
          value: 5,
        },
      ],
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være større enn 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være mindre enn 10'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSliderAnswer() should show error message on value under min or larger than max', () => {
    const schema = CustomJoi.object().keys({
      config: {
        min: CustomJoi.validateSliderMin(),
        max: CustomJoi.validateSliderMax(),
      },
      answer: {
        value: CustomJoi.validateSliderAnswer(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        min: 1,
        max: 10,
      },
      answer: {
        value: 0,
      },
    });
    const reportError2 = schema.validate({
      config: {
        min: 1,
        max: 10,
      },
      answer: {
        value: 12,
      },
    });
    const reportSuccess = schema.validate({
      config: {
        min: 1,
        max: 10,
      },
      answer: {
        value: 5,
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være større enn 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være mindre enn 10'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
