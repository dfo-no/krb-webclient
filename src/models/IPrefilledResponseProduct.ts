import CustomJoi from '../common/CustomJoi';
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

export const PrefilledResponseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.string()
    .guid({ version: ['uuidv4'] })
    .length(36)
    .required(),
  title: CustomJoi.string().required(),
  originProduct: CustomJoi.object(),
  description: CustomJoi.string().allow(null, '').required(),
  answeredVariants: CustomJoi.array().items(CustomJoi.string()),
  requirementAnswers: CustomJoi.array().items(RequirementAnswerSchema),
  relatedProducts: CustomJoi.array().items(CustomJoi.string().length(36))
});
