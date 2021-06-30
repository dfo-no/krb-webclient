import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ICodelistQuestion
  extends IQuestionBase<ICodelistAnswer, ICodelistConfig> {
  type: QuestionEnum.Q_CODELIST;
}

export interface ICodelistConfig extends IConfigBase {
  codelist: string;
  multipleSelect: boolean;
}

export interface ICodelistAnswer extends IAnswerBase {
  codes: string[] | string;
}
