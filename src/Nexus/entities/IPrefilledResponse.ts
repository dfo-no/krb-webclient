import CustomJoi from '../Joi/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import {
  IPrefilledResponseProduct,
  PrefilledResponseProductSchema,
} from './IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
} from './IRequirementAnswer';

export interface IPrefilledResponse {
  bank: IBank;
  supplier: string;
  products: IPrefilledResponseProduct[];
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const BasePrefilledResponseSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  supplier: CustomJoi.validateText(),
  products: CustomJoi.validateArray(PrefilledResponseProductSchema),
  answeredVariants: CustomJoi.validateIdArray(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
});
