import Joi from 'joi';
import { Bank, BaseBankSchema } from './Bank';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
import { PrefilledResponseProduct } from './PrefilledResponseProduct';

export interface PrefilledResponse {
  bank: Bank;
  supplier: string;
  products: PrefilledResponseProduct[];
  // answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BasePrefilledResponseSchema = Joi.object().keys({
  bank: BaseBankSchema,
  supplier: Joi.string().required(),
  // TODO: change to productSchema when finished refactoring workbench
  // answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array().items(RequirementAnswerSchema).required()
});
