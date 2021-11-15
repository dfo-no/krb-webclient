import Joi from 'joi';
import { BaseBankSchema, IBank } from './IBank';
import { IPrefilledResponseProduct } from './IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';

export interface IPrefilledResponse {
  bank: IBank;
  supplier: string;
  products: IPrefilledResponseProduct[];
  // answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BasePrefilledResponseSchema = Joi.object().keys({
  bank: BaseBankSchema,
  supplier: Joi.string().required(),
  // TODO: change to productSchema when finished refactoring workbench
  // answeredVariants: Joi.array().items(Joi.string()),
  requirementAnswers: Joi.array().items(RequirementAnswerSchema).required()
});
