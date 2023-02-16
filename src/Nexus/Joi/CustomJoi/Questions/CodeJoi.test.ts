import { v4 as uuidv4 } from 'uuid';

import CustomJoi from '../../CustomJoi';

describe('CodeJoi', () => {
  test('Joi validateMaxCodes() should show error message if not a positive integer over 1', () => {
    const schema = CustomJoi.object().keys({
      question: {
        config: {
          optionalCodeMinAmount: CustomJoi.validateMinCodes(),
          optionalCodeMaxAmount: CustomJoi.validateMaxCodes(),
        },
      },
    });

    const reportError1 = schema.validate({
      question: {
        config: {
          optionalCodeMinAmount: 0,
          optionalCodeMaxAmount: 0,
        },
      },
    });
    const reportError2 = schema.validate({
      question: {
        config: {
          optionalCodeMinAmount: 0,
          optionalCodeMaxAmount: 1.2,
        },
      },
    });
    const reportError3 = schema.validate({
      question: {
        config: {
          optionalCodeMinAmount: 5,
          optionalCodeMaxAmount: 1,
        },
      },
    });

    const reportSuccess = schema.validate({
      question: {
        config: {
          optionalCodeMinAmount: 0,
          optionalCodeMaxAmount: 10,
        },
      },
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være minimum 1'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Kan ikke være mindre enn 5'
    );

    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateMinCodes() should show error message if not a positive integer over 1', () => {
    const schema = CustomJoi.object().keys({
      min: CustomJoi.validateMinCodes(),
    });

    const reportError1 = schema.validate({
      min: -1,
    });
    const reportError2 = schema.validate({
      min: 1.2,
    });
    const reportSuccess = schema.validate({
      min: 10,
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateCodes() should show error message if not a positive integer over 1', () => {
    const schema = CustomJoi.object().keys({
      discountSumMax: CustomJoi.validateHighestDiscount(),
      codes: CustomJoi.validateQuestionCodes(
        CustomJoi.object().keys({
          code: CustomJoi.validateId(),
          mandatory: CustomJoi.validateBoolean(),
          discount: CustomJoi.validateCodeDiscount(),
        })
      ),
    });

    const reportError1 = schema.validate({
      discountSumMax: 1000,
      codes: [
        {
          code: uuidv4(),
          mandatory: false,
          discount: -1,
        },
      ],
    });
    const reportError2 = schema.validate({
      discountSumMax: 1000,
      codes: [
        {
          code: uuidv4(),
          mandatory: false,
          discount: 1000,
        },
        {
          code: uuidv4(),
          mandatory: false,
          discount: 1000,
        },
      ],
    });
    const reportSuccess = schema.validate({
      discountSumMax: 1000,
      codes: [
        {
          code: uuidv4(),
          mandatory: false,
          discount: 500,
        },
      ],
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Må være minimum 0'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Fradrag(er) til sammen kan ikke være mer enn fradragssum'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
