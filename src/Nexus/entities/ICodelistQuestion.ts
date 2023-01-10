import CustomJoi from '../Joi/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema,
} from './IQuestionBase';
import { QuestionVariant } from '../enums';

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
  discountSumMax: number;
}

export interface ICodeSelection {
  code: string;
  mandatory: boolean;
  discount: number;
}

export interface ICodelistAnswer extends IAnswerBase {
  codes: string[];
}

export const CodelistQuestionWorkbenchSchema = QuestionBaseSchema.keys({
  type: CustomJoi.validateType(QuestionVariant.Q_CODELIST),
  config: ConfigBaseSchema.keys({
    codelist: CustomJoi.validateId(),
    mandatoryCodes: CustomJoi.any(),
    optionalCodes: CustomJoi.any(),
    optionalCodeMinAmount: CustomJoi.validateMinCodes(),
    optionalCodeMaxAmount: CustomJoi.validateMaxCodes(),
    codes: CustomJoi.validateQuestionCodes(),
    discountSumMax: CustomJoi.validateHighestDiscount(),
  }),
});

export const CodelistQuestionAnswerSchema =
  CodelistQuestionWorkbenchSchema.keys({
    answer: CustomJoi.object().keys({
      codes: CustomJoi.validateIdArray(),
      discount: CustomJoi.validateDiscount(),
    }),
  });
