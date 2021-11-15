import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import { IBaseModel } from './IBaseModel';

export interface IAnswerBase {
  point: number | null;
}

export interface IConfigBase {
  defaultPoint: number;
}

export interface IQuestionBase<A extends IAnswerBase, C extends IConfigBase>
  extends IBaseModel {
  id: string;

  type: QuestionEnum;

  answer: A | null;

  config: C;
}

export const QuestionBaseSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().valid(QuestionEnum).required(),
  answer: Joi.any(),
  config: Joi.any()
});
