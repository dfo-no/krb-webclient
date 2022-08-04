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
  type: CustomJoi.validateType(QuestionVariant.Q_CHECKBOX),
  config: ConfigBaseSchema.keys({
    preferedAlternative: CustomJoi.validateBoolean(),
    pointsNonPrefered: CustomJoi.validateScore()
  })
});

export const CheckboxQuestionAnswerSchema = CheckboxQuestionSchema.keys({
  answer: CustomJoi.object().keys({
    value: CustomJoi.validateBoolean(),
    point: CustomJoi.validateScore()
  })
}).id('CheckboxQuestionAnswerSchema');
