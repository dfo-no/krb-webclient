import QuestionEnum from '../../models/QuestionEnum';
import { ITextQuestion } from './ITextQuestion';
import { IVariant, VariantSchema } from './IVariant';
import VariantType from './VariantType';

describe('IVariant', () => {
  test('Valid WB form should validate', () => {
    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: '',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [],
      type: VariantType.requirement
    };

    const report = VariantSchema.validate(variant);
    expect(report.error).toBeUndefined();
  });

  test('Requirement variant can have 2 questions', () => {
    const question1: ITextQuestion = {
      type: QuestionEnum.Q_TEXT,
      id: 'ac0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        point: 10
      },
      config: {
        max: 100,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const question2: ITextQuestion = {
      type: QuestionEnum.Q_TEXT,
      id: 'bc0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        point: 10
      },
      config: {
        max: 100,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: '',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question1, question2],
      type: VariantType.requirement
    };

    const report = VariantSchema.validate(variant);

    expect(report.error).toBeUndefined();
  });

  test('Info variant can only have 1 question', () => {
    const question1: ITextQuestion = {
      type: QuestionEnum.Q_TEXT,
      id: 'ac0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        point: 10
      },
      config: {
        max: 100,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const question2: ITextQuestion = {
      type: QuestionEnum.Q_TEXT,
      id: 'bc0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        point: 10
      },
      config: {
        max: 100,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: '',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question1, question2],
      type: VariantType.info
    };

    const report = VariantSchema.validate(variant);

    expect(report.error?.details[0].type).toEqual('array.max');
    expect(report.error?.details[0].message).toEqual(
      '"questions" must contain less than or equal to 1 items'
    );
  });

  test('Variant schema should fail on wrongly configured questions', () => {
    const question1: ITextQuestion = {
      type: QuestionEnum.Q_TEXT,
      id: 'ac0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        point: 10
      },
      config: {
        max: -2,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const question2: ITextQuestion = {
      type: QuestionEnum.Q_TEXT,
      id: 'bc0b5d89-0b6d-4882-b7c9-ff9f2bd2904e',
      answer: {
        text: 'foo',
        point: 10
      },
      config: {
        max: -1,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const variant: IVariant = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      description: '',
      requirementText: '',
      instruction: '',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question1, question2],
      type: VariantType.requirement
    };

    const report = VariantSchema.validate(variant);

    expect(report.error?.details[0].message).toEqual(
      '"questions[0].config.max" must be greater than or equal to 0'
    );
    expect(report.error?.details[1].message).toEqual(
      '"questions[1].config.max" must be greater than or equal to 0'
    );

    expect(report.error?.details[0].type).toEqual('number.min');
    expect(report.error?.details[1].type).toEqual('number.min');
  });
});
