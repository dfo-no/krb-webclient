import CustomJoi from '../CustomJoi';
import { ModelType } from '../../enums';
import { v4 as uuidv4 } from 'uuid';

describe('GeneralJoi', () => {
  test('Joi validateText() should show error message if text is empty', () => {
    const schema = CustomJoi.object().keys({
      title: CustomJoi.validateText()
    });

    const reportError = schema.validate({
      title: ''
    });
    const reportSuccess = schema.validate({
      title: 'Dette er en tittel'
    });
    expect(reportError?.error?.details[0].message).toEqual('Kan ikke være tom');
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateLongText() should show error message if text is empty or shorter than 3 chars', () => {
    const schema = CustomJoi.object().keys({
      text: CustomJoi.validateLongText()
    });

    const reportError1 = schema.validate({
      text: ''
    });
    const reportError2 = schema.validate({
      text: 'sd'
    });
    const reportSuccess = schema.validate({
      text: 'Dette er en tekst'
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Kan ikke være tom'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Må ha minimum 3 karakterer'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateOptionalText() should not show error message on empty', () => {
    const schema = CustomJoi.object().keys({
      description: CustomJoi.validateOptionalText()
    });

    const report = schema.validate({
      description: ''
    });
    expect(report?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateBoolean() should not show error message on boolean', () => {
    const schema = CustomJoi.object().keys({
      bool: CustomJoi.validateBoolean()
    });

    const report = schema.validate({
      bool: false
    });
    expect(report?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateNumber() should not show error message on number', () => {
    const schema = CustomJoi.object().keys({
      num: CustomJoi.validateNumber()
    });

    const report = schema.validate({
      num: 1
    });
    expect(report?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateType() should show error message on wrong type', () => {
    const schema = CustomJoi.object().keys({
      type: CustomJoi.validateType(ModelType.need)
    });

    const reportError = schema.validate({
      type: ModelType.bank
    });
    const reportSuccess = schema.validate({
      type: ModelType.need
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "type" er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateDate() should show error message on not iso formatted date', () => {
    const schema = CustomJoi.object().keys({
      date: CustomJoi.validateDate()
    });

    const reportError = schema.validate({
      date: null
    });
    const reportSuccess = schema.validate({
      date: '2021-12-02T16:00:00.000Z'
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "date" er ikke en dato'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateEmptyDate() should show error message if not null', () => {
    const schema = CustomJoi.object().keys({
      date: CustomJoi.validateEmptyDate()
    });

    const reportError = schema.validate({
      date: '2021-12-02T16:00:00.000Z'
    });
    const reportSuccess = schema.validate({
      date: null
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "date" er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateOptionalDate() should show error message on not iso formatted date', () => {
    const schema = CustomJoi.object().keys({
      date1: CustomJoi.validateOptionalDate(),
      date2: CustomJoi.validateOptionalDate()
    });

    const reportError = schema.validate({
      date1: 'Dette er ingen dato',
      date2: null
    });
    const reportSuccess = schema.validate({
      date1: '2021-12-02T16:00:00.000Z',
      date2: null
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. "date1" er på et ugyldig format'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateArray() should show error message on incorrect items', () => {
    const childSchema = CustomJoi.object().keys({
      id: CustomJoi.validateId()
    });

    const schema = CustomJoi.object().keys({
      children: CustomJoi.validateUniqueArray(childSchema)
    });

    const reportError = schema.validate({
      children: [{}]
    });
    const sameId = uuidv4();
    const reportSuccess1 = schema.validate({
      children: [{ id: sameId }, { id: sameId }]
    });
    const reportSuccess2 = schema.validate({
      children: [
        {
          id: uuidv4()
        },
        {
          id: uuidv4()
        }
      ]
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Kan ikke finne "children[0].id"'
    );
    expect(reportSuccess1?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. 2 like IDer er funnet i skjemaet'
    );
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateUniqueArray() should show error message on incorrect items and items with same id', () => {
    const childSchema = CustomJoi.object().keys({
      id: CustomJoi.validateId()
    });

    const schema = CustomJoi.object().keys({
      children: CustomJoi.validateUniqueArray(childSchema)
    });

    const reportError1 = schema.validate({
      children: [{}]
    });
    const sameId = uuidv4();
    const reportError2 = schema.validate({
      children: [{ id: sameId }, { id: sameId }]
    });
    const reportSuccess = schema.validate({
      children: [
        {
          id: uuidv4()
        },
        {
          id: uuidv4()
        }
      ]
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Kan ikke finne "children[0].id"'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. 2 like IDer er funnet i skjemaet'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
