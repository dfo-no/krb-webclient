import timezoneMock from 'timezone-mock';

import CustomJoi from '../../CustomJoi';

describe('TimeJoi', () => {
  timezoneMock.register('UTC');
  test('Joi validatePeriodMinutes() should show error message if not a minute', () => {
    const schema = CustomJoi.object().keys({
      minutes: CustomJoi.validatePeriodMinutes(),
    });

    const reportError1 = schema.validate({
      minutes: -1,
    });
    const reportError2 = schema.validate({
      minutes: 1.2,
    });
    const reportError3 = schema.validate({
      minutes: 60,
    });
    const reportSuccess = schema.validate({
      minutes: 10,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Må være mindre enn 60'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validatePeriodHours() should show error message if not an hour', () => {
    const schema = CustomJoi.object().keys({
      minutes: CustomJoi.validatePeriodHours(),
    });

    const reportError1 = schema.validate({
      minutes: -1,
    });
    const reportError2 = schema.validate({
      minutes: 1.2,
    });
    const reportError3 = schema.validate({
      minutes: 24,
    });
    const reportSuccess = schema.validate({
      minutes: 10,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Må være mindre enn 24'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateFromBoundaryTime() and validateToBoundaryTime should work together', () => {
    const schema = CustomJoi.object().keys({
      config: {
        fromBoundary: CustomJoi.validateFromBoundaryTime(),
        toBoundary: CustomJoi.validateToBoundaryTime(),
      },
      answer: {
        fromTime: CustomJoi.validateOptionalDate(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        fromBoundary: null,
        toBoundary: '2022-10-02T16:00:00.000Z',
      },
      answer: {
        fromTime: '2022-10-02T16:00:00.000Z',
      },
    });
    const reportError2 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: null,
      },
      answer: {
        fromTime: '2022-10-02T16:00:00.000Z',
      },
    });
    const reportError3 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T20:00:00.000Z',
        toBoundary: '2022-10-02T16:00:00.000Z',
      },
      answer: {
        fromTime: '2022-10-02T16:00:00.000Z',
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
      },
      answer: {
        fromTime: '2022-10-02T16:00:00.000Z',
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        fromBoundary: null,
        toBoundary: null,
      },
      answer: {
        fromTime: '2022-10-02T16:00:00.000Z',
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Tidspunkt må være fylt ut'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Tidspunkt må være fylt ut'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Til må være senere enn fra'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateTimeDiscount() validates towards boundaries', () => {
    const schema = CustomJoi.object().keys({
      fromBoundary: CustomJoi.validateFromBoundaryTime(),
      toBoundary: CustomJoi.validateToBoundaryTime(),
      timeDiscounts: CustomJoi.validateUniqueArray(
        CustomJoi.object().keys({
          time: CustomJoi.validateTimeDiscount(),
        })
      ),
    });

    const reportError1 = schema.validate({
      fromBoundary: '2022-10-02T16:00:00.000Z',
      toBoundary: '2022-10-02T20:00:00.000Z',
      timeDiscounts: [
        {
          time: '2022-10-02T14:00:00.000Z',
        },
      ],
    });
    const reportError2 = schema.validate({
      fromBoundary: '2022-10-02T16:00:00.000Z',
      toBoundary: '2022-10-02T20:00:00.000Z',
      timeDiscounts: [
        {
          time: '2022-10-02T22:00:00.000Z',
        },
      ],
    });
    const reportError3 = schema.validate({
      fromBoundary: '2022-10-02T16:00:00.000Z',
      toBoundary: '2022-10-02T20:00:00.000Z',
      timeDiscounts: [
        {
          time: null,
        },
      ],
    });
    const reportSuccess = schema.validate({
      fromBoundary: '2022-10-02T16:00:00.000Z',
      toBoundary: '2022-10-02T20:00:00.000Z',
      timeDiscounts: [
        {
          time: '2022-10-02T18:00:00.000Z',
        },
      ],
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Tidspunkt kan ikke være før 16:00'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Tidspunkt kan ikke være etter 20:00'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Tidspunkt må ha en verdi'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateFromTime() validates towards boundaries', () => {
    const schema = CustomJoi.object().keys({
      config: {
        fromBoundary: CustomJoi.validateFromBoundaryTime(),
        toBoundary: CustomJoi.validateToBoundaryTime(),
      },
      answer: {
        fromTime: CustomJoi.validateFromTime(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
      },
      answer: {
        fromTime: '2022-10-02T14:00:00.000Z',
      },
    });
    const reportError2 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
      },
      answer: {
        fromTime: '2022-10-02T22:00:00.000Z',
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
      },
      answer: {
        fromTime: null,
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
      },
      answer: {
        fromTime: '2022-10-02T18:00:00.000Z',
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Tidspunkt kan ikke være før 16:00'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Tidspunkt kan ikke være etter 20:00'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateToTime() validates towards boundaries', () => {
    const schema = CustomJoi.object().keys({
      config: {
        fromBoundary: CustomJoi.validateFromBoundaryTime(),
        toBoundary: CustomJoi.validateToBoundaryTime(),
        isPeriod: CustomJoi.validateBoolean(),
      },
      answer: {
        fromTime: CustomJoi.validateFromTime(),
        toTime: CustomJoi.validateToTime(),
      },
    });

    const reportError1 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromTime: '2022-10-02T18:00:00.000Z',
        toTime: '2022-10-02T21:00:00.000Z',
      },
    });
    const reportError2 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromTime: '2022-10-02T18:00:00.000Z',
        toTime: '2022-10-02T17:00:00.000Z',
      },
    });

    const reportError3 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromTime: '2022-10-02T18:00:00.000Z',
        toTime: null,
      },
    });
    const reportSuccess1 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
        isPeriod: false,
      },
      answer: {
        fromTime: '2022-10-02T18:00:00.000Z',
        toTime: null,
      },
    });
    const reportSuccess2 = schema.validate({
      config: {
        fromBoundary: '2022-10-02T16:00:00.000Z',
        toBoundary: '2022-10-02T20:00:00.000Z',
        isPeriod: true,
      },
      answer: {
        fromTime: '2022-10-02T18:00:00.000Z',
        toTime: '2022-10-02T19:00:00.000Z',
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Tidspunkt kan ikke være etter 20:00'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Tidspunkt kan ikke være før 18:00'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Tidspunkt må være fylt ut'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });
});
