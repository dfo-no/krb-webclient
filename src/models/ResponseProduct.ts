import Joi from 'joi';
import { BaseModel } from './BaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import ModelType from './ModelType';
import {
  SpecificationProduct,
  SpecificationProductSchema
} from './SpecificationProduct';

export interface ResponseProduct extends BaseModel {
  id: string;
  title: string;
  description: string;
  originProduct: SpecificationProduct;
  price: number;
  requirementAnswers: IRequirementAnswer[];
}

export const responseProductSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  originProduct: SpecificationProductSchema.required(),
  type: Joi.string().equal(ModelType.responseProduct).required(),
  requirementAnswers: Joi.array(),
  price: Joi.number().integer().required()
});
