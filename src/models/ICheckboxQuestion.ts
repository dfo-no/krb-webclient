import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionType from './QuestionType';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, IConfigBase> {
  type: QuestionType.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}
