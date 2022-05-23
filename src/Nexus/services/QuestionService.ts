import QuestionVariant from '../../models/QuestionVariant';
import Utils from '../../common/Utils';
import UuidService from './UuidService';
import { ICheckboxQuestion } from '../entities/ICheckboxQuestion';
import { ICodelistQuestion } from '../entities/ICodelistQuestion';
import { IFileUploadQuestion } from '../entities/IFileUploadQuestion';
import { IPeriodDateQuestion } from '../entities/IPeriodDateQuestion';
import { ISliderQuestion } from '../entities/ISliderQuestion';
import { ITextQuestion } from '../entities/ITextQuestion';
import { ITimeQuestion } from '../entities/ITimeQuestion';

export default class QuestionService {
  UuidService = new UuidService();

  getQuestion = (type: QuestionVariant) => {
    const uuid = this.UuidService.generateId();

    switch (type) {
      case QuestionVariant.Q_TIME:
        const q1: ITimeQuestion = {
          id: uuid,
          type: QuestionVariant.Q_TIME,
          config: {
            fromBoundary: null,
            toBoundary: null,
            isPeriod: false,
            periodMinutes: 0,
            periodHours: 0,
            defaultPoint: 1,
            timeScores: []
          },
          answer: {
            point: 0,
            fromTime: null,
            toTime: null
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q1;
      case QuestionVariant.Q_TEXT:
        const q2: ITextQuestion = {
          id: uuid,
          type: QuestionVariant.Q_TEXT,
          config: {
            max: 10000,
            defaultPoint: 1
          },
          answer: {
            point: 0,
            text: ''
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q2;
      case QuestionVariant.Q_SLIDER:
        const q3: ISliderQuestion = {
          id: uuid,
          type: QuestionVariant.Q_SLIDER,
          config: {
            min: 0,
            max: 10,
            step: 1,
            unit: 'GB',
            defaultPoint: 1,
            scoreValues: [
              { score: 0, value: 0 },
              { value: 10, score: 100 }
            ]
          },
          answer: {
            point: 0,
            value: 0
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q3;
      case QuestionVariant.Q_PERIOD_DATE:
        const q4: IPeriodDateQuestion = {
          id: uuid,
          type: QuestionVariant.Q_PERIOD_DATE,
          config: {
            fromBoundary: null,
            toBoundary: null,
            isPeriod: false,
            periodMin: 0,
            periodMax: 1,
            defaultPoint: 1,
            dateScores: []
          },
          answer: {
            point: 0,
            fromDate: null,
            toDate: null
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q4;
      case QuestionVariant.Q_FILEUPLOAD:
        const q5: IFileUploadQuestion = {
          id: uuid,
          type: QuestionVariant.Q_FILEUPLOAD,
          config: {
            template: null,
            uploadInSpec: false,
            allowMultipleFiles: false,
            fileEndings: [],
            defaultPoint: 1
          },
          answer: {
            point: 0,
            files: ['']
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q5;
      case QuestionVariant.Q_CODELIST:
        const q6: ICodelistQuestion = {
          id: uuid,
          type: QuestionVariant.Q_CODELIST,
          config: {
            mandatoryCodes: [],
            optionalCodes: [],
            codelist: '',
            defaultPoint: 1,
            optionalCodeMinAmount: 0,
            optionalCodeMaxAmount: 1
          },
          answer: {
            point: 0,
            codes: []
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q6;
      case QuestionVariant.Q_CHECKBOX:
        const q7: ICheckboxQuestion = {
          id: uuid,
          type: QuestionVariant.Q_CHECKBOX,
          config: {
            pointsNonPrefered: 0,
            defaultPoint: 1,
            preferedAlternative: true
          },
          answer: {
            point: 0,
            value: false
          },
          sourceRel: null,
          sourceOriginal: null
        };
        return q7;
      default:
        Utils.assertUnreachable(type);
    }
  };
}
