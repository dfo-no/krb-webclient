import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';

import CustomJoi from './CustomJoi';
import { ModelType, QuestionVariant } from '../enums';
import VariantType from '../Nexus/entities/VariantType';
import { QuestionBaseSchema } from '../Nexus/entities/IQuestionBase';

describe('CustomJoi', () => {
  jest.mock('react-i18next', () => ({
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: { changeLanguage: jest.fn() }
    })
  }));

  test('Joi validateText() should show error message if text is empty', () => {
    const schema = CustomJoi.object().keys({
      title: CustomJoi.validateText('Tittel')
    });

    const reportError = schema.validate({
      title: ''
    });
    const reportSuccess = schema.validate({
      title: 'Dette er en tittel'
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Tittel kan ikke være tom'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateLongText() should show error message if text is empty or shorter than 3 chars', () => {
    const schema = CustomJoi.object().keys({
      title: CustomJoi.validateLongText('Tittel')
    });

    const reportError1 = schema.validate({
      title: ''
    });
    const reportError2 = schema.validate({
      title: 'sd'
    });
    const reportSuccess = schema.validate({
      title: 'Dette er en tittel'
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Tittel kan ikke være tom'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Tittel må ha minimum 3 karakterer'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateId() should show error message if not a valid guid is empty', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.validateId()
    });

    const reportError = schema.validate({
      id: uuidv1()
    });
    const reportSuccess = schema.validate({
      id: uuidv4()
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Id til objektet er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateEmptyId() should show error if not empty', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.validateEmptyId()
    });

    const reportError = schema.validate({
      id: uuidv4()
    });
    const reportSuccess = schema.validate({
      id: ''
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Id til objektet er ugyldig'
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
      'Noe har gått galt med skjemaet. Typen til objektet er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateInfoType() should show error message if multiple question', () => {
    const schema = CustomJoi.object().keys({
      type: CustomJoi.validateVariantType(),
      questions: CustomJoi.validateItems(QuestionBaseSchema)
    });

    const reportError = schema.validate({
      type: VariantType.info,
      questions: [
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        },
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        }
      ]
    });
    const reportSuccess1 = schema.validate({
      type: VariantType.info,
      questions: [
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        }
      ]
    });
    const reportSuccess2 = schema.validate({
      type: VariantType.requirement,
      questions: [
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        },
        {
          id: uuidv4(),
          type: QuestionVariant.Q_TEXT,
          config: {},
          answer: {},
          sourceOriginal: null,
          sourceRel: null
        }
      ]
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'For mange spørsmål for variant av typen Info'
    );
    expect(reportSuccess1?.error?.details[0].message).toBeUndefined();
    expect(reportSuccess2?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateParent() should show error message on wrong id', () => {
    const schema = CustomJoi.object().keys({
      parent1: CustomJoi.validateParent(),
      parent2: CustomJoi.validateParent()
    });

    const reportError = schema.validate({
      parent1: uuidv1(),
      parent2: ''
    });
    const reportSuccess = schema.validate({
      parent1: uuidv4(),
      parent2: ''
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Forelder id til objektet er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateSource() should show error message on wrong id', () => {
    const schema = CustomJoi.object().keys({
      sourceOriginal: CustomJoi.validateSource(),
      sourceRel: CustomJoi.validateSource()
    });

    const reportError = schema.validate({
      sourceOriginal: uuidv1(),
      sourceRel: uuidv1()
    });
    const reportSuccess = schema.validate({
      sourceOriginal: uuidv4(),
      sourceRel: null
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Kilden til objektet er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateVersion() should show error message on version value under 0', () => {
    const schema = CustomJoi.object().keys({
      version: CustomJoi.validateVersion()
    });

    const reportError = schema.validate({
      version: -1
    });
    const reportSuccess = schema.validate({
      version: 1
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Versjonsnummer er ugyldig'
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
      'Noe har gått galt med skjemaet. Dato er på et ugyldig format'
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
      'Noe har gått galt med skjemaet. Dato er på et ugyldig format'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateDeletedDate() should show error message on not iso formatted date', () => {
    const schema = CustomJoi.object().keys({
      date1: CustomJoi.validateDeletedDate(),
      date2: CustomJoi.validateDeletedDate()
    });

    const reportError = schema.validate({
      date1: 'Dette er ingen dato',
      date2: 'Dette er ingen dato'
    });
    const reportSuccess = schema.validate({
      date1: '2021-12-02T16:00:00.000Z',
      date2: null
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Slettet dato er på et ugyldig format'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validatePublishedDate() should show error message on not iso formatted date', () => {
    const schema = CustomJoi.object().keys({
      date1: CustomJoi.validatePublishedDate(),
      date2: CustomJoi.validatePublishedDate()
    });

    const reportError = schema.validate({
      date1: 'Dette er ingen dato',
      date2: 'Dette er ingen dato'
    });
    const reportSuccess = schema.validate({
      date1: '2021-12-02T16:00:00.000Z',
      date2: null
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Publisert dato er på et ugyldig format'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateItems() should show error message on incorrect items', () => {
    const childSchema = CustomJoi.object().keys({
      id: CustomJoi.validateId()
    });

    const schema = CustomJoi.object().keys({
      children: CustomJoi.validateItems(childSchema, 'Test')
    });

    const reportError = schema.validate({
      children: [{}]
    });
    const reportSuccess = schema.validate({
      children: [
        {
          id: uuidv4()
        }
      ]
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Test har et ugyldig element'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateProjectId() should show error message on not a valid id', () => {
    const schema = CustomJoi.object().keys({
      id1: CustomJoi.validateProjectId(),
      id2: CustomJoi.validateProjectId()
    });

    const reportError = schema.validate({
      id1: uuidv1(),
      id2: uuidv1()
    });
    const reportSuccess = schema.validate({
      id1: uuidv4(),
      id2: null
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Prosjektets id er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateBankId() should show error message on not a valid id', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.validateBankId()
    });

    const reportError = schema.validate({
      id: uuidv1()
    });
    const reportSuccess = schema.validate({
      id: uuidv4()
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Bankens id er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateNeedId() should show error message on not a valid id', () => {
    const schema = CustomJoi.object().keys({
      id: CustomJoi.validateNeedId()
    });

    const reportError = schema.validate({
      id: uuidv1()
    });
    const reportSuccess = schema.validate({
      id: uuidv4()
    });
    expect(reportError?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Behovets id er ugyldig'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateOrgNr() should show error message on not invalid organization numbers', () => {
    const schema = CustomJoi.object().keys({
      number: CustomJoi.validateOrgNr()
    });

    const reportError1 = schema.validate({
      number: '12345678'
    });
    const reportError2 = schema.validate({
      number: '123456789'
    });
    const reportSuccess = schema.validate({
      number: '986352325'
    });
    expect(reportError1?.error?.details[0].message).toEqual(
      'Organisasjonsnummer består av 9 siffre'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Ugyldig organisasjonsnummer'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });

  test('Joi validateVariantProducts() should show error message if useProducts not matches products', () => {
    const schema = CustomJoi.object().keys({
      useProduct: CustomJoi.validateBoolean(),
      products: CustomJoi.validateVariantProducts()
    });

    const reportError1 = schema.validate({
      useProduct: false,
      products: [uuidv4()]
    });
    const reportError2 = schema.validate({
      useProduct: true,
      products: []
    });
    const reportError3 = schema.validate({
      useProduct: true,
      products: [uuidv1()]
    });
    const reportSuccess = schema.validate({
      useProduct: true,
      products: [uuidv4()]
    });
    console.log(reportError3?.error);
    expect(reportError1?.error?.details[0].message).toEqual(
      'Produkter er lagt til, men ikke valgt for varianten'
    );
    expect(reportError2?.error?.details[0].message).toEqual(
      'Det må velges produkter for varianten'
    );
    expect(reportError3?.error?.details[0].message).toEqual(
      'Noe har gått galt med skjemaet. Et av produktene har ugyldig id'
    );
    expect(reportSuccess?.error?.details[0].message).toBeUndefined();
  });
});
