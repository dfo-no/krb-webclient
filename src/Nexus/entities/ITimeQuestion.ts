import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

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

export const TimeQuestionSchema = QuestionBaseSchema.keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_TIME).required(),
  config: ConfigBaseSchema.keys({
    fromTime: Joi.string().trim().allow('').required(),
    toTime: Joi.string().trim().allow('').required()
  })
});

export const TimeQuestionAnswerSchema = TimeQuestionSchema.keys({
  answer: Joi.object().keys({
    time: Joi.string().required(),
    point: Joi.number().required()
  })
});
