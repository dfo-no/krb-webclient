import QuestionEnum from '../../models/QuestionEnum';
import {
  CheckboxQuestionAnswerSchema,
  CheckboxQuestionSchema
} from './ICheckboxQuestion';

describe('CheckboxQuestionSchema should validate', () => {
  test('CheckboxQuestionSchema can post null answer', () => {
    const question = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_CHECKBOX,
      answer: {
        point: 0,
        value: false
      },
      config: {
        pointsNonPrefered: 0,
        defaultPoint: 1,
        preferedAlternative: true
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = CheckboxQuestionSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('CheckboxQuestionAnswerSchema can post answer', () => {
    const question = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_CHECKBOX,
      answer: {
        value: true,
        point: 5
      },
      config: {
        pointsNonPrefered: 0,
        defaultPoint: 1,
        preferedAlternative: true
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = CheckboxQuestionAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });
});
