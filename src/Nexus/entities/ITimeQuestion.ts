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
  minTimePeriod: string | null;
  maxTimePeriod: string | null;
}

export interface ITimeConfig extends IConfigBase {
  isPeriod: boolean;
  fromBoundary: string | null;
  toBoundary: string | null;
  periodMinutes: number;
  periodHours: number;
  timePeriodMin: string | null;
  timePeriodMax: string | null;
  timeDiscounts: TimeDiscountPair[];
  timePeriodDiscount: TimePeriodDiscounts[];
}

export interface TimeDiscountPair {
  id?: string;
  time: string | null;
  discount: number;
}

export interface TimePeriodDiscounts {
  id: string;
  timePeriod: string | null;
  discount: number;
}

const WorkbenchTimeDiscountSchema = CustomJoi.object().keys({
  discount: CustomJoi.validateDiscount(),
  time: CustomJoi.validateEmptyDateTime(),
});

const WorkbenchTimePeriodDiscountsSchema = CustomJoi.object().keys({
  discount: CustomJoi.validateDiscount(),
  timePeriod: CustomJoi.validateEmptyDateTime(),
});

export const TimeQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_TIME),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateOptionalDate(),
    toBoundary: CustomJoi.validateOptionalDate(),
    periodMinutes: CustomJoi.validateNumber(),
    periodHours: CustomJoi.validateNumber(),
    timePeriodMin: CustomJoi.validateOptionalDate(),
    timePeriodMax: CustomJoi.validateOptionalDate(),
    timeDiscounts: CustomJoi.validateNotRequiredArray(
      WorkbenchTimeDiscountSchema
    ),
    timePeriodDiscount: CustomJoi.validateNotRequiredArray(
      WorkbenchTimePeriodDiscountsSchema
    ),
  }),
});

const TimeDiscountSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  discount: CustomJoi.validateDiscount(),
  time: CustomJoi.validateTimeDiscount(),
});

const TimePeriodDiscountsSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  discount: CustomJoi.validateDiscount(),
  timePeriod: CustomJoi.validateTimePeriod(),
});

export const TimeQuestionAnswerSchema = TimeQuestionWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateFromBoundaryTime(),
    toBoundary: CustomJoi.validateToBoundaryTime(),
    periodMinutes: CustomJoi.validatePeriodMinutes(),
    periodHours: CustomJoi.validatePeriodHours(),
    timePeriodMin: CustomJoi.validateOptionalDate(),
    timePeriodMax: CustomJoi.validateOptionalDate(),
    timeDiscounts: CustomJoi.validateTimeDiscountValues(TimeDiscountSchema),
    timePeriodDiscount: CustomJoi.validateTimePeriodDiscountValues(
      TimePeriodDiscountsSchema
    ),
  }),
  answer: CustomJoi.object().keys({
    fromTime: CustomJoi.validateFromTime(),
    toTime: CustomJoi.validateToTime(),
    minTimePeriod: CustomJoi.validateMinTimePeriod(),
    maxTimePeriod: CustomJoi.validateMaxTimePeriod(),
    discount: CustomJoi.validateDiscount(),
  }),
});
