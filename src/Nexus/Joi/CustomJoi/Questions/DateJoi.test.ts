import timezoneMock from 'timezone-mock';

import CustomJoi from '../../CustomJoi';

describe('DateJoi', () => {
  timezoneMock.register('UTC');
  test('Joi validatePeriodMin() should show error message if not a valid number', () => {
    const schema = CustomJoi.object().keys({
      periodMin: CustomJoi.validatePeriodMin(),
    });

    const reportError1 = schema.validate({
      periodMin: -1,
    });
    const reportError2 = schema.validate({
      periodMin: 1.2,
    });
    const reportSuccess = schema.validate({
      periodMin: 10,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validatePeriodMax() should show error message if smaller than periodMin', () => {
    const schema = CustomJoi.object().keys({
      periodMin: CustomJoi.validatePeriodMin(),
      periodMax: CustomJoi.validatePeriodMax(),
    });

    const reportError1 = schema.validate({
      periodMin: 2,
      periodMax: 1,
    });
    const reportError2 = schema.validate({
      periodMin: 1,
      periodMax: 1.2,
    });
    const reportSuccess = schema.validate({
      periodMin: 1,
      periodMax: 3,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 2'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validatePeriodMin() and validatePeriodMax() ensure minimum and maximum validation and should work together', () => {
    const schema = CustomJoi.object().keys({
      config: {
        periodMin: CustomJoi.validatePeriodMin(),
        periodMax: CustomJoi.validatePeriodMax(),
      },
      answer: {
        minDays: CustomJoi.validateMinDays(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        periodMin: null,
        periodMax: 1,
      },
      answer: {
        minDays: 1,
      },
    });
    const reportError2 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: null,
      },
      answer: {
        minDays: 1,
      },
    });
    const reportError3 = schema.validate({
      config: {
        periodMin: 2,
        periodMax: 1,
      },
      answer: {
        minDays: 1,
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 2,
      },
      answer: {
        minDays: 1,
      },
    });

    expect(reportError1?.error?.details[0].message).toEqual('Må være et tall');
    expect(reportError2?.error?.details[0].message).toEqual('Må være et tall');
    expect(reportError3?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 2'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateFromBoundaryDate() and validateToBoundaryDate should work together', () => {
    const schema = CustomJoi.object().keys({
      config: {
        fromBoundary: CustomJoi.validateFromBoundaryDate(),
        toBoundary: CustomJoi.validateToBoundaryDate(),
      },
      answer: {
        fromDate: CustomJoi.validateOptionalDate(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        fromBoundary: null,
        toBoundary: '2022-02-10T12:00:00.000Z',
      },
      answer: {
        fromDate: '2022-02-10T12:00:00.000Z',
      },
    });
    const reportError2 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: null,
      },
      answer: {
        fromDate: '2022-02-10T12:00:00.000Z',
      },
    });
    const reportError3 = schema.validate({
      config: {
        fromBoundary: '2022-02-18T12:00:00.000Z',
        toBoundary: '2022-02-10T12:00:00.000Z',
      },
      answer: {
        fromDate: '2022-02-10T12:00:00.000Z',
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
      },
      answer: {
        fromDate: '2022-02-10T12:00:00.000Z',
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        fromBoundary: null,
        toBoundary: null,
      },
      answer: {
        fromDate: '2022-02-10T12:00:00.000Z',
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Dato må være fylt ut'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Dato må være fylt ut'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Til må være senere enn fra'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateDateDiscount() validates towards boundaries', () => {
    const schema = CustomJoi.object().keys({
      fromBoundary: CustomJoi.validateFromBoundaryDate(),
      toBoundary: CustomJoi.validateToBoundaryDate(),
      dateDiscounts: CustomJoi.validateUniqueArray(
        CustomJoi.object().keys({
          date: CustomJoi.validateDateDiscount(),
        })
      ),
    });

    const reportError1 = schema.validate({
      fromBoundary: '2022-02-10T12:00:00.000Z',
      toBoundary: '2022-02-18T12:00:00.000Z',
      dateDiscounts: [
        {
          date: '2022-02-08T12:00:00.000Z',
        },
      ],
    });
    const reportError2 = schema.validate({
      fromBoundary: '2022-02-10T12:00:00.000Z',
      toBoundary: '2022-02-18T12:00:00.000Z',
      dateDiscounts: [
        {
          date: '2022-02-20T12:00:00.000Z',
        },
      ],
    });
    const reportError3 = schema.validate({
      fromBoundary: '2022-02-10T12:00:00.000Z',
      toBoundary: '2022-02-18T12:00:00.000Z',
      dateDiscounts: [
        {
          date: null,
        },
      ],
    });
    const reportSuccess = schema.validate({
      fromBoundary: '2022-02-10T12:00:00.000Z',
      toBoundary: '2022-02-18T12:00:00.000Z',
      dateDiscounts: [
        {
          date: '2022-02-11T12:00:00.000Z',
        },
      ],
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Dato kan ikke være før 10.02.2022'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Dato kan ikke være etter 18.02.2022'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Dato må ha en verdi'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateFromDate() validates towards boundaries', () => {
    const schema = CustomJoi.object().keys({
      config: {
        fromBoundary: CustomJoi.validateFromBoundaryDate(),
        toBoundary: CustomJoi.validateToBoundaryDate(),
      },
      answer: {
        fromDate: CustomJoi.validateFromDate(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
      },
      answer: {
        fromDate: '2022-02-08T12:00:00.000Z',
      },
    });
    const reportError2 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
      },
      answer: {
        fromDate: '2022-02-20T12:00:00.000Z',
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
      },
      answer: {
        fromDate: null,
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
      },
      answer: {
        fromDate: '2022-02-11T12:00:00.000Z',
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Dato kan ikke være før 10.02.2022'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Dato kan ikke være etter 18.02.2022'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateToDate() validates towards boundaries', () => {
    const schema = CustomJoi.object().keys({
      config: {
        fromBoundary: CustomJoi.validateFromBoundaryDate(),
        toBoundary: CustomJoi.validateToBoundaryDate(),
        isPeriod: CustomJoi.validateBoolean(),
      },
      answer: {
        fromDate: CustomJoi.validateFromDate(),
        toDate: CustomJoi.validateToDate(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromDate: '2022-02-20T12:00:00.000Z',
        toDate: '2022-02-22T12:00:00.000Z',
      },
    });
    const reportError2 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromDate: '2022-02-13T12:00:00.000Z',
        toDate: '2022-02-12T12:00:00.000Z',
      },
    });

    const reportError3 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromDate: '2022-02-12T12:00:00.000Z',
        toDate: null,
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
        isPeriod: false,
      },
      answer: {
        fromDate: '2022-02-12T12:00:00.000Z',
        toDate: null,
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        fromBoundary: '2022-02-10T12:00:00.000Z',
        toBoundary: '2022-02-18T12:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromDate: '2022-02-12T12:00:00.000Z',
        toDate: '2022-02-14T12:00:00.000Z',
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Dato kan ikke være etter 18.02.2022'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Dato kan ikke være før 13.02.2022'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Dato må være fylt ut'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateMinDays() validates the minimum numberDays towards periodMin and periodMax', () => {
    const schema = CustomJoi.object().keys({
      config: {
        periodMin: CustomJoi.validatePeriodMin(),
        periodMax: CustomJoi.validatePeriodMax(),
      },
      answer: {
        minDays: CustomJoi.validateMinDays(),
      },
    });
    const reportError1 = schema.validate({
      config: {
        periodMin: 2,
        periodMax: 3,
      },
      answer: {
        minDays: 1,
      },
    });
    const reportError2 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 2,
      },
      answer: {
        minDays: 3,
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 1,
      },
      answer: {
        minDays: null,
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 2,
      },
      answer: {
        minDays: 2,
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 2'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Kan ikke være større enn 2'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateMaxDays() validates the maximum numberDays towards periodMin and periodMax', () => {
    const schema = CustomJoi.object().keys({
      config: {
        periodMin: CustomJoi.validatePeriodMin(),
        periodMax: CustomJoi.validatePeriodMax(),
        isPeriod: CustomJoi.validateBoolean(),
      },
      answer: {
        minDays: CustomJoi.validateMinDays(),
        maxDays: CustomJoi.validateMaxDays(),
      },
    });
    const reportError1 = schema.validate({
      config: {
        periodMin: 2,
        periodMax: 3,
        isPeriod: true,
      },
      answer: {
        minDays: 4,
        maxDays: 5,
      },
    });
    const reportError2 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 4,
        isPeriod: true,
      },
      answer: {
        minDays: 3,
        maxDays: 2,
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 4,
        isPeriod: false,
      },
      answer: {
        minDays: 2,
        maxDays: 5,
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        periodMin: 1,
        periodMax: 4,
        isPeriod: true,
      },
      answer: {
        minDays: 2,
        maxDays: 3,
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være større enn 3'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 3'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateDays() should show error message on numberDays under periodMin or larger than periodMax', () => {
    const schema = CustomJoi.object().keys({
      periodMin: CustomJoi.validatePeriodMin(),
      periodMax: CustomJoi.validatePeriodMax(),
      numberDayDiscounts: CustomJoi.validateUniqueArray(
        CustomJoi.object().keys({
          numberDays: CustomJoi.validateDays(),
        })
      ),
    });

    const reportError1 = schema.validate({
      periodMin: 1,
      periodMax: 10,
      numberDayDiscounts: [
        {
          numberDays: 0,
        },
      ],
    });
    const reportError2 = schema.validate({
      periodMin: 1,
      periodMax: 10,
      numberDayDiscounts: [
        {
          numberDays: 12,
        },
      ],
    });
    const reportSuccess = schema.validate({
      periodMin: 1,
      periodMax: 10,
      numberDayDiscounts: [
        {
          numberDays: 5,
        },
      ],
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
