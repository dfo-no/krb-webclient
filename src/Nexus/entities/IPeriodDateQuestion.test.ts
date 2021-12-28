import QuestionEnum from '../../models/QuestionEnum';
import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema
} from './IPeriodDateQuestion';

describe('IPeriodDateQuestion should validate', () => {
  test('hasToDate true requires valid toDate', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: null,
        point: 2
      },
      config: {
        defaultPoint: 1,
        hasToDate: false,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z'
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('hasToDate false requires null toDate', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: null,
        point: 2
      },
      config: {
        defaultPoint: 1,
        hasToDate: false,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z'
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('toDate must be more than date', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: '2021-11-25T23:00:00.000Z',
        point: 3
      },
      config: {
        defaultPoint: 1,
        hasToDate: true,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-26T23:00:00.000Z'
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('fromDate less than toDate should fail', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: '2021-11-23T23:00:00.000Z',
        point: 3
      },
      config: {
        defaultPoint: 1,
        hasToDate: true,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z'
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error?.details[0].type).toEqual('date.greater');
  });
});
