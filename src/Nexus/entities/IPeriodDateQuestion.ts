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
  fromDate: string | null;
  toDate: string | null;
}

export interface IPeriodDateConfig extends IConfigBase {
  isPeriod: boolean;
  fromBoundary: string | null;
  toBoundary: string | null;
  periodMin: number;
  periodMax: number;
}

export const PeriodDateWorkbenchSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: ConfigBaseSchema.keys({
    hasToDate: Joi.boolean().required(),
    fromBoundary: Joi.string().allow(null).required(),
    toBoundary: Joi.string().allow(null).required(),
    periodMin: Joi.alternatives().conditional('hasToDate', {
      is: true,
      then: Joi.number().required().min(1)
    }),
    periodMax: Joi.alternatives().conditional('hasToDate', {
      is: true,
      then: Joi.number().greater(Joi.ref('periodMin')).required()
    })
  }),
  answer: Joi.object().keys({
    fromDate: Joi.string().allow(null).required(),
    toDate: Joi.string().allow(null).required(),
    point: Joi.number().required()
  })
});

export const PeriodDateSpecSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: ConfigBaseSchema.keys({
    hasToDate: Joi.boolean().required(),
    fromBoundary: Joi.date().iso().raw().required(),
    toBoundary: Joi.date().iso().raw().required()
  }),
  answer: Joi.object().keys({
    fromDate: Joi.string().allow(null).required(),
    toDate: Joi.string().allow(null).required(),
    point: Joi.number().required()
  })
});

export const PeriodDateAnswerSchema = PeriodDateSpecSchema.keys({
  answer: Joi.object().keys({
    fromDate: Joi.date()
      .iso()
      .raw()
      .min(Joi.ref('/config.fromBoundary'))
      .required(),
    toDate: Joi.when('/config.hasToDate', {
      is: true,
      then: Joi.date()
        .iso()
        .raw()
        .greater(Joi.ref('fromDate'))
        .max(Joi.ref('/config.toBoundary'))
        .required(),
      otherwise: Joi.string().valid(null)
    }),
    point: Joi.number().required()
  })
});
