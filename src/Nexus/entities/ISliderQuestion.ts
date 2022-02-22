import CustomJoi from '../../common/CustomJoi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
export interface ISliderQuestion
  extends IQuestionBase<ISliderAnswer, ISliderConfig> {
  type: QuestionEnum.Q_SLIDER;
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
  score: number;
  value: number;
}

export const SliderQuestionSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionEnum.Q_SLIDER).required(),
  config: ConfigBaseSchema.keys({
    step: CustomJoi.number().min(0).max(1000000000).required(),
    min: CustomJoi.number().min(0).max(1000000000).required(),
    max: CustomJoi.number()
      .min(1)
      .max(1000000000)
      .required()
      .greater(CustomJoi.ref('min')),
    unit: CustomJoi.string().required(),
    scoreValues: CustomJoi.array().items(
      CustomJoi.object().keys({
        score: CustomJoi.number().required().min(0).max(100),
        value: CustomJoi.number().required()
      })
    )
  })
});

export const SliderQuestionAnswerSchema = SliderQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    value: CustomJoi.number().required(),
    point: CustomJoi.number().required()
  })
});
