import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

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

export const PeriodDateQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: Joi.object().keys({
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
