import Joi from 'joi';
import { IRequirementAnswer } from './IRequirementAnswer';
import { Product } from './Product';

export interface PrefilledResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: Product;
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const PrefilledResponseProductSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  originProduct: Joi.object(),
  description: Joi.string().allow(null, '').required(),
  answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array()
});
