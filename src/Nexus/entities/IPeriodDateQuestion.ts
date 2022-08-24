import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

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

const WorkbenchDateScoreSchema = CustomJoi.object().keys({
  score: CustomJoi.validateScore(),
  date: CustomJoi.validateEmptyDate()
});

export const PeriodDateWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_PERIOD_DATE),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateOptionalDate(),
    toBoundary: CustomJoi.validateOptionalDate(),
    periodMin: CustomJoi.validateNumber(),
    periodMax: CustomJoi.validateNumber(),
    dateScores: CustomJoi.validateArray(WorkbenchDateScoreSchema)
  })
});

const DateScoreSchema = CustomJoi.object().keys({
  date: CustomJoi.validateDateScore(),
  score: CustomJoi.validateScore()
});

export const PeriodDateAnswerSchema = PeriodDateWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateFromBoundaryDate(),
    toBoundary: CustomJoi.validateToBoundaryDate(),
    periodMin: CustomJoi.validatePeriodMin(),
    periodMax: CustomJoi.validatePeriodMax(),
    dateScores: CustomJoi.validateDateScoreValues(DateScoreSchema)
  }),
  answer: CustomJoi.object().keys({
    fromDate: CustomJoi.validateFromDate(),
    toDate: CustomJoi.validateToDate(),
    point: CustomJoi.validateScore()
  })
});
