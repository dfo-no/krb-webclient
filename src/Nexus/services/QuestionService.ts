import Utils from '../../common/Utils';
import UuidService from './UuidService';
import { QuestionType } from '../entities/QuestionType';
import { QuestionVariant } from '../enums';

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
            pointsNonPrefered: 0,
            defaultPoint: 1,
            preferedAlternative: true,
          },
          answer: {
            point: 0,
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
            defaultPoint: 1,
            optionalCodeMinAmount: 0,
            optionalCodeMaxAmount: 1,
          },
          answer: {
            point: 0,
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
            pointsUnconfirmed: 0,
            defaultPoint: 1,
          },
          answer: {
            point: 0,
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
            defaultPoint: 1,
          },
          answer: {
            point: 0,
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
            periodMin: 0,
            periodMax: 1,
            defaultPoint: 1,
            dateScores: [],
          },
          answer: {
            point: 0,
            fromDate: null,
            toDate: null,
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
            defaultPoint: 1,
            scoreValues: [],
          },
          answer: {
            point: 0,
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
            discountValues: [],
            defaultPoint: 1,
          },
          answer: {
            point: 0,
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
            defaultPoint: 1,
            timeScores: [],
          },
          answer: {
            point: 0,
            fromTime: null,
            toTime: null,
          },
          sourceRel: null,
          sourceOriginal: null,
        };
      default:
        Utils.assertUnreachable(type);
    }
  };

  calculatePoints = (question: QuestionType): number => {
    switch (question.type) {
      case QuestionVariant.Q_CHECKBOX:
        const preferred = question.config.preferedAlternative;
        const answer = question.answer.value;
        return preferred === answer ? 100 : question.config.pointsNonPrefered;
      case QuestionVariant.Q_CODELIST:
        return Utils.findScoreFromCodes(question.answer.codes, question.config);
      case QuestionVariant.Q_CONFIRMATION:
        return question.answer.value ? 100 : question.config.pointsUnconfirmed;
      case QuestionVariant.Q_PERIOD_DATE:
        return Utils.findScoreFromDate(
          question.answer.fromDate,
          question.config.dateScores
        );
      case QuestionVariant.Q_SLIDER:
        return Utils.findScoreFromValue(
          question.answer.value,
          question.config.scoreValues
        );
      case QuestionVariant.Q_TEXT:
        return question.answer.text.length > 0 ? 100 : 0;
      case QuestionVariant.Q_TIME:
        return Utils.findScoreFromTime(
          question.answer.fromTime,
          question.config.timeScores
        );
      case QuestionVariant.Q_FILEUPLOAD:
      default:
        return 0;
    }
  };
}
