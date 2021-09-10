import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ITimeQuestion extends IQuestionBase<ITimeAnswer, ITimeConfig> {
  type: QuestionEnum.Q_TIME;
}
export interface ITimeAnswer extends IAnswerBase {
  time: string;
}

export interface ITimeConfig extends IConfigBase {
  fromTime?: string;
  toTime?: string;
}

export const TimeQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_TIME).required(),
  config: Joi.object().keys({
    fromTime: Joi.string().trim().allow('').required(),
    toTime: Joi.string().trim().allow('').required()
  })
});
