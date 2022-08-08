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
  questionId: CustomJoi.validateId(),
  weight: CustomJoi.number().required(),
  variantId: CustomJoi.validateId(),
  question: QuestionAnswerSchema,
  type: CustomJoi.validateTypes(ModelType),
  requirement: BaseRequirementSchema
});
