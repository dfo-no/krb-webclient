import CustomJoi from '../../common/CustomJoi';
import QuestionEnum from '../../models/QuestionEnum';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
export type BooleanAsString = 'true' | 'false';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, ICheckboxConfig> {
  type: QuestionEnum.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}

export interface ICheckboxConfig extends IConfigBase {
  preferedAlternative: boolean;
  pointsNonPrefered: number;
}

export const CheckboxQuestionSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionEnum.Q_CHECKBOX).required(),
  config: ConfigBaseSchema.keys({
    preferedAlternative: CustomJoi.boolean(),
    pointsNonPrefered: CustomJoi.number().min(0).max(100)
  })
});

export const CheckboxQuestionAnswerSchema = CheckboxQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    value: CustomJoi.boolean().required(),
    point: CustomJoi.number().required()
  })
});
