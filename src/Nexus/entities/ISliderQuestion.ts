import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

export interface ISliderQuestion
  extends IQuestionBase<ISliderAnswer, ISliderConfig> {
  type: QuestionVariant.Q_SLIDER;
}

export interface ISliderAnswer extends IAnswerBase {
  value: number;
}
export interface ISliderConfig extends IConfigBase {
  step: number;
  min: number;
  max: number;
  unit: string;
  discountsValue: DiscountValuePair[];
}

export interface DiscountValuePair {
  id?: string;
  discount: number;
  value: number;
}

const WorkbenchDiscountValueSchema = CustomJoi.object().keys({
  discount: CustomJoi.validateDiscount(),
  value: CustomJoi.validateNumber(),
});

export const SliderQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_SLIDER),
  config: ConfigBaseSchema.keys({
    step: CustomJoi.validateSliderStep(),
    min: CustomJoi.validateSliderMin(),
    max: CustomJoi.validateSliderMax(),
    unit: CustomJoi.validateOptionalText(),
    discountsValue: CustomJoi.validateNotRequiredArray(
      WorkbenchDiscountValueSchema
    ),
  }),
});

const DiscountValueSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  discount: CustomJoi.validateDiscount(),
  value: CustomJoi.validateSliderValue(),
});

export const SliderQuestionAnswerSchema = SliderQuestionWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    step: CustomJoi.validateSliderStep(),
    min: CustomJoi.validateSliderMin(),
    max: CustomJoi.validateSliderMax(),
    unit: CustomJoi.validateOptionalText(),
    discountsValue: CustomJoi.validateSliderValues(DiscountValueSchema),
  }),
  answer: CustomJoi.object().keys({
    value: CustomJoi.validateSliderAnswer(),
    discount: CustomJoi.validateDiscount(),
  }),
});
