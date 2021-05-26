import { IQuestionBase, IConfigBase, IAnswerBase } from './Question';
import QuestionEnum from './QuestionEnum';

export interface IFileUploadQuestion
  extends IQuestionBase<IFileUploadAnswer, IFileUploadConfig> {
  type: QuestionEnum.Q_FILEUPLOAD;
}

export interface IFileUploadAnswer extends IAnswerBase {
  file: string;
}
export interface IFileUploadConfig extends IConfigBase {
  fileEndings: string;
}
