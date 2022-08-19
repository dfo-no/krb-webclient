import CustomJoi from '../common/CustomJoi';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from './IRequirementAnswer';
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
  id: CustomJoi.validateId(),
  title: CustomJoi.validateText(),
  description: CustomJoi.validateOptionalText(),
  originProduct: SpecificationProductSchema.required(),
  requirementAnswers: CustomJoi.validateUniqueArray(RequirementAnswerSchema),
  price: CustomJoi.number().integer().required()
});
