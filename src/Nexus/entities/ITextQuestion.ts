import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

export interface ITextQuestion extends IQuestionBase<ITextAnswer, ITextConfig> {
  type: QuestionVariant.Q_TEXT;
}

export interface ITextConfig extends IConfigBase {
  max: number;
  discountValues: Discount[];
}

export interface Discount {
  id?: string;
  discount: number;
}

export interface ITextAnswer extends IAnswerBase {
  text: string;
}

const WorkbenchDiscountSchema = CustomJoi.object().keys({
  discount: CustomJoi.validateNumber(),
});

export const TextQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_TEXT),
  config: ConfigBaseSchema.keys({
    max: CustomJoi.validateMaxText(),
    discountValues: CustomJoi.validateArray(WorkbenchDiscountSchema),
  }),
});

export const TextQuestionAnswerSchema = TextQuestionWorkbenchSchema.keys({
  answer: CustomJoi.object().keys({
    text: CustomJoi.validateAnswerText(),
    point: CustomJoi.validateScore(),
  }),
});
