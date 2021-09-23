import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import ModelType from './ModelType';
import { Product } from './Product';

export interface PrefilledResponseProduct extends BaseModel {
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
  type: Joi.string().equal(ModelType.prefilledResponseProduct).required(),
  description: Joi.string().allow(null, '').required(),
  answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array()
});
