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
  mandatoryCodes: string[];
  optionalCodes: string[];
  optionalCodeMinAmount: number;
  optionalCodeMaxAmount: number;
}

export interface ICodelistAnswer extends IAnswerBase {
  codes: string[] | string;
}

export const CodelistQuestionSchema = QuestionBaseSchema.keys({
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: ConfigBaseSchema.keys({
    codelist: Joi.string().required(),
    mandatoryCodes: Joi.array().items(Joi.string()).min(0).required(),
    optionalCodes: Joi.array().items(Joi.string()).min(0).required(),
    optionalCodeMinAmount: Joi.number().min(0).required(),
    optionalCodeMaxAmount: Joi.number().min(1).required()
  })
});

export const CodelistQuestionAnswerSchema = CodelistQuestionSchema.keys({
  answer: Joi.object().keys({
    codes: Joi.array().items(Joi.string().length(36)).min(1).required()
  }),
  point: Joi.number().required()
});
