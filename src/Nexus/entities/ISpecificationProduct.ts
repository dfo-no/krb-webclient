import CustomJoi from '../Joi/CustomJoi';
import { BaseProductSchema, IProduct } from './IProduct';
import { BaseModelSchema, IBaseModel } from './IBaseModel';
import {
  IRequirementAnswer,
  RequirementAnswerSchema,
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
  unit?: string;
}

export const SpecificationProductSchema = BaseModelSchema.keys({
  title: CustomJoi.validateText(),
  originProduct: BaseProductSchema,
  description: CustomJoi.validateOptionalText(),
  amount: CustomJoi.validateAmount(),
  requirements: CustomJoi.validateIdArray(),
  weight: CustomJoi.validateWeight(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
  type: CustomJoi.validateType(ModelType.specificationProduct),
  unit: CustomJoi.validateOptionalTextNotRequired(),
});
