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

const WorkbenchTimeScoreSchema = CustomJoi.object().keys({
  score: CustomJoi.validateScore(),
  time: CustomJoi.validateEmptyDate()
});

export const TimeQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_TIME),
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateOptionalDate(),
    toBoundary: CustomJoi.validateOptionalDate(),
    periodMinutes: CustomJoi.validateNumber(),
    periodHours: CustomJoi.validateNumber(),
    timeScores: CustomJoi.validateArray(WorkbenchTimeScoreSchema)
  })
});

const TimeScoreSchema = CustomJoi.object().keys({
  score: CustomJoi.validateScore(),
  time: CustomJoi.validateTimeScore()
});

export const TimeQuestionAnswerSchema = TimeQuestionWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    isPeriod: CustomJoi.validateBoolean(),
    fromBoundary: CustomJoi.validateFromBoundaryTime(),
    toBoundary: CustomJoi.validateToBoundaryTime(),
    periodMinutes: CustomJoi.validatePeriodMinutes(),
    periodHours: CustomJoi.validatePeriodHours(),
    timeScores: CustomJoi.validateTimeScoreValues(TimeScoreSchema)
  }),
  answer: CustomJoi.object().keys({
    fromTime: CustomJoi.validateFromTime(),
    toTime: CustomJoi.validateToTime(),
    point: CustomJoi.validateScore()
  })
});
