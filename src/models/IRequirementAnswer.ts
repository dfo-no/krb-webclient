import CustomJoi from '../common/CustomJoi';
import ModelType from './ModelType';
import QuestionVariant from './QuestionVariant';
import {
  BaseRequirementSchema,
  IRequirement
} from '../Nexus/entities/IRequirement';
import { CheckboxQuestionAnswerSchema } from '../Nexus/entities/ICheckboxQuestion';
import { CodelistQuestionAnswerSchema } from '../Nexus/entities/ICodelistQuestion';
import { FileUploadAnswerSchema } from '../Nexus/entities/IFileUploadQuestion';
import { PeriodDateAnswerSchema } from '../Nexus/entities/IPeriodDateQuestion';
import { QuestionType } from './QuestionType';
import { SliderQuestionAnswerSchema } from '../Nexus/entities/ISliderQuestion';
import { TextQuestionAnswerSchema } from '../Nexus/entities/ITextQuestion';
import { TimeAnswerSchema } from '../Nexus/entities/ITimeQuestion';

export interface IRequirementAnswer {
  id: string;
  questionId: string;
  weight: number;
  variantId: string;
  question: QuestionType;
  type: ModelType;
  requirement: IRequirement;
}

export const RequirementAnswerSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  questionId: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  weight: CustomJoi.number().required(),
  variantId: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  question: CustomJoi.alternatives().conditional('.type', {
    switch: [
      { is: QuestionVariant.Q_SLIDER, then: SliderQuestionAnswerSchema },
      { is: QuestionVariant.Q_CODELIST, then: CodelistQuestionAnswerSchema },
      { is: QuestionVariant.Q_TEXT, then: TextQuestionAnswerSchema },
      { is: QuestionVariant.Q_PERIOD_DATE, then: PeriodDateAnswerSchema },
      { is: QuestionVariant.Q_TIME, then: TimeAnswerSchema },
      { is: QuestionVariant.Q_CHECKBOX, then: CheckboxQuestionAnswerSchema },
      { is: QuestionVariant.Q_FILEUPLOAD, then: FileUploadAnswerSchema }
    ]
  }),
  type: CustomJoi.string()
    .valid(...Object.values(ModelType))
    .required(),
  requirement: BaseRequirementSchema
});

export const RequirementAnswersSchema = CustomJoi.object().keys({
  cart: CustomJoi.array().items(RequirementAnswerSchema)
});
