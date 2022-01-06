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
    isPeriod: Joi.boolean().required(),
    fromBoundary: Joi.string().allow(null).required(),
    toBoundary: Joi.string().allow(null).required(),
    periodMin: Joi.alternatives().conditional('isPeriod', {
      is: true,
      then: Joi.number().required().min(0)
    }),
    periodMax: Joi.alternatives().conditional('isPeriod', {
      is: true,
      then: Joi.number().greater(Joi.ref('periodMin')).required()
    })
  })
});

export const PeriodDateSpecSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_PERIOD_DATE).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: Joi.boolean().required(),
    fromBoundary: Joi.string().allow(null).required(),
    toBoundary: Joi.string().allow(null).required(),
    periodMin: Joi.when('isPeriod', {
      is: true,
      then: Joi.number().required().min(0),
      otherwise: Joi.number()
    }),
    periodMax: Joi.when('isPeriod', {
      is: true,
      then: Joi.number().greater(Joi.ref('periodMin')).required(),
      otherwise: Joi.number()
    })
  }),
  answer: Joi.object().keys({
    fromDate: Joi.date()
      .iso()
      .raw()
      .min(Joi.ref('/config.fromBoundary'))
      .required(),
    toDate: Joi.when('/config.isPeriod', {
      is: true,
      then: Joi.date()
        .iso()
        .raw()
        .greater(Joi.ref('fromDate'))
        .max(Joi.ref('/config.toBoundary'))
        .required(),
      otherwise: Joi.string().allow(null)
    }),
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
    toDate: Joi.when('/config.isPeriod', {
      is: true,
      then: Joi.date()
        .iso()
        .raw()
        .greater(Joi.ref('fromDate'))
        .max(Joi.ref('/config.toBoundary'))
        .required(),
      otherwise: Joi.string().allow(null)
    }),
    point: Joi.number().required()
  })
});
