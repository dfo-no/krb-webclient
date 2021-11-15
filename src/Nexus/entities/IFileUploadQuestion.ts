import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import { IAnswerBase, IConfigBase, IQuestionBase } from './IQuestionBase';

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

export const FileUploadQuestionAnswerSchema = FileUploadQuestionSchema.keys({
  answer: Joi.object().keys({
    file: Joi.string().required(),
    point: Joi.number().required()
  })
});
