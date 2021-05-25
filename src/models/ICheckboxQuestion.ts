import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, IConfigBase> {
  type: QuestionEnum.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}
