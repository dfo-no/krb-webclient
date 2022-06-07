import CustomJoi from '../../common/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
import { QuestionVariant } from '../../enums';

export interface ITimeQuestion extends IQuestionBase<ITimeAnswer, ITimeConfig> {
  type: QuestionVariant.Q_TIME;
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
  type: CustomJoi.string().equal(QuestionVariant.Q_TIME).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.boolean().required(),
    fromBoundary: CustomJoi.string().allow(null).required(),
    toBoundary: CustomJoi.string().allow(null).required(),
    periodMinutes: CustomJoi.alternatives().conditional('isPeriod', {
      is: true,
      then: CustomJoi.number().required().min(0).max(60),
      otherwise: CustomJoi.number()
    }),
    periodHours: CustomJoi.alternatives().conditional('isPeriod', {
      is: true,
      then: CustomJoi.number().required().min(0).max(24),
      otherwise: CustomJoi.number()
    }),
    timeScores: CustomJoi.array().items(
      CustomJoi.object().keys({
        score: CustomJoi.number().required().min(0).max(100),
        time: CustomJoi.string().required()
      })
    )
  })
});

export const TimeSpecSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_TIME).required(),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.boolean().required(),
    fromBoundary: CustomJoi.string().allow(null).required(),
    toBoundary: CustomJoi.string().allow(null).required(),
    periodMinutes: CustomJoi.alternatives().conditional('isPeriod', {
      is: true,
      then: CustomJoi.number().required().min(0).max(60),
      otherwise: CustomJoi.number()
    }),
    periodHours: CustomJoi.alternatives().conditional('isPeriod', {
      is: true,
      then: CustomJoi.number().required().min(0).max(24),
      otherwise: CustomJoi.number()
    }),
    timeScores: CustomJoi.array().items(
      CustomJoi.object().keys({
        score: CustomJoi.number().required().min(0).max(100),
        time: CustomJoi.string().required()
      })
    )
  })
});

export const TimeAnswerSchema = TimeSpecSchema.keys({
  answer: CustomJoi.object().keys({
    fromTime: CustomJoi.date()
      .iso()
      .raw()
      .min(CustomJoi.ref('/config.fromBoundary'))
      .required(),
    toTime: CustomJoi.when('/config.isPeriod', {
      is: true,
      then: CustomJoi.date()
        .iso()
        .raw()
        .greater(CustomJoi.ref('fromTime'))
        .max(CustomJoi.ref('/config.toBoundary'))
        .required(),
      otherwise: CustomJoi.string().allow(null)
    }),
    point: CustomJoi.number().required()
  })
});
