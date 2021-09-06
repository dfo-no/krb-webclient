import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import ModelType from './ModelType';
import { Product } from './Product';

export interface SpecificationProduct extends BaseModel {
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
  type: Joi.string().equal(ModelType.specificationProduct).required(),
  description: Joi.string().allow(null, '').required(),
  amount: Joi.number().integer().min(1).required(),
  requirements: Joi.array().items(Joi.string()),
  weight: Joi.number().integer().min(1).required(),
  requirementAnswers: Joi.array()
});
