import Joi from 'joi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';

export interface ICodelistQuestion
  extends IQuestionBase<ICodelistAnswer, ICodelistConfig> {
  type: QuestionEnum.Q_CODELIST;
}

export interface ICodelistConfig extends IConfigBase {
  codelist: string;
  multipleSelect: boolean;
}

export interface ICodelistAnswer extends IAnswerBase {
  codes: string[] | string;
}

export const CodelistQuestionSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: ConfigBaseSchema.keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  })
});

export const CodelistQuestionAnswerSchema = CodelistQuestionSchema.keys({
  answer: Joi.object().keys({
    codes: Joi.when('/config.multipleSelect', {
      is: true,
      then: Joi.array().items(Joi.string().length(36)).min(1).required(),
      otherwise: Joi.string().length(36).required()
    }).required(),
    point: Joi.number().required()
  })
});
