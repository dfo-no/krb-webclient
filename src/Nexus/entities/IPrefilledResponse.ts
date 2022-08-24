import CustomJoi from '../Joi/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import { IPrefilledResponseProduct } from './IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';

export interface IPrefilledResponse {
  bank: IBank;
  supplier: string;
  products: IPrefilledResponseProduct[];
  // answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BasePrefilledResponseSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  supplier: CustomJoi.validateText(),
  // TODO: change to productSchema when finished refactoring workbench
  // answeredVariants: CustomJoi.array().items(CustomJoi.string()),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema)
});
