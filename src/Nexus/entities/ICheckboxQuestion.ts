import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

export type BooleanAsString = 'true' | 'false';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, ICheckboxConfig> {
  type: QuestionEnum.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}

export interface ICheckboxConfig extends IConfigBase {
  preferedAlternative: boolean;
  pointsNonPrefered: number;
}

export const CheckboxQuestionSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_CHECKBOX).required(),
  config: ConfigBaseSchema.keys({
    preferedAlternative: Joi.boolean(),
    pointsNonPrefered: Joi.number().min(0).max(100)
  })
});

export const CheckboxQuestionAnswerSchema = CheckboxQuestionSchema.keys({
  answer: Joi.object().keys({
    value: Joi.boolean().required(),
    point: Joi.number().required()
  })
});
