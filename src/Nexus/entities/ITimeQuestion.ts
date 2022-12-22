import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

export interface ITimeQuestion extends IQuestionBase<ITimeAnswer, ITimeConfig> {
  type: QuestionVariant.Q_TIME;
}

export interface ITimeAnswer extends IAnswerBase {
  fromTime: string | null;
  toTime: string | null;
}

export interface ITimeConfig extends IConfigBase {
  isPeriod: boolean;
  fromBoundary: string | null;
  toBoundary: string | null;
  periodMinutes: number;
  periodHours: number;
  timeDiscounts: TimeDiscountPair[];
  timeScores: [];
}

export interface TimeDiscountPair {
  id?: string;
  time: string | null;
  discount: number;
}

const WorkbenchTimeDiscountSchema = CustomJoi.object().keys({
  discount: CustomJoi.validateDiscount(),
  time: CustomJoi.validateEmptyDate(),
});

export const TimeQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_TIME),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateOptionalDate(),
    toBoundary: CustomJoi.validateOptionalDate(),
    periodMinutes: CustomJoi.validateNumber(),
    periodHours: CustomJoi.validateNumber(),
    timeDiscounts: CustomJoi.validateNotRequiredArray(
      WorkbenchTimeDiscountSchema
    ),
    timeScores: CustomJoi.validateNotRequiredArray(),
  }),
});

const TimeDiscountSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  discount: CustomJoi.validateDiscount(),
  time: CustomJoi.validateTimeDiscount(),
});

export const TimeQuestionAnswerSchema = TimeQuestionWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateFromBoundaryTime(),
    toBoundary: CustomJoi.validateToBoundaryTime(),
    periodMinutes: CustomJoi.validatePeriodMinutes(),
    periodHours: CustomJoi.validatePeriodHours(),
    timeDiscounts: CustomJoi.validateTimeDiscountValues(TimeDiscountSchema),
    timeScores: CustomJoi.validateNotRequiredArray(),
  }),
  answer: CustomJoi.object().keys({
    fromTime: CustomJoi.validateFromTime(),
    toTime: CustomJoi.validateToTime(),
    discount: CustomJoi.validateDiscount(),
  }),
});
