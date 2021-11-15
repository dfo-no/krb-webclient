import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './IQuestionBase';
import QuestionEnum from './QuestionEnum';

export interface ITextQuestion extends IQuestionBase<ITextAnswer, ITextConfig> {
  type: QuestionEnum.Q_TEXT;
}

export interface ITextConfig extends IConfigBase {
  max: number;
}

export interface ITextAnswer extends IAnswerBase {
  text: string;
}

export const TextQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_TEXT).required(),
  config: Joi.object().keys({
    max: Joi.number().required().min(0)
  })
});

export const TextQuestionAnswerSchema = TextQuestionSchema.keys({
  answer: Joi.object().keys({
    text: Joi.string().required(),
    point: Joi.number().required()
  })
});
