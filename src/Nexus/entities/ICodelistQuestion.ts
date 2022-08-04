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
  type: CustomJoi.validateType(QuestionVariant.Q_CODELIST),
  config: ConfigBaseSchema.keys({
    codelist: CustomJoi.validateId(),
    mandatoryCodes: CustomJoi.any(),
    optionalCodes: CustomJoi.any(),
    optionalCodeMinAmount: CustomJoi.validateMinCodes(),
    optionalCodeMaxAmount: CustomJoi.validateMaxCodes(),
    codes: CustomJoi.validateQuestionCodes()
  })
});

export const CodelistQuestionAnswerSchema = CodelistQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    codes: CustomJoi.array().items(CustomJoi.string().length(36)).required(),
    point: CustomJoi.validateScore()
  })
}).id('CodelistQuestionAnswerSchema');
