import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

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
}

export const SliderQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_SLIDER).required(),
  config: Joi.object().keys({
    step: Joi.number().min(0).max(1000000000).required(),
    min: Joi.number().min(0).max(1000000000).required(),
    max: Joi.number().min(1).max(1000000000).required().greater(Joi.ref('min')),
    unit: Joi.string().required()
  })
});

export const SliderQuestionAnswerSchema = SliderQuestionSchema.keys({
  answer: Joi.object().keys({
    value: Joi.number().required(),
    point: Joi.number().required()
  })
});
