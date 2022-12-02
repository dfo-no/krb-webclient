import { ITextQuestion } from './ITextQuestion';
import { IVariant, VariantSchema } from './IVariant';
import { QuestionVariant, VariantType } from '../enums';

describe('IVariant', () => {
  test('Valid WB form should validate', () => {
    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: 'Description',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [],
      type: VariantType.requirement,
    };

    const report = VariantSchema.validate(variant);
    expect(report.error).toBeUndefined();
  });

  test('Requirement variant can have 2 questions', () => {
    const question1: ITextQuestion = {
      type: QuestionVariant.Q_TEXT,
      id: 'ac0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        discount: 10,
      },
      config: {
        max: 100,
        defaultDiscount: 1,
        discountValues: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const question2: ITextQuestion = {
      type: QuestionVariant.Q_TEXT,
      id: 'bc0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        discount: 10,
      },
      config: {
        max: 100,
        defaultDiscount: 1,
        discountValues: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: 'Description',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question1, question2],
      type: VariantType.requirement,
    };

    const report = VariantSchema.validate(variant);

    expect(report.error).toBeUndefined();
  });

  test('Info variant can only have 1 question', () => {
    const question1: ITextQuestion = {
      type: QuestionVariant.Q_TEXT,
      id: 'ac0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        discount: 10,
      },
      config: {
        max: 100,
        defaultDiscount: 1,
        discountValues: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const question2: ITextQuestion = {
      type: QuestionVariant.Q_TEXT,
      id: 'bc0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        discount: 10,
      },
      config: {
        max: 100,
        defaultDiscount: 1,
        discountValues: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: 'Description',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question1, question2],
      type: VariantType.info,
    };

    const report = VariantSchema.validate(variant);

    expect(report.error?.details[0].type).toEqual('array.max');
    expect(report.error?.details[0].message).toEqual(
      'For mange spørsmål for variant av typen Info'
    );
  });

  test('Variant schema should fail on wrongly configured questions', () => {
    const question1: ITextQuestion = {
      type: QuestionVariant.Q_TEXT,
      id: 'ac0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        discount: 10,
      },
      config: {
        max: -2,
        defaultDiscount: 1,
        discountValues: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const question2: ITextQuestion = {
      type: QuestionVariant.Q_TEXT,
      id: 'bc0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        discount: 10,
      },
      config: {
        max: -1,
        defaultDiscount: 1,
        discountValues: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: 'Description',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question1, question2],
      type: VariantType.requirement,
    };

    const report = VariantSchema.validate(variant);

    expect(report.error?.details[0].message).toEqual(
      'Må være et positivt heltall'
    );
    expect(report.error?.details[1].message).toEqual(
      'Må være et positivt heltall'
    );

    expect(report.error?.details[0].type).toEqual('number.min');
    expect(report.error?.details[1].type).toEqual('number.min');
  });
});
