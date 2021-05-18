import { IQuestionBase } from './ISelectable';
import { IConfigBase, IAnswerBase } from './Question';
import QuestionType from './QuestionType';

export interface IFileUploadQuestion
  extends IQuestionBase<IFileUploadAnswer, IConfigBase> {
  type: QuestionType.Q_FILEUPLOAD;
}

export interface IFileUploadAnswer extends IAnswerBase {
  file?: string;
  fileEndings: string;
}
