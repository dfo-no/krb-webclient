import CustomJoi from '../../common/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
import { QuestionVariant } from '../../enums';

export interface ICodelistQuestion
  extends IQuestionBase<ICodelistAnswer, ICodelistConfig> {
  type: QuestionVariant.Q_CODELIST;
}

export interface ICodelistConfig extends IConfigBase {
  codelist: string;
  mandatoryCodes: string[];
  optionalCodes: string[];
  optionalCodeMinAmount: number;
  optionalCodeMaxAmount: number;
  codes: ICodeSelection[];
}

export interface ICodeSelection {
  code: string;
  mandatory: boolean;
  score: number;
}

export interface ICodelistAnswer extends IAnswerBase {
  codes: string[];
}

export const CodelistQuestionSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_CODELIST).required(),
  config: ConfigBaseSchema.keys({
    codelist: CustomJoi.string().length(36).required(),
    mandatoryCodes: CustomJoi.array()
      .items(CustomJoi.string())
      .min(0)
      .required(),
    optionalCodes: CustomJoi.array()
      .items(CustomJoi.string())
      .min(0)
      .required(),
    optionalCodeMinAmount: CustomJoi.number().min(0).required(),
    optionalCodeMaxAmount: CustomJoi.number().min(1).required(),
    codes: CustomJoi.array().items(
      CustomJoi.object().keys({
        code: CustomJoi.string().required(),
        mandatory: CustomJoi.boolean().required(),
        score: CustomJoi.number().required().min(0).max(100)
      })
    )
  })
});

export const CodelistQuestionAnswerSchema = CodelistQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    codes: CustomJoi.array().items(CustomJoi.string().length(36)).required(),
    point: CustomJoi.number().required()
  })
});
