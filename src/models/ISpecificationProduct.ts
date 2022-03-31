import CustomJoi from '../common/CustomJoi';
import { IProduct } from '../Nexus/entities/IProduct';
import { IRequirementAnswer } from './IRequirementAnswer';
export interface ISpecificationProduct {
  id: string;
  title: string;
  description: string;
  originProduct: IProduct;
  weight: number;
  amount: number;
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
}

export const SpecificationProductSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  title: CustomJoi.string().required(),
  // TODO: change to productSchema when finished refactoring workbench
  originProduct: CustomJoi.object(),
  description: CustomJoi.string().allow(null, '').required(),
  amount: CustomJoi.number().integer().min(1).required(),
  requirements: CustomJoi.array().items(CustomJoi.string()),
  weight: CustomJoi.number().integer().min(1).required(),
  requirementAnswers: CustomJoi.array()
});
