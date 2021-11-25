import Joi from 'joi';
import { IProduct } from '../Nexus/entities/IProduct';
import { IRequirementAnswer } from './IRequirementAnswer';

export interface PrefilledResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: IProduct;
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
