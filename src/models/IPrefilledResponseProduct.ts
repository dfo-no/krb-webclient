import Joi from 'joi';
import { IProduct } from '../Nexus/entities/IProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';

export interface IPrefilledResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: IProduct;
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
  relatedProducts: string[];
}

export const PrefilledResponseProductSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  originProduct: Joi.object(),
  description: Joi.string().allow(null, '').required(),
  answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array().items(RequirementAnswerSchema),
  relatedProducts: Joi.array().items(Joi.string().length(36))
});
