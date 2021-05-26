import { IQuestionBase, IConfigBase, IAnswerBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface IPeriodDateQuestion
  extends IQuestionBase<IPeriodDateAnswer, IPeriodDateConfig> {
  type: QuestionEnum.Q_PERIOD_DATE;
}

export interface IPeriodDateAnswer extends IAnswerBase {
  date: string;
}

export interface IPeriodDateConfig extends IConfigBase {
  fromDate?: string;
  toDate?: string;
  minDays?: number;
  maxDays?: number;
}
