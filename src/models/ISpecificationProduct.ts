import CustomJoi from '../common/CustomJoi';
import { BaseProductSchema, IProduct } from '../Nexus/entities/IProduct';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
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
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  originProduct: BaseProductSchema,
  description: CustomJoi.validateOptionalText(),
  amount: CustomJoi.validateAmount(),
  requirements: CustomJoi.validateIdArray(),
  weight: CustomJoi.validateWeight(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
  type: CustomJoi.validateType(ModelType.specificationProduct),
  sourceOriginal: CustomJoi.validateOptionalId(),
  sourceRel: CustomJoi.validateOptionalId()
});

export const PostSpecificationProductSchema = SpecificationProductSchema.keys({
  id: CustomJoi.validateEmptyId()
});
