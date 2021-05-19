import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
import QuestionType from './QuestionType';

export interface ICodelistQuestion
  extends IQuestionBase<ICodelistAnswer, IConfigBase> {
  type: QuestionType.Q_CODELIST;
}

export interface ICodelistAnswer extends IAnswerBase {
  codelist: string | null;
}
