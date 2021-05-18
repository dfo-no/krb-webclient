import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionType from './QuestionType';

export interface ITimeQuestion extends IQuestionBase<ITimeAnswer, ITimeConfig> {
  type: QuestionType.Q_TEXT;
}
export interface ITimeAnswer extends IAnswerBase {
  time: string;
}

export interface ITimeConfig extends IConfigBase {
  fromTime?: string;
  toTime?: string;
}
