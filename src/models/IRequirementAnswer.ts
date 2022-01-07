import Joi from 'joi';
import { CheckboxQuestionAnswerSchema } from '../Nexus/entities/ICheckboxQuestion';
import { CodelistQuestionAnswerSchema } from '../Nexus/entities/ICodelistQuestion';
import { FileUploadQuestionAnswerSchema } from '../Nexus/entities/IFileUploadQuestion';
import { PeriodDateAnswerSchema } from '../Nexus/entities/IPeriodDateQuestion';
import {
  BaseRequirementSchema,
  IRequirement
} from '../Nexus/entities/IRequirement';
import { SliderQuestionAnswerSchema } from '../Nexus/entities/ISliderQuestion';
import { TextQuestionAnswerSchema } from '../Nexus/entities/ITextQuestion';
import { TimeAnswerSchema } from '../Nexus/entities/ITimeQuestion';
import ModelType from './ModelType';
import QuestionEnum from './QuestionEnum';
import { QuestionType } from './QuestionType';

export interface IRequirementAnswer {
  id: string;
  questionId: string;
  weight: number;
  variantId: string;
  question: QuestionType;
  type: ModelType;
  requirement: IRequirement;
}

export const RequirementAnswerSchema = Joi.object().keys({
  id: Joi.string().length(36).required(),
  questionId: Joi.string().length(36).required(),
  weight: Joi.number().required(),
  variantId: Joi.string().length(36).required(),
  question: Joi.alternatives().conditional('.type', {
    switch: [
      { is: QuestionEnum.Q_SLIDER, then: SliderQuestionAnswerSchema },
      { is: QuestionEnum.Q_CODELIST, then: CodelistQuestionAnswerSchema },
      { is: QuestionEnum.Q_TEXT, then: TextQuestionAnswerSchema },
      { is: QuestionEnum.Q_PERIOD_DATE, then: PeriodDateAnswerSchema },
      { is: QuestionEnum.Q_TIME, then: TimeAnswerSchema },
      { is: QuestionEnum.Q_CHECKBOX, then: CheckboxQuestionAnswerSchema },
      { is: QuestionEnum.Q_FILEUPLOAD, then: FileUploadQuestionAnswerSchema }
    ]
  }),
  type: Joi.string()
    .valid(...Object.values(ModelType))
    .required(),
  requirement: BaseRequirementSchema
});

export const RequirementAnswersSchema = Joi.object().keys({
  cart: Joi.array().items(RequirementAnswerSchema)
});
