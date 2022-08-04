import CustomJoi from '../../common/CustomJoi';
import { BaseBankSchema, IBank } from './IBank';
import {
  IRequirementAnswer,
  RequirementAnswerSchema
} from '../../models/IRequirementAnswer';
import {
  ISpecificationProduct,
  SpecificationProductSchema
} from '../../models/ISpecificationProduct';

export interface ISpecification {
  bank: IBank;
  id: string;
  organization: string;
  organizationNumber: string;
  products: ISpecificationProduct[];
  requirements: string[];
  requirementAnswers: IRequirementAnswer[];
  title: string;
}

export const BaseSpecificationSchema = CustomJoi.object().keys({
  bank: BaseBankSchema,
  id: CustomJoi.string().required().valid(''),
  organization: CustomJoi.string().required(),
  organizationNumber: CustomJoi.string().length(9).required(),
  products: CustomJoi.array().items(SpecificationProductSchema).required(),
  requirements: CustomJoi.array().items(CustomJoi.string()).required(),
  // TODO: change to productSchema when finished refactoring workbench
  // answeredVariants: CustomJoi.array().items(CustomJoi.string()),
  requirementAnswers: CustomJoi.array()
    .items(RequirementAnswerSchema)
    .required(),
  title: CustomJoi.string().required()
});
