import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

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

export const FileUploadQuestionSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_FILEUPLOAD).required(),
  config: ConfigBaseSchema.keys({
    fileEndings: Joi.string().allow('')
  })
});

export const FileUploadQuestionAnswerSchema = FileUploadQuestionSchema.keys({
  answer: Joi.object().keys({
    file: Joi.string().required(),
    point: Joi.number().required()
  })
});
