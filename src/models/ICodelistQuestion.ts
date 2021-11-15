import Joi from 'joi';
import { IAnswerBase, IConfigBase, IQuestionBase } from './IQuestionBase';
import QuestionEnum from './QuestionEnum';

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

export const CodelistQuestionSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  type: Joi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: Joi.object().keys({
    codelist: Joi.string().required(),
    multipleSelect: Joi.boolean().required()
  })
});

export const CodelistQuestionAnswerSchema = CodelistQuestionSchema.keys({
  answer: Joi.object().keys({
    /* codes: Joi.alternatives([
      Joi.array().items(Joi.string().length(36)),
      Joi.string().length(36)
    ]), */
    codes: Joi.string().length(36).required(),
    point: Joi.number().required()
  })
});
