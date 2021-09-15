import Joi from 'joi';
import { Bank, BaseBankSchema } from './Bank';
import { IRequirementAnswer } from './IRequirementAnswer';
import ModelType from './ModelType';
import { PrefilledResponseProduct } from './PrefilledResponseProduct';

export interface PrefilledResponse {
  bank: Bank;
  supplier: string;
  products: PrefilledResponseProduct[];
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const PrefilledResponseSchema = Joi.object().keys({
  id: Joi.string().required(),
  bank: Joi.equal(BaseBankSchema).required(),
  supplier: Joi.string().required(),
  // TODO: change to productSchema when finished refactoring workbench
  type: Joi.string().equal(ModelType.prefilledResponse).required(),
  answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array()
});
