import CustomJoi from '../Joi/CustomJoi';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import { QuestionVariant } from '../enums';

export interface IAnswerBase {
  discount: number | null;
}

export interface IConfigBase {
  defaultDiscount: number;
}

export interface IQuestionBase<A extends IAnswerBase, C extends IConfigBase>
  extends IBaseModel {
  id: string;

  type: QuestionVariant;

  answer: A;

  config: C;
}

export const ConfigBaseSchema = CustomJoi.object().keys({
  defaultDiscount: CustomJoi.number().required(),
});

export const QuestionBaseSchema = BaseModelSchema.keys({
  type: CustomJoi.validateTypes(QuestionVariant),
  answer: CustomJoi.any().required(),
  config: CustomJoi.any().required(),
});
