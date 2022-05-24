import CustomJoi from '../../common/CustomJoi';
import {
  ConfigBaseSchema,
  IAnswerBase,
  IConfigBase,
  IQuestionBase,
  QuestionBaseSchema
} from './IQuestionBase';
import { QuestionVariant } from '../../enums';

export interface ICheckboxQuestion
  extends IQuestionBase<ICheckboxAnswer, ICheckboxConfig> {
  type: QuestionVariant.Q_CHECKBOX;
}

export interface ICheckboxAnswer extends IAnswerBase {
  value: boolean;
}

export interface ICheckboxConfig extends IConfigBase {
  preferedAlternative: boolean;
  pointsNonPrefered: number;
}

export const CheckboxQuestionSchema = QuestionBaseSchema.keys({
  type: CustomJoi.string().equal(QuestionVariant.Q_CHECKBOX).required(),
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
