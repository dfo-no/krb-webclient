import { IQuestionBase, IConfigBase, IAnswerBase } from './Question';
import QuestionType from './QuestionType';

export interface IPeriodDateQuestion
  extends IQuestionBase<IPeriodDateAnswer, IPeriodDateConfig> {
  type: QuestionType.Q_PERIOD_DATE;
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
