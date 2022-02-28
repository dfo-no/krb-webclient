import CustomJoi from '../../common/CustomJoi';
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
  type: CustomJoi.string().equal(QuestionEnum.Q_CODELIST).required(),
  config: ConfigBaseSchema.keys({
    codelist: CustomJoi.string().required(),
    mandatoryCodes: CustomJoi.array()
      .items(CustomJoi.string())
      .min(0)
      .required(),
    optionalCodes: CustomJoi.array()
      .items(CustomJoi.string())
      .min(0)
      .required(),
    optionalCodeMinAmount: CustomJoi.number().min(0).required(),
    optionalCodeMaxAmount: CustomJoi.number().min(1).required()
  })
});

export const CodelistQuestionAnswerSchema = CodelistQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    codes: CustomJoi.array()
      .items(CustomJoi.string().length(36))
      .min(1)
      .required()
  }),
  point: CustomJoi.number().required()
});
