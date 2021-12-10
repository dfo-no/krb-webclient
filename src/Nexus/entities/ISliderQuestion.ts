import Joi, { equal } from 'joi';
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
  valueNumbers: number[];
  scores: number[];
}

export const SliderQuestionSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_SLIDER).required(),
  config: ConfigBaseSchema.keys({
    step: Joi.number().min(0).max(1000000000).required(),
    min: Joi.number().min(0).max(1000000000).required(),
    max: Joi.number().min(1).max(1000000000).required().greater(Joi.ref('min')),
    unit: Joi.string().required(),
    valueNumbers: Joi.array().items(Joi.number()).required(),
    scores: Joi.array().items(Joi.number()).required()
  }).assert('valueNumbers.length', Joi.ref('scores.length'))
});

export const SliderQuestionAnswerSchema = SliderQuestionSchema.keys({
  answer: Joi.object().keys({
    value: Joi.number().required(),
    point: Joi.number().required()
  })
});
