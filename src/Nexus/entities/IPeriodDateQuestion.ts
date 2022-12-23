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
  dateDiscounts: DateDiscountPair[];
}

export interface DateDiscountPair {
  id: string;
  date: string | null;
  discount: number;
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

const WorkbenchDateDiscountSchema = CustomJoi.object().keys({
  discount: CustomJoi.validateDiscount(),
  date: CustomJoi.validateEmptyDate(),
});

const DateDiscountSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  date: CustomJoi.validateDateDiscount(),
  discount: CustomJoi.validateDiscount(),
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
    dateDiscounts: CustomJoi.validateNotRequiredArray(
      WorkbenchDateDiscountSchema
    ),
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
    dateDiscounts: CustomJoi.validateDateDiscountValues(DateDiscountSchema),
  }),
  answer: CustomJoi.object().keys({
    fromDate: CustomJoi.validateFromDate(),
    toDate: CustomJoi.validateToDate(),
    discount: CustomJoi.validateDiscount(),
  }),
});
