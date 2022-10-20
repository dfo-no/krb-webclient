import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

export interface ISliderQuestion
  extends IQuestionBase<ISliderAnswer, ISliderConfig> {
  type: QuestionVariant.Q_SLIDER;
}

export interface ISliderAnswer extends IAnswerBase {
  value: number;
}
export interface ISliderConfig extends IConfigBase {
  step: number;
  min: number;
  max: number;
  unit: string;
  scoreValues: ScoreValuePair[];
}

export interface ScoreValuePair {
  id?: string;
  score: number;
  value: number;
}

const WorkbenchScoreValueSchema = CustomJoi.object().keys({
  score: CustomJoi.validateScore(),
  value: CustomJoi.validateNumber(),
});

export const SliderQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_SLIDER),
  config: ConfigBaseSchema.keys({
    step: CustomJoi.validateSliderStep(),
    min: CustomJoi.validateSliderMin(),
    max: CustomJoi.validateSliderMax(),
    unit: CustomJoi.validateOptionalText(),
    scoreValues: CustomJoi.validateArray(WorkbenchScoreValueSchema),
  }),
});

const ScoreValueSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  score: CustomJoi.validateScore(),
  value: CustomJoi.validateSliderValue(),
});

export const SliderQuestionAnswerSchema = SliderQuestionWorkbenchSchema.keys({
  config: ConfigBaseSchema.keys({
    step: CustomJoi.validateSliderStep(),
    min: CustomJoi.validateSliderMin(),
    max: CustomJoi.validateSliderMax(),
    unit: CustomJoi.validateOptionalText(),
    scoreValues: CustomJoi.validateSliderValues(ScoreValueSchema),
  }),
  answer: CustomJoi.object().keys({
    value: CustomJoi.validateSliderAnswer(),
    point: CustomJoi.validateScore(),
  }),
});
