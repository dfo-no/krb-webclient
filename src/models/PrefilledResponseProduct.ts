import CustomJoi from '../common/CustomJoi';
import { IProduct } from '../Nexus/entities/IProduct';
import { IRequirementAnswer } from './IRequirementAnswer';
export interface PrefilledResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: IProduct;
  answeredVariants: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const PrefilledResponseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  title: CustomJoi.string().required(),
  originProduct: CustomJoi.object(),
  description: CustomJoi.string().allow(null, '').required(),
  answeredVariants: CustomJoi.array().items(CustomJoi.string()),
  requirementAnswers: CustomJoi.array()
});
