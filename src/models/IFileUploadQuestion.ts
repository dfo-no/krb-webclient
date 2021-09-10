import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './Question';
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

export const FileUploadQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_FILEUPLOAD).required(),
  config: Joi.object().keys({
    fileEndings: Joi.string().allow('')
  })
});
