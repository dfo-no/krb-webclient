import CustomJoi from '../../common/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
import { QuestionVariant } from '../../enums';

export interface IPeriodDateQuestion
  extends IQuestionBase<IPeriodDateAnswer, IPeriodDateConfig> {
  type: QuestionVariant.Q_PERIOD_DATE;
}

export interface IPeriodDateAnswer extends IAnswerBase {
  fromDate: string | null;
  toDate: string | null;
}

export interface IPeriodDateConfig extends IConfigBase {
  isPeriod: boolean;
  fromBoundary: string | null;
  toBoundary: string | null;
  periodMin: number;
  periodMax: number;
  dateScores: DateScorePair[];
}

export interface DateScorePair {
  date: string | null;
  score: number;
}

export const PeriodDateWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_PERIOD_DATE).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.boolean().required(),
    fromBoundary: CustomJoi.string().allow(null).required(),
    toBoundary: CustomJoi.string().allow(null).required(),
    periodMin: CustomJoi.alternatives().conditional('isPeriod', {
      is: true,
      then: CustomJoi.number().required().min(0),
      otherwise: CustomJoi.number()
    }),
    periodMax: CustomJoi.alternatives().conditional('isPeriod', {
      is: true,
      then: CustomJoi.number().greater(CustomJoi.ref('periodMin')).required(),
      otherwise: CustomJoi.number()
    }),
    dateScores: CustomJoi.array().items(
      CustomJoi.object().keys({
        score: CustomJoi.number().required().min(0).max(100),
        date: CustomJoi.string().required()
      })
    )
  })
});

export const PeriodDateSpecSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_PERIOD_DATE).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.boolean().required(),
    fromBoundary: CustomJoi.string().allow(null).required(),
    toBoundary: CustomJoi.string().allow(null).required(),
    periodMin: CustomJoi.when('isPeriod', {
      is: true,
      then: CustomJoi.number().required().min(0),
      otherwise: CustomJoi.number()
    }),
    periodMax: CustomJoi.when('isPeriod', {
      is: true,
      then: CustomJoi.number().greater(CustomJoi.ref('periodMin')).required(),
      otherwise: CustomJoi.number()
    }),
    dateScores: CustomJoi.array().items(
      CustomJoi.object().keys({
        score: CustomJoi.number().required().min(0).max(100),
        date: CustomJoi.string().required()
      })
    )
  })
});

export const PeriodDateAnswerSchema = PeriodDateSpecSchema.keys({
  answer: CustomJoi.object().keys({
    fromDate: CustomJoi.date()
      .iso()
      .raw()
      .min(CustomJoi.ref('/config.fromBoundary'))
      .required(),
    toDate: CustomJoi.when('/config.isPeriod', {
      is: true,
      then: CustomJoi.date()
        .iso()
        .raw()
        .greater(CustomJoi.ref('fromDate'))
        .max(CustomJoi.ref('/config.toBoundary'))
        .required(),
      otherwise: CustomJoi.string().allow(null)
    }),
    point: CustomJoi.number().required()
  })
});
