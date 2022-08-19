import CustomJoi from '../common/CustomJoi';
import { BaseProductSchema, IProduct } from '../Nexus/entities/IProduct';
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

export const PrefilledResponseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  originProduct: BaseProductSchema,
  description: CustomJoi.validateOptionalText(),
  answeredVariants: CustomJoi.validateIdArray(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
  relatedProducts: CustomJoi.validateIdArray()
});
