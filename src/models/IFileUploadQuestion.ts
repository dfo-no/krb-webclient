import { IQuestionBase, IConfigBase, IAnswerBase } from './Question';
import QuestionType from './QuestionType';

export interface IFileUploadQuestion
  extends IQuestionBase<IFileUploadAnswer, IFileUploadConfig> {
  type: QuestionType.Q_FILEUPLOAD;
}

export interface IFileUploadAnswer extends IAnswerBase {
  file: string;
}
export interface IFileUploadConfig extends IConfigBase {
  fileEndings: string;
}
