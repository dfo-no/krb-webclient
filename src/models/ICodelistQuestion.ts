import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface ICodelistQuestion
  extends IQuestionBase<ICodelistAnswer, IConfigBase> {
  type: QuestionEnum.Q_CODELIST;
}

export interface ICodelistAnswer extends IAnswerBase {
  codelist: string | null;
}
