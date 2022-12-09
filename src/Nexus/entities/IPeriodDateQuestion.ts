import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant, Weekdays } from '../enums';

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
  duration: number;
  weekdays: WeekdayValues[];
  dateScores: DateScorePair[];
}

export interface DateScorePair {
  id: string;
  date: string | null;
  score: number;
}

export interface WeekdayValues {
  id: string;
  day: Weekdays;
  isChecked: boolean;
}

const WeekdayValuesSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  day: CustomJoi.validateOptionalTextNotRequired(),
  isChecked: CustomJoi.validateOptionalBoolean(),
});

const WorkbenchDateScoreSchema = CustomJoi.object().keys({
  score: CustomJoi.validateScore(),
  date: CustomJoi.validateEmptyDate(),
});

const DateScoreSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  date: CustomJoi.validateDateScore(),
  score: CustomJoi.validateScore(),
});

export const PeriodDateWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_PERIOD_DATE),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateOptionalDate(),
    toBoundary: CustomJoi.validateOptionalDate(),
    periodMin: CustomJoi.validateNumber(),
    periodMax: CustomJoi.validateNumber(),
    duration: CustomJoi.validateDuration(),
    weekdays: CustomJoi.validateNotRequiredArray(WeekdayValuesSchema),
    dateScores: CustomJoi.validateArray(WorkbenchDateScoreSchema),
  }),
});

export const PeriodDateAnswerSchema = PeriodDateWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateFromBoundaryDate(),
    toBoundary: CustomJoi.validateToBoundaryDate(),
    periodMin: CustomJoi.validatePeriodMin(),
    periodMax: CustomJoi.validatePeriodMax(),
    duration: CustomJoi.validateDuration(),
    weekdays: CustomJoi.validateNotRequiredArray(WeekdayValuesSchema),
    dateScores: CustomJoi.validateDateScoreValues(DateScoreSchema),
  }),
  answer: CustomJoi.object().keys({
    fromDate: CustomJoi.validateFromDate(),
    toDate: CustomJoi.validateToDate(),
    discount: CustomJoi.validateScore(),
  }),
});
