import Joi from 'joi';
import { IRequirementAnswer } from './IRequirementAnswer';
import { Product } from './Product';

export interface SpecificationProduct {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  weight: number;
  amount: number;
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const SpecificationProductSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  // TODO: change to productSchema when finished refactoring workbench
  originProduct: Joi.object(),
  description: Joi.string().allow(null, '').required(),
  amount: Joi.number().integer().min(1).required(),
  requirements: Joi.array().items(Joi.string()),
  weight: Joi.number().integer().min(1).required(),
  requirementAnswers: Joi.array()
});
