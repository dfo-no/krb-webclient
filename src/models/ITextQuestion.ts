import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionType from './QuestionType';

export interface ITextQuestion extends IQuestionBase<ITextAnswer, ITextConfig> {
  type: QuestionType.Q_TEXT;
}

export interface ITextConfig extends IConfigBase {
  max: number;
}

export interface ITextAnswer extends IAnswerBase {
  text: string;
}
