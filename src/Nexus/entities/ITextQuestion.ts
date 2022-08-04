import CustomJoi from '../../common/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
import { QuestionVariant } from '../../enums';

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
  type: CustomJoi.validateType(QuestionVariant.Q_TEXT),
  config: ConfigBaseSchema.keys({
    max: CustomJoi.validateMaxText()
  })
});

export const TextQuestionAnswerSchema = TextQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    text: CustomJoi.validateAnswerText(),
    point: CustomJoi.validateScore()
  })
}).id('TextQuestionAnswerSchema');
