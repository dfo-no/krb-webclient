import CustomJoi from '../common/CustomJoi';
import { BaseBankSchema, IBank } from '../Nexus/entities/IBank';
import {
  IPrefilledResponseProduct,
  PrefilledResponseProductSchema
} from './IPrefilledResponseProduct';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
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
  supplier: CustomJoi.string().required(),
  products: CustomJoi.array().items(PrefilledResponseProductSchema).required(),
  answeredVariants: CustomJoi.array().items(CustomJoi.string()).required(),
  requirementAnswers: CustomJoi.array()
    .items(RequirementAnswerSchema)
    .required()
});
