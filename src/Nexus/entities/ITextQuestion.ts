import CustomJoi from '../../common/CustomJoi';
import QuestionVariant from '../../models/QuestionVariant';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

export interface ITextQuestion extends IQuestionBase<ITextAnswer, ITextConfig> {
  type: QuestionVariant.Q_TEXT;
}

export interface ITextConfig extends IConfigBase {
  max: number;
}

export interface ITextAnswer extends IAnswerBase {
  text: string;
}

export const TextQuestionSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_TEXT).required(),
  config: ConfigBaseSchema.keys({
    max: CustomJoi.number().required().min(0)
  })
});

export const TextQuestionAnswerSchema = TextQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    text: CustomJoi.string().allow('').required(),
    point: CustomJoi.number().required()
  })
});
