import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './IQuestionBase';
import QuestionEnum from './QuestionEnum';

export type BooleanAsString = 'true' | 'false';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, ICheckboxConfig> {
  type: QuestionEnum.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}

export interface ICheckboxConfig extends IConfigBase {
  weightTrue: number;
  weightFalse: number;
}

export const CheckboxQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_CHECKBOX).required(),
  config: Joi.object().keys({
    weightTrue: Joi.number().min(1).max(100),
    weightFalse: Joi.number().min(0).max(100)
  })
});

export const CheckboxQuestionAnswerSchema = CheckboxQuestionSchema.keys({
  answer: Joi.object().keys({
    value: Joi.boolean().required(),
    point: Joi.number().required()
  })
});
