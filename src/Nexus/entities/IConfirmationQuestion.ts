import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

export interface IConfirmationQuestion
  extends IQuestionBase<IConfirmationAnswer, IConfirmationConfig> {
  type: QuestionVariant.Q_CONFIRMATION;
}

export interface IConfirmationAnswer extends IAnswerBase {
  value: boolean;
}

export interface IConfirmationConfig extends IConfigBase {
  discountUnconfirmed: number;
}

export const ConfirmationQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_CONFIRMATION),
  config: ConfigBaseSchema.keys({
    discountUnconfirmed: CustomJoi.validateScore(),
  }),
});

export const ConfirmationQuestionAnswerSchema =
  ConfirmationQuestionWorkbenchSchema.keys({
    answer: CustomJoi.object().keys({
      value: CustomJoi.validateBoolean(),
      discount: CustomJoi.validateScore(),
    }),
  });
