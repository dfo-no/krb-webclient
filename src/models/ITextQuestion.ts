import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ITextQuestion extends IQuestionBase<ITextAnswer, ITextConfig> {
  type: QuestionEnum.Q_TEXT;
}

export interface ITextConfig extends IConfigBase {
  max: number;
}

export interface ITextAnswer extends IAnswerBase {
  text: string;
}
