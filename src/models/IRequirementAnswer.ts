import CustomJoi from '../common/CustomJoi';
import {
  BaseRequirementSchema,
  IRequirement
} from '../Nexus/entities/IRequirement';
import { ModelType } from '../enums';
import { QuestionType } from './QuestionType';
import { QuestionAnswerSchema } from '../Nexus/entities/QuestionSchema';

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
  id: CustomJoi.validateId(),
  questionId: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  weight: CustomJoi.number().required(),
  variantId: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  question: QuestionAnswerSchema,
  type: CustomJoi.validateType(...Object.values(ModelType)),
  requirement: BaseRequirementSchema
});
