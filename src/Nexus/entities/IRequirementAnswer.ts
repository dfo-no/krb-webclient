import CustomJoi from '../Joi/CustomJoi';
import { BaseRequirementSchema, IRequirement } from './IRequirement';
import { ModelType } from '../enums';
import { QuestionType } from './QuestionType';
import { QuestionAnswerSchema } from './QuestionSchema';

export interface IRequirementAnswer {
  id: string;
  questionId: string;
  variantId: string;
  question: QuestionType;
  type: ModelType;
  requirement: IRequirement;
}

export const RequirementAnswerSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  questionId: CustomJoi.validateId(),
  variantId: CustomJoi.validateId(),
  question: QuestionAnswerSchema,
  type: CustomJoi.validateTypes(ModelType),
  requirement: BaseRequirementSchema,
});
