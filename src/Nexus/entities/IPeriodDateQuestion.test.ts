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
        discount: 2,
        minDays: null,
        maxDays: null,
      },
      config: {
        defaultDiscount: 1,
        isPeriod: false,
        periodMax: 1,
        periodMin: 1,
        weekdays: [],
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z',
        dateDiscounts: [],
        numberDayDiscounts: [],
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
        discount: 2,
        minDays: null,
        maxDays: null,
      },
      config: {
        defaultDiscount: 1,
        isPeriod: false,
        periodMax: 1,
        periodMin: 1,
        weekdays: [],
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z',
        dateDiscounts: [],
        numberDayDiscounts: [],
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
        discount: 3,
        minDays: null,
        maxDays: null,
      },
      config: {
        defaultDiscount: 1,
        isPeriod: false,
        periodMax: 1,
        periodMin: 1,
        weekdays: [],
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-26T23:00:00.000Z',
        dateDiscounts: [],
        numberDayDiscounts: [],
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
        discount: 3,
        minDays: null,
        maxDays: null,
      },
      config: {
        defaultDiscount: 1,
        isPeriod: true,
        periodMax: 1,
        periodMin: 1,
        weekdays: [],
        fromBoundary: '2021-11-24T23:00:00.000Z',
        toBoundary: '2021-11-24T23:00:00.000Z',
        dateDiscounts: [],
        numberDayDiscounts: [],
      },
      sourceRel: null,
      sourceOriginal: null,
    };

    const report = PeriodDateAnswerSchema.validate(question);
    expect(report.error?.details[0].type).toEqual('date.min');
  });
});
