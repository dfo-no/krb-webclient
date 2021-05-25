import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ITimeQuestion extends IQuestionBase<ITimeAnswer, ITimeConfig> {
  type: QuestionEnum.Q_TIME;
}
export interface ITimeAnswer extends IAnswerBase {
  time: string;
}

export interface ITimeConfig extends IConfigBase {
  fromTime?: string;
  toTime?: string;
}
