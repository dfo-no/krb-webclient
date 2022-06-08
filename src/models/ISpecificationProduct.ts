import CustomJoi from '../common/CustomJoi';
import { BaseProductSchema, IProduct } from '../Nexus/entities/IProduct';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import { IRequirementAnswer } from './IRequirementAnswer';
import { ModelType } from '../enums';

export interface ISpecificationProduct extends IBaseModel {
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
  originProduct: BaseProductSchema,
  description: CustomJoi.string().allow(null, '').required(),
  amount: CustomJoi.number().integer().min(1).required(),
  requirements: CustomJoi.array().items(CustomJoi.string()),
  weight: CustomJoi.number().integer().min(1).required(),
  requirementAnswers: CustomJoi.array(),
  type: CustomJoi.string().equal(ModelType.specificationProduct).required(),
  sourceOriginal: CustomJoi.string().allow(null).required(),
  sourceRel: CustomJoi.string().allow(null).required()
});

export const PostSpecificationProductSchema = SpecificationProductSchema.keys({
  id: CustomJoi.string().equal('').required()
});
