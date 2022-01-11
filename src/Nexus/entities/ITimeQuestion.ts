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
  fromTime: string | null;
  toTime: string | null;
}

export interface ITimeConfig extends IConfigBase {
  isPeriod: boolean;
  fromBoundary: string | null;
  toBoundary: string | null;
  periodMinutes: number;
  periodHours: number;
  timeScores: TimeScorePair[];
}

export interface TimeScorePair {
  time: string | null;
  score: number;
}

export const TimeWorkbenchSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_TIME).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: Joi.boolean().required(),
    fromBoundary: Joi.string().allow(null).required(),
    toBoundary: Joi.string().allow(null).required(),
    periodMinutes: Joi.alternatives().conditional('isPeriod', {
      is: true,
      then: Joi.number().required().min(0).max(60),
      otherwise: Joi.number()
    }),
    periodHours: Joi.alternatives().conditional('isPeriod', {
      is: true,
      then: Joi.number().required().min(0).max(24),
      otherwise: Joi.number()
    }),
    timeScores: Joi.array().items(
      Joi.object().keys({
        score: Joi.number().required().min(0).max(100),
        time: Joi.string().required()
      })
    )
  })
});

export const TimeSpecSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_TIME).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: Joi.boolean().required(),
    fromBoundary: Joi.string().allow(null).required(),
    toBoundary: Joi.string().allow(null).required(),
    periodMinutes: Joi.alternatives().conditional('isPeriod', {
      is: true,
      then: Joi.number().required().min(0).max(60),
      otherwise: Joi.number()
    }),
    periodHours: Joi.alternatives().conditional('isPeriod', {
      is: true,
      then: Joi.number().required().min(0).max(24),
      otherwise: Joi.number()
    }),
    timeScores: Joi.array().items(
      Joi.object().keys({
        score: Joi.number().required().min(0).max(100),
        time: Joi.string().required()
      })
    )
  })
});

export const TimeAnswerSchema = TimeSpecSchema.keys({
  answer: Joi.object().keys({
    fromTime: Joi.date()
      .iso()
      .raw()
      .min(Joi.ref('/config.fromBoundary'))
      .required(),
    toTime: Joi.when('/config.isPeriod', {
      is: true,
      then: Joi.date()
        .iso()
        .raw()
        .greater(Joi.ref('fromTime'))
        .max(Joi.ref('/config.toBoundary'))
        .required(),
      otherwise: Joi.string().allow(null)
    }),
    point: Joi.number().required()
  })
});
