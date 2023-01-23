import Utils from '../../common/Utils';
import UuidService from './UuidService';
import { QuestionType } from '../entities/QuestionType';
import { QuestionVariant } from '../enums';
import { weekdaysData } from '../entities/WeekdaysData';

export default class QuestionService {
  UuidService = new UuidService();

  getQuestion = (type: QuestionVariant): QuestionType => {
    const uuid = this.UuidService.generateId();

    switch (type) {
      case QuestionVariant.Q_CHECKBOX:
        return {
          id: uuid,
          type: QuestionVariant.Q_CHECKBOX,
          config: {
            discount: 0,
            defaultDiscount: 1,
            preferedAlternative: true,
          },
          answer: {
            discount: 0,
            value: false,
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_CODELIST:
        return {
          id: uuid,
          type: QuestionVariant.Q_CODELIST,
          config: {
            mandatoryCodes: [],
            optionalCodes: [],
            codelist: '',
            codes: [],
            discountSumMax: 0,
            defaultDiscount: 1,
            optionalCodeMinAmount: 0,
            optionalCodeMaxAmount: 1,
          },
          answer: {
            discount: 0,
            codes: [],
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_CONFIRMATION:
        return {
          id: uuid,
          type: QuestionVariant.Q_CONFIRMATION,
          config: {
            discount: 0,
            defaultDiscount: 1,
          },
          answer: {
            discount: 0,
            value: false,
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_FILEUPLOAD:
        return {
          id: uuid,
          type: QuestionVariant.Q_FILEUPLOAD,
          config: {
            template: null,
            uploadInSpec: false,
            allowMultipleFiles: false,
            fileEndings: [],
            defaultDiscount: 1,
          },
          answer: {
            discount: 0,
            files: [''],
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_PERIOD_DATE:
        return {
          id: uuid,
          type: QuestionVariant.Q_PERIOD_DATE,
          config: {
            fromBoundary: null,
            toBoundary: null,
            isPeriod: false,
            periodMin: 1,
            periodMax: 1,
            weekdays: weekdaysData,
            defaultDiscount: 1,
            dateDiscounts: [],
            numberDayDiscounts: [],
          },
          answer: {
            discount: 0,
            fromDate: null,
            toDate: null,
            minDays: null,
            maxDays: null,
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_SLIDER:
        return {
          id: uuid,
          type: QuestionVariant.Q_SLIDER,
          config: {
            min: 0,
            max: 1,
            step: 1,
            unit: '',
            defaultDiscount: 1,
            discountsValue: [],
          },
          answer: {
            discount: 0,
            value: 0,
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_TEXT:
        return {
          id: uuid,
          type: QuestionVariant.Q_TEXT,
          config: {
            max: 10000,
            defaultDiscount: 1,
            discountValues: [],
          },
          answer: {
            discount: 0,
            text: '',
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      case QuestionVariant.Q_TIME:
        return {
          id: uuid,
          type: QuestionVariant.Q_TIME,
          config: {
            fromBoundary: null,
            toBoundary: null,
            isPeriod: false,
            periodMinutes: 0,
            periodHours: 0,
            timePeriodMin: null,
            timePeriodMax: null,
            defaultDiscount: 1,
            timeDiscounts: [],
            timePeriodDiscount: [],
          },
          answer: {
            discount: 0,
            fromTime: null,
            toTime: null,
            minTimePeriod: null,
            maxTimePeriod: null,
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      default:
        Utils.assertUnreachable(type);
    }
  };

  calculateDiscount = (question: QuestionType): number => {
    switch (question.type) {
      case QuestionVariant.Q_CHECKBOX:
        if (question.answer.value === question.config.preferedAlternative) {
          return question.config.discount;
        }
        return 0;
      case QuestionVariant.Q_CODELIST:
        return Utils.findDiscountFromCodes(
          question.answer.codes,
          question.config
        );
      case QuestionVariant.Q_CONFIRMATION:
        if (question.answer.value) {
          return question.config.discount;
        }
        return 0;
      case QuestionVariant.Q_PERIOD_DATE:
        return Utils.findDiscountFromDate(
          question.answer.fromDate,
          question.config.dateDiscounts
        );
      case QuestionVariant.Q_SLIDER:
        return Utils.findDiscountFromValue(
          question.answer.value,
          question.config.discountsValue
        );
      case QuestionVariant.Q_TIME:
        return Utils.findDiscountFromTime(
          question.answer.fromTime,
          question.config.timeDiscounts
        );
      case QuestionVariant.Q_FILEUPLOAD:
      default:
        return 0;
    }
  };
}
