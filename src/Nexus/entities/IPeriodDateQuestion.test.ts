import {
  IPeriodDateQuestion,
  PeriodDateAnswerSchema,
} from './IPeriodDateQuestion';
import { QuestionVariant } from '../enums';

describe('IPeriodDateQuestion should validate', () => {
  test('hasToDate true requires valid toDate', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionVariant.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: null,
        point: 2,
      },
      config: {
        defaultPoint: 1,
        isPeriod: false,
        periodMax: 2,
        periodMin: 1,
        duration: 0,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z',
        dateScores: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('hasToDate false requires null toDate', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionVariant.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: null,
        point: 2,
      },
      config: {
        defaultPoint: 1,
        isPeriod: false,
        periodMax: 2,
        periodMin: 1,
        duration: 0,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z',
        dateScores: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('toDate must be more than date', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionVariant.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: '2021-11-25T23:00:00.000Z',
        point: 3,
      },
      config: {
        defaultPoint: 1,
        isPeriod: false,
        periodMax: 2,
        periodMin: 1,
        duration: 0,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-26T23:00:00.000Z',
        dateScores: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('fromDate less than toDate should fail', () => {
    const question: IPeriodDateQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionVariant.Q_PERIOD_DATE,
      answer: {
        fromDate: '2021-11-24T23:00:00.000Z',
        toDate: '2021-11-23T23:00:00.000Z',
        point: 3,
      },
      config: {
        defaultPoint: 1,
        isPeriod: true,
        periodMax: 2,
        periodMin: 1,
        duration: 0,
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z',
        dateScores: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error?.details[0].type).toEqual('date.min');
  });
});
