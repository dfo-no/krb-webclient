import Joi from 'joi';
import { IRequirementAnswer } from './IRequirementAnswer';
import {
  SpecificationProduct,
  SpecificationProductSchema
} from './SpecificationProduct';

export interface ResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: SpecificationProduct;
  price: number;
  requirementAnswers: IRequirementAnswer[];
}

export const ResponseProductSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  originProduct: SpecificationProductSchema.required(),
  requirementAnswers: Joi.array(),
  price: Joi.number().integer().required()
});
