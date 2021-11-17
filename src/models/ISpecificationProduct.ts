import Joi from 'joi';
import { IProduct } from '../Nexus/entities/IProduct';
import { IRequirementAnswer } from './IRequirementAnswer';

export interface ISpecificationProduct {
  id: string;
  title: string;
  description: string;
  originProduct: IProduct;
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
