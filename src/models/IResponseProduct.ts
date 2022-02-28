import CustomJoi from '../common/CustomJoi';
import { IRequirementAnswer } from './IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from './ISpecificationProduct';
export interface IResponseProduct {
  id: string;
  title: string;
  description: string;
  originProduct: ISpecificationProduct;
  price: number;
  requirementAnswers: IRequirementAnswer[];
}

export const ResponseProductSchema = CustomJoi.object().keys({
  id: CustomJoi.string().required(),
  title: CustomJoi.string().required(),
  description: CustomJoi.string().allow(null, '').required(),
  originProduct: SpecificationProductSchema.required(),
  requirementAnswers: CustomJoi.array(),
  price: CustomJoi.number().integer().required()
});
