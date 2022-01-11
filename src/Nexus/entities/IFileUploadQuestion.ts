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
  files: string[];
}
export interface IFileUploadConfig extends IConfigBase {
  fileEndings: string[];
  template: string | null;
  uploadInSpec: boolean;
  allowMultipleFiles: boolean;
}

export const FileUploadWorkbenchSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_FILEUPLOAD).required(),
  config: ConfigBaseSchema.keys({
    fileEndings: Joi.array().items(Joi.string()).min(1).required(),
    template: Joi.string().allow(null, '').required(),
    uploadInSpec: Joi.boolean().required(),
    allowMultipleFiles: Joi.boolean().required()
  })
});

export const FileUploadWorkbenchInfoSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_FILEUPLOAD).required(),
  config: ConfigBaseSchema.keys({
    fileEndings: Joi.array().items(Joi.string()).min(1).required(),
    template: Joi.string().allow(null, '').required(),
    uploadInSpec: Joi.boolean().valid(false).required(),
    allowMultipleFiles: Joi.boolean().required()
  })
});

export const FileUploadAnswerSchema = FileUploadWorkbenchSchema.keys({
  answer: Joi.object().keys({
    file: Joi.array().items(Joi.string()).required(),
    point: Joi.number().required()
  })
});

export const FileUploadInfoAnswerSchema = FileUploadWorkbenchInfoSchema.keys({
  answer: Joi.object().keys({
    file: Joi.array().items(Joi.string()).required(),
    point: Joi.number().required()
  })
});
