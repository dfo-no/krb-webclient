import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export type BooleanAsString = 'true' | 'false';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, ICheckboxConfig> {
  type: QuestionEnum.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}

export interface ICheckboxConfig extends IConfigBase {
  weight: Record<BooleanAsString, number>;
}
