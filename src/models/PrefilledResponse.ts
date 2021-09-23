import Joi from 'joi';
import { Bank, BaseBankSchema } from './Bank';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
import ModelType from './ModelType';
import { PrefilledResponseProduct } from './PrefilledResponseProduct';

export interface PrefilledResponse {
  bank: Bank;
  supplier: string;
  products: PrefilledResponseProduct[];
  // answeredVariants: string[];
  type: ModelType.prefilledResponse;
  requirementAnswers: IRequirementAnswer[];
}

export const BasePrefilledResponseSchema = Joi.object().keys({
  bank: BaseBankSchema,
  supplier: Joi.string().required(),
  // TODO: change to productSchema when finished refactoring workbench
  type: Joi.string().equal(ModelType.prefilledResponse).required(),
  // answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array().items(RequirementAnswerSchema).required()
});
