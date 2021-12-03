import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

export interface IPeriodDateQuestion
  extends IQuestionBase<IPeriodDateAnswer, IPeriodDateConfig> {
  type: QuestionEnum.Q_PERIOD_DATE;
}

export interface IPeriodDateAnswer extends IAnswerBase {
  date: string | null;
}

export interface IPeriodDateConfig extends IConfigBase {
  fromDate: string | null;
  toDate: string | null;
}

export const PeriodDateQuestionSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: ConfigBaseSchema.keys({
    fromDate: Joi.alternatives([
      Joi.date().iso().raw(),
      Joi.string().valid(null)
    ]).required(),
    toDate: Joi.alternatives([
      Joi.date().iso().raw(),
      Joi.string().valid(null)
    ]).required()
  })
});

export const PeriodDateQuestionAnswerSchema = PeriodDateQuestionSchema.keys({
  answer: Joi.object().keys({
    date: Joi.alternatives([
      Joi.date().iso().raw(),
      Joi.string().valid(null)
    ]).required(),
    point: Joi.number().required()
  })
});
