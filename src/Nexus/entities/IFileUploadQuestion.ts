import CustomJoi from '../../common/CustomJoi';
import QuestionVariant from '../../models/QuestionVariant';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

export interface IFileUploadQuestion
  extends IQuestionBase<IFileUploadAnswer, IFileUploadConfig> {
  type: QuestionVariant.Q_FILEUPLOAD;
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
  type: CustomJoi.string().equal(QuestionVariant.Q_FILEUPLOAD).required(),
  config: ConfigBaseSchema.keys({
    fileEndings: CustomJoi.array().items(CustomJoi.string()).required(),
    template: CustomJoi.string().allow(null, '').required(),
    uploadInSpec: CustomJoi.boolean().required(),
    allowMultipleFiles: CustomJoi.boolean().required()
  })
});

export const FileUploadWorkbenchInfoSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_FILEUPLOAD).required(),
  config: ConfigBaseSchema.keys({
    fileEndings: CustomJoi.array().items(CustomJoi.string()).required(),
    template: CustomJoi.string().allow(null, '').required(),
    uploadInSpec: CustomJoi.boolean().valid(false).required(),
    allowMultipleFiles: CustomJoi.boolean().required()
  })
});

export const FileUploadAnswerSchema = FileUploadWorkbenchSchema.keys({
  answer: CustomJoi.object().keys({
    file: CustomJoi.array().items(CustomJoi.string()).required(),
    point: CustomJoi.number().required()
  })
});

export const FileUploadInfoAnswerSchema = FileUploadWorkbenchInfoSchema.keys({
  answer: CustomJoi.object().keys({
    file: CustomJoi.array().items(CustomJoi.string()).required(),
    point: CustomJoi.number().required()
  })
});
